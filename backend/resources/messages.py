from flask import request
from flask_restful import Resource
from config import supabase
from middleware.auth import token_required
from middleware.rate_limit import rate_limit
from utils.responses import success_response, error_response
from utils.validators import MessageCreateSchema, validate_payload

class PublicMessage(Resource):
    @rate_limit(limit=5, window_seconds=60)
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
            raw_data = request.json or {}

            # Proteksi Honeypot Anti-Spam: jika field _gotcha terisi, buang tanpa simpan (silent discard)
            if raw_data.get('_gotcha'):
                return success_response(message="Message sent successfully", code=201)

            # Validasi & Sanitasi Payload
            cleaned_data, error_msg = validate_payload(MessageCreateSchema, raw_data)
            if error_msg:
                return error_response(error_msg, 400)

            cleaned_data['is_read'] = False
            response = supabase.table('messages').insert(cleaned_data, returning="minimal").execute()
            return success_response(data=response.data, message="Message sent successfully", code=201)
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
            return success_response(data=response.data, message="Message list fetched successfully")
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
                    "Failed to update message status in Supabase (0 rows updated). Ensure RLS UPDATE policy is active on 'messages' table.",
                    400
                )
            return success_response(data=response.data, message="Message status updated successfully")
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
            return success_response(data=response.data, message="Message deleted successfully")
        except Exception as e:
            return error_response(str(e), 500)
