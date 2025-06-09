import React, { useState } from 'react';
import { useAsistenciasDocente } from '../../../api/docentes/useDocentes';
import DataTable from '../../../components/DataTable/DataTable';
import { AsistenciasMain } from './AsistenciasStyles';
import InputTextWrapper from '../../../components/UI/InputText/InputTextWrapper';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const meses = [
    { label: "Enero", value: 1 },
    { label: "Febrero", value: 2 },
    { label: "Marzo", value: 3 },
    { label: "Abril", value: 4 },
    { label: "Mayo", value: 5 },
    { label: "Junio", value: 6 },
    { label: "Julio", value: 7 },
    { label: "Agosto", value: 8 },
    { label: "Septiembre", value: 9 },
    { label: "Octubre", value: 10 },
    { label: "Noviembre", value: 11 },
    { label: "Diciembre", value: 12 }
];
const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const Asistencias = ({ user }) => {
    const { data: asistencias, isLoading } = useAsistenciasDocente(user?.id_docente);
    const mesActual = new Date().getMonth() + 1; // para que coincida con el value 1–12
    const anioActual = new Date().getFullYear();

    const [mesSeleccionado, setMesSeleccionado] = useState(mesActual);
    const [anioSeleccionado] = useState(anioActual); // Si querés que cambie el año, también podés hacerlo.

    if (isLoading) return <div>Cargando asistencias...</div>;
    if (!asistencias || asistencias.length === 0) return <div>No hay asistencias para mostrar</div>;

    // Mapa asistencia: ej. "2025-04-08" => "DG"
    const mapAsistencias = {};
    asistencias.forEach(({ fecha, detalle }) => {
        const f = new Date(fecha);
        const key = f.toISOString().split("T")[0]; // YYYY-MM-DD
        mapAsistencias[key] = detalle;
    });

    // Generar estructura de calendario por semanas
    const generarSemanasDelMes = (anio, mes) => {
        const semanas = [];
        const primerDiaMes = new Date(anio, mes - 1 , 1);
        const ultimoDiaMes = new Date(anio, mes, 0);
        let diaActual = new Date(primerDiaMes);
        
        // Mover hacia atrás hasta lunes (1)
        while (diaActual.getDay() !== 1) {
        diaActual.setDate(diaActual.getDate() - 1);
        }

        while (diaActual <= ultimoDiaMes || diaActual.getDay() !== 1) {
        const semana = {};
        diasSemana.forEach((_, i) => {
            const clave = diaActual.toISOString().split("T")[0];
            const diaMes = diaActual.getMonth() === (mes - 1) ? diaActual.getDate() : "";
            semana[diasSemana[i]] = diaMes ? (mapAsistencias[clave] || diaMes) : "";
            diaActual.setDate(diaActual.getDate() + 1);
        });
        semanas.push(semana);
        }

        return semanas;
    };

    const data = generarSemanasDelMes(anioSeleccionado, mesSeleccionado);
    const renderCelda = (rowData, column) => {
        const valor = rowData[column.field];

        // Celdas vacías o que no son del mes
        if (valor === "") {
            return <div style={{ background: "#f0f0f0", height: "100%", padding: 4 }} />;
        }

        // Si el valor es un número → es un día del mes sin asistencia
        if (!isNaN(valor)) {
            return <div style={{ background: "#fff", height: "100%", padding: 4 }}>{valor}</div>;
        }

        // Si no es número → asumimos que es asistencia (ej. "DG")
        return (
            <div style={{ background: "var(--teal-100)", color: 'var(--teal-900)', height: "100%", padding: 4, fontWeight: 'bold' }}>
                {valor}
            </div>
        );
    };
    const columns = diasSemana.map(dia => ({
        field: dia,
        header: dia,
        body: (rowData) => renderCelda(rowData, { field: dia }),
        style: { width: "80px", textAlign: "center" }
    }));

    return (
        <AsistenciasMain>
            <InputTextWrapper label={'Mes:'}>
                <Dropdown 
                    value={mesSeleccionado} 
                    options={meses}
                    optionLabel={'label'}
                    optionValue={'value'}
                    onChange={e => setMesSeleccionado(Number(e.target.value))}
                />
            </InputTextWrapper>

            <DataTable
                data={data}
                columns={columns}
                scrollable
            />
        </AsistenciasMain>
    );
};

export default Asistencias;
