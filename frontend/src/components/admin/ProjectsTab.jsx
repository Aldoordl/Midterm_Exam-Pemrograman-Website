import { useState } from 'react';
import axios from 'axios';
import { IconEdit, IconTrash, IconFolder, IconFolderCheck } from '../Icons';
import ConfirmModal from '../ConfirmModal';
import AlertBanner from '../AlertBanner';

function ProjectsTab({ projects, token, onRefresh }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [deleteTargetId, setDeleteTargetId] = useState(null);

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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleEditClick = (proj) => {
        setFormData({
            title: proj.title || '',
            slug: proj.slug || '',
            short_description: proj.short_description || '',
            content: proj.content || '',
            tech_stack: proj.tech_stack ? proj.tech_stack.join(', ') : '',
            image_url: proj.image_url || '',
            github_url: proj.github_url || '',
            live_url: proj.live_url || '',
            is_published: proj.is_published || false
        });
        setIsEditing(true);
        setEditId(proj.id);
        setStatus({ type: '', message: '' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setFormData(initialFormState);
        setIsEditing(false);
        setEditId(null);
        setStatus({ type: '', message: '' });
    };

    const handleSubmitProject = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: '', message: '' });

        try {
            const payload = {
                ...formData,
                tech_stack: formData.tech_stack
                    .split(',')
                    .map(tech => tech.trim())
                    .filter(Boolean)
            };

            if (isEditing) {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/projects/${editId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data?.status === 'error') {
                    setStatus({ type: 'error', message: response.data?.message || 'Gagal memperbarui proyek.' });
                    return;
                }
                setStatus({ type: 'success', message: 'Proyek berhasil diperbarui!' });
            } else {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/projects`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data?.status === 'error') {
                    setStatus({ type: 'error', message: response.data?.message || 'Gagal menambahkan proyek.' });
                    return;
                }
                setStatus({ type: 'success', message: 'Proyek baru berhasil ditambahkan!' });
            }

            setFormData(initialFormState);
            setIsEditing(false);
            setEditId(null);
            if (onRefresh) onRefresh();
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Gagal menyimpan proyek.'
            });
        } finally {
            setIsSaving(false);
        }
    };

    const confirmDeleteProject = async () => {
        if (!deleteTargetId) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/projects/${deleteTargetId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatus({ type: 'success', message: 'Proyek berhasil dihapus.' });
            if (onRefresh) onRefresh();
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || error.message || 'Gagal menghapus proyek.'
            });
        } finally {
            setDeleteTargetId(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Form Project */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="space-y-0.5">
                        <h2 className="text-sm font-bold text-gray-900 flex item-center gap-2">
                            <IconFolderCheck className="w-4 h-4 text-gray-700" />
                            <span>{isEditing ? "Edit Project" : "Add New Project"}</span>
                        </h2>
                        <p className="text-[11px] text-gray-500">
                            Kelola portofolio proyek yang akan dipublikasikan ke halaman utama.
                        </p>
                    </div>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="text-xs text-red-500 hover:underline cursor-pointer"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

                <AlertBanner
                    type={status.type}
                    message={status.message}
                    onClose={() => setStatus({ type: '', message: '' })}
                />

                <form onSubmit={handleSubmitProject} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Title *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="My Awesome Project"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Slug *</label>
                            <input
                                type="text"
                                name="slug"
                                required
                                disabled={isEditing}
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder="my-awesome-project"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none disabled:bg-gray-50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Image URL</label>
                            <input
                                type="url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleInputChange}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">GitHub URL</label>
                            <input
                                type="url"
                                name="github_url"
                                value={formData.github_url}
                                onChange={handleInputChange}
                                placeholder="https://github.com/..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Live Demo URL</label>
                            <input
                                type="url"
                                name="live_url"
                                value={formData.live_url}
                                onChange={handleInputChange}
                                placeholder="https://..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-gray-700">Tech Stack (Dipisah koma)</label>
                        <input
                            type="text"
                            name="tech_stack"
                            value={formData.tech_stack}
                            onChange={handleInputChange}
                            placeholder="React, TailwindCSS, Flask, PostgreSQL"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-gray-700">Short Description</label>
                        <textarea
                            name="short_description"
                            rows={2}
                            value={formData.short_description}
                            onChange={handleInputChange}
                            placeholder="Ringkasan singkat proyek yang tampil di card..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-gray-700">Full Content / Story</label>
                        <textarea
                            name="content"
                            rows={4}
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Detail penjelasan proyek, fitur utama, dan solusi teknis..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                name="is_published"
                                checked={formData.is_published}
                                onChange={handleInputChange}
                                className="rounded text-black focus:ring-black accent-black w-3.5 h-3.5"
                            />
                            <span className="text-xs text-gray-700 font-medium">Publish immediately (Live)</span>
                        </label>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn-primary py-2 px-6 text-xs cursor-pointer"
                        >
                            {isSaving ? "Saving..." : (isEditing ? "Save Changes" : "Create Project")}
                        </button>
                    </div>
                </form>
            </div>

            {/* Existing Project List */}
            <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Existing Projects ({projects.length})
                </h3>

                <div className="space-y-2">
                    {projects.map((proj) => (
                        <div
                            key={proj.id}
                            className="p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-4 hover:border-gray-300 transition-colors"
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
                                    onClick={() => setDeleteTargetId(proj.id)}
                                    className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                                    title="Delete"
                                >
                                    <IconTrash className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {projects.length === 0 && (
                        <div className="text-center py-12 text-xs text-gray-400 font-mono border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                            No projects created yet. Add your first project above!
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={!!deleteTargetId}
                title="Hapus Proyek"
                message="Apakah Anda yakin ingin menghapus proyek ini? Proyek akan dihapus secara permanen dari portofolio."
                onConfirm={confirmDeleteProject}
                onCancel={() => setDeleteTargetId(null)}
            />
        </div>
    );
}

export default ProjectsTab;

