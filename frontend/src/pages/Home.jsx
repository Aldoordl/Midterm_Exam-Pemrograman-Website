import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Meminta data ke backend Flask
        axios.get('http://127.0.0.1:5000/api/projects')
            .then((response) => {
                if (response.data.status === 'success') {
                    setProjects(response.data.data);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Gagal mengambil data:", error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {/* Bagian Perkenalan */}
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Halo, Saya Backend Developer</h1>
                <p className="text-lg text-gray-600">Selamat datang di portofolio saya. Berikut adalah beberapa proyek yang pernah saya kerjakan.</p>
            </header>

            {/* Galeri Proyek */}
            <section>
                <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Studi Kasus Proyek</h2>

                {isLoading ? (
                    <p className="text-center text-gray-500">Memuat data proyek...</p>
                ) : projects.length === 0 ? (
                    <p className="text-center text-gray-500">Belum ada proyek yang dipublikasikan.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Jika ada gambar dari Supabase Storage */}
                                {project.image_url && (
                                    <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
                                )}

                                <div className="p-5">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{project.short_description}</p>

                                    {/* Label Teknologi */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech_stack && project.tech_stack.map((tech, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Tombol ke Detail */}
                                    {/* Nanti akan kita hidupkan setelah halaman detail selesai */}
                                    {/* <Link to={`/project/${project.slug}`} className="text-blue-600 hover:underline font-medium">Baca Studi Kasus &rarr;</Link> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Home;