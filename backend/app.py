import os
import jwt
import datetime
from functools import wraps
from flask import Flask, request, redirect
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client
from flask_restful import Api, Resource
from flasgger import Swagger

load_dotenv()

app = Flask(__name__)
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")
CORS(app, origins=[FRONTEND_URL])

# ==========================================
# KONFIGURASI UMUM
# ==========================================
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Konfigurasi Flask-RESTful & Swagger
api = Api(app)

swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "API Portofolio Web",
        "description": "Dokumentasi REST API untuk manajemen portofolio dan resume",
        "version": "1.0.0"
    },
    "securityDefinitions": {
        "BearerAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Masukkan token JWT dengan format: Bearer <token>"
        }
    }
}
swagger = Swagger(app, template=swagger_template)

# Decorator untuk verifikasi JWT (Opsional, gunakan jika Anda memvalidasi token di backend)
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return {"status": "error", "message": "Token hilang!"}, 401
        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"status": "error", "message": "Token tidak valid!"}, 401
        return f(*args, **kwargs)
    return decorated

# ==========================================
# RESOURCE 1: AUTHENTICATION
# ==========================================
class AuthLogin(Resource):
    def post(self):
        """
        Login Admin
        ---
        tags:
          - Authentication
        parameters:
          - in: body
            name: body
            required: true
            schema:
              type: object
              properties:
                email:
                  type: string
                password:
                  type: string
        responses:
          200:
            description: Login berhasil mengembalikan token
        """
        data = request.json
        try:
            response = supabase.auth.sign_in_with_password({"email": data['email'], "password": data['password']})
            # Generate JWT Token manual atau gunakan token bawaan Supabase
            token = jwt.encode({
                'user': data['email'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            }, app.config['SECRET_KEY'], algorithm="HS256")
            return {"status": "success", "token": token}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 401


# ==========================================
# RESOURCE 2: PROFILE
# ==========================================
class PublicProfile(Resource):
    def get(self):
        """
        Mengambil Data Profil (Publik)
        ---
        tags:
          - Profile
        responses:
          200:
            description: Berhasil mengambil data profil utama
        """
        try:
            response = supabase.table('profiles').select('*').eq('id', 1).execute()
            if len(response.data) == 0:
                return {"status": "error", "message": "Data profil belum ada"}, 404
            return {"status": "success", "data": response.data[0]}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

class AdminProfile(Resource):
    method_decorators = [token_required]
    def post(self):
        """
        Memperbarui Data Profil (Admin)
        ---
        tags:
          - Profile
        security:
          - BearerAuth: []
        parameters:
          - in: body
            name: body
            schema:
              type: object
        responses:
          200:
            description: Profil berhasil diperbarui
        """
        try:
            data = request.json
            data['id'] = 1
            response = supabase.table('profiles').upsert(data).execute()
            return {"status": "success", "data": response.data}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500


# ==========================================
# RESOURCE 3: PROJECTS
# ==========================================
class PublicProjectList(Resource):
    def get(self):
        """
        Mengambil Daftar Proyek (Publik)
        ---
        tags:
          - Projects (Public)
        responses:
          200:
            description: Daftar proyek yang sudah published
        """
        try:
            response = supabase.table('projects').select('*').eq('is_published', True).order('created_at', desc=True).execute()
            return {"status": "success", "data": response.data}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

class PublicProjectDetail(Resource):
    def get(self, slug):
        """
        Mengambil Detail Proyek (Publik)
        ---
        tags:
          - Projects (Public)
        parameters:
          - in: path
            name: slug
            type: string
            required: true
        responses:
          200:
            description: Data detail proyek berdasarkan slug
        """
        try:
            response = supabase.table('projects').select('*').eq('slug', slug).execute()
            if len(response.data) == 0:
                return {"status": "error", "message": "Proyek tidak ditemukan"}, 404
            return {"status": "success", "data": response.data[0]}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

class AdminProjectList(Resource):
    method_decorators = [token_required]
    def get(self):
        """
        Mengambil Semua Proyek (Admin)
        ---
        tags:
          - Projects (Admin)
        security:
          - BearerAuth: []
        responses:
          200:
            description: Daftar semua proyek termasuk draft
        """
        try:
            response = supabase.table('projects').select('*').order('created_at', desc=True).execute()
            return {"status": "success", "data": response.data}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

    def post(self):
        """
        Tambah Proyek Baru
        ---
        tags:
          - Projects (Admin)
        security:
          - BearerAuth: []
        parameters:
          - in: body
            name: body
            schema:
              type: object
        responses:
          201:
            description: Proyek ditambahkan
        """
        try:
            data = request.json
            response = supabase.table('projects').insert(data).execute()
            return {"status": "success", "data": response.data}, 201
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

class AdminProjectDetail(Resource):
    method_decorators = [token_required]
    def put(self, id):
        """
        Edit Proyek
        ---
        tags:
          - Projects (Admin)
        security:
          - BearerAuth: []
        parameters:
          - in: path
            name: id
            type: string
            required: true
          - in: body
            name: body
            schema:
              type: object
        responses:
          200:
            description: Proyek diperbarui
        """
        try:
            data = request.json
            response = supabase.table('projects').update(data).eq('id', id).execute()
            return {"status": "success", "data": response.data}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

    def delete(self, id):
        """
        Hapus Proyek
        ---
        tags:
          - Projects (Admin)
        security:
          - BearerAuth: []
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: Proyek dihapus
        """
        try:
            supabase.table('projects').delete().eq('id', id).execute()
            return {"status": "success", "message": "Dihapus"}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500


# ==========================================
# RESOURCE 4: MESSAGES
# ==========================================
class PublicMessage(Resource):
    def post(self):
        """
        Kirim Pesan (Dari Pengunjung)
        ---
        tags:
          - Messages
        parameters:
          - in: body
            name: body
            schema:
              type: object
        responses:
          201:
            description: Pesan terkirim
        """
        try:
            data = request.json
            response = supabase.table('messages').insert(data).execute()
            return {"status": "success", "data": response.data}, 201
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

class AdminMessageList(Resource):
    method_decorators = [token_required]
    def get(self):
        """
        Baca Pesan (Admin)
        ---
        tags:
          - Messages
        security:
          - BearerAuth: []
        responses:
          200:
            description: Daftar pesan masuk
        """
        try:
            response = supabase.table('messages').select('*').order('created_at', desc=True).execute()
            return {"status": "success", "data": response.data}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500


# ==========================================
# RESOURCE 5: RESUME (Education, Work, Certs)
# ==========================================
class PublicResume(Resource):
    def get(self):
        """
        Ambil Semua Riwayat Resume
        ---
        tags:
          - Resume
        responses:
          200:
            description: Daftar riwayat kerja, pendidikan, sertifikasi
        """
        try:
            response = supabase.table('resume_items').select('*').order('created_at', desc=True).execute()
            return {"status": "success", "data": response.data}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

class AdminResumeList(Resource):
    method_decorators = [token_required]
    def post(self):
        """
        Tambah Riwayat Baru
        ---
        tags:
          - Resume
        security:
          - BearerAuth: []
        parameters:
          - in: body
            name: body
            schema:
              type: object
        responses:
          201:
            description: Riwayat ditambahkan
        """
        try:
            data = request.json
            response = supabase.table('resume_items').insert(data).execute()
            return {"status": "success", "data": response.data}, 201
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

class AdminResumeDetail(Resource):
    method_decorators = [token_required]
    def put(self, id):
        """
        Edit Riwayat
        ---
        tags:
          - Resume
        security:
          - BearerAuth: []
        parameters:
          - in: path
            name: id
            type: string
            required: true
          - in: body
            name: body
            schema:
              type: object
        responses:
          200:
            description: Riwayat diperbarui
        """
        try:
            data = request.json
            response = supabase.table('resume_items').update(data).eq('id', id).execute()
            return {"status": "success", "data": response.data}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

    def delete(self, id):
        """
        Hapus Riwayat
        ---
        tags:
          - Resume
        security:
          - BearerAuth: []
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: Riwayat dihapus
        """
        try:
            supabase.table('resume_items').delete().eq('id', id).execute()
            return {"status": "success", "message": "Dihapus"}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500


# ==========================================
# REGISTRASI ROUTING API
# ==========================================

# Untuk sementara index diarahkan ke apidocs (Swagger)
@app.route('/')
def index():
    return redirect('/apidocs')

# Auth
api.add_resource(AuthLogin, '/api/login')

# Profile
api.add_resource(PublicProfile, '/api/profile')
api.add_resource(AdminProfile, '/api/admin/profile')

# Projects
api.add_resource(PublicProjectList, '/api/projects')
api.add_resource(PublicProjectDetail, '/api/projects/<string:slug>')
api.add_resource(AdminProjectList, '/api/admin/projects')
api.add_resource(AdminProjectDetail, '/api/admin/projects/<string:id>')

# Messages
api.add_resource(PublicMessage, '/api/messages')
api.add_resource(AdminMessageList, '/api/admin/messages')

# Resume
api.add_resource(PublicResume, '/api/resume')
api.add_resource(AdminResumeList, '/api/admin/resume')
api.add_resource(AdminResumeDetail, '/api/admin/resume/<string:id>')


if __name__ == '__main__':
    app.run(debug=True)