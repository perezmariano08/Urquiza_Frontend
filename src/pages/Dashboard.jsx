import React, { useEffect, useState } from 'react'
import api from '../api/axios';

const Dashboard = () => {
    const [alumnos, setAlumnos] = useState([]);
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
        <div>
            {
                alumnosSinDni.length > 0 && <div>Alerta! {alumnosSinDni.length} alumnos/as no tienen registrado DNI</div>
            }
        </div>
    )
}

export default Dashboard
