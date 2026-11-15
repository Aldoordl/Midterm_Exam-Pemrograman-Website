function TestimonialsSection() {
    return (
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
    );
}

export default TestimonialsSection;

