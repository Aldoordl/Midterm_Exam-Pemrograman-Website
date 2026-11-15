import { useState } from 'react';
import { IconAcademic, IconBriefcase, IconAward } from '../Icons';

function JourneySection({ education = [], works = [], certifications = [] }) {
    const [activeTab, setActiveTab] = useState('education');

    const getBadgeClass = (color) => {
        const colorMap = {
            blue: 'bg-blue-50 text-blue-700 border border-blue-200/60',
            emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
            purple: 'bg-purple-50 text-purple-700 border border-purple-200/60',
            amber: 'bg-amber-50 text-amber-700 border border-amber-200/60',
            rose: 'bg-rose-50 text-rose-700 border border-rose-200/60',
            indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60',
            gray: 'bg-gray-100 text-gray-700 border border-gray-200',
        };
        return colorMap[color] || colorMap.gray;
    };

    return (
        <div className="relative border-b border-gray-100">
            <div className="portfolio-container py-12 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                        Journey &amp; Background
                    </h2>

                    {/* Tab Switcher */}
                    <div className="flex items-center gap-1 p-1 bg-gray-100 border border-gray-200/80 rounded-xl w-fit">
                        <button
                            type="button"
                            onClick={() => setActiveTab('education')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                activeTab === 'education'
                                    ? 'bg-white text-gray-900 shadow-xs'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            <IconAcademic className="w-3.5 h-3.5" />
                            <span>Education</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('works')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                activeTab === 'works'
                                    ? 'bg-white text-gray-900 shadow-xs'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            <IconBriefcase className="w-3.5 h-3.5" />
                            <span>Works</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('certifications')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                activeTab === 'certifications'
                                    ? 'bg-white text-gray-900 shadow-xs'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            <IconAward className="w-3.5 h-3.5" />
                            <span>Certificates</span>
                        </button>
                    </div>
                </div>

                {/* Tab 1: Education */}
                {activeTab === 'education' && (
                    <div className="space-y-3">
                        {education.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-gray-300 transition-colors space-y-1.5"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">
                                            {item.organization || item.institution}
                                        </span>
                                        {(item.badge_label || item.badge) && (
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getBadgeClass(item.badge_color || item.badgeBg)}`}>
                                                {item.badge_label || item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-400 font-mono">
                                        {item.period}
                                    </span>
                                </div>
                                <div className="text-xs font-semibold text-gray-700">
                                    {item.title || item.degree}
                                </div>
                                {item.description && (
                                    <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab 2: Works & Activities */}
                {activeTab === 'works' && (
                    <div className="space-y-3">
                        {works.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-gray-300 transition-colors space-y-1.5"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">
                                            {item.organization || item.company}
                                        </span>
                                        {(item.badge_label || item.badge) && (
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getBadgeClass(item.badge_color || item.badgeBg)}`}>
                                                {item.badge_label || item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-400 font-mono">
                                        {item.period}
                                    </span>
                                </div>
                                <div className="text-xs font-semibold text-gray-700">
                                    {item.title || item.role}
                                </div>
                                {item.description && (
                                    <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab 3: Certificates */}
                {activeTab === 'certifications' && (
                    <div className="space-y-3">
                        {certifications.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-gray-300 transition-colors space-y-1.5"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">
                                            {item.title}
                                        </span>
                                        {(item.badge_label || item.badge) && (
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getBadgeClass(item.badge_color || item.badgeBg)}`}>
                                                {item.badge_label || item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-400 font-mono">
                                        {item.period}
                                    </span>
                                </div>
                                {(item.organization || item.issuer) && (
                                    <div className="text-xs font-semibold text-gray-700">
                                        Issued by {item.organization || item.issuer}
                                    </div>
                                )}
                                {item.description && (
                                    <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <span className="crosshair -bottom-1.75 -left-1.75">+</span>
            <span className="crosshair -bottom-1.75 -right-1.75">+</span>
        </div>
    );
}

export default JourneySection;

