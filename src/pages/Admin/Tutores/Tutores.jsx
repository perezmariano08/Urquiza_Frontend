import React from 'react'
import DataTable from '../../../components/DataTable/DataTable';
import { useTutores } from '../../../api/tutores/UseTutores';
import { NavLink } from 'react-router-dom';
import { TutoresMain } from './TutoresStyles';
import InputText from '../../../components/UI/InputText/InputText';
import { useState } from 'react';

const Tutores = () => {
    const { data: tutores } = useTutores();
    const [filtro, setFiltro] = useState('');
    const tutoresFiltrados = tutores?.filter(a => {
        const texto = filtro.toLowerCase();
        return (
            a.nombre?.toLowerCase().includes(texto) ||
            a.apellido?.toLowerCase().includes(texto) ||
            a.dni?.toString().includes(texto)
        );
    }) || [];

    const columns = [
        { field: 'dni', header: 'DNI' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'parentesco', header: 'Parentesco' },
        {
            field: 'alumno',
            header: 'Alumno/a',
            body: row => (
                <NavLink style={{ color: 'var(--teal-500)' }} to={`/admin/alumnos/${row.id_alumno}`}>
                    {row.alumno}
                </NavLink>
            ),
        },
    ];
    
    return (
        <TutoresMain>
            <InputText
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar por DNI, nombre o apellido"
            />
            <DataTable
                data={tutoresFiltrados} 
                columns={columns} 
            />
        </TutoresMain>
        
    )
}

export default Tutores