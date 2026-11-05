# backend/app.py
import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client

# Muat variabel rahasia dari file .env
load_dotenv()

app = Flask(__name__)
# Izinkan frontend React (biasanya berjalan di port 5173 via Vite/Bun) untuk mengakses API ini
CORS(app, resources={r"/api/*": {"origins": "*"}}) 

# Konfigurasi koneksi ke Supabase
supabase_url: str = os.environ.get("SUPABASE_URL")
supabase_key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Endpoint 1: Tes koneksi dasar
@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "sukses", "pesan": "API Flask berjalan dengan baik!"})

# Endpoint 2: Mengambil daftar proyek (Contoh integrasi Supabase)
@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        # Mengambil data dari tabel 'projects' yang is_published = true
        response = supabase.table('projects').select('*').eq('is_published', True).execute()
        return jsonify({"status": "sukses", "data": response.data}), 200
    except Exception as e:
        return jsonify({"status": "error", "pesan": str(e)}), 500

if __name__ == '__main__':
    # Jalankan server di port 5000
    app.run(debug=True, port=5000)