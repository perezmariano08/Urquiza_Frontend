import React from 'react'
import DataTable from '../../../components/DataTable/DataTable';
import { useTutores } from '../../../api/tutores/UseTutores';
import { NavLink } from 'react-router-dom';

const Tutores = () => {
    const { data: tutores } = useTutores();
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

    console.log(tutores);
    
    return (
        <DataTable
            data={tutores} 
            columns={columns} 
        />
    )
}

export default Tutores