import React, { useState } from 'react';
import DataTable from '../../../components/DataTable/DataTable';
import { useCrearObservacion, useObservacionesDocente } from '../../../api/observaciones/useObservaciones';
import { NavLink } from 'react-router-dom';
import { formatearFecha } from '../../../utils/formatearFecha';
import { Skeleton } from 'primereact/skeleton';
import Button from '../../../components/UI/Button/Button';
import Form from '../../../components/UI/Form/Form';
import InputTextWrapper from '../../../components/UI/InputText/InputTextWrapper';
import InputText from '../../../components/UI/InputText/InputText';
import useForm from '../../../hooks/useForm';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { useAlumnosCurso } from '../../../api/alumnos/useAlumnos';
import { ObservacionesMain } from './ObservacionesStyles';
import InputTextarea from '../../../components/UI/InputTextarea/InputTextarea';
import { PiPlus } from "react-icons/pi";
import { useToast } from '../../../context/ToastContext';

const Observaciones = ({ user }) => {
    const { data: observaciones, isLoading } = useObservacionesDocente(user?.id_docente);
    const { data: alumnos } = useAlumnosCurso(user?.id_curso);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const toast = useToast(); // Usamos el hook para acceder al Toast
    
    // Manejo del form
    const hoy = new Date().toLocaleDateString('en-CA'); // "YYYY-MM-DD"

    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        observacion: '',
        fecha: hoy,        // ✅ fecha por defecto
        id_alumno: '',
        errores: ''
    });

    const columns = [
        {
            field: 'fecha',
            header: 'Fecha',
            body: row => formatearFecha(row.fecha),
            sortable: true,
            style: { width: '150px' } // ✅ Objeto con propiedad width
        },
        {
            field: 'alumno',
            header: 'Alumno/a',
            body: row => (
                <NavLink style={{ color: 'var(--teal-500)' }} to={`/admin/alumnos/${row.id_alumno}`}>
                    {row.alumno}
                </NavLink>
            ),
            style: { width: '300px' } // ✅ Objeto con propiedad width

        },
        {
            field: 'observacion',
            header: 'Observación',
        },
    ];

    const skeletonColumns = columns.map(col => ({
        ...col,
        body: (
            <Skeleton
                width={
                    col.field === 'fecha' ? 80 :
                    col.field === 'alumno' ? 200 :
                    'auto' // valor por defecto para otros campos
                }
                height={20.8}
            />
        ),
    }));


    const getSkeletonData = (count) => Array.from({ length: count }, () => ({}));
    const rowsPerPage = 15;

    const { mutateAsync: crearObservacion, isPending } = useCrearObservacion();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarCampos()) return;

        try {
            const response = await crearObservacion({
                fecha: formState.fecha,
                id_alumno: formState.id_alumno,
                id_docente: user.id_docente,
                observacion: formState.observacion,
            });

            toast.current.show({
                severity: 'success',
                summary: "Éxito",
                detail: response.message || "Observación añadida correctamente",
                life: 3000,
            });

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



    const validarCampos = () => {
        const errores = {};
        
        if (!formState.fecha) errores.fecha = 'Este campo es obligatorio';
        if (!formState.observacion.trim()) errores.observacion = 'Este campo es obligatorio';
        if (!formState.id_alumno) errores.id_alumno = 'Este campo es obligatorio';

        setFormState({
            ...formState,
            errores // ⬅️ Actualiza solo la propiedad de errores
        });

        return Object.keys(errores).length === 0;
    };


    return (
        <ObservacionesMain>
            {!mostrarFormulario && <Button onClick={() => setMostrarFormulario(true)}><PiPlus />añadir observación</Button>}
            {mostrarFormulario && (
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
                            <Button background='red-500' onClick={() => setMostrarFormulario(false)}>
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
                            value={formState.fecha?.split('T')[0] || ''}
                            onChange={handleFormChange}
                            error={formState.errores.fecha}
                        />
                    </InputTextWrapper>
                    <InputTextWrapper label={"Alumno:"}>
                        <Dropdown
                            name="id_alumno" // <--- esto es clave
                            value={formState.id_alumno}
                            onChange={handleFormChange} // el value ya es el objeto
                            options={alumnos}
                            optionLabel="alumno"
                            optionValue="id_alumno"
                            placeholder={'Seleccione alumno'}
                            error={formState.errores.id_alumno}

                        />
                    </InputTextWrapper>
                    <InputTextWrapper label={"Observación:"} full>
                        <InputTextarea
                            name="observacion"
                            value={formState.observacion}
                            onChange={handleFormChange}
                            rows={10} 
                            cols={80}
                            error={formState.errores.observacion}
                        />
                    </InputTextWrapper>
                </Form>
            )}
            
            <DataTable
                data={isLoading ? getSkeletonData(rowsPerPage) : observaciones}
                columns={isLoading ? skeletonColumns : columns}
                rows={rowsPerPage}
            />
        </ObservacionesMain>
        
    );
};

export default Observaciones;
