import React, { useEffect, useState } from 'react'
import api from '../../../api/axios';
import { useAlumnos } from '../../../api/alumnos/useAlumnos';
import { DashboardItemText, DashboardItemWrapper, DashboardMain } from './DashboardStyles';
import { PiStudent } from 'react-icons/pi';
import { useDocentes } from '../../../api/docentes/useDocentes';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    const { data: alumnos} = useAlumnos();
    const { data: docentes} = useDocentes();
    
    const columns = [
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'dni', header: 'DNI' },
        { field: 'fecha_nacimiento', header: 'Fecha de Nacimiento' }
    ];

    const alumnosSinDni = alumnos?.filter((a) => !a.dni)
    console.log(alumnosSinDni);
    
    useEffect(() => {
        const fetchAlumnos = async () => {
        try {
            const res = await api.get('/alumnos');
            setAlumnos(res.data);
        } catch (err) {
            console.error('Error al traer alumnos:', err);
        }
        };

        fetchAlumnos();
    }, []);
    return (
        <DashboardMain>
            <DashboardItemWrapper>
                <PiStudent />
                <DashboardItemText >
                    <h3>{alumnos?.length}</h3>
                    <p>Alumnos</p>
                    <NavLink to={`/admin/alumnos`}>Ver alumnos</NavLink>
                </DashboardItemText>
            </DashboardItemWrapper>
            <DashboardItemWrapper>
                <PiStudent />
                <DashboardItemText >
                    <h3>{docentes?.length}</h3>
                    <p>Docentes</p>
                    <NavLink to={`/admin/docentes`}>Ver docentes</NavLink>
                </DashboardItemText>
            </DashboardItemWrapper>
            <DashboardItemWrapper className='alert'>
                <PiStudent />
                <DashboardItemText >
                    <h3>{alumnosSinDni?.length}</h3>
                    <p>Alumnos sin DNI</p>
                    <NavLink to={`/admin/alumnos`}>Resolver</NavLink>
                </DashboardItemText>
            </DashboardItemWrapper>
        </DashboardMain>
    )
}

export default Dashboard
