import React, { useState } from 'react'
import { useAlumnos } from '../../../api/alumnos/useAlumnos';
import DataTable from '../../../components/DataTable/DataTable';
import {formatearFecha} from '../../../utils/formatearFecha.js';
import { AlumnosMain } from './AlumnosStyles.js';
import InputText from '../../../components/UI/InputText/InputText.jsx';

const Alumnos = () => {
    const [filtro, setFiltro] = useState('');

    const { data: alumnos, isLoading, isError, error } = useAlumnos();

    const alumnosFiltrados = alumnos?.filter(a => {
        const texto = filtro.toLowerCase();
        return (
            a.nombre?.toLowerCase().includes(texto) ||
            a.apellido?.toLowerCase().includes(texto) ||
            a.dni?.toString().includes(texto)
        );
    }) || [];

    if (isLoading) return <div>Cargando alumnos...</div>;
    if (isError) return <div>Error al cargar alumnos: {error.message}</div>;


    const columns = [
        { field: 'apellido', header: 'Apellido', sortable:true },
        { field: 'nombre', header: 'Nombre', sortable:true },
        { field: 'dni', header: 'DNI' },
        {
            field: 'fecha_nacimiento',
            header: 'Fecha de nacimiento',
            body: (rowData) => formatearFecha(rowData.fecha_nacimiento), 
            sortable:true
        },
        { field: 'direccion', header: 'Dirección' },
        {
            field: 'telefono',
            header: 'Teléfono',
        },
    ];
    
    return (
        <AlumnosMain>
            <InputText
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar por DNI, nombre o apellido"
            />
            <DataTable
                data={alumnosFiltrados} 
                columns={columns} 
                rowClickBasePath="/admin/alumnos"
                rowClickIdField="id_alumno"
                paginator
            />
        </AlumnosMain>
        
    )
}

export default Alumnos
