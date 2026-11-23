from flask import request
from flask_restful import Resource
from config import supabase
from middleware.auth import token_required
from utils.responses import success_response, error_response
from utils.validators import ProfileSchema, validate_payload

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
            if not response.data:
                return error_response("Data profil belum ditemukan", 404)
            return success_response(data=response.data[0], message="Profil berhasil dimuat")
        except Exception as e:
            return error_response(str(e), 500)

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
            raw_data = request.json or {}
            cleaned_data, error_msg = validate_payload(ProfileSchema, raw_data)
            if error_msg:
                return error_response(error_msg, 400)

            cleaned_data['id'] = 1
            response = supabase.table('profiles').upsert(cleaned_data).execute()
            return success_response(data=response.data, message="Profil berhasil diperbarui")
        except Exception as e:
            return error_response(str(e), 500)
