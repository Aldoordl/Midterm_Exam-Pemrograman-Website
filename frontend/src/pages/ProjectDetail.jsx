import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
    IconArrowUpRight,
    IconGithub,
    IconExternalLink,
    IconClock
} from '../components/Icons';

function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/projects/${slug}`)
            .then((response) => {
                if (response.data && response.data.status === 'success') {
                    setProject(response.data.data);
                } else {
                    setError(response.data ? response.data.message : 'Project not found.');
                }
                setIsLoading(false);
            })
            .catch(() => {
                setProject({
                    title: 'Discover The Beauty Of Nature',
                    slug: slug,
                    short_description: 'An interactive exploration platform for outdoor enthusiasts, featuring trail maps, scenic spot guides, and environmental logging.',
                    content: `Overview:
An exploration platform designed to showcase the beauty of nature trails and protected landscapes. The application features route mapping, localized weather updates, and a database of rare flora and fauna observations.

Key Engineering Highlights:
1. Interactive Map Integration: Fluid responsive map rendering with pin clustering for thousands of outdoor spots.
2. High-Performance API: Backend endpoints structured with Flask and PostgreSQL with query execution times consistently under 35ms.
3. Offline Support: Caching essential map routes and emergency offline contact details.

Outcome & Impact:
- Used by over 2,500 active hikers during pilot testing.
- High accessibility and 99.9% uptime during peak weekend usage.`,
                    tech_stack: ['React', 'TailwindCSS', 'Flask', 'PostgreSQL'],
                    github_url: 'https://github.com',
                    live_url: 'https://demo.example.com',
                    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
                    created_at: '2026-11-01T10:00:00Z'
                });
                setIsLoading(false);
            });
    }, [slug]);

    if (isLoading) {
        return (
            <div className="py-12">
                <div className="architect-frame py-24 text-center">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-xs text-gray-400 font-mono">Loading project data...</p>
                </div>
            </div>
        );
    }

    if (error && !project) {
        return (
            <div className="py-12">
                <div className="architect-frame py-20 text-center space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">Project Not Found</h2>
                    <p className="text-xs text-gray-500">{error || "The project you're looking for does not exist."}</p>
                    <div>
                        <Link to="/" className="btn-secondary text-xs">
                            ← Back to Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <div className="architect-frame">
                {/* Corner crosshairs (+) */}
                <span className="crosshair -top-1.75 -left-1.75">+</span>
                <span className="crosshair -top-1.75 -right-1.75">+</span>
                <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                {/* Top Architectural Measurement Line */}
                <div className="relative border-b border-gray-100 px-6 py-2 flex items-center justify-between text-[10px] text-gray-400 font-mono select-none">
                    <Link to="/" className="hover:text-black transition-colors">
                        ← BACK TO PORTFOLIO
                    </Link>
                    <span className="tracking-widest">DOC // {project.slug || 'CASE-STUDY'}</span>
                    <span>DETAIL VIEW</span>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                <div className="portfolio-container py-10 space-y-8">
                    {/* Title & Metadata */}
                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            {project.title}
                        </h1>

                        {project.short_description && (
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {project.short_description}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <div className="flex flex-wrap gap-1.5">
                                {project.tech_stack && project.tech_stack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {project.created_at && (
                                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                                    <IconClock className="w-3.5 h-3.5" />
                                    <span>{new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                                </div>
                            )}
                        </div>

                        {(project.github_url || project.live_url) && (
                            <div className="flex flex-wrap gap-2.5 pt-3">
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-secondary text-xs"
                                    >
                                        <IconGithub className="w-3.5 h-3.5" />
                                        <span>GitHub Repository</span>
                                        <IconArrowUpRight className="w-3 h-3 text-gray-400" />
                                    </a>
                                )}
                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-primary text-xs"
                                    >
                                        <IconExternalLink className="w-3.5 h-3.5" />
                                        <span>Visit Live Demo</span>
                                        <IconArrowUpRight className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Image Preview Window */}
                    {project.image_url && (
                        <div className="browser-window">
                            <div className="browser-header">
                                <div className="browser-dot bg-red-500"></div>
                                <div className="browser-dot bg-yellow-400"></div>
                                <div className="browser-dot bg-green-500"></div>
                            </div>
                            <div className="overflow-hidden bg-gray-50">
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-full h-auto object-cover max-h-115"
                                />
                            </div>
                        </div>
                    )}

                    {/* Content Body */}
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap pt-4 border-t border-gray-100">
                        {project.content}
                    </div>

                    {/* Bottom Nav */}
                    <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                        <Link to="/" className="btn-secondary text-xs">
                            ← Back to Home
                        </Link>
                        <Link to="/contact" className="btn-primary text-xs">
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
