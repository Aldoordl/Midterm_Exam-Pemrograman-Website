import { useState, useEffect } from 'react';
import { profileService } from '../../services';
import { IconCheck, IconUser } from '../Icons';
import AlertBanner from '../AlertBanner';

function ProfileTab({ initialProfile, token, onRefresh }) {
    const defaultState = {
        full_name: '',
        role: '',
        bio_text: '',
        resume_url: '',
        avatar_url: ''
    };

    const [profileForm, setProfileForm] = useState(defaultState);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        if (initialProfile) {
            setProfileForm({
                full_name: initialProfile.full_name || '',
                role: initialProfile.role || '',
                bio_text: initialProfile.bio_text || '',
                resume_url: initialProfile.resume_url || '',
                avatar_url: initialProfile.avatar_url || ''
            });
        }
    }, [initialProfile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: '', message: '' });

        try {
            const payload = {
                full_name: profileForm.full_name,
                role: profileForm.role,
                bio_text: profileForm.bio_text,
                resume_url: profileForm.resume_url,
                avatar_url: profileForm.avatar_url
            };

            const response = await profileService.updateAdmin(payload);

            if (response.data && response.data.status === 'success') {
                setStatus({ type: 'success', message: 'Developer profile updated successfully!' });
                if (onRefresh) onRefresh();
            } else {
                setStatus({ type: 'error', message: response.data?.message || 'Failed to save profile.' });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to save profile to server.'
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="space-y-0.5">
                        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <IconUser className="w-4 h-4 text-gray-700" />
                            <span>Profile Settings</span>
                        </h2>
                        <p className="text-[11px] text-gray-500">
                            Manage the public developer profile displayed on the main page.
                        </p>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">Profile Owner</span>
                </div>

                <AlertBanner
                    type={status.type}
                    message={status.message}
                    onClose={() => setStatus({ type: '', message: '' })}
                />

                <form onSubmit={handleSubmitProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                required
                                value={profileForm.full_name}
                                onChange={handleInputChange}
                                placeholder="e.g. Arken"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-gray-700">
                                Role / Job Title *
                            </label>
                            <input
                                type="text"
                                name="role"
                                required
                                value={profileForm.role}
                                onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                onChange={handleInputChange}
                                placeholder="https://drive.google.com/... atau link CV PDF"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:border-black outline-none transition-all mt-0.5"
                            />
                        </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn-primary py-2 px-6 text-xs cursor-pointer"
                        >
                            {isSaving ? 'Saving...' : 'Save Profile Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileTab;

