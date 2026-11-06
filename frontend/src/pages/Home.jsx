import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    IconArrowUpRight,
    IconGithub,
    IconExternalLink,
    IconCode,
    IconDatabase,
    IconServer,
    IconLayers,
    IconCheck,
    IconSend,
    IconSparkles
} from '../components/Icons';
import heroImg from '../assets/hero.png';

function Home() {
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Inline contact form states
    const [contactForm, setContactForm] = useState({
        sender_name: '',
        sender_email: '',
        message_body: ''
    });
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Fetch projects from backend API
        axios.get('http://127.0.0.1:5000/api/projects')
            .then((res) => {
                if (res.data && res.data.status === 'success') {
                    setProjects(res.data.data);
                }
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });

        // Optionally fetch profile
        axios.get('http://127.0.0.1:5000/api/profile')
            .then((res) => {
                if (res.data && res.data.status === 'success') {
                    setProfile(res.data.data);
                }
            })
            .catch(() => {
                // Default personal info
                setProfile({
                    full_name: 'Arkennn',
                    role: 'Developer & Designer',
                    bio_text: 'Crafting seamless experiences and robust systems. Computer Science student by day, creative thinker and aspiring developer by night.'
                });
            });
    }, []);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: '', message: '' });

        try {
            const res = await axios.post('http://127.0.0.1:5000/api/messages', contactForm);
            if (res.data && res.data.status === 'success') {
                setFormStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
                setContactForm({ sender_name: '', sender_email: '', message_body: '' });
            } else {
                setFormStatus({ type: 'error', message: res.data?.message || 'Failed to send message.' });
            }
        } catch {
            setFormStatus({ type: 'error', message: 'Unable to reach server. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fallback projects adhering strictly to the `projects` table
    const displayProjects = projects.length > 0 ? projects : [
        {
            id: 'mock-1',
            slug: 'nature-discovery-app',
            title: 'Discover The Beauty Of Nature',
            short_description: 'An interactive exploration platform for outdoor enthusiasts, featuring trail maps, scenic spot guides, and environmental logging.',
            tech_stack: ['React', 'TailwindCSS', 'Flask', 'PostgreSQL'],
            github_url: 'https://github.com',
            live_url: 'https://demo.example.com',
            image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 'mock-2',
            slug: 'dreamland-app-concept',
            title: 'Dreamland App Concept',
            short_description: 'A modern design concept engineered for creative workflows and simplified team conversations.',
            tech_stack: ['React', 'Vite', 'REST API'],
            github_url: 'https://github.com',
            live_url: 'https://demo.example.com',
            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 'mock-3',
            slug: 'minimalist-design-icons',
            title: 'Design With Icons That Stand Out',
            short_description: 'Vector asset management tool and curated design tokens for rapid web application prototyping.',
            tech_stack: ['TypeScript', 'Node.js', 'PostgreSQL'],
            github_url: 'https://github.com',
            live_url: 'https://demo.example.com',
            image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
        }
    ];

    const workExperience = [
        {
            period: '2024 - Present',
            role: 'Lead Developer & Architect',
            company: 'Aura Systems',
            badgeBg: 'bg-blue-50 text-blue-700'
        },
        {
            period: '2023 - 2024',
            role: 'Fullstack Engineer Intern',
            company: 'Tech Studio',
            badgeBg: 'bg-gray-100 text-gray-800'
        },
        {
            period: '2022 - 2023',
            role: 'Frontend Specialist',
            company: 'Campus Lab',
            badgeBg: 'bg-emerald-50 text-emerald-700'
        }
    ];

    return (
        <div className="portfolio-container pt-8 pb-16 space-y-20">
            {/* ========================================================
                1. HERO SECTION (SIMPLE & COMPACT)
               ======================================================== */}
            <section className="space-y-6 pt-4">
                {/* Circular Avatar */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
                    <img
                        // src={heroImg}
                        src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                        alt="Avatar"
                        className="w-full h-full object-cover grayscale contrast-110"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {/* Main Heading */}
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-tight">
                        Hey, I'm {profile?.full_name || 'Arkennn'}. <br />
                        <span className="inline-flex items-center gap-2">
                            <span>Dreamer &amp;</span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800">
                                <IconCode className="w-3.5 h-3.5 text-gray-700" />
                                <span>Developer</span>
                            </span>
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl pt-1">
                        {profile?.bio_text || 'Crafting seamless experiences and robust systems. Computer Science student by day, creative thinker and aspiring innovator by night.'}
                    </p>
                </div>

                {/* Hero Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                        to="/contact"
                        className="btn-primary"
                    >
                        Book a Call
                    </Link>

                    <div className="badge-available">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Available for new project</span>
                    </div>
                </div>
            </section>

            {/* ========================================================
                2. TOP FEATURED BROWSER MOCKUP PREVIEWS (PEEK CAROUSEL)
               ======================================================== */}
            <section className="relative overflow-hidden py-2">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Left Peek (Subtle) */}
                    <div className="hidden md:block md:col-span-2 opacity-40 scale-95 origin-right">
                        <div className="browser-window h-44 overflow-hidden bg-gray-50">
                            <div className="browser-header">
                                <div className="browser-dot"></div>
                                <div className="browser-dot"></div>
                                <div className="browser-dot"></div>
                            </div>
                            <div className="p-3">
                                <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    </div>

                    {/* Main Featured Center Window */}
                    <div className="md:col-span-8">
                        <div className="browser-window">
                            {/* Browser Mockup Bar */}
                            <div className="browser-header justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="browser-dot"></div>
                                    <div className="browser-dot"></div>
                                    <div className="browser-dot"></div>
                                </div>
                                <div className="text-[10px] text-gray-400 font-mono">
                                    naturefirst.app
                                </div>
                                <div className="w-8"></div>
                            </div>

                            {/* Inner Preview Content */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-white">
                                <img
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80"
                                    alt="Featured Window Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                                    <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-300">Featured Concept</span>
                                    <h3 className="text-xl sm:text-2xl font-bold leading-tight">Discover The Beauty Of Nature</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Peek (Subtle) */}
                    <div className="hidden md:block md:col-span-2 opacity-40 scale-95 origin-left">
                        <div className="browser-window h-44 overflow-hidden bg-gray-50">
                            <div className="browser-header">
                                <div className="browser-dot"></div>
                                <div className="browser-dot"></div>
                                <div className="browser-dot"></div>
                            </div>
                            <div className="p-3">
                                <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================
                3. ABOUT SECTION WITH OVERLAPPING POLAROID PHOTOS
               ======================================================== */}
            <section className="space-y-6 pt-6">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">About</h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 space-y-4 text-sm text-gray-600 leading-relaxed">
                        <p>
                            I'm {profile?.full_name || 'Arkennn'}, a curious developer, coder, and creative thinker. Currently a computer science student at Universitas Amikom Yogyakarta, always exploring the limitless possibilities of software engineering and clean interface design.
                        </p>
                        <p className="italic text-gray-700 border-l-2 border-gray-300 pl-4 py-1">
                            "I thrive on transforming ideas into reality, whether it's crafting digital interfaces, designing clean RESTful APIs, or building websites that feel effortless to use."
                        </p>
                    </div>

                    {/* Overlapping Polaroid style photos */}
                    <div className="md:col-span-5 relative flex justify-center py-4">
                        <div className="polaroid-card w-40 -rotate-6 z-10">
                            <img
                                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80"
                                alt="Workspace"
                                className="w-full h-32 object-cover rounded"
                            />
                            <p className="text-[10px] text-gray-500 text-center font-mono mt-2">
                                Desk setup &amp; coding
                            </p>
                        </div>

                        <div className="polaroid-card w-40 rotate-6 -ml-12 mt-6 z-20">
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80"
                                alt="Photography"
                                className="w-full h-32 object-cover rounded"
                            />
                            <p className="text-[10px] text-gray-500 text-center font-mono mt-2">
                                Recent projects ✦
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================
                4. WORK EXPERIENCE TIMELINE
               ======================================================== */}
            <section className="space-y-6 pt-4">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Work Experience</h2>

                <div className="space-y-4">
                    {workExperience.map((exp, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-b-0 gap-2"
                        >
                            <span className="text-xs text-gray-400 font-mono w-36">
                                {exp.period}
                            </span>
                            <div className="flex-1 flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-800">
                                    {exp.role}
                                </span>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${exp.badgeBg}`}>
                                    {exp.company}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================================================
                5. "HERE'S WHAT I'VE BEEN UP TO" (PROJECTS FROM DATABASE)
               ======================================================== */}
            <section id="projects" className="space-y-8 pt-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                        Here's What I've Been Up To
                    </h2>
                    <span className="text-xs text-gray-400">
                        {displayProjects.length} Selected Projects
                    </span>
                </div>

                {isLoading ? (
                    <div className="space-y-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-12">
                        {displayProjects.map((proj, idx) => (
                            <article key={proj.id || idx} className="space-y-4">
                                {/* Browser Window Mockup Frame */}
                                <div className="browser-window">
                                    <div className="browser-header justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <div className="browser-dot"></div>
                                            <div className="browser-dot"></div>
                                            <div className="browser-dot"></div>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-mono">
                                            {proj.slug ? `${proj.slug}.app` : 'project.app'}
                                        </span>
                                        <div className="w-8"></div>
                                    </div>

                                    {/* Project Preview Image */}
                                    <div className="aspect-[16/9] w-full overflow-hidden bg-gray-50">
                                        <img
                                            src={proj.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'}
                                            alt={proj.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </div>

                                {/* Project Description & Metadata */}
                                <div className="space-y-2 pt-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {proj.title}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            {proj.github_url && (
                                                <a
                                                    href={proj.github_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-1.5 text-gray-500 hover:text-black rounded-md hover:bg-gray-100 transition-colors"
                                                    title="GitHub Repository"
                                                >
                                                    <IconGithub className="w-4 h-4" />
                                                </a>
                                            )}
                                            {proj.live_url && (
                                                <a
                                                    href={proj.live_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-1.5 text-gray-500 hover:text-black rounded-md hover:bg-gray-100 transition-colors"
                                                    title="Live Demo"
                                                >
                                                    <IconExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        {proj.short_description}
                                    </p>

                                    {/* Tech Stack Pills */}
                                    {proj.tech_stack && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {proj.tech_stack.map((tech, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* View Project Button */}
                                    <div className="pt-2">
                                        <Link
                                            to={`/project/${proj.slug || proj.id}`}
                                            className="btn-secondary text-xs"
                                        >
                                            <span>View Project</span>
                                            <IconArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* ========================================================
                6. "HOW CAN I HELP?" (CAPABILITIES / SERVICES)
               ======================================================== */}
            <section className="space-y-6 pt-4">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight text-center">
                    How Can I Help?
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all text-center space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
                            <IconLayers className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">Creative Design</h4>
                        <p className="text-[11px] text-gray-500 leading-snug">Clean layout &amp; user experience</p>
                    </div>

                    <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all text-center space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                            <IconCode className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">Web Development</h4>
                        <p className="text-[11px] text-gray-500 leading-snug">React, Vite &amp; Modern UI</p>
                    </div>

                    <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all text-center space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                            <IconServer className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">RESTful APIs</h4>
                        <p className="text-[11px] text-gray-500 leading-snug">Flask, Python &amp; routing</p>
                    </div>

                    <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all text-center space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                            <IconDatabase className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">Database Design</h4>
                        <p className="text-[11px] text-gray-500 leading-snug">PostgreSQL &amp; data modeling</p>
                    </div>
                </div>
            </section>

            {/* ========================================================
                7. TESTIMONIALS
               ======================================================== */}
            <section className="space-y-6 pt-4">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight text-center">
                    Testimonials
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4">
                        <p className="text-xs text-gray-600 leading-relaxed italic">
                            "Arkennn is a dedicated developer who delivers clean, well-structured code. The project integration went flawlessly and exceeded our expectations."
                        </p>
                        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                    alt="Client"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-900">Sarah Jenkins</div>
                                <div className="text-[10px] text-gray-400">Project Manager</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4">
                        <p className="text-xs text-gray-600 leading-relaxed italic">
                            "Great eye for minimalism and performance. The backend API response time is remarkably fast and the documentation was clear."
                        </p>
                        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                                    alt="Client"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-900">David Vance</div>
                                <div className="text-[10px] text-gray-400">Lead Engineer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================
                8. "GET IN TOUCH" (COMPACT INLINE CONTACT FORM)
               ======================================================== */}
            <section id="contact" className="space-y-6 pt-4">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                        Get in touch
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        I'm always interested in exploring new opportunities, collaborating on exciting projects, or just chatting about technology and code.
                    </p>
                </div>

                {formStatus.message && (
                    <div className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${formStatus.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                        }`}>
                        <IconCheck className="w-4 h-4 text-emerald-600" />
                        <span>{formStatus.message}</span>
                    </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={contactForm.sender_name}
                            onChange={(e) => setContactForm({ ...contactForm, sender_name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-normal focus:border-gray-900 outline-none transition-all bg-white"
                        />
                        <input
                            type="email"
                            required
                            placeholder="Your Email"
                            value={contactForm.sender_email}
                            onChange={(e) => setContactForm({ ...contactForm, sender_email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-normal focus:border-gray-900 outline-none transition-all bg-white"
                        />
                    </div>

                    <textarea
                        required
                        rows={4}
                        placeholder="Your Message..."
                        value={contactForm.message_body}
                        onChange={(e) => setContactForm({ ...contactForm, message_body: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-normal focus:border-gray-900 outline-none transition-all bg-white resize-none"
                    ></textarea>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full py-2.5 text-xs cursor-pointer"
                    >
                        <span>{isSubmitting ? 'Sending...' : 'SendMessage'}</span>
                        <IconSend className="w-3.5 h-3.5" />
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Home;
