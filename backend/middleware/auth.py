import jwt
from functools import wraps
from flask import request
from config import SECRET_KEY
from utils.responses import error_response

def token_required(f):
    """
    Middleware / Decorator untuk verifikasi JSON Web Token (JWT) pada rute terproteksi.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            parts = auth_header.split(" ")
            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]

        if not token:
            return error_response("Token otorisasi diperlukan!", 401)

        try:
            # Verifikasi signature dan expiration
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user = decoded
        except jwt.ExpiredSignatureError:
            return error_response("Sesi Anda telah kedaluwarsa. Silakan login kembali.", 401)
        except jwt.InvalidTokenError:
            return error_response("Token tidak valid atau telah rusak.", 401)
        except Exception as e:
            return error_response(f"Autentikasi gagal: {str(e)}", 401)

        return f(*args, **kwargs)
    return decorated
