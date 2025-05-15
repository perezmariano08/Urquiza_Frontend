import { useEffect, useState } from 'react';
import api from '../../api/axios';
import DataTable from '../../components/DataTable/DataTable';

export default function AlumnosPage() {
    const [alumnos, setAlumnos] = useState([]);
    const columns = [
        { field: 'apellido', header: 'Apellido' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'dni', header: 'DNI' },
        { field: 'fecha_nacimiento', header: 'Fecha de Nacimiento' }
    ];
    
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
        <DataTable 
            data={alumnos} 
            columns={columns} 
            paginator
        />
    );
}
