def success_response(data=None, message="Berhasil", code=200, **kwargs):
    """
    Format standar respons sukses API:
    {
        "status": "success",
        "data": ...,
        "message": ...
    }
    """
    payload = {
        "status": "success",
        "data": data,
        "message": message
    }
    for key, value in kwargs.items():
        payload[key] = value
    return payload, code


def error_response(message="Terjadi kesalahan pada server", code=400, data=None):
    """
    Format standar respons error API:
    {
        "status": "error",
        "data": ...,
        "message": ...
    }
    """
    return {
        "status": "error",
        "data": data,
        "message": message
    }, code
