import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const token = localStorage.getItem('admin_token');

    // Jika tidak ada token, paksa pindah ke halaman login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Jika token ada, tampilkan halaman yang dituju
    return <Outlet />;
}

export default ProtectedRoute;