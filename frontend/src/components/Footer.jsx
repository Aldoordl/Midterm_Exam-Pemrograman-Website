import { IconGithub, IconTwitter, IconMail, IconArrowUpRight } from './Icons';

function Footer() {
    return (
        <footer className="w-full border-t border-gray-100 py-12 mt-20">
            <div className="portfolio-container text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                        title="GitHub"
                    >
                        <IconGithub className="w-4 h-4" />
                    </a>
                    <a
                        href="https://x.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                        title="Twitter"
                    >
                        <IconTwitter className="w-4 h-4" />
                    </a>
                    <a
                        href="mailto:developer@example.com"
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                        title="Email"
                    >
                        <IconMail className="w-4 h-4" />
                    </a>
                </div>

                <p className="text-xs text-gray-400 font-normal">
                    Copyright © {new Date().getFullYear()} Personal Portfolio. Crafted with care.
                </p>

                <div className="pt-2">
                    <a href="#top" className="text-[11px] text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center gap-1">
                        <span>Back to top</span>
                        <IconArrowUpRight className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
