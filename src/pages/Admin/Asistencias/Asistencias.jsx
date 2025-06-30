import React, { useMemo, useState } from 'react';
import { useAsistenciasDocente, useCodigosAusentismo, useCrearAsistenciaObservacion, useDocente, useEliminarAsistenciaObservacion } from '../../../api/docentes/useDocentes';
import DataTable from '../../../components/DataTable/DataTable';
import { AsistenciasMain } from './AsistenciasStyles';
import InputTextWrapper from '../../../components/UI/InputText/InputTextWrapper';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { PiPlus } from 'react-icons/pi';
import Button from '../../../components/UI/Button/Button';
import Form from '../../../components/UI/Form/Form';
import InputText from '../../../components/UI/InputText/InputText';
import InputTextarea from '../../../components/UI/InputTextarea/InputTextarea';
import useForm from '../../../hooks/useForm';
import { useToast } from '../../../context/ToastContext';
import { BsTrash3 } from "react-icons/bs";
import { generarExcelParteOficial } from '../../../utils/exportarexcel';


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

const Asistencias = ({ user, id_docente }) => {
    const { data: asistencias, isLoading } = useAsistenciasDocente(id_docente);
    
    const { data: docente } = useDocente(id_docente);
    console.log(docente);
    
    const { data: codigos } = useCodigosAusentismo();
    const toast = useToast(); // Usamos el hook para acceder al Toast
    const [modalVisible, setModalVisible] = useState(false);
    const [diaSeleccionado, setDiaSeleccionado] = useState(null); // { fecha: "YYYY-MM-DD", detalles: [...] }

    const mesActual = new Date().getMonth() + 1; // para que coincida con el value 1–12
    const anioActual = new Date().getFullYear();

    const datosFiltrados = asistencias?.filter(item => {
        const fechaItem = new Date(item.fecha);
        return (
            fechaItem.getMonth() + 1 === mesActual && 
            fechaItem.getFullYear() === anioActual
        );
    });

    const [mesSeleccionado, setMesSeleccionado] = useState(mesActual);
    const [anioSeleccionado] = useState(anioActual); // Si querés que cambie el año, también podés hacerlo.
    const hoy = new Date().toLocaleDateString('en-CA'); // "YYYY-MM-DD"

    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        codigo: 99,
        fecha: hoy,        // ✅ fecha por defecto
        id_docente: id_docente,
        errores: ''
    });
    
    

    // Mapa asistencia: ej. "2025-04-08" => "DG"
    const mapAsistencias = {};
    asistencias?.forEach(({ id_asistencia, fecha, detalle }) => {
        const key = new Date(fecha).toISOString().split("T")[0];
        if (!mapAsistencias[key]) mapAsistencias[key] = [];
        mapAsistencias[key].push({ id: id_asistencia, detalle });
    });



    // Generar estructura de calendario por semanas
    const generarSemanasDelMes = (anio, mes) => {
    const semanas = [];
    const primerDiaMes = new Date(anio, mes - 1, 1);
    const ultimoDiaMes = new Date(anio, mes, 0);
    let diaActual = new Date(primerDiaMes);

    while (diaActual.getDay() !== 1) {
        diaActual.setDate(diaActual.getDate() - 1);
    }

    while (diaActual <= ultimoDiaMes || diaActual.getDay() !== 1) {
        const semana = {};
        diasSemana.forEach((_, i) => {
            const clave = diaActual.toISOString().split("T")[0];
            const enMes = diaActual.getMonth() === (mes - 1);
            semana[diasSemana[i]] = enMes ? {
                dia: diaActual.getDate(),
                detalles: mapAsistencias[clave] || []
            } : null;
            diaActual.setDate(diaActual.getDate() + 1);
        });
        semanas.push(semana);
    }

    return semanas;
};


    const data = generarSemanasDelMes(anioSeleccionado, mesSeleccionado);
    const renderCelda = (rowData, column) => {
        const celda = rowData[column.field];

        if (!celda) {
            return <div style={{ background: "var(--teal-50)", height: "100%", padding: 4, minHeight: 75}} />;
        }

        const isFinDeSemana = column.field === "Sáb" || column.field === "Dom";
        const backgroundColor = isFinDeSemana ? "var(--red-50)" : "#fff";

        return (
            <div 
                onClick={() => {
                    const fecha = `${anioSeleccionado}-${String(mesSeleccionado).padStart(2, '0')}-${String(celda.dia).padStart(2, '0')}`;                    
                    setDiaSeleccionado({ fecha, detalles: celda.detalles });
                    setModalVisible(true);
                }}
                style={{
                    cursor: 'pointer',
                    background: backgroundColor,
                    padding: 10,
                    minHeight: 75,
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'start',
                    gap: 10
                }}
            >
            <div style={{fontWeight: "bold", fontSize: 16 }}>{celda.dia}</div>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                    {celda.detalles.map(({ id, detalle }, idx) => (
                        <div
                            key={id}
                            style={{
                                marginTop: 4,
                                background: "var(--teal-100)",
                                color: "var(--teal-900)",
                                borderRadius: 4,
                                fontWeight: 'bold',
                                padding: "2px 4px",
                                fontSize: "0.8rem",
                                minWidth: 40
                            }}
                        >
                            {detalle}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    console.log(asistencias);
    

    const columns = diasSemana.map(dia => ({
        field: dia,
        header: dia,
        body: (rowData) => renderCelda(rowData, { field: dia }),
        style: { width: "80px", textAlign: "center" }
    }));


    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const { mutateAsync: crearAsistenciaObservacion, isPending } = useCrearAsistenciaObservacion();
    const validarCampos = () => {
        const errores = {};
        
        if (!formState.fecha) errores.fecha = 'Este campo es obligatorio';
        if (!formState.codigo) errores.codigo = 'Este campo es obligatorio';

        setFormState({
            ...formState,
            errores // ⬅️ Actualiza solo la propiedad de errores
        });

        return Object.keys(errores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarCampos()) return;

        try {
            const response = await crearAsistenciaObservacion({
                fecha: diaSeleccionado.fecha,
                id_docente: id_docente,
                codigo: formState.codigo
            });

            toast.current.show({
                severity: 'success',
                summary: "Éxito",
                detail: response.message || "Observación añadida correctamente",
                life: 3000,
            });

            setModalVisible(false)
            setMostrarFormulario(false);
            resetForm();

        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: "Error",
                detail: error?.message || "No se pudo crear la observación",
                life: 3000,
            });
        }
    };

    const { mutate: eliminarObservacion } = useEliminarAsistenciaObservacion();

    const handleEliminarDetalle = (id_asistencia) => {
        
        eliminarObservacion(id_asistencia, {
            onSuccess: () => {
                toast.current.show({
                    severity: "success",
                    summary: "Éxito",
                    detail: "Observación eliminada correctamente",
                    life: 3000,
                })
                setModalVisible(false)
            },
            onError: () => {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "No se pudo eliminar la observación",
                    life: 3000,
                });
            }
        });
    };

    return (
        <AsistenciasMain>
            <InputTextWrapper label={'Mes:'} width={300}>
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

            <Button onClick={() => generarExcelParteOficial(datosFiltrados, docente)}>Exportar a Excel</Button>

            {modalVisible && diaSeleccionado && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <Form
                            buttons={
                                <>
                                    <Button 
                                        type="submit" 
                                        onClick={handleSubmit} 
                                        disabled={isPending} 
                                        loading={isPending} // si tu componente Button soporta esta prop
                                    >
                                        {isPending ? 'Guardando...' : 'Guardar'}
                                    </Button>
                                    <Button background='red-500' onClick={() => {
                                        setModalVisible(false)
                                        setFormState({
                                            ...formState,
                                            errores: {}// ⬅️ Actualiza solo la propiedad de errores
                                        });
                                    }}>
                                        Cancelar
                                    </Button>
                                </>
                            }
                            width={'50%'}
                        >
                            <InputTextWrapper label={"Fecha:"} >
                                <InputText
                                    type={"date"}
                                    name="fecha"
                                    value={diaSeleccionado.fecha?.split('T')[0] || ''}
                                    onChange={handleFormChange}
                                    error={formState.errores.fecha}
                                />
                            </InputTextWrapper>
                            <InputTextWrapper label={"Observación:"}>
                                <Dropdown
                                    name="codigo" // <--- esto es clave
                                    value={formState.codigo}
                                    onChange={handleFormChange} // el value ya es el objeto
                                    options={codigos}
                                    optionLabel="detalle"
                                    optionValue="codigo"
                                    placeholder={'Seleccione observación'}
                                    error={formState.errores.codigo}
                                />
                            </InputTextWrapper>
                        </Form>
                        <ul>
                            {diaSeleccionado.detalles.map(({ id, detalle }) => (
                                <li key={id} style={{ marginBottom: 10 }}>
                                    <strong>{detalle}</strong>
                                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                        <Button small background="red-500" onClick={() => handleEliminarDetalle(id)}>
                                            <BsTrash3 />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </AsistenciasMain>
    );
};

export default Asistencias;
