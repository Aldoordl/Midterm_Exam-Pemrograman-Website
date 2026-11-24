// Centralized Mock Data & Fallbacks

export const mockProfile = {
    full_name: 'Arken',
    role: 'Developer & Designer',
    bio_text: 'Crafting seamless experiences and robust systems. Computer Science student by day, creative thinker and aspiring innovator by night.'
};

export const mockProjects = [
    {
        id: 'mock-1',
        slug: 'nature-discovery-app',
        title: 'Discover The Beauty Of Nature',
        short_description: 'An interactive exploration platform for outdoor enthusiasts, featuring trail maps, scenic spot guides, and environmental logging.',
        tech_stack: ['React', 'TailwindCSS', 'Flask', 'PostgreSQL'],
        github_url: 'https://github.com',
        live_url: 'https://demo.example.com',
        image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
    },
    {
        id: 'mock-2',
        slug: 'dreamland-app-concept',
        title: 'Dreamland App Concept',
        short_description: 'A modern design concept engineered for creative workflows and simplified team conversations.',
        tech_stack: ['React', 'Vite', 'REST API'],
        github_url: 'https://github.com',
        live_url: 'https://demo.example.com',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    },
    {
        id: 'mock-3',
        slug: 'minimalist-design-icons',
        title: 'Design With Icons That Stand Out',
        short_description: 'Vector asset management tool and curated design tokens for rapid web application prototyping.',
        tech_stack: ['TypeScript', 'Node.js', 'PostgreSQL'],
        github_url: 'https://github.com',
        live_url: 'https://demo.example.com',
        image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
    },
    {
        id: 'mock-4',
        slug: 'warehouse-erp-system',
        title: 'Enterprise Warehouse Management',
        short_description: 'High-performance inventory tracking system with JWT authentication and real-time database transactions.',
        tech_stack: ['Python', 'Flask', 'PostgreSQL'],
        github_url: 'https://github.com',
        live_url: 'https://demo.example.com',
        image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80'
    }
];

export const mockEducation = [
    {
        period: '2022 - Present',
        institution: 'Universitas Amikom Yogyakarta',
        degree: 'S1 - Informatika / Computer Science',
        description: 'Fokus pada Rekayasa Perangkat Lunak Web, Sistem Basis Data Relasional, RESTful APIs, dan Arsitektur Antarmuka Modern.',
        badge: 'IPK 3.8+',
        badgeBg: 'bg-emerald-50 text-emerald-700'
    },
    {
        period: '2019 - 2022',
        institution: 'SMA / SMK Negeri',
        degree: 'MIPA / Rekayasa Perangkat Lunak',
        description: 'Mempelajari dasar-dasar logika algoritma, pemrograman dasar, serta matematika diskrit dan komputasi.',
        badge: 'Alumni',
        badgeBg: 'bg-gray-100 text-gray-700'
    }
];

export const mockWorks = [
    {
        period: '2024 - Present',
        role: 'Lead Developer & Architect',
        company: 'Aura Systems',
        description: 'Memimpin perancangan arsitektur antarmuka, pembuatan design tokens, dan optimasi performa web aplikasi klien.',
        badge: 'Work',
        badgeBg: 'bg-blue-50 text-blue-700'
    },
    {
        period: '2023 - 2024',
        role: 'Fullstack Engineer Intern',
        company: 'Tech Studio',
        description: 'Mengembangkan endpoint REST API dengan Flask & PostgreSQL serta membangun antarmuka web interaktif dengan React.',
        badge: 'Internship',
        badgeBg: 'bg-emerald-50 text-emerald-700'
    },
    {
        period: '2022 - 2023',
        role: 'Frontend Specialist',
        company: 'Campus Lab',
        description: 'Membangun komponen web modern untuk sistem informasi riset internal dan portal pendaftaran kegiatan mahasiswa.',
        badge: 'Freelance',
        badgeBg: 'bg-purple-50 text-purple-700'
    },
    {
        period: '2023 - Present',
        role: 'Staff Divisi Web & Teknologi',
        company: 'Himpunan Mahasiswa Informatika',
        description: 'Mengelola pemeliharaan portal digital mahasiswa, repositori komunitas kampus, serta mentoring sesi workshop web dasar.',
        badge: 'Organization',
        badgeBg: 'bg-indigo-50 text-indigo-700'
    },
    {
        period: '2023 - 2024',
        role: 'Core Member - Web Track',
        company: 'Google Developer Student Clubs (GDSC)',
        description: 'Mengikuti riset kolaboratif teknologi web modern, studi kasus React ecosystem, dan integrasi cloud services.',
        badge: 'Community',
        badgeBg: 'bg-amber-50 text-amber-700'
    },
    {
        period: '2023',
        role: 'Koordinator Perlengkapan & IT',
        company: 'National Tech Seminar & Expo',
        description: 'Memimpin tim teknis dalam infrastruktur sistem registrasi online dan kelancaran multimedia acara.',
        badge: 'Committee',
        badgeBg: 'bg-rose-50 text-rose-700'
    }
];

export const mockCertifications = [
    {
        period: '2024',
        title: 'Menjadi React Web Developer Expert',
        issuer: 'Dicoding Indonesia',
        description: 'Mendalami arsitektur React modern, custom hooks, global state management, dan automated unit & integration testing.',
        badge: 'Verified',
        badgeBg: 'bg-emerald-50 text-emerald-700'
    },
    {
        period: '2024',
        title: 'Cloud Practitioner & Back-End Architecture',
        issuer: 'AWS Academy / Dicoding',
        description: 'Prinsip cloud computing, serverless functions, database hosting, IAM role security, dan dasar-dasar deployment.',
        badge: 'Credential',
        badgeBg: 'bg-blue-50 text-blue-700'
    },
    {
        period: '2023',
        title: 'Relational Database & SQL Specialist',
        issuer: 'Oracle Academy',
        description: 'Perancangan skema database terintegrasi, teknik normalisasi 1NF-3NF, indexing query, dan transaksi data ACID.',
        badge: 'Certified',
        badgeBg: 'bg-gray-100 text-gray-700'
    }
];

export const mockMarqueeImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80'
];

