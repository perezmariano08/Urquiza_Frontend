import React, { useEffect, useState } from 'react'
import { AsideHeader, AsideMenu, AsideMenuTitulo, AsideStyled } from './AsideStyles'
import { PiChalkboardTeacher, PiCheckerboardLight, PiCheckSquareLight, PiPencilLineFill, PiStudent, PiUsers } from "react-icons/pi";
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RiAccountPinCircleLine, RiDashboardLine, RiLogoutBoxFill, RiLogoutBoxLine, RiLogoutCircleLine } from "react-icons/ri";
import { PiChalkboardSimple } from "react-icons/pi";
import { LiaCertificateSolid } from "react-icons/lia";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user/userSlice';

const Aside = ({ isOpen, user }) => {
    const [hasMounted, setHasMounted] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const dispatch = useDispatch()

    const handleLogout = () => {
        navigate('/login')
        dispatch(logout()); // Despacha la acción para eliminar el usuario del estado
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <AsideStyled
                    initial={hasMounted ? { x: -350, opacity: 0, width: 0 } : false}
                    animate={{ x: 0, opacity: 1, width: 350 }}
                    exit={{ x: -350, opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <AsideHeader>
                        <h1>Urquiza<span>Software</span></h1>
                    </AsideHeader>
                    <AsideMenuTitulo>
                        <h3>Menú</h3>
                    </AsideMenuTitulo>
                    <AsideMenu>
                        <li><NavLink to={'/admin/dashboard'}><RiDashboardLine />Dashboard</NavLink></li>
                        <li><NavLink to={'/admin/alumnos'}><PiStudent />Alumnos</NavLink></li>
                        <li><NavLink to={'/admin/cursos'} end><PiChalkboardSimple />Cursos</NavLink></li>
                        <li><NavLink to={'/admin/docentes'}><PiChalkboardTeacher />Docentes</NavLink></li>
                        <li><NavLink to={'/admin/grados'}><LiaCertificateSolid />Grados</NavLink></li>
                        <li><NavLink to={'/admin/tutores'}><PiUsers />Tutores</NavLink></li>
                    </AsideMenu>
                    {
                        user.id_rol === 1 && <>
                            <AsideMenuTitulo style={{marginTop: '20px'}}>
                                <h3>admin</h3>
                            </AsideMenuTitulo>
                            <AsideMenu>
                                <li><NavLink to={'/admin/usuarios'}><RiAccountPinCircleLine />Usuarios</NavLink></li>
                                <li><NavLink to={'/admin/observaciones'}><PiUsers />Observaciones</NavLink></li>
                            </AsideMenu>
                        </>
                    }

                    {
                        user.id_rol === 2 && <>
                            <AsideMenuTitulo style={{marginTop: '20px'}}>
                                <h3>docente</h3>
                            </AsideMenuTitulo>
                            <AsideMenu>
                                <li><NavLink to={`/admin/cursos/${user?.id_curso}`}><PiChalkboardSimple />Mi aula</NavLink></li>
                                <li><NavLink to={`/admin/observaciones/`}><PiPencilLineFill />Mis observaciones</NavLink></li>
                                <li><NavLink to={`/admin/asistencias/`}><PiCheckerboardLight />Control de Asistencia</NavLink></li>
                            </AsideMenu>
                        </>
                    }

                    <AsideMenuTitulo style={{marginTop: '20px'}}>
                        <h3>sistema</h3>
                    </AsideMenuTitulo>
                    <AsideMenu>
                        <li onClick={handleLogout}><NavLink className='logout' to={'/admin/dashboard'}><RiLogoutBoxLine />Salir</NavLink></li>
                    </AsideMenu>
                </AsideStyled>
            )}
        </AnimatePresence>
    );
};

export default Aside;
