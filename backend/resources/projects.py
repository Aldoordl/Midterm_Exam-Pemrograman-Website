from flask import request
from flask_restful import Resource
from config import supabase
from middleware.auth import token_required
from utils.responses import success_response, error_response
from utils.validators import ProjectSchema, validate_payload

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
            return success_response(data=response.data, message="Daftar proyek berhasil diambil")
        except Exception as e:
            return error_response(str(e), 500)

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
            if not response.data:
                return error_response("Proyek tidak ditemukan", 404)
            return success_response(data=response.data[0], message="Detail proyek berhasil diambil")
        except Exception as e:
            return error_response(str(e), 500)

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
            return success_response(data=response.data, message="Semua proyek berhasil diambil")
        except Exception as e:
            return error_response(str(e), 500)

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
            description: Proyek berhasil ditambahkan
        """
        try:
            raw_data = request.json or {}
            cleaned_data, error_msg = validate_payload(ProjectSchema, raw_data)
            if error_msg:
                return error_response(error_msg, 400)

            response = supabase.table('projects').insert(cleaned_data).execute()
            return success_response(data=response.data, message="Proyek berhasil ditambahkan", code=201)
        except Exception as e:
            return error_response(str(e), 500)

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
            description: Proyek berhasil diperbarui
        """
        try:
            raw_data = request.json or {}
            cleaned_data, error_msg = validate_payload(ProjectSchema, raw_data)
            if error_msg:
                return error_response(error_msg, 400)

            response = supabase.table('projects').update(cleaned_data).eq('id', id).execute()
            return success_response(data=response.data, message="Proyek berhasil diperbarui")
        except Exception as e:
            return error_response(str(e), 500)

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
            description: Proyek berhasil dihapus
        """
        try:
            response = supabase.table('projects').delete().eq('id', id).execute()
            return success_response(data=response.data, message="Proyek berhasil dihapus")
        except Exception as e:
            return error_response(str(e), 500)
