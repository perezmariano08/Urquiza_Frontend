import React from 'react'
import { useAlumnosCurso } from '../../../../api/alumnos/useAlumnos';
import { NavLink, useParams } from 'react-router-dom';
import DataTable from '../../../../components/DataTable/DataTable';
import { DashboardItemText, DashboardItemWrapper } from '../../Dashboard/DashboardStyles';
import { PiStudent } from 'react-icons/pi';
import { CursosMain } from '../CursosStyles';

const Curso = () => {
    const id_curso = parseInt(useParams().id_curso);
    const { data: alumnos } = useAlumnosCurso(id_curso);
    const columns = [
        { field: 'dni', header: 'DNI' },
        { field: 'alumno', header: 'Alumno' },
    ];

    return (
        <CursosMain>
            <DashboardItemWrapper>
                <PiStudent />
                <DashboardItemText >
                    <h3>{alumnos?.length}</h3>
                    <p>Alumnos</p>
                    <NavLink to={`/admin/alumnos`}>Ver todos los alumnos</NavLink>
                </DashboardItemText>
            </DashboardItemWrapper>
            <DataTable
                data={alumnos} 
                columns={columns} 
                rowClickBasePath="/admin/alumnos"
                rowClickIdField="id_alumno"
            />
        </CursosMain>
        
    )
}

export default Curso