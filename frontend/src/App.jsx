import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar nantinya bisa disisipkan di sini agar muncul di semua halaman */}
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            {/* Rute untuk halaman utama pengunjung */}
            <Route path="/" element={<Home />} />

            {/* Rute ini akan kita buat nanti */}
            {/* <Route path="/project/:slug" element={<ProjectDetail />} /> */}
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;