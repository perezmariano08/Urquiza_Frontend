import { useDocentes } from '../../../api/docentes/useDocentes';
import DataTable from '../../../components/DataTable/DataTable';

const Docentes = ({user}) => {
    const { data: docentes } = useDocentes();
    const columns = [
        { field: 'apellido', header: 'Apellido' },
        { field: 'nombre', header: 'Nombre' },
        ...(user.id_rol !== 2 ? [
            { field: 'dni', header: 'DNI' },
            { field: 'cargo', header: 'Cargo' }
        ] : []),
        { field: 'email', header: 'Email' },
        { field: 'telefono', header: 'Tel' },
    ];

    return (
        <DataTable
            data={docentes} 
            columns={columns} 
        />
    )
}

export default Docentes