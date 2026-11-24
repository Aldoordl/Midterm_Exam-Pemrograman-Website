import { Link } from 'react-router-dom';
import { IconGithub, IconTwitter, IconMail, IconArrowUpRight } from './Icons';

function Footer() {
    return (
        <footer className="w-full">
            {/* Architect Frame for Footer */}
            <div className="architect-frame border-t border-gray-100">
                <span className="crosshair -top-1.75 -left-1.75">+</span>
                <span className="crosshair -top-1.75 -right-1.75">+</span>
                <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                {/* Footer Main Content */}
                <div className="portfolio-container py-10 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                        {/* Brand & Status */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm tracking-tight text-gray-900">
                                    Arken
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="text-xs text-gray-500 font-mono">Portfolio</span>
                            </div>
                            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                                Crafting digital interfaces and backend architectures with minimalist precision.
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[11px] font-medium text-emerald-700">Available for freelance &amp; full-time</span>
                            </div>
                        </div>

                        {/* Navigation & Social Links */}
                        <div className="flex flex-wrap gap-8 text-xs">
                            <div className="space-y-2">
                                <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Pages</div>
                                <ul className="space-y-1.5">
                                    <li>
                                        <Link to="/" className="text-gray-600 hover:text-black transition-colors">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="/#projects" className="text-gray-600 hover:text-black transition-colors">
                                            Projects
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/contact" className="text-gray-600 hover:text-black transition-colors">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Network</div>
                                <ul className="space-y-1.5">
                                    <li>
                                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black transition-colors inline-flex items-center gap-1.5">
                                            <IconGithub className="w-3.5 h-3.5" />
                                            <span>GitHub</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://x.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black transition-colors inline-flex items-center gap-1.5">
                                            <IconTwitter className="w-3.5 h-3.5" />
                                            <span>Twitter / X</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Architectural Bottom Metadata Line */}
                    <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-gray-400 font-mono">
                        <div className="flex items-center gap-3">
                            <span>© {new Date().getFullYear()} Arken</span>
                            <span>•</span>
                            <span>YOGYAKARTA, ID</span>
                        </div>
                        <a
                            href="#top"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="hover:text-black transition-colors inline-flex items-center gap-1"
                        >
                            <span>BACK TO TOP</span>
                            <IconArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
