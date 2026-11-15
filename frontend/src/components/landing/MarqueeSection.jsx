function MarqueeSection({ images = [] }) {
    if (!images || images.length === 0) return null;

    return (
        <div className="relative border-y border-gray-100 py-6 overflow-hidden bg-gray-50/50">
            <span className="crosshair -top-1.75 -left-1.75">+</span>
            <span className="crosshair -top-1.75 -right-1.75">+</span>
            <span className="crosshair -bottom-1.75 -left-1.75">+</span>
            <span className="crosshair -bottom-1.75 -right-1.75">+</span>

            <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="marquee-track gap-4 px-2">
                {[...images, ...images].map((imgUrl, i) => (
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
    );
}

export default MarqueeSection;

