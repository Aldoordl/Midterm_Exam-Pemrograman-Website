import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    // Mengambil daftar pesan pengunjung dari backend
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/admin/messages', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                if (res.data.status === 'success') {
                    setMessages(res.data.data);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Gagal mengambil pesan:", err);
                setIsLoading(false);
            });
    }, [token]);

    const handleLogout = () => {
        // Hapus sesi login dari browser
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/login');
    };

    return (
        <div className="space-y-8">
            {/* Header Dashboard */}
            <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                    <p className="text-sm text-gray-500">Kelola portofolio dan baca pesan dari pengunjung</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
                >
                    Keluar (Logout)
                </button>
            </div>

            {/* Tabel Pesan Masuk */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Pesan Masuk</h2>

                {isLoading ? (
                    <p className="text-gray-500">Memuat pesan...</p>
                ) : messages.length === 0 ? (
                    <p className="text-gray-500">Belum ada pesan yang masuk.</p>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className="p-4 border rounded-md bg-gray-50">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{msg.sender_name}</h3>
                                        <p className="text-xs text-blue-600">{msg.sender_email}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(msg.created_at).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 bg-white p-3 rounded border mt-2">
                                    {msg.message_body}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;