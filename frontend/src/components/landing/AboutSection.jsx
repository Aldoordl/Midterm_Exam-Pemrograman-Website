function AboutSection({ profile }) {
    return (
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
    );
}

export default AboutSection;

