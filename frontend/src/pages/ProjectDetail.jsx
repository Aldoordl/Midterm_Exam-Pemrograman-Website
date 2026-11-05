import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProjectDetail() {
    // Mengambil parameter 'slug' dari URL browser (misal: /project/sistem-kasir)
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Meminta data satu proyek spesifik ke backend berdasarkan slug
        axios.get(`http://127.0.0.1:5000/api/projects/${slug}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setProject(response.data.data);
                } else {
                    setError(response.data.message);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Gagal mengambil detail proyek:", err);
                setError("Terjadi kesalahan saat memuat data proyek.");
                setIsLoading(false);
            });
    }, [slug]);

    if (isLoading) {
        return <div className="text-center py-20 text-gray-500">Memuat studi kasus...</div>;
    }

    if (error || !project) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Proyek Tidak Ditemukan</h2>
                <p className="text-gray-600 mb-6">{error || "Proyek yang Anda cari mungkin sudah dihapus atau disembunyikan."}</p>
                <Link to="/" className="text-blue-600 hover:underline">&larr; Kembali ke Beranda</Link>
            </div>
        );
    }

    return (
        <article className="bg-white p-6 md:p-10 rounded-lg shadow-sm border mt-4">
            {/* Tombol Kembali */}
            <Link to="/" className="text-gray-500 hover:text-blue-600 mb-8 inline-block transition-colors">
                &larr; Kembali ke Beranda
            </Link>

            {/* Header Proyek */}
            <header className="mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{project.title}</h1>

                {/* Label Teknologi */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack && project.tech_stack.map((tech, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Tombol Aksi Eksternal */}
                <div className="flex gap-4">
                    {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                            className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-md font-medium text-sm transition-colors">
                            Lihat di GitHub
                        </a>
                    )}
                    {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                            className="border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-5 py-2 rounded-md font-medium text-sm transition-colors">
                            Live Demo
                        </a>
                    )}
                </div>
            </header>

            {/* Gambar Utama (Jika ada) */}
            {project.image_url && (
                <div className="mb-10 rounded-lg overflow-hidden border">
                    <img src={project.image_url} alt={`Screenshot ${project.title}`} className="w-full object-cover max-h-[500px]" />
                </div>
            )}

            {/* Konten Studi Kasus */}
            {/* Catatan: Untuk keamanan dasar React, konten dari database harus dirender menggunakan dangerouslySetInnerHTML jika berbentuk HTML */}
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {project.content}
            </div>
        </article>
    );
}

export default ProjectDetail;