import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const ProtectedRoute = () => {
    const { authData, isAuthChecked } = useAuth();

    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }

    return authData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;