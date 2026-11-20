import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    IconSend,
    IconCheck
} from '../components/Icons';

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
            const payload = {
                ...formData,
                is_read: false
            };
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/messages`, payload);

            if (response.data && response.data.status === 'success') {
                setStatus({ type: 'success', message: 'Your message has been sent successfully! I will reply soon.' });
                setFormData({ sender_name: '', sender_email: '', message_body: '' });
            } else {
                setStatus({ type: 'error', message: response.data?.message || 'Failed to submit message.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'Unable to reach backend server. Please check your connection.' });
        } finally {
            setIsSubmitting(false);
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
                        ← BACK TO HOME
                    </Link>
                    <span className="tracking-widest">SEC_02 // INQUIRY FORM</span>
                    <span>ONLINE</span>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                <div className="portfolio-container py-12 space-y-10">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Get in touch
                        </h1>
                        <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
                            I'm always interested in exploring new opportunities, collaborating on exciting projects, or just chatting about software design and engineering.
                        </p>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">Email</div>
                            <div className="text-xs font-semibold text-gray-800 mt-1">developer@example.com</div>
                        </div>

                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">Location</div>
                            <div className="text-xs font-semibold text-gray-800 mt-1">Yogyakarta, ID (Remote)</div>
                        </div>

                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <div className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">Response</div>
                            <div className="text-xs font-semibold text-gray-800 mt-1">&lt; 24 Hours Reply</div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white space-y-6 shadow-sm">
                        <h2 className="text-base font-bold text-gray-900">
                            Send a Direct Message
                        </h2>

                        {status.message && (
                            <div className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${status.type === 'success'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                                }`}>
                                <IconCheck className="w-4 h-4 text-emerald-600" />
                                <span>{status.message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-gray-700">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="sender_name"
                                    required
                                    value={formData.sender_name}
                                    onChange={handleChange}
                                    placeholder="Alex Morgan"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs focus:border-black outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="sender_email"
                                    required
                                    value={formData.sender_email}
                                    onChange={handleChange}
                                    placeholder="alex@example.com"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs focus:border-black outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    name="message_body"
                                    required
                                    rows={5}
                                    value={formData.message_body}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project, timeline, or inquiry..."
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs focus:border-black outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary w-full py-2.5 text-xs cursor-pointer"
                            >
                                <span>{isSubmitting ? 'Sending Message...' : 'SendMessage'}</span>
                                <IconSend className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
