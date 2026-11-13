import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { IconShieldCheck, IconArrowUpRight } from '../../components/Icons';

function Login() {
    const token = localStorage.getItem('admin_token');

    // Jika sudah login, redirect langsung ke admin dashboard
    if (token) {
        return <Navigate to="/admin/dashboard" replace />;
    }

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
            const response = await axios.post(`${import.meta.env.BE_API_URL}/api/login`, credentials);

            if (response.data && response.data.status === 'success') {
                localStorage.setItem('admin_token', response.data.token);
                localStorage.setItem('admin_user', JSON.stringify({ email: credentials.email }));
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
        <div className="py-12">
            <div className="architect-frame max-w-md">
                {/* Corner crosshairs (+) */}
                <span className="crosshair -top-1.75 -left-1.75">+</span>
                <span className="crosshair -top-1.75 -right-1.75">+</span>
                <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                {/* Top Architectural Drafting Scale */}
                <div className="relative border-b border-gray-100 px-6 py-2 flex items-center justify-between text-[10px] text-gray-400 font-mono select-none">
                    <Link to="/" className="hover:text-black transition-colors">
                        ← PORTFOLIO
                    </Link>
                    <span className="tracking-widest">AUTH // PORTAL</span>
                    <span>SECURE</span>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                <div className="p-8 sm:p-10 space-y-6">
                    <div className="text-center space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Admin Login
                        </h1>
                        <p className="text-xs text-gray-500">
                            Sign in to manage projects and read visitor inquiries.
                        </p>
                    </div>

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

