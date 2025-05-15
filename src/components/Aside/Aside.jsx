import React, { useEffect, useState } from 'react'
import { AsideHeader, AsideMenu, AsideMenuTitulo, AsideStyled } from './AsideStyles'
import { PiStudent } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RiDashboardLine } from "react-icons/ri";
import { PiChalkboardSimple } from "react-icons/pi";
import { LiaCertificateSolid } from "react-icons/lia";

const Aside = ({ isOpen }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

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
                        <li><NavLink to={'/admin/cursos'}><PiChalkboardSimple />Cursos</NavLink></li>
                        <li><NavLink to={'/admin/grados'}><LiaCertificateSolid />Grados</NavLink></li>
                    </AsideMenu>
                </AsideStyled>
            )}
        </AnimatePresence>
    );
};

export default Aside;
