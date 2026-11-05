# backend/app.py
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client

# Memuat kredensial dari .env
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}) 

supabase_url: str = os.environ.get("SUPABASE_URL")
supabase_key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# ==========================================
# ENDPOINT PUBLIK (Untuk Frontend React)
# ==========================================

# 1. Mengambil semua proyek yang sudah dipublikasi
@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        # Mengurutkan dari yang terbaru
        response = supabase.table('projects').select('*').eq('is_published', True).order('created_at', desc=True).execute()
        return jsonify({"status": "success", "data": response.data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 2. Mengambil detail satu proyek berdasarkan slug URL
@app.route('/api/projects/<slug>', methods=['GET'])
def get_project_by_slug(slug):
    try:
        response = supabase.table('projects').select('*').eq('slug', slug).execute()
        
        # Jika data kosong (proyek tidak ditemukan)
        if len(response.data) == 0:
            return jsonify({"status": "error", "message": "Proyek tidak ditemukan"}), 404
            
        return jsonify({"status": "success", "data": response.data[0]}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 3. Menerima pesan dari halaman "Contact Me"
@app.route('/api/messages', methods=['POST'])
def send_message():
    try:
        data = request.json
        
        # Validasi sederhana
        if not data.get('sender_name') or not data.get('sender_email') or not data.get('message_body'):
            return jsonify({"status": "error", "message": "Semua kolom wajib diisi!"}), 400

        new_message = {
            "sender_name": data.get("sender_name"),
            "sender_email": data.get("sender_email"),
            "message_body": data.get("message_body"),
            "is_read": False
        }
        
        # Insert ke Supabase
        response = supabase.table('messages').insert(new_message).execute()
        return jsonify({"status": "success", "message": "Pesan berhasil dikirim!", "data": response.data}), 201
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ==========================================
# ENDPOINT ADMIN (Butuh Autentikasi)
# ==========================================

@app.route('/api/auth/login', methods=['POST'])
def login_admin():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({"status": "error", "message": "Email dan password wajib diisi!"}), 400
            
        # Meminta Supabase untuk memverifikasi kredensial
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        # Jika berhasil, kembalikan token ke React
        return jsonify({
            "status": "success", 
            "message": "Login berhasil",
            "data": {
                "session": {
                    "access_token": auth_response.session.access_token,
                },
                "user": {
                    "id": auth_response.user.id,
                    "email": auth_response.user.email
                }
            }
        }), 200
        
    except Exception as e:
        error_message = str(e)
        # Menangkap error khusus jika password/email salah
        if "Invalid login credentials" in error_message or "AuthApiError" in error_message:
            return jsonify({"status": "error", "message": "Email atau password salah."}), 401
            
        return jsonify({"status": "error", "message": error_message}), 500

# Mengambil seluruh pesan pengunjung untuk Admin
@app.route('/api/admin/messages', methods=['GET'])
def get_admin_messages():
    try:
        # Mengambil pesan dan mengurutkan dari yang terbaru
        response = supabase.table('messages').select('*').order('created_at', desc=True).execute()
        return jsonify({"status": "success", "data": response.data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ==========================================
# ENDPOINT ADMIN: MANAJEMEN PROYEK (CRUD)
# ==========================================

# 1. Tambah Proyek Baru
@app.route('/api/admin/projects', methods=['POST'])
def create_project():
    try:
        data = request.json
        
        # Validasi dasar: pastikan judul dan slug tidak kosong
        if not data.get('title') or not data.get('slug'):
            return jsonify({"status": "error", "message": "Judul dan Slug wajib diisi!"}), 400

        # Memasukkan data ke tabel projects
        response = supabase.table('projects').insert(data).execute()
        return jsonify({"status": "success", "message": "Proyek berhasil ditambahkan", "data": response.data}), 201
        
    except Exception as e:
        # Menangkap error jika slug sudah ada (duplicate unique constraint)
        if "duplicate key value" in str(e):
            return jsonify({"status": "error", "message": "Slug URL sudah digunakan, gunakan yang lain."}), 400
        return jsonify({"status": "error", "message": str(e)}), 500


# 2. Edit / Perbarui Proyek
@app.route('/api/admin/projects/<id>', methods=['PUT'])
def update_project(id):
    try:
        data = request.json
        
        # Memperbarui data berdasarkan ID proyek
        response = supabase.table('projects').update(data).eq('id', id).execute()
        return jsonify({"status": "success", "message": "Proyek berhasil diperbarui", "data": response.data}), 200
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# 3. Hapus Proyek
@app.route('/api/admin/projects/<id>', methods=['DELETE'])
def delete_project(id):
    try:
        # Menghapus data berdasarkan ID proyek
        response = supabase.table('projects').delete().eq('id', id).execute()
        return jsonify({"status": "success", "message": "Proyek berhasil dihapus"}), 200
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 4. Membaca semua proyek (termasuk draft) untuk Dashboard Admin
@app.route('/api/admin/projects', methods=['GET'])
def get_all_projects_admin():
    try:
        # Mengambil semua tanpa filter is_published
        response = supabase.table('projects').select('*').order('created_at', desc=True).execute()
        return jsonify({"status": "success", "data": response.data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
        

if __name__ == '__main__':
    app.run(debug=True, port=5000)