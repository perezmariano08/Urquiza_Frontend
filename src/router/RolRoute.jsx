import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RolRoute = ({ allowedRoles }) => {
    const user = useSelector(state => state.user.user);

    if (!user) {
        // No está autenticado: redirige al login
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.id_rol)) {
        // Usuario no tiene permiso: redirige a página de "No autorizado" o al home
        return <Navigate to="/admin/dashboard" replace />;
    }

    // Usuario autorizado: renderiza las rutas hijas
    return <Outlet />;
};

export default RolRoute;
