import { useState, useEffect } from 'react';
import { projectService, profileService, resumeService } from '../services';
import HeroSection from '../components/landing/HeroSection';
import MarqueeSection from '../components/landing/MarqueeSection';
import AboutSection from '../components/landing/AboutSection';
import JourneySection from '../components/landing/JourneySection';
import ProjectsSection from '../components/landing/ProjectsSection';
import ServicesSection from '../components/landing/ServicesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CtaSection from '../components/landing/CtaSection';
import {
    mockProfile,
    mockProjects,
    mockEducation,
    mockWorks,
    mockCertifications,
    mockMarqueeImages
} from '../data/mockData';

function Home() {
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState(null);
    const [resumeItems, setResumeItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        projectService.getPublic()
            .then((res) => {
                if (res.data && res.data.status === 'success') {
                    setProjects(res.data.data);
                }
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });

        profileService.getPublic()
            .then((res) => {
                if (res.data && res.data.status === 'success') {
                    setProfile(res.data.data);
                }
            })
            .catch(() => {
                setProfile(mockProfile);
            });

        resumeService.getPublic()
            .then((res) => {
                if (res.data && res.data.status === 'success' && Array.isArray(res.data.data)) {
                    setResumeItems(res.data.data);
                }
            })
            .catch(() => {
                // Fallback to local mock data
            });
    }, []);

    const displayProjects = projects.length > 0 ? projects : (!isLoading ? mockProjects : []);

    const marqueeImages = [
        ...displayProjects.map(p => p.image_url).filter(Boolean),
        ...mockMarqueeImages
    ];

    // Filter data dari API /api/resume sesuai category di database Supabase
    const apiEducation = resumeItems.filter(item => item.category === 'education');
    const apiWorks = resumeItems.filter(item => item.category === 'works' || item.category === 'work' || item.category === 'organization');
    const apiCerts = resumeItems.filter(item => item.category === 'certifications' || item.category === 'certification' || item.category === 'certificate');

    const displayEducation = apiEducation.length > 0 ? apiEducation : (!isLoading ? mockEducation : []);
    const displayWorks = apiWorks.length > 0 ? apiWorks : (!isLoading ? mockWorks : []);
    const displayCerts = apiCerts.length > 0 ? apiCerts : (!isLoading ? mockCertifications : []);

    return (
        <div className="py-6">
            <div className="architect-frame">
                {/* Corner crosshairs (+) */}
                <span className="crosshair -top-1.75 -left-1.75">+</span>
                <span className="crosshair -top-1.75 -right-1.75">+</span>
                <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                <span className="crosshair -bottom-1.75 -right-1.75">+</span>

                {/* Top Architectural Drafting Scale */}
                <div className="relative border-b border-gray-100 px-6 py-2 flex items-center justify-between text-[10px] text-gray-400 font-mono select-none">
                    <span>SEC_01 // PORTFOLIO</span>
                    <span className="tracking-widest">HELLO • TAKE YOUR TOUR</span>
                    <span>2026.11</span>
                    <span className="crosshair -bottom-1.75 -left-1.75">+</span>
                    <span className="crosshair -bottom-1.75 -right-1.75">+</span>
                </div>

                {/* 1. Hero Section */}
                <HeroSection profile={profile} isLoading={isLoading} />

                {/* 2. Marquee Loop */}
                <MarqueeSection images={marqueeImages} isLoading={isLoading} />

                {/* 3. About Section */}
                <AboutSection profile={profile} isLoading={isLoading} />

                {/* 4. Journey & Background */}
                <JourneySection
                    education={displayEducation}
                    works={displayWorks}
                    certifications={displayCerts}
                    isLoading={isLoading}
                />

                {/* 5. Projects Section */}
                <ProjectsSection
                    projects={displayProjects}
                    isLoading={isLoading}
                />

                {/* 6. Capabilities & Services */}
                <ServicesSection />

                {/* 7. Testimonials */}
                <TestimonialsSection />

                {/* 8. Call To Action */}
                <CtaSection />
            </div>
        </div>
    );
}

export default Home;
