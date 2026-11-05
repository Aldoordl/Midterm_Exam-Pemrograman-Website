import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo / Nama */}
                <Link to="/" className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    Dev<span className="text-blue-600">Porto.</span>
                </Link>

                {/* Menu Links */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        Beranda
                    </Link>
                    <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                        Hubungi Saya
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;