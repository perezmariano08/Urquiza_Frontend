import React from 'react'
import DataTable from '../../../components/DataTable/DataTable';
import { useTutores } from '../../../api/tutores/UseTutores';
import { useUsuarios } from '../../../api/usuarios/useUsuarios';

const Usuarios = () => {
    const { data: usuarios } = useUsuarios();
    const columns = [
        { field: 'apellido', header: 'Apellido' },
        { field: 'nombre', header: 'Nombre' },
    ];
    return (
        <DataTable
            data={usuarios} 
            columns={columns} 
        />
    )
}

export default Usuarios