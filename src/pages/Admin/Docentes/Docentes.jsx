import { useDocentes } from '../../../api/docentes/useDocentes';
import DataTable from '../../../components/DataTable/DataTable';
import { DocentesMain } from './DocentesStyles';

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
        <DocentesMain>
            <DataTable
                data={docentes} 
                columns={columns} 
                rowClickBasePath="/admin/docentes"
                rowClickIdField="id_docente"
            />
        </DocentesMain>
        
    )
}

export default Docentes