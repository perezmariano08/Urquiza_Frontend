import React from 'react'
import { useCursos } from '../../../api/cursos/useCursos';
import DataTable from '../../../components/DataTable/DataTable';
import { CursosMain } from './CursosStyles';

const Cursos = ({user}) => {
    const { data: cursos } = useCursos();
    const currentYear = new Date().getFullYear();

    // Filtrar cursos del año actual
    const cursosActuales = cursos?.filter(c => c.ciclo_lectivo === currentYear) || [];
    // Filtrar cursos de años anteriores
    const cursosAnteriores = cursos?.filter(c => c.ciclo_lectivo !== currentYear) || [];

    // Agrupar los cursos actuales por turno
    const cursosPorTurno = {
        Mañana: cursosActuales.filter(c => c.turno === 'M'),
        Tarde: cursosActuales.filter(c => c.turno === 'T'),
    };

    const columns = [
        { field: 'grado', header: 'Grado' },
        { field: 'ciclo_lectivo', header: 'Ciclo Lectivo' },
        { field: 'docente', header: 'Docente' },
        { field: 'cantidad_alumnos', header: 'Alumnos/as' }
    ];


    return (
        <CursosMain>
            <h2>Ciclo Lectivo {currentYear} - Turno Mañana</h2>
            <DataTable
                data={cursosPorTurno.Mañana}
                columns={columns}
                rowClickBasePath="/admin/cursos"
                rowClickIdField="id_curso"
            />

            <h2>Ciclo Lectivo {currentYear} - Turno Tarde</h2>
            <DataTable
                data={cursosPorTurno.Tarde}
                columns={columns}
                rowClickBasePath="/admin/cursos"
                rowClickIdField="id_curso"
            />

            <h2>Ciclos Lectivos anteriores</h2>
            <DataTable
                data={cursosAnteriores}
                columns={columns}
                rowClickBasePath="/admin/cursos"
                rowClickIdField="id_curso"
            />
        </CursosMain>
    )
}

export default Cursos;
