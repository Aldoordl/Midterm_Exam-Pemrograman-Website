import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables (baik saat dijalankan dari folder backend maupun root)
env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

# Konfigurasi Environment & CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")
SECRET_KEY = os.getenv("SECRET_KEY")

# Inisialisasi Supabase Client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Konfigurasi Swagger Specification
SWAGGER_TEMPLATE = {
    "swagger": "2.0",
    "info": {
        "title": "API Portofolio Web",
        "description": "Dokumentasi REST API arsitektural untuk manajemen portofolio dan resume",
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
