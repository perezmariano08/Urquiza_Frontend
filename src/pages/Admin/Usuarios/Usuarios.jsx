import React from 'react'
import DataTable from '../../../components/DataTable/DataTable';
import { useTutores } from '../../../api/tutores/UseTutores';
import { useUsuarios } from '../../../api/usuarios/useUsuarios';
import { NavLink } from 'react-router-dom';
import { UsuariosMain } from './UsuariosStyles';

const Usuarios = () => {
    const { data: usuarios } = useUsuarios();
    const columns = [
        { field: 'apellido', header: 'Apellido' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'rol', header: 'Rol' },
        {
            field: 'curso',
            header: 'Curso',
            body: row => (
                <NavLink style={{ color: 'var(--teal-500)' }} to={`/admin/cursos/${row.id_curso}`}>
                    {row.curso}
                </NavLink>
            ),
            style: { width: '300px' } // ✅ Objeto con propiedad width

        },
    ];
    return (
        <UsuariosMain>
            <DataTable
                data={usuarios} 
                columns={columns} 
            />
        </UsuariosMain>
        
    )
}

export default Usuarios