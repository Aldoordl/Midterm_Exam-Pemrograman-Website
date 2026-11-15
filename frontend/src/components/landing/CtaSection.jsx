import { Link } from 'react-router-dom';
import { IconMail, IconArrowUpRight } from '../Icons';

function CtaSection() {
    return (
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
    );
}

export default CtaSection;

