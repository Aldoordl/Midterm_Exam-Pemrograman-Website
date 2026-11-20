import { IconLayers, IconCode, IconServer, IconDatabase } from '../Icons';

function ServicesSection() {
    const services = [
        {
            num: '01',
            category: 'UI & DESIGN',
            title: 'Creative & UI/UX Design',
            description: 'Designing clean, accessible user interfaces and wireframes with an emphasis on intuitive interaction and visual balance.',
            skills: ['Figma', 'Design Systems', 'Wireframing', 'Responsive UX'],
            icon: IconLayers,
        },
        {
            num: '02',
            category: 'FRONTEND',
            title: 'Modern Web Development',
            description: 'Engineering fast, responsive single-page applications with clean component architecture and delightful transitions.',
            skills: ['React', 'Vite', 'Tailwind CSS', 'State Management'],
            icon: IconCode,
        },
        {
            num: '03',
            category: 'BACKEND',
            title: 'RESTful API Engineering',
            description: 'Developing structured, secure backend services, business logic, token-based authentication, and REST endpoints.',
            skills: ['Python', 'Flask', 'JWT Auth', 'REST Architecture'],
            icon: IconServer,
        },
        {
            num: '04',
            category: 'DATABASE',
            title: 'Database & Data Modeling',
            description: 'Architecting relational schemas, optimizing indexing and queries, and configuring row-level access security policies.',
            skills: ['PostgreSQL', 'Supabase', 'Relational Schemas', 'RLS Security'],
            icon: IconDatabase,
        },
    ];

    return (
        <div className="relative border-b border-gray-100">
            <div className="portfolio-container py-12 space-y-8">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 border-b border-gray-100">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        How Can I Help?
                    </h2>
                    <p className="text-xs text-gray-500 max-w-sm sm:text-right font-normal leading-relaxed">
                        End-to-end digital craftsmanship from pixel-perfect user interfaces to robust backend systems and database architectures.
                    </p>
                </div>

                {/* Architectural Blueprint Matrix Grid (2x2 Matrix) */}
                <div className="relative border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
                    {/* Matrix Center Crosshair (visible on sm+) */}
                    <span className="crosshair absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:block z-10 select-none">
                        +
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        {services.map((item, idx) => {
                            const Icon = item.icon;
                            // Tambahkan border sesuai posisi di grid 2x2
                            const isBottom = idx >= 2;
                            const isRight = idx % 2 === 1;

                            return (
                                <div
                                    key={idx}
                                    className={`p-6 sm:p-7 space-y-4 hover:bg-gray-50/50 transition-colors relative group ${isBottom ? 'sm:border-t sm:border-gray-200' : ''
                                        } ${isRight ? 'sm:border-l sm:border-gray-200' : ''} ${idx > 0 ? 'border-t border-gray-200 sm:border-t-0' : ''
                                        }`}
                                >
                                    {/* Top Metadata & Icon */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-mono font-bold text-gray-900">
                                                // {item.num}
                                            </span>
                                            <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-semibold tracking-wider">
                                                {item.category}
                                            </span>
                                        </div>

                                        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200/80 flex items-center justify-center text-gray-700 group-hover:border-black group-hover:bg-white group-hover:text-black transition-all shadow-2xs">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Title & Description */}
                                    <div className="space-y-1.5">
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-relaxed font-normal">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Tech & Capability Chips */}
                                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-gray-100">
                                        {item.skills.map((skill, sIdx) => (
                                            <span
                                                key={sIdx}
                                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100/80 text-gray-600 font-medium border border-gray-200/50"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Corner Crosshairs */}
            <span className="crosshair -bottom-1.75 -left-1.75">+</span>
            <span className="crosshair -bottom-1.75 -right-1.75">+</span>
        </div>
    );
}

export default ServicesSection;
