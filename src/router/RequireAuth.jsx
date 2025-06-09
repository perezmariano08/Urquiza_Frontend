import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   
    const location = useLocation();

    const isLogged = !!user || location.pathname === '/login' || location.pathname === '/registrar';

    return isLogged ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
