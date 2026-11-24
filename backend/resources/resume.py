from flask import request
from flask_restful import Resource
from config import supabase
from middleware.auth import token_required
from utils.responses import success_response, error_response
from utils.validators import ResumeItemSchema, validate_payload

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
            return success_response(data=response.data, message="Resume items fetched successfully")
        except Exception as e:
            return error_response(str(e), 500)

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
            raw_data = request.json or {}
            cleaned_data, error_msg = validate_payload(ResumeItemSchema, raw_data)
            if error_msg:
                return error_response(error_msg, 400)

            response = supabase.table('resume_items').insert(cleaned_data).execute()
            return success_response(data=response.data, message="Resume item added successfully", code=201)
        except Exception as e:
            return error_response(str(e), 500)

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
            raw_data = request.json or {}
            cleaned_data, error_msg = validate_payload(ResumeItemSchema, raw_data)
            if error_msg:
                return error_response(error_msg, 400)

            response = supabase.table('resume_items').update(cleaned_data).eq('id', id).execute()
            return success_response(data=response.data, message="Resume item updated successfully")
        except Exception as e:
            return error_response(str(e), 500)

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
            response = supabase.table('resume_items').delete().eq('id', id).execute()
            return success_response(data=response.data, message="Resume item deleted successfully")
        except Exception as e:
            return error_response(str(e), 500)
