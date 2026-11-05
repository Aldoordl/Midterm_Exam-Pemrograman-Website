import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Mengirim kredensial ke endpoint Flask (akan kita buat setelah ini)
            const response = await axios.post('http://127.0.0.1:5000/api/auth/login', credentials);

            if (response.data.status === 'success') {
                // 1. Simpan Token JWT dan data user ke localStorage
                localStorage.setItem('admin_token', response.data.data.session.access_token);
                localStorage.setItem('admin_user', JSON.stringify(response.data.data.user));

                // 2. Arahkan paksa ke halaman Dashboard Admin
                navigate('/admin/dashboard');
            } else {
                setError(response.data.message || 'Login gagal. Periksa kembali kredensial Anda.');
            }
        } catch (err) {
            // Menangani error dari response backend (misal: 401 Unauthorized)
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('Tidak dapat terhubung ke server.');
            }
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 border rounded-lg shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-sm text-gray-500 mt-2">Masuk untuk mengelola portofolio Anda</p>
                </div>

                {/* Notifikasi Error */}
                {error && (
                    <div className="bg-red-50 text-red-800 border border-red-200 p-3 rounded-md mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
                            placeholder="admin@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2.5 px-4 rounded-md font-medium text-white transition-colors ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black'}`}
                    >
                        {isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;