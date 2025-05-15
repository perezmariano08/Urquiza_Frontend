import React from 'react'
import { useAlumnosCurso } from '../../../../api/alumnos/useAlumnos';
import { useParams } from 'react-router-dom';
import DataTable from '../../../../components/DataTable/DataTable';

const Curso = () => {
    const id_curso = parseInt(useParams().id_curso);
    const { data: alumnos } = useAlumnosCurso(id_curso);
    const columns = [
        { field: 'dni', header: 'DNI' },
        { field: 'alumno', header: 'Alumno' },
    ];

    return (
        <DataTable
            data={alumnos} 
            columns={columns} 
            rowClickBasePath="/admin/alumnos"
            rowClickIdField="id_alumno"
        />
    )
}

export default Curso