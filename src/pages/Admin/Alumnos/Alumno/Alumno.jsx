import React from 'react'
import { useParams } from 'react-router-dom';
import { useAlumno, useAlumnosObservaciones } from '../../../../api/alumnos/useAlumnos';
import { useCursosAlumno } from '../../../../api/cursos/useCursos';
import DataTable from '../../../../components/DataTable/DataTable';
import { formatearFecha } from '../../../../utils/formatearFecha';
import { AlumnoInformacion, AlumnoInformacionWrapper, AlumnoMain } from '../AlumnosStyles';

const Alumno = () => {
    const id_alumno = parseInt(useParams().id_alumno);
    const { data: observaciones } = useAlumnosObservaciones(id_alumno);
    const { data: alumno } = useAlumno(id_alumno);
    const { data: cursos } = useCursosAlumno(id_alumno);
    const cursoActual = cursos?.find((c) => c.ciclo_lectivo === new Date().getFullYear())
    console.log(cursos);
    

    console.log(alumno);
    
    const columns = [
        {
            field: 'fecha',
            header: 'Fecha',
            body: (rowData) => formatearFecha(rowData.fecha),
        },    
        { field: 'observacion', header: 'Observación' },
    ];

    const columnsCursos = [
        { field: 'grado', header: 'Grado' },
        { field: 'division', header: 'División' },
        {
            field: 'turno',
            header: 'Turno',
            body: (rowData) => rowData.turno === 'M' ? 'Mañana' : rowData.turno === 'T' ? 'Tarde' : '',
        },         
        { field: 'ciclo_lectivo', header: 'Ciclo Lectivo' },
    ];

    return (
        <AlumnoMain>
            <AlumnoInformacionWrapper>
                <h1>{alumno?.apellido}, {alumno?.nombre}</h1>
                <AlumnoInformacion>
                    <li><span>Dni</span>: {alumno?.dni}</li>
                    <li><span>Genero</span>: </li>
                    <li><span>Fecha de nacimiento</span>: {formatearFecha(alumno?.fecha_nacimiento)}</li>
                    <li><span>Dirección</span>: {alumno?.direccion}</li>
                    <li><span>Telefono</span>: {alumno?.telefono}</li>
                    <li><span>Curso actual</span>: {cursoActual?.abreviacion} {cursoActual?.division}</li>
                    <li><span>Madre</span>: </li>
                    <li><span>Padre</span>: </li>
                </AlumnoInformacion>
            </AlumnoInformacionWrapper>
            {
                observaciones?.length > 0 && <DataTable
                    data={observaciones} 
                    columns={columns} 
                />
            }
            <DataTable
                data={cursos} 
                columns={columnsCursos} 
            />
        </AlumnoMain>
        
    )
}

export default Alumno