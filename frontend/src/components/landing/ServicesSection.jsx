import { IconLayers, IconCode, IconServer, IconDatabase } from '../Icons';

function ServicesSection() {
    return (
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
    );
}

export default ServicesSection;

