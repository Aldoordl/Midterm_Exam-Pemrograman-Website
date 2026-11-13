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
    IconMail,
    IconDownload,
    IconAcademic,
    IconBriefcase,
    IconAward
} from '../components/Icons';
import heroImg from '../assets/hero.png';

function Home() {
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeExpTab, setActiveExpTab] = useState('education');

    useEffect(() => {
        axios.get(`${import.meta.env.BE_API_URL}/api/projects`)
            .then((res) => {
                if (res.data && res.data.status === 'success') {
                    setProjects(res.data.data);
                }
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });

        axios.get(`${import.meta.env.BE_API_URL}/api/profile`)
            .then((res) => {
                if (res.data && res.data.status === 'success') {
                    setProfile(res.data.data);
                }
            })
            .catch(() => {
                setProfile({
                    full_name: 'Arken',
                    role: 'Developer & Designer',
                    bio_text: 'Crafting seamless experiences and robust systems. Computer Science student by day, creative thinker and aspiring innovator by night.'
                });
            });
    }, []);

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
        },
        {
            id: 'mock-4',
            slug: 'warehouse-erp-system',
            title: 'Enterprise Warehouse Management',
            short_description: 'High-performance inventory tracking system with JWT authentication and real-time database transactions.',
            tech_stack: ['Python', 'Flask', 'PostgreSQL'],
            github_url: 'https://github.com',
            live_url: 'https://demo.example.com',
            image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80'
        }
    ];

    const marqueeImages = [
        ...displayProjects.map(p => p.image_url).filter(Boolean),
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80'
    ];

    const educationList = [
        {
            period: '2022 - Present',
            institution: 'Universitas Amikom Yogyakarta',
            degree: 'S1 - Informatika / Computer Science',
            description: 'Fokus pada Rekayasa Perangkat Lunak Web, Sistem Basis Data Relasional, RESTful APIs, dan Arsitektur Antarmuka Modern.',
            badge: 'IPK 3.8+',
            badgeBg: 'bg-emerald-50 text-emerald-700'
        },
        {
            period: '2019 - 2022',
            institution: 'SMA / SMK Negeri',
            degree: 'MIPA / Rekayasa Perangkat Lunak',
            description: 'Mempelajari dasar-dasar logika algoritma, pemrograman dasar, serta matematika diskrit dan komputasi.',
            badge: 'Alumni',
            badgeBg: 'bg-gray-100 text-gray-700'
        }
    ];

    const worksList = [
        {
            period: '2024 - Present',
            role: 'Lead Developer & Architect',
            company: 'Aura Systems',
            description: 'Memimpin perancangan arsitektur antarmuka, pembuatan design tokens, dan optimasi performa web aplikasi klien.',
            badge: 'Work',
            badgeBg: 'bg-blue-50 text-blue-700'
        },
        {
            period: '2023 - 2024',
            role: 'Fullstack Engineer Intern',
            company: 'Tech Studio',
            description: 'Mengembangkan endpoint REST API dengan Flask & PostgreSQL serta membangun antarmuka web interaktif dengan React.',
            badge: 'Internship',
            badgeBg: 'bg-emerald-50 text-emerald-700'
        },
        {
            period: '2022 - 2023',
            role: 'Frontend Specialist',
            company: 'Campus Lab',
            description: 'Membangun komponen web modern untuk sistem informasi riset internal dan portal pendaftaran kegiatan mahasiswa.',
            badge: 'Freelance',
            badgeBg: 'bg-purple-50 text-purple-700'
        },
        {
            period: '2023 - Present',
            role: 'Staff Divisi Web & Teknologi',
            company: 'Himpunan Mahasiswa Informatika',
            description: 'Mengelola pemeliharaan portal digital mahasiswa, repositori komunitas kampus, serta mentoring sesi workshop web dasar.',
            badge: 'Organization',
            badgeBg: 'bg-indigo-50 text-indigo-700'
        },
        {
            period: '2023 - 2024',
            role: 'Core Member - Web Track',
            company: 'Google Developer Student Clubs (GDSC)',
            description: 'Mengikuti riset kolaboratif teknologi web modern, studi kasus React ecosystem, dan integrasi cloud services.',
            badge: 'Community',
            badgeBg: 'bg-amber-50 text-amber-700'
        },
        {
            period: '2023',
            role: 'Koordinator Perlengkapan & IT',
            company: 'National Tech Seminar & Expo',
            description: 'Memimpin tim teknis dalam infrastruktur sistem registrasi online dan kelancaran multimedia acara.',
            badge: 'Committee',
            badgeBg: 'bg-rose-50 text-rose-700'
        }
    ];

    const certificationList = [
        {
            period: '2024',
            title: 'Menjadi React Web Developer Expert',
            issuer: 'Dicoding Indonesia',
            description: 'Mendalami arsitektur React modern, custom hooks, global state management, dan automated unit & integration testing.',
            badge: 'Verified',
            badgeBg: 'bg-emerald-50 text-emerald-700'
        },
        {
            period: '2024',
            title: 'Cloud Practitioner & Back-End Architecture',
            issuer: 'AWS Academy / Dicoding',
            description: 'Prinsip cloud computing, serverless functions, database hosting, IAM role security, dan dasar-dasar deployment.',
            badge: 'Credential',
            badgeBg: 'bg-blue-50 text-blue-700'
        },
        {
            period: '2023',
            title: 'Relational Database & SQL Specialist',
            issuer: 'Oracle Academy',
            description: 'Perancangan skema database terintegrasi, teknik normalisasi 1NF-3NF, indexing query, dan transaksi data ACID.',
            badge: 'Certified',
            badgeBg: 'bg-gray-100 text-gray-700'
        }
    ];

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
                    <span>SEC_01 // PORTFOLIO</span>
                    <span className="tracking-widest">HELLO • TAKE YOUR TOUR</span>
                    <span>2026.11</span>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                {/* 1. HERO SECTION */}
                <div className="portfolio-container pt-10 pb-8 space-y-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center relative">
                        {profile?.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt="Avatar"
                                className="w-full h-full object-cover contrast-110"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        ) : (
                            <img
                                src={heroImg}
                                alt="Avatar"
                                className="w-full h-full object-cover grayscale contrast-110"
                            />
                        )}
                        <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-lg">
                            {profile?.full_name?.charAt(0) || 'A'}
                        </div>
                    </div>

                    <div className="badge-available">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Available for new project</span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">
                            Hey, I'm {profile?.full_name || 'Arken'}. <br />
                            <span className="inline-flex items-center gap-2">
                                <span>Dreamer &amp;</span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800">
                                    <IconCode className="w-3.5 h-3.5 text-gray-700" />
                                    <span>{profile?.role || 'Developer'}</span>
                                </span>
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl pt-1">
                            {profile?.bio_text || 'Crafting seamless experiences and robust systems. Computer Science student by day, creative thinker and aspiring innovator by night.'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Link to="/contact" className="btn-primary">
                            Book a Call
                        </Link>
                        {profile?.resume_url && (
                            <a
                                href={profile.resume_url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-secondary text-xs"
                            >
                                <IconDownload className="w-3.5 h-3.5 text-gray-500" />
                                <span>Download CV</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* 2. INFINITE LOOPING MARQUEE */}
                <div className="relative border-y border-gray-100 py-6 overflow-hidden bg-gray-50/50">
                    <span className="crosshair -top-1.75 -left-1.75">+</span>
                    <span className="crosshair -top-1.75 -right-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

                    <div className="marquee-track gap-4 px-2">
                        {[...marqueeImages, ...marqueeImages].map((imgUrl, i) => (
                            <div
                                key={i}
                                className="w-64 sm:w-72 h-44 rounded-xl overflow-hidden border border-gray-200/80 shadow-sm bg-white shrink-0 group transition-transform hover:scale-[1.02] duration-300"
                            >
                                <div className="browser-header py-1.5 px-3">
                                    <div className="flex items-center gap-1">
                                        <div className="browser-dot bg-red-500"></div>
                                        <div className="browser-dot bg-yellow-400"></div>
                                        <div className="browser-dot bg-green-500"></div>
                                    </div>
                                </div>
                                <div className="w-full h-full overflow-hidden">
                                    <img
                                        src={imgUrl}
                                        alt={`Project visual ${i}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. ABOUT SECTION */}
                <div className="relative border-b border-gray-100">
                    <div className="portfolio-container py-12 space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">About</h2>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                            <div className="md:col-span-7 space-y-4 text-sm text-gray-600 leading-relaxed">
                                <p>
                                    I'm {profile?.full_name || 'Arken'}, a curious developer, coder, and creative thinker. Currently a computer science student at Universitas Amikom Yogyakarta, always exploring the limitless possibilities of software engineering and clean interface design.
                                </p>
                                <p className="italic text-gray-700 border-l-2 border-gray-300 pl-4 py-1">
                                    "I thrive on transforming ideas into reality, whether it's crafting digital interfaces, designing clean RESTful APIs, or building websites that feel effortless to use."
                                </p>
                            </div>

                            <div className="md:col-span-5 relative flex justify-center py-4">
                                <div className="polaroid-card w-36 -rotate-6 z-10">
                                    <img
                                        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80"
                                        alt="Workspace"
                                        className="w-full h-28 object-cover rounded"
                                    />
                                    <p className="text-[9px] text-gray-500 text-center font-mono mt-2">
                                        Desk setup &amp; code
                                    </p>
                                </div>

                                <div className="polaroid-card w-36 rotate-6 -ml-10 mt-6 z-20">
                                    <img
                                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80"
                                        alt="Photography"
                                        className="w-full h-28 object-cover rounded"
                                    />
                                    <p className="text-[9px] text-gray-500 text-center font-mono mt-2">
                                        Recent projects ✦
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                {/* 4. JOURNEY & BACKGROUND (TABBED: EDUCATION, WORKS & ACTIVITIES, CERTIFICATES) */}
                <div className="relative border-b border-gray-100">
                    <div className="portfolio-container py-12 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                Journey &amp; Background
                            </h2>

                            {/* Tab Switcher */}
                            <div className="flex items-center gap-1 p-1 bg-gray-100 border border-gray-200/80 rounded-xl w-fit">
                                <button
                                    onClick={() => setActiveExpTab('education')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeExpTab === 'education'
                                        ? 'bg-white text-gray-900 shadow-xs'
                                        : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                >
                                    <IconAcademic className="w-3.5 h-3.5" />
                                    <span>Education</span>
                                </button>
                                <button
                                    onClick={() => setActiveExpTab('works')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeExpTab === 'works'
                                        ? 'bg-white text-gray-900 shadow-xs'
                                        : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                >
                                    <IconBriefcase className="w-3.5 h-3.5" />
                                    <span>Works</span>
                                </button>
                                <button
                                    onClick={() => setActiveExpTab('certifications')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeExpTab === 'certifications'
                                        ? 'bg-white text-gray-900 shadow-xs'
                                        : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                >
                                    <IconAward className="w-3.5 h-3.5" />
                                    <span>Certificates</span>
                                </button>
                            </div>
                        </div>

                        {/* Tab 1: Education */}
                        {activeExpTab === 'education' && (
                            <div className="space-y-3">
                                {educationList.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-gray-300 transition-colors space-y-1.5"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-900">
                                                    {item.institution}
                                                </span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.badgeBg}`}>
                                                    {item.badge}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400 font-mono">
                                                {item.period}
                                            </span>
                                        </div>
                                        <div className="text-xs font-semibold text-gray-700">
                                            {item.degree}
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tab 2: Works & Activities (Work + Organizations) */}
                        {activeExpTab === 'works' && (
                            <div className="space-y-3">
                                {worksList.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-gray-300 transition-colors space-y-1.5"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-900">
                                                    {item.company}
                                                </span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.badgeBg}`}>
                                                    {item.badge}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400 font-mono">
                                                {item.period}
                                            </span>
                                        </div>
                                        <div className="text-xs font-semibold text-gray-700">
                                            {item.role}
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tab 3: Certificates */}
                        {activeExpTab === 'certifications' && (
                            <div className="space-y-3">
                                {certificationList.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-gray-300 transition-colors space-y-1.5"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-900">
                                                    {item.title}
                                                </span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.badgeBg}`}>
                                                    {item.badge}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400 font-mono">
                                                {item.period}
                                            </span>
                                        </div>
                                        <div className="text-xs font-semibold text-gray-700">
                                            Issued by {item.issuer}
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                {/* 5. "HERE'S WHAT I'VE BEEN UP TO" (PROJECTS) */}
                <div id="projects" className="relative border-b border-gray-100">
                    <div className="portfolio-container py-12 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                Here's What I've Been Up To
                            </h2>
                            <span className="text-xs text-gray-400 font-mono">
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
                                        <div className="browser-window">
                                            <div className="browser-header justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="browser-dot bg-red-500"></div>
                                                    <div className="browser-dot bg-yellow-400"></div>
                                                    <div className="browser-dot bg-green-500"></div>
                                                </div>
                                                <span className="text-[10px] text-gray-400 font-mono">
                                                    {proj.slug ? `${proj.slug}.app` : 'project.app'}
                                                </span>
                                                <div className="w-8"></div>
                                            </div>

                                            <div className="aspect-video w-full overflow-hidden bg-gray-50">
                                                <img
                                                    src={proj.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'}
                                                    alt={proj.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                            </div>
                                        </div>

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
                    </div>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                {/* 6. "HOW CAN I HELP?" (CAPABILITIES) */}
                <div className="relative border-b border-gray-100">
                    <div className="portfolio-container py-12 space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight text-center">
                            How Can I Help?
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all text-center space-y-2">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
                                    <IconLayers className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-bold text-gray-900">Creative Design</h4>
                                <p className="text-[11px] text-gray-500 leading-snug">Clean layout &amp; UX</p>
                            </div>

                            <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all text-center space-y-2">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                                    <IconCode className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-bold text-gray-900">Web Development</h4>
                                <p className="text-[11px] text-gray-500 leading-snug">React, Vite &amp; CSS</p>
                            </div>

                            <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all text-center space-y-2">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                                    <IconServer className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-bold text-gray-900">RESTful APIs</h4>
                                <p className="text-[11px] text-gray-500 leading-snug">Flask &amp; Python</p>
                            </div>

                            <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all text-center space-y-2">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                                    <IconDatabase className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-bold text-gray-900">Database Design</h4>
                                <p className="text-[11px] text-gray-500 leading-snug">PostgreSQL modeling</p>
                            </div>
                        </div>
                    </div>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                {/* 7. TESTIMONIALS */}
                <div className="relative border-b border-gray-100">
                    <div className="portfolio-container py-12 space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight text-center">
                            Testimonials
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4">
                                <p className="text-xs text-gray-600 leading-relaxed italic">
                                    "Arken is a dedicated developer who delivers clean, well-structured code. The project integration went flawlessly and exceeded our expectations."
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
                    </div>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                {/* 8. CTA SECTION (REPLACED INLINE FORM) */}
                <div id="contact" className="portfolio-container py-16 text-center space-y-6">
                    <div className="max-w-md mx-auto space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[11px] font-mono text-gray-600 mb-2">
                            <span>LET'S CONNECT</span>
                            <span>•</span>
                            <span>REPLY &lt; 24H</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            Have a project in mind?
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            I'm always interested in exploring new opportunities, discussing architecture, or building fullstack applications together.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link
                            to="/contact"
                            className="btn-primary text-sm px-6 py-3 shadow-md group"
                        >
                            <IconMail className="w-4 h-4" />
                            <span>Open Contact Form</span>
                            <IconArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
