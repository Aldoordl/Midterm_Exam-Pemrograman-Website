import { useState } from 'react';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
        sender_name: '',
        sender_email: '',
        message_body: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/messages', formData);

            if (response.data.status === 'success') {
                setStatus({ type: 'success', message: 'Pesan Anda berhasil dikirim! Saya akan segera membalasnya.' });
                // Kosongkan form setelah sukses
                setFormData({ sender_name: '', sender_email: '', message_body: '' });
            } else {
                setStatus({ type: 'error', message: response.data.message || 'Gagal mengirim pesan.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Terjadi kesalahan pada server. Coba lagi nanti.' });
            console.error("Error sending message:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 border rounded-lg shadow-sm mt-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hubungi Saya</h1>
            <p className="text-gray-600 mb-8">Punya tawaran proyek atau peluang kerja? Jangan ragu untuk mengirim pesan melalui form di bawah ini.</p>

            {/* Menampilkan Notifikasi Sukses/Error */}
            {status.message && (
                <div className={`p-4 mb-6 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="sender_name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                        type="text"
                        id="sender_name"
                        name="sender_name"
                        value={formData.sender_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label htmlFor="sender_email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="sender_email"
                        name="sender_email"
                        value={formData.sender_email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="message_body" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                    <textarea
                        id="message_body"
                        name="message_body"
                        value={formData.message_body}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                        placeholder="Halo, saya tertarik untuk mendiskusikan..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
            </form>
        </div>
    );
}

export default Contact;