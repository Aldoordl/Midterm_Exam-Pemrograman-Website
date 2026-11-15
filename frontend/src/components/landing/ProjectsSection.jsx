import { Link } from 'react-router-dom';
import { IconGithub, IconExternalLink, IconArrowUpRight } from '../Icons';

function ProjectsSection({ projects = [], isLoading = false }) {
    return (
        <div id="projects" className="relative border-b border-gray-100">
            <div className="portfolio-container py-12 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                        Here's What I've Been Up To
                    </h2>
                    <span className="text-xs text-gray-400 font-mono">
                        {projects.length} Selected Projects
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
                        {projects.map((proj, idx) => (
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
    );
}

export default ProjectsSection;

