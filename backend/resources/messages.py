from flask import request
from flask_restful import Resource
from config import supabase
from middleware.auth import token_required
from utils.responses import success_response, error_response

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
            data = request.json or {}
            if 'is_read' not in data or data['is_read'] is None:
                data['is_read'] = False
            response = supabase.table('messages').insert(data).execute()
            return success_response(data=response.data, message="Pesan berhasil dikirim", code=201)
        except Exception as e:
            return error_response(str(e), 500)

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
            return success_response(data=response.data, message="Daftar pesan berhasil diambil")
        except Exception as e:
            return error_response(str(e), 500)

class AdminMessageDetail(Resource):
    method_decorators = [token_required]

    def put(self, id):
        """
        Update Status Pesan (is_read)
        ---
        tags:
          - Messages
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
            description: Status pesan berhasil diperbarui
        """
        try:
            data = request.json or {}
            response = supabase.table('messages').update(data).eq('id', str(id)).execute()
            if not response.data:
                return error_response(
                    "Gagal memperbarui status pesan di Supabase (0 baris diperbarui). Pastikan Policy RLS untuk UPDATE aktif pada tabel 'messages'.",
                    400
                )
            return success_response(data=response.data, message="Status pesan berhasil diperbarui")
        except Exception as e:
            return error_response(str(e), 500)

    def patch(self, id):
        return self.put(id)

    def delete(self, id):
        """
        Hapus Pesan
        ---
        tags:
          - Messages
        security:
          - BearerAuth: []
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: Pesan berhasil dihapus
        """
        try:
            response = supabase.table('messages').delete().eq('id', id).execute()
            return success_response(data=response.data, message="Pesan berhasil dihapus")
        except Exception as e:
            return error_response(str(e), 500)
