import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { IconShieldCheck, IconArrowUpRight } from '../../components/Icons';

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
            const response = await axios.post('http://127.0.0.1:5000/api/auth/login', credentials);

            if (response.data && response.data.status === 'success') {
                localStorage.setItem('admin_token', response.data.data.session.access_token);
                localStorage.setItem('admin_user', JSON.stringify(response.data.data.user));
                navigate('/admin/dashboard');
            } else {
                setError(response.data ? response.data.message : 'Invalid login credentials.');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('Cannot connect to authentication server.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="portfolio-container min-h-[70vh] flex items-center justify-center py-16">
            <div className="w-full max-w-sm space-y-6">
                {/* Header */}
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Admin Login
                    </h1>
                    <p className="text-xs text-gray-500">
                        Sign in to manage projects and read visitor inquiries.
                    </p>
                </div>

                {/* Form Card */}
                <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center gap-2">
                            <IconShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-2.5 text-xs cursor-pointer mt-2"
                        >
                            <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
                            <IconArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </form>

                    <div className="text-center pt-3 border-t border-gray-100">
                        <Link to="/" className="text-xs text-gray-500 hover:text-black transition-colors">
                            ← Return to portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
