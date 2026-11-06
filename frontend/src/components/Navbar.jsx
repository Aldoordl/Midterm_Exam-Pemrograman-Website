import { Link, useLocation } from 'react-router-dom';
import {
    IconHome,
    IconTwitter,
    IconGithub,
    IconFolder,
    IconMail,
    IconShieldCheck
} from './Icons';

function Navbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-6 z-50 w-full px-4 flex justify-center pointer-events-none">
            <nav className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] rounded-full px-2 py-1.5 flex items-center gap-1 sm:gap-2">
                {/* Home */}
                <Link
                    to="/"
                    className={`p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors ${isActive('/') ? 'text-black bg-gray-100' : ''
                        }`}
                    title="Home"
                >
                    <IconHome className="w-4 h-4" />
                </Link>

                {/* Projects Anchor Link */}
                <a
                    href="/#projects"
                    className="p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                    title="Projects"
                >
                    <IconFolder className="w-4 h-4" />
                </a>

                {/* Contact Page Link */}
                <Link
                    to="/contact"
                    className={`p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors ${isActive('/contact') ? 'text-black bg-gray-100' : ''
                        }`}
                    title="Contact"
                >
                    <IconMail className="w-4 h-4" />
                </Link>

                {/* Vertical Divider */}
                <div className="h-4 w-px bg-gray-200 mx-1"></div>

                {/* X / Twitter */}
                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                    title="Twitter / X"
                >
                    <IconTwitter className="w-3.5 h-3.5" />
                </a>

                {/* GitHub */}
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                    title="GitHub"
                >
                    <IconGithub className="w-4 h-4" />
                </a>

                {/* Vertical Divider */}
                <div className="h-4 w-px bg-gray-200 mx-1"></div>

                {/* Admin Portal */}
                <Link
                    to="/login"
                    className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Admin"
                >
                    <IconShieldCheck className="w-3.5 h-3.5" />
                </Link>

                {/* Primary Button "Book a Call" */}
                <Link
                    to="/contact"
                    className="bg-[#111827] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-sm ml-1"
                >
                    Book a Call
                </Link>
            </nav>
        </header>
    );
}

export default Navbar;
