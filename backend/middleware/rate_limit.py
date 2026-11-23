import time
from functools import wraps
from threading import Lock
from flask import request
from utils.responses import error_response

# In-memory sliding window rate limiter
_rate_limit_records = {}
_lock = Lock()

def rate_limit(limit=10, window_seconds=60):
    """
    Decorator untuk membatasi jumlah request per IP address dalam rentang waktu tertentu.
    - limit: Jumlah maksimal request yang diizinkan dalam jendela waktu.
    - window_seconds: Durasi jendela waktu dalam detik.
    """
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            # Ambil alamat IP klien (mendukung proxy reverse / X-Forwarded-For)
            forwarded_for = request.headers.get('X-Forwarded-For')
            if forwarded_for:
                ip = forwarded_for.split(',')[0].strip()
            else:
                ip = request.remote_addr or 'unknown'

            endpoint_key = f"{request.path}:{ip}"
            current_time = time.time()

            with _lock:
                timestamps = _rate_limit_records.get(endpoint_key, [])
                # Bersihkan timestamp yang sudah berada di luar jendela waktu
                valid_timestamps = [t for t in timestamps if current_time - t < window_seconds]

                if len(valid_timestamps) >= limit:
                    retry_after = int(window_seconds - (current_time - valid_timestamps[0]))
                    return error_response(
                        f"Terlalu banyak permintaan (Rate limit tercapai). Silakan tunggu {max(1, retry_after)} detik sebelum mencoba kembali.",
                        429
                    )

                valid_timestamps.append(current_time)
                _rate_limit_records[endpoint_key] = valid_timestamps

                # Manajemen memori: Bersihkan record kadaluwarsa jika kapasitas > 3000 entri
                if len(_rate_limit_records) > 3000:
                    stale_keys = [k for k, v in _rate_limit_records.items() if not v or (current_time - v[-1] > window_seconds)]
                    for k in stale_keys:
                        _rate_limit_records.pop(k, None)

            return f(*args, **kwargs)
        return decorated
    return decorator
