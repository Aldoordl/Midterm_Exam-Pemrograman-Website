from flask import request
from flask_restful import Resource
from config import supabase
from middleware.auth import token_required
from utils.responses import success_response, error_response

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
            return success_response(data=response.data, message="Riwayat resume berhasil diambil")
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
            data = request.json or {}
            response = supabase.table('resume_items').insert(data).execute()
            return success_response(data=response.data, message="Riwayat resume berhasil ditambahkan", code=201)
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
            data = request.json or {}
            response = supabase.table('resume_items').update(data).eq('id', id).execute()
            return success_response(data=response.data, message="Riwayat resume berhasil diperbarui")
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
            return success_response(data=response.data, message="Riwayat resume berhasil dihapus")
        except Exception as e:
            return error_response(str(e), 500)
