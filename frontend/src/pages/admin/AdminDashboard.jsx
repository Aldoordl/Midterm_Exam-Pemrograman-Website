import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
    IconEdit,
    IconTrash,
    IconCheck,
    IconUser
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

    // Profile state
    const initialProfileState = {
        full_name: '',
        role: '',
        bio_text: '',
        resume_url: '',
        avatar_url: ''
    };
    const [profileForm, setProfileForm] = useState(initialProfileState);
    const [isProfileSaving, setIsProfileSaving] = useState(false);
    const [profileStatus, setProfileStatus] = useState({ type: '', message: '' });

    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        fetchData();
        fetchProfile();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [msgRes, projRes] = await Promise.all([
                axios.get('http://127.0.0.1:5000/api/admin/messages', { headers: { Authorization: `Bearer ${token}` } }).catch(err => {
                    console.error("Gagal mengambil pesan:", err);
                    return { data: { status: 'error', data: [] } };
                }),
                axios.get('http://127.0.0.1:5000/api/admin/projects', { headers: { Authorization: `Bearer ${token}` } }).catch(err => {
                    console.error("Gagal mengambil proyek:", err);
                    return { data: { status: 'error', data: [] } };
                })
            ]);
            if (msgRes.data?.status === 'success') setMessages(msgRes.data.data || []);
            if (projRes.data?.status === 'success') setProjects(projRes.data.data || []);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/profile');
            if (res.data && res.data.status === 'success' && res.data.data) {
                setProfileForm({
                    full_name: res.data.data.full_name || '',
                    role: res.data.data.role || '',
                    bio_text: res.data.data.bio_text || '',
                    resume_url: res.data.data.resume_url || '',
                    avatar_url: res.data.data.avatar_url || ''
                });
            }
        } catch {
            // Profil belum dibuat / 404
        }
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        setIsProfileSaving(true);
        setProfileStatus({ type: '', message: '' });

        try {
            const payload = {
                full_name: profileForm.full_name,
                role: profileForm.role,
                bio_text: profileForm.bio_text,
                resume_url: profileForm.resume_url,
                avatar_url: profileForm.avatar_url
            };
            const response = await axios.post('http://127.0.0.1:5000/api/admin/profile', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data && response.data.status === 'success') {
                setProfileStatus({ type: 'success', message: 'Profil berhasil diperbarui!' });
            } else {
                setProfileStatus({ type: 'error', message: response.data?.message || 'Gagal menyimpan profil.' });
            }
        } catch (error) {
            setProfileStatus({
                type: 'error',
                message: error.response?.data?.message || 'Gagal menyimpan profil ke server.'
            });
        } finally {
            setIsProfileSaving(false);
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
        <div className="py-6">
            <div className="architect-frame">
                {/* Corner crosshairs (+) */}
                <span className="crosshair -top-1.75 -left-1.75">+</span>
                <span className="crosshair -top-1.75 -right-1.75">+</span>
                <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                {/* Top Architectural Drafting Scale */}
                <div className="relative border-b border-gray-100 px-6 py-2 flex items-center justify-between text-[10px] text-gray-400 font-mono select-none">
                    <Link to="/" className="hover:text-black transition-colors">
                        ← VIEW SITE
                    </Link>
                    <span className="tracking-widest">ADMIN // CONSOLE</span>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                    >
                        SIGN OUT
                    </button>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                <div className="portfolio-container py-10 space-y-8">
                    {/* Quick Metrics */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 font-mono">TOTAL PROJECTS</div>
                            <div className="text-xl font-bold text-gray-900 mt-1">{projects.length}</div>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 font-mono">PUBLISHED</div>
                            <div className="text-xl font-bold text-emerald-600 mt-1">
                                {projects.filter(p => p.is_published).length}
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 font-mono">MESSAGES</div>
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
                            onClick={() => setActiveTab('profile')}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeTab === 'profile'
                                ? 'bg-[#111827] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Profile Settings
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

                    {/* Tab: Profile */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-5 shadow-sm">
                                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                                    <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <IconUser className="w-4 h-4 text-gray-700" />
                                        <span>Profile Settings</span>
                                    </h2>
                                    <p className="text-[11px] text-gray-500">
                                        Kelola profil publik pengembang yang ditampilkan pada halaman utama.
                                    </p>
                                </div>

                                {profileStatus.message && (
                                    <div className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${profileStatus.type === 'success'
                                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                        : 'bg-red-50 text-red-800 border border-red-200'
                                        }`}>
                                        <IconCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                                        <span>{profileStatus.message}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmitProfile} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-[11px] font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                required
                                                value={profileForm.full_name}
                                                onChange={handleProfileChange}
                                                placeholder="e.g. Arken"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-[11px] font-medium text-gray-700">
                                                Role / Job Title
                                            </label>
                                            <input
                                                type="text"
                                                name="role"
                                                required
                                                value={profileForm.role}
                                                onChange={handleProfileChange}
                                                placeholder="e.g. Developer & Designer"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-[11px] font-medium text-gray-700">
                                            Bio / Short Summary
                                        </label>
                                        <textarea
                                            name="bio_text"
                                            required
                                            rows={3}
                                            value={profileForm.bio_text}
                                            onChange={handleProfileChange}
                                            placeholder="Deskripsi singkat yang tampil di Hero dan About section..."
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-[11px] font-medium text-gray-700">
                                                Avatar Image URL
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-gray-100 shrink-0 flex items-center justify-center">
                                                    {profileForm.avatar_url ? (
                                                        <img
                                                            src={profileForm.avatar_url}
                                                            alt="Avatar preview"
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                        />
                                                    ) : (
                                                        <IconUser className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </div>
                                                <input
                                                    type="url"
                                                    name="avatar_url"
                                                    value={profileForm.avatar_url}
                                                    onChange={handleProfileChange}
                                                    placeholder="https://images.unsplash.com/... atau URL foto"
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-[11px] font-medium text-gray-700">
                                                Resume / CV URL
                                            </label>
                                            <input
                                                type="url"
                                                name="resume_url"
                                                value={profileForm.resume_url}
                                                onChange={handleProfileChange}
                                                placeholder="https://drive.google.com/... atau link CV PDF"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all mt-0.5"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2 flex items-center justify-end">
                                        <button
                                            type="submit"
                                            disabled={isProfileSaving}
                                            className="btn-primary py-2 px-6 text-xs cursor-pointer"
                                        >
                                            {isProfileSaving ? 'Saving...' : 'Save Profile Changes'}
                                        </button>
                                    </div>
                                </form>
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
            </div>
        </div>
    );
}

export default AdminDashboard;

