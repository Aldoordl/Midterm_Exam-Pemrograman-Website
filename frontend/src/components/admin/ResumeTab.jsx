import { useState } from 'react';
import axios from 'axios';
import { IconEdit, IconTrash, IconBriefcase } from '../Icons';
import ConfirmModal from '../ConfirmModal';
import AlertBanner from '../AlertBanner';

function ResumeTab({ resumeItems, token, onRefresh }) {
    const [isEditingResume, setIsEditingResume] = useState(false);
    const [resumeEditId, setResumeEditId] = useState(null);
    const [resumeCategoryFilter, setResumeCategoryFilter] = useState('all');
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    const initialResumeForm = {
        category: 'works',
        title: '',
        organization: '',
        period: '',
        description: '',
        badge_label: '',
        badge_color: 'blue'
    };
    const [resumeForm, setResumeForm] = useState(initialResumeForm);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResumeForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditClick = (item) => {
        setResumeForm({
            category: item.category || 'works',
            title: item.title || '',
            organization: item.organization || '',
            period: item.period || '',
            description: item.description || '',
            badge_label: item.badge_label || '',
            badge_color: item.badge_color || 'blue'
        });
        setIsEditingResume(true);
        setResumeEditId(item.id);
        setStatus({ type: '', message: '' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setResumeForm(initialResumeForm);
        setIsEditingResume(false);
        setResumeEditId(null);
        setStatus({ type: '', message: '' });
    };

    const handleSubmitResume = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: '', message: '' });

        try {
            if (isEditingResume) {
                const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/resume/${resumeEditId}`, resumeForm, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data?.status === 'error') {
                    setStatus({ type: 'error', message: res.data?.message || 'Gagal memperbarui riwayat resume.' });
                    return;
                }
                setStatus({ type: 'success', message: 'Riwayat resume berhasil diperbarui!' });
            } else {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/resume`, resumeForm, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data?.status === 'error') {
                    setStatus({ type: 'error', message: res.data?.message || 'Gagal menambahkan riwayat resume.' });
                    return;
                }
                setStatus({ type: 'success', message: 'Riwayat resume baru berhasil ditambahkan!' });
            }
            setResumeForm(initialResumeForm);
            setIsEditingResume(false);
            setResumeEditId(null);
            if (onRefresh) onRefresh();
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.response?.data?.message || 'Gagal menyimpan riwayat resume ke server.'
            });
        } finally {
            setIsSaving(false);
        }
    };

    const confirmDeleteResume = async () => {
        if (!deleteTargetId) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/resume/${deleteTargetId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatus({ type: 'success', message: 'Item resume berhasil dihapus.' });
            if (onRefresh) onRefresh();
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.response?.data?.message || err.message || 'Gagal menghapus riwayat resume.'
            });
        } finally {
            setDeleteTargetId(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Form Resume */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="space-y-0.5">
                        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <IconBriefcase className="w-4 h-4 text-gray-700" />
                            <span>{isEditingResume ? "Edit Resume Item" : "Add Resume Item"}</span>
                        </h2>
                        <p className="text-[11px] text-gray-500">
                            Kelola riwayat pendidikan, pekerjaan &amp; aktivitas, serta sertifikasi ke tabel database.
                        </p>
                    </div>
                    {isEditingResume && (
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

                <form onSubmit={handleSubmitResume} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Category *</label>
                            <select
                                name="category"
                                required
                                value={resumeForm.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none bg-white transition-all"
                            >
                                <option value="works">Works &amp; Activities</option>
                                <option value="education">Education</option>
                                <option value="certifications">Certificates</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Period *</label>
                            <input
                                type="text"
                                name="period"
                                required
                                value={resumeForm.period}
                                onChange={handleInputChange}
                                placeholder="e.g. 2024 - Present"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Badge Label</label>
                            <input
                                type="text"
                                name="badge_label"
                                value={resumeForm.badge_label}
                                onChange={handleInputChange}
                                placeholder="e.g. Work, Full-time, IPK 3.8+, Verified"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Title / Role / Degree *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={resumeForm.title}
                                onChange={handleInputChange}
                                placeholder="e.g. Lead Developer / S1 Informatika"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Organization / Company / Issuer *</label>
                            <input
                                type="text"
                                name="organization"
                                required
                                value={resumeForm.organization}
                                onChange={handleInputChange}
                                placeholder="e.g. Aura Systems / Amikom / Dicoding"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">Badge Color</label>
                            <select
                                name="badge_color"
                                value={resumeForm.badge_color}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none bg-white transition-all"
                            >
                                <option value="blue">Blue (Work / Tech)</option>
                                <option value="emerald">Emerald (Verified / Success)</option>
                                <option value="purple">Purple (Freelance / Honor)</option>
                                <option value="amber">Amber (Community / Alert)</option>
                                <option value="rose">Rose (Committee / Highlight)</option>
                                <option value="indigo">Indigo (Organization)</option>
                                <option value="gray">Gray (Neutral / Default)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            rows={3}
                            value={resumeForm.description}
                            onChange={handleInputChange}
                            placeholder="Deskripsi tugas, pencapaian, atau ringkasan kegiatan..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-end pt-1">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn-primary py-2 px-6 text-xs cursor-pointer"
                        >
                            {isSaving ? "Saving..." : (isEditingResume ? "Save Resume Changes" : "Add Resume Item")}
                        </button>
                    </div>
                </form>
            </div>

            {/* Existing Resume Items List */}
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Existing Resume Items ({resumeItems.length})
                    </h3>

                    {/* Category Filter (Matching MessagesTab segmented style) */}
                    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl border border-gray-200/80 text-xs font-semibold">
                        {[
                            { id: 'all', label: 'All', count: resumeItems.length },
                            { id: 'works', label: 'Works', count: resumeItems.filter(i => i.category === 'works' || i.category === 'work' || i.category === 'organization').length },
                            { id: 'education', label: 'Education', count: resumeItems.filter(i => i.category === 'education').length },
                            { id: 'certifications', label: 'Certificates', count: resumeItems.filter(i => i.category === 'certifications' || i.category === 'certification' || i.category === 'certificate').length }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setResumeCategoryFilter(tab.id)}
                                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                                    resumeCategoryFilter === tab.id
                                        ? 'bg-white text-gray-900 shadow-xs'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className="text-[10px] text-gray-400 font-mono ml-1">({tab.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    {resumeItems
                        .filter(item => {
                            if (resumeCategoryFilter === 'all') return true;
                            if (resumeCategoryFilter === 'works') return item.category === 'works' || item.category === 'work' || item.category === 'organization';
                            if (resumeCategoryFilter === 'education') return item.category === 'education';
                            if (resumeCategoryFilter === 'certifications') return item.category === 'certifications' || item.category === 'certification' || item.category === 'certificate';
                            return item.category === resumeCategoryFilter;
                        })
                        .map((item) => (
                            <div
                                key={item.id}
                                className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:border-gray-300 transition-colors"
                            >
                                <div className="space-y-1 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600 uppercase font-bold">
                                            {item.category}
                                        </span>
                                        <span className="text-sm font-bold text-gray-900">
                                            {item.title}
                                        </span>
                                        <span className="text-xs text-gray-400 font-mono">
                                            @ {item.organization}
                                        </span>
                                        {item.badge_label && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700">
                                                {item.badge_label}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-[11px] text-gray-400 font-mono">
                                        Period: {item.period}
                                    </div>
                                    {item.description && (
                                        <p className="text-xs text-gray-600 leading-relaxed pt-1">
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => handleEditClick(item)}
                                        className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-100 transition-colors cursor-pointer"
                                        title="Edit"
                                    >
                                        <IconEdit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteTargetId(item.id)}
                                        className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                                        title="Delete"
                                    >
                                        <IconTrash className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                    {resumeItems.length === 0 && (
                        <div className="text-center py-12 text-xs text-gray-400 font-mono border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                            No resume items found in database. Add your first item above!
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={!!deleteTargetId}
                title="Hapus Riwayat Resume"
                message="Apakah Anda yakin ingin menghapus data riwayat ini? Data akan dihapus secara permanen dari database."
                onConfirm={confirmDeleteResume}
                onCancel={() => setDeleteTargetId(null)}
            />
        </div>
    );
}

export default ResumeTab;

