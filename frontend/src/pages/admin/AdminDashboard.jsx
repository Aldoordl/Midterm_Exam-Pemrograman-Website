import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ProjectsTab from '../../components/admin/ProjectsTab';
import ResumeTab from '../../components/admin/ResumeTab';
import ProfileTab from '../../components/admin/ProfileTab';
import MessagesTab from '../../components/admin/MessagesTab';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('projects');
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [resumeItems, setResumeItems] = useState([]);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        fetchData();
        fetchProfile();
        fetchResume();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [msgRes, projRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/messages`, { headers: { Authorization: `Bearer ${token}` } }).catch(err => {
                    console.error("Gagal mengambil pesan:", err);
                    return { data: { status: 'error', data: [] } };
                }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/projects`, { headers: { Authorization: `Bearer ${token}` } }).catch(err => {
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
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`);
            if (res.data && res.data.status === 'success' && res.data.data) {
                setProfile(res.data.data);
            }
        } catch {
            // Profil belum dibuat / 404
        }
    };

    const fetchResume = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resume`);
            if (res.data && res.data.status === 'success' && Array.isArray(res.data.data)) {
                setResumeItems(res.data.data);
            }
        } catch (err) {
            console.error("Gagal mengambil data resume:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/login');
    };

    const unreadMessagesCount = messages.filter(m => m.is_read !== true).length;

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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 font-mono">TOTAL PROJECTS</div>
                            <div className="text-xl font-bold text-gray-900 mt-1">{projects.length}</div>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 font-mono">RESUME ITEMS</div>
                            <div className="text-xl font-bold text-blue-600 mt-1">{resumeItems.length}</div>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 font-mono">PUBLISHED</div>
                            <div className="text-xl font-bold text-emerald-600 mt-1">
                                {projects.filter(p => p.is_published).length}
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 font-mono">MESSAGES</div>
                            <div className="flex items-baseline gap-2 mt-1">
                                <div className="text-xl font-bold text-gray-900">{messages.length}</div>
                                {unreadMessagesCount > 0 && (
                                    <span className="text-[11px] text-gray-500 font-mono">
                                        ({unreadMessagesCount} unread)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2">
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
                            onClick={() => setActiveTab('resume')}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeTab === 'resume'
                                ? 'bg-[#111827] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Resume / Journey
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
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'messages'
                                ? 'bg-[#111827] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <span>Messages</span>
                            {unreadMessagesCount > 0 && (
                                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                                    activeTab === 'messages' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
                                }`}>
                                    {unreadMessagesCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Tab Panels */}
                    {activeTab === 'projects' && (
                        <ProjectsTab
                            projects={projects}
                            token={token}
                            onRefresh={fetchData}
                        />
                    )}

                    {activeTab === 'resume' && (
                        <ResumeTab
                            resumeItems={resumeItems}
                            token={token}
                            onRefresh={fetchResume}
                        />
                    )}

                    {activeTab === 'profile' && (
                        <ProfileTab
                            initialProfile={profile}
                            token={token}
                            onRefresh={fetchProfile}
                        />
                    )}

                    {activeTab === 'messages' && (
                        <MessagesTab
                            messages={messages}
                            token={token}
                            onRefresh={fetchData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
