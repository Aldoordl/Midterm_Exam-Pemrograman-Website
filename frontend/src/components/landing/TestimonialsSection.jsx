import { useState } from 'react';
import { IconStar } from '../Icons';

function TestimonialsSection() {
    const testimonials = [
        {
            quote: "Really dedicated developer who delivers clean, well-structured code. The integration went flawlessly!",
            subtext: "The web application feels effortless to use and exceeded our performance benchmarks.",
            author: "Sarah Jenkins",
            role: "Project Manager",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        },
        {
            quote: "Great eye for minimalism and performance. Fast backend APIs and clean, responsive UI design.",
            subtext: "Documentation was clear, structured, and remarkably easy for our team to maintain.",
            author: "David Vance",
            role: "Lead Engineer",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        },
        {
            quote: "Exceptional attention to details from wireframing to production deployment. Great work!",
            subtext: "Smooth communication throughout the process and deliverables were consistently on time.",
            author: "Elena Rostova",
            role: "Product Designer",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const current = testimonials[currentIndex];

    return (
        <div className="relative border-b border-gray-100">
            <div className="portfolio-container py-14">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                    {/* Left Column: Simple Header & Navigation (Clean, no competing big titles) */}
                    <div className="md:col-span-4 space-y-5">
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <span className="text-xs font-semibold text-gray-900 tracking-tight">
                                    My Clients' Stories
                                </span>
                            </div>

                            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                                Here's what people have to say about working together. Real moments, real experiences, real feedback.
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-2.5 pt-1">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-black hover:bg-black hover:text-white transition-all flex items-center justify-center text-gray-700 cursor-pointer text-xs"
                                aria-label="Previous testimonial"
                            >
                                ←
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-black hover:bg-black hover:text-white transition-all flex items-center justify-center text-gray-700 cursor-pointer text-xs"
                                aria-label="Next testimonial"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Clean, Airy Quote & Inline Author (1-to-1 with Reference) */}
                    <div className="md:col-span-8 flex items-start gap-4 sm:gap-6">
                        {/* Quote Mark Icon (Subtle gray block icon next to text) */}
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 font-serif text-2xl select-none shrink-0 mt-1">
                            “
                        </div>

                        {/* Quote & Author Details */}
                        <div className="space-y-4 flex-1">
                            <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 tracking-tight leading-snug">
                                {current.quote}
                            </h3>

                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                                {current.subtext}
                            </p>

                            {/* Author & Rating in One Inline Row */}
                            <div className="flex flex-wrap items-center gap-3 pt-3">
                                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                                    <img
                                        src={current.avatar}
                                        alt={current.author}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="font-bold text-gray-900">{current.author}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">{current.role}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] font-mono text-gray-500 pl-2 sm:border-l sm:border-gray-200">
                                    <span>5.0/5</span>
                                    <div className="flex text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <IconStar key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner Crosshairs */}
            <span className="crosshair -bottom-1.75 -left-1.75">+</span>
            <span className="crosshair -bottom-1.75 -right-1.75">+</span>
        </div>
    );
}

export default TestimonialsSection;
