import datetime
import jwt
from flask import request
from flask_restful import Resource
from config import supabase, SECRET_KEY
from utils.responses import success_response, error_response

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
            description: Login berhasil mengembalikan token JWT
        """
        data = request.json or {}
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return error_response("Email dan password wajib diisi", 400)

        try:
            supabase.auth.sign_in_with_password({"email": email, "password": password})
            # Generate JWT Token dengan masa berlaku 7 hari
            token = jwt.encode({
                'user': email,
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7)
            }, SECRET_KEY, algorithm="HS256")

            token_data = {
                "token": token,
                "expires_in": "7 days"
            }
            # Mengembalikan format standar dengan backward compatibility (token level atas)
            return success_response(
                data=token_data,
                message="Login berhasil",
                token=token,
                expires_in="7 days"
            )
        except Exception as e:
            return error_response(str(e), 401)
