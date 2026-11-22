import os
import sys

# Guard sys.path: Memastikan direktori backend selalu menjadi prioritas utama pencarian modul (lokal & Vercel Serverless)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flasgger import Swagger

from config import FRONTEND_URL, SECRET_KEY, SWAGGER_TEMPLATE
from resources.auth import AuthLogin
from resources.profile import PublicProfile, AdminProfile
from resources.projects import PublicProjectList, PublicProjectDetail, AdminProjectList, AdminProjectDetail
from resources.messages import PublicMessage, AdminMessageList, AdminMessageDetail
from resources.resume import PublicResume, AdminResumeList, AdminResumeDetail

# Inisialisasi Aplikasi Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY

# Konfigurasi Cross-Origin Resource Sharing (CORS)
CORS(app, origins=[FRONTEND_URL])

# Inisialisasi API RESTful & Flasgger Swagger
api = Api(app)
swagger = Swagger(app, template=SWAGGER_TEMPLATE)

# ==========================================
# REGISTRASI ROUTING RESTful API
# ==========================================

# 1. Autentikasi
api.add_resource(AuthLogin, '/api/login')

# 2. Profil
api.add_resource(PublicProfile, '/api/profile')
api.add_resource(AdminProfile, '/api/admin/profile')

# 3. Proyek
api.add_resource(PublicProjectList, '/api/projects')
api.add_resource(PublicProjectDetail, '/api/projects/<string:slug>')
api.add_resource(AdminProjectList, '/api/admin/projects')
api.add_resource(AdminProjectDetail, '/api/admin/projects/<string:id>')

# 4. Pesan / Kontak Masuk
api.add_resource(PublicMessage, '/api/messages')
api.add_resource(AdminMessageList, '/api/admin/messages')
api.add_resource(AdminMessageDetail, '/api/admin/messages/<string:id>')

# 5. Riwayat / Resume
api.add_resource(PublicResume, '/api/resume')
api.add_resource(AdminResumeList, '/api/admin/resume')
api.add_resource(AdminResumeDetail, '/api/admin/resume/<string:id>')


if __name__ == '__main__':
    app.run(debug=True)
