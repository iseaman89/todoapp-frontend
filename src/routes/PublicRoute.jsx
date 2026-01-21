import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';

const PublicRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    
    return user ? <Navigate to="/todo" replace /> : <Outlet />;
};

export default PublicRoute;