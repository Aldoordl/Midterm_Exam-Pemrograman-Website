import { Link } from 'react-router-dom';
import { IconCode, IconDownload } from '../Icons';
import { HeroSkeleton } from '../SkeletonBlueprint';
import heroImg from '../../assets/hero.png';

function HeroSection({ profile, isLoading = false }) {
    if (isLoading || !profile) {
        return <HeroSkeleton />;
    }
    return (
        <div className="portfolio-container pt-10 pb-8 space-y-6">
            {/* Avatar thumbnail */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-200 shadow-xs bg-gray-50 flex items-center justify-center relative">
                {profile?.avatar_url ? (
                    <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        className="w-full h-full object-cover contrast-110"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <img
                        src={heroImg}
                        alt="Avatar"
                        className="w-full h-full object-cover grayscale contrast-110"
                    />
                )}
            </div>

            <div className="badge-available">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Available for new project</span>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">
                    Hey, I'm {profile.full_name}. <br />
                    <span className="inline-flex items-center gap-2">
                        <span>Dreamer &amp;</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800">
                            <IconCode className="w-3.5 h-3.5 text-gray-700" />
                            <span>{profile.role}</span>
                        </span>
                    </span>
                </h1>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl pt-1">
                    {profile.bio_text}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/contact" className="btn-primary">
                    Book a Call
                </Link>
                {profile?.resume_url && (
                    <a
                        href={profile.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary text-xs"
                    >
                        <IconDownload className="w-3.5 h-3.5 text-gray-500" />
                        <span>Download CV</span>
                    </a>
                )}
            </div>
        </div>
    );
}

export default HeroSection;

