import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
    IconFolder,
    IconFolderCheck,
    IconMessageSquare,
    IconEdit,
    IconTrash,
    IconArrowUpRight
} from '../../components/Icons';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('projects');
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const initialFormState = {
        title: '',
        slug: '',
        short_description: '',
        content: '',
        tech_stack: '',
        image_url: '',
        github_url: '',
        live_url: '',
        is_published: false
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleEditClick = (proj) => {
        setFormData({
            title: proj.title,
            slug: proj.slug,
            short_description: proj.short_description || '',
            content: proj.content || '',
            tech_stack: proj.tech_stack ? proj.tech_stack.join(', ') : '',
            image_url: proj.image_url || '',
            github_url: proj.github_url || '',
            live_url: proj.live_url || '',
            is_published: proj.is_published
        });
        setIsEditing(true);
        setEditId(proj.id);
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
                tech_stack: formData.tech_stack.split(',').map(tech => tech.trim()).filter(Boolean)
            };

            if (isEditing) {
                const response = await axios.put(`http://127.0.0.1:5000/api/admin/projects/${editId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.status === 'success') {
                    alert("Proyek berhasil diperbarui.");
                }
            } else {
                const response = await axios.post('http://127.0.0.1:5000/api/admin/projects', payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.status === 'success') {
                    alert("Proyek baru berhasil ditambahkan.");
                }
            }

            handleCancelEdit();
            fetchData();
        } catch (error) {
            alert("Gagal menyimpan proyek: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm("Hapus proyek ini?")) return;
        try {
            await axios.delete(`http://127.0.0.1:5000/api/admin/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch {
            alert("Gagal menghapus proyek.");
        }
    };

    return (
        <div className="portfolio-container py-10 space-y-8">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-sm font-bold text-gray-900 hover:text-black">
                        ← View Site
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-xs text-gray-500 font-mono">Dashboard</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-xs font-medium text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                    Sign Out
                </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <div className="text-xs text-gray-400">Total Projects</div>
                    <div className="text-xl font-bold text-gray-900 mt-1">{projects.length}</div>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <div className="text-xs text-gray-400">Published</div>
                    <div className="text-xl font-bold text-emerald-600 mt-1">
                        {projects.filter(p => p.is_published).length}
                    </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <div className="text-xs text-gray-400">Inquiries</div>
                    <div className="text-xl font-bold text-gray-900 mt-1">{messages.length}</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeTab === 'projects'
                            ? 'bg-[#111827] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Projects Table
                </button>
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeTab === 'messages'
                            ? 'bg-[#111827] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Messages ({messages.length})
                </button>
            </div>

            {/* Tab: Projects */}
            {activeTab === 'projects' && (
                <div className="space-y-8">
                    {/* Add / Edit Form */}
                    <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4 shadow-sm">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                            <h2 className="text-sm font-bold text-gray-900">
                                {isEditing ? "Edit Project" : "Add New Project"}
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={handleCancelEdit}
                                    className="text-xs text-red-500 hover:underline cursor-pointer"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmitProject} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="block text-[11px] font-medium text-gray-600">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-black outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[11px] font-medium text-gray-600">Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        required
                                        disabled={isEditing}
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        placeholder="project-slug"
                                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-black outline-none disabled:bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="block text-[11px] font-medium text-gray-600">Image URL</label>
                                    <input
                                        type="url"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-black outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[11px] font-medium text-gray-600">GitHub URL</label>
                                    <input
                                        type="url"
                                        name="github_url"
                                        value={formData.github_url}
                                        onChange={handleInputChange}
                                        placeholder="https://github.com/..."
                                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-black outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[11px] font-medium text-gray-600">Live URL</label>
                                    <input
                                        type="url"
                                        name="live_url"
                                        value={formData.live_url}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-black outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-[11px] font-medium text-gray-600">Short Description</label>
                                <textarea
                                    name="short_description"
                                    rows={2}
                                    value={formData.short_description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-black outline-none resize-none"
                                ></textarea>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-[11px] font-medium text-gray-600">Full Content</label>
                                <textarea
                                    name="content"
                                    rows={4}
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-black outline-none resize-none"
                                ></textarea>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-[11px] font-medium text-gray-600">Tech Stack (comma separated)</label>
                                <input
                                    type="text"
                                    name="tech_stack"
                                    value={formData.tech_stack}
                                    onChange={handleInputChange}
                                    placeholder="React, Flask, PostgreSQL"
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-black outline-none"
                                />
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer pt-1">
                                <input
                                    type="checkbox"
                                    name="is_published"
                                    checked={formData.is_published}
                                    onChange={handleInputChange}
                                    className="rounded border-gray-300 text-black focus:ring-0"
                                />
                                <span className="text-xs text-gray-700 font-medium">Publish to portfolio</span>
                            </label>

                            <button
                                type="submit"
                                className="btn-primary text-xs py-2 px-5 mt-2 cursor-pointer"
                            >
                                {isEditing ? "Save Changes" : "Create Project"}
                            </button>
                        </form>
                    </div>

                    {/* Existing Project List */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Existing Projects ({projects.length})
                        </h3>

                        {projects.map((proj) => (
                            <div
                                key={proj.id}
                                className="p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-4"
                            >
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-900">{proj.title}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${proj.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {proj.is_published ? 'Live' : 'Draft'}
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-gray-400 font-mono">/{proj.slug}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditClick(proj)}
                                        className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-100 transition-colors cursor-pointer"
                                        title="Edit"
                                    >
                                        <IconEdit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProject(proj.id)}
                                        className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                                        title="Delete"
                                    >
                                        <IconTrash className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab: Messages */}
            {activeTab === 'messages' && (
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Inquiries ({messages.length})
                    </h3>

                    {messages.map((msg) => (
                        <div key={msg.id} className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-gray-900">{msg.sender_name} ({msg.sender_email})</span>
                                <span className="text-gray-400 font-mono text-[10px]">
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {msg.message_body}
                            </p>
                        </div>
                    ))}

                    {messages.length === 0 && (
                        <div className="text-center py-12 text-xs text-gray-400 font-mono">
                            No messages received yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
