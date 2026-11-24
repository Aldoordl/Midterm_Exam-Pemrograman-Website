def success_response(data=None, message="Success", code=200, **kwargs):
    """
    Standard API success response envelope:
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


def error_response(message="An internal server error occurred", code=400, data=None):
    """
    Standard API error response envelope:
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
