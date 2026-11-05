import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('projects');
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // State untuk mode Edit
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const initialFormState = {
        title: '', slug: '', short_description: '', content: '', tech_stack: '', is_published: false
    };
    const [formData, setFormData] = useState(initialFormState);

    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [msgRes, projRes] = await Promise.all([
                axios.get('http://127.0.0.1:5000/api/admin/messages', { headers: { Authorization: `Bearer ${token}` } }),
                axios.get('http://127.0.0.1:5000/api/admin/projects', { headers: { Authorization: `Bearer ${token}` } })
            ]);
            if (msgRes.data.status === 'success') setMessages(msgRes.data.data);
            if (projRes.data.status === 'success') setProjects(projRes.data.data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/login');
    };

    // --- LOGIKA FORM PROYEK ---
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleEditClick = (proj) => {
        // Isi form dengan data proyek yang dipilih
        setFormData({
            title: proj.title,
            slug: proj.slug,
            short_description: proj.short_description || '',
            content: proj.content || '',
            // Ubah array kembali menjadi string dipisah koma untuk diinput
            tech_stack: proj.tech_stack ? proj.tech_stack.join(', ') : '',
            is_published: proj.is_published
        });
        setIsEditing(true);
        setEditId(proj.id);

        // Gulir halaman ke atas (ke arah form)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setFormData(initialFormState);
        setIsEditing(false);
        setEditId(null);
    };

    const handleSubmitProject = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                tech_stack: formData.tech_stack.split(',').map(tech => tech.trim())
            };

            if (isEditing) {
                // Mode Edit (PUT)
                const response = await axios.put(`http://127.0.0.1:5000/api/admin/projects/${editId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.status === 'success') {
                    alert("Data proyek berhasil diperbarui!");
                }
            } else {
                // Mode Tambah Baru (POST)
                const response = await axios.post('http://127.0.0.1:5000/api/admin/projects', payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.status === 'success') {
                    alert("Proyek baru berhasil ditambahkan!");
                }
            }

            handleCancelEdit(); // Kosongkan form dan kembalikan ke mode tambah
            fetchData(); // Refresh tabel
        } catch (error) {
            alert("Gagal menyimpan proyek: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm("Yakin ingin menghapus proyek ini?")) return;
        try {
            await axios.delete(`http://127.0.0.1:5000/api/admin/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            alert("Gagal menghapus proyek.");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Dashboard */}
            <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                    <p className="text-sm text-gray-500">Kelola portofolio dan baca pesan dari pengunjung</p>
                </div>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors">
                    Keluar (Logout)
                </button>
            </div>

            {/* Navigasi Tabs */}
            <div className="flex space-x-4 border-b pb-2">
                <button onClick={() => setActiveTab('projects')} className={`font-medium px-4 py-2 rounded-t-lg transition-colors ${activeTab === 'projects' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>Manajemen Proyek</button>
                <button onClick={() => setActiveTab('messages')} className={`font-medium px-4 py-2 rounded-t-lg transition-colors ${activeTab === 'messages' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>Pesan Masuk</button>
            </div>

            {isLoading ? <p>Memuat data...</p> : (
                <>
                    {/* TAB: MANAJEMEN PROYEK */}
                    {activeTab === 'projects' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Form Input Proyek (Kiri) */}
                            <div className="md:col-span-1 bg-white p-6 rounded-lg border shadow-sm h-fit">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">{isEditing ? "Edit Proyek" : "Tambah Proyek Baru"}</h2>
                                    {isEditing && (
                                        <button type="button" onClick={handleCancelEdit} className="text-xs text-red-500 hover:underline font-medium">Batal Edit</button>
                                    )}
                                </div>

                                <form onSubmit={handleSubmitProject} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Judul Proyek</label>
                                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full border rounded p-2 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">URL Slug</label>
                                        <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} disabled={isEditing} placeholder="contoh-proyek-saya" required className={`w-full border rounded p-2 text-sm ${isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Ringkasan Singkat</label>
                                        <textarea name="short_description" value={formData.short_description} onChange={handleInputChange} rows="2" className="w-full border rounded p-2 text-sm resize-none"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Isi Studi Kasus (Lengkap)</label>
                                        <textarea name="content" value={formData.content} onChange={handleInputChange} rows="5" className="w-full border rounded p-2 text-sm resize-none"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Tech Stack (Pisahkan koma)</label>
                                        <input type="text" name="tech_stack" value={formData.tech_stack} onChange={handleInputChange} placeholder="React, Flask, PostgreSQL" className="w-full border rounded p-2 text-sm" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleInputChange} id="publish" />
                                        <label htmlFor="publish" className="text-sm">Publikasikan Proyek Ini</label>
                                    </div>

                                    <button type="submit" className={`w-full text-white py-2 rounded font-medium text-sm transition-colors ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                        {isEditing ? "Simpan Perubahan" : "Simpan Proyek"}
                                    </button>
                                </form>
                            </div>

                            {/* Tabel Daftar Proyek (Kanan) */}
                            <div className="md:col-span-2 bg-white p-6 rounded-lg border shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Daftar Proyek Saya</h2>
                                <div className="space-y-3">
                                    {projects.map(proj => (
                                        <div key={proj.id} className={`flex justify-between items-center p-4 border rounded-md transition-colors ${editId === proj.id ? 'bg-orange-50 border-orange-200' : 'hover:bg-gray-50'}`}>
                                            <div>
                                                <h3 className="font-bold">{proj.title}</h3>
                                                <p className="text-xs text-gray-500 mb-1">/{proj.slug}</p>
                                                <span className={`text-xs px-2 py-1 rounded font-medium ${proj.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {proj.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                            <div className="flex space-x-3">
                                                <button onClick={() => handleEditClick(proj)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                                                <button onClick={() => handleDeleteProject(proj.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Hapus</button>
                                            </div>
                                        </div>
                                    ))}
                                    {projects.length === 0 && <p className="text-sm text-gray-500">Belum ada proyek.</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: PESAN MASUK */}
                    {activeTab === 'messages' && (
                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Pesan Pengunjung</h2>
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div key={msg.id} className="p-4 border rounded-md bg-gray-50">
                                        <div className="flex justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{msg.sender_name}</h3>
                                                <p className="text-xs text-blue-600">{msg.sender_email}</p>
                                            </div>
                                            <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 bg-white p-3 rounded border mt-2">{msg.message_body}</p>
                                    </div>
                                ))}
                                {messages.length === 0 && <p className="text-sm text-gray-500">Belum ada pesan.</p>}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default AdminDashboard;