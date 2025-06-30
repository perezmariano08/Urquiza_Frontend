import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { useAlumno, useAlumnosObservaciones, useUpdateAlumno } from '../../../../api/alumnos/useAlumnos';
import { useCursosAlumno } from '../../../../api/cursos/useCursos';
import DataTable from '../../../../components/DataTable/DataTable';
import { formatearFecha } from '../../../../utils/formatearFecha';
import { AlumnoHeader, AlumnoHeaderDatos, AlumnoHeaderDatosCurso, AlumnoHeaderDatosItem, AlumnoInformacion, AlumnoInformacionAlerta, AlumnoInformacionAlertaLista, AlumnoInformacionWrapper, AlumnoMain } from '../AlumnosStyles';
import useForm from '../../../../hooks/useForm';
import Form from '../../../../components/UI/Form/Form';
import InputText from '../../../../components/UI/InputText/InputText';
import InputTextWrapper from '../../../../components/UI/InputText/InputTextWrapper';
import Button from '../../../../components/UI/Button/Button';
import Dropdown from '../../../../components/UI/Dropdown/Dropdown';
import { useTutoresAlumno } from '../../../../api/tutores/UseTutores';
import { capitalizar } from '../../../../utils/capitalizar';
import { Skeleton } from 'primereact/skeleton';
import { useArchivosAlumno } from '../../../../api/archivos/UseArchivos';
import { URL_UPLOADS } from '../../../../utils/constants';
import Checkbox from '../../../../components/UI/Checkbox/Checkbox';
import AlumnoMenu from './AlumnoMenu';
import { calcularEdad } from '../../../../utils/calcularEdad';
import { PiChalkboardSimple } from 'react-icons/pi';
import { LiaUserCheckSolid, LiaUserTimesSolid } from 'react-icons/lia';

const Alumno = ({user}) => {
    const id_alumno = parseInt(useParams().id_alumno);
    // const { data: observaciones } = useAlumnosObservaciones(id_alumno);
    const { data: alumno, isLoading: alumnoLoading } = useAlumno(id_alumno);
    const { data: cursos } = useCursosAlumno(id_alumno);
    
    // const { data: tutores } = useTutoresAlumno(id_alumno);
    // const { data: archivos } = useArchivosAlumno(id_alumno);
    
    const cursoActual = cursos?.find((c) => c.ciclo_lectivo === new Date().getFullYear())
    const modoEdicion = user.id_curso === cursoActual?.id_curso || user.id_rol === 1

    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        dni: '',
        genero: '',
        fecha_nacimiento: '',
        nacionalidad: '',
        direccion: null,
        telefono: null,
        apellido: '',
        nombre: '',
        retira_solo: '',
        errores: ''
    });  
    const [originalForm, setOriginalForm] = useState(null);


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

    const columnsArchivos = [
        {
            field: 'descripcion',
            header: 'Archivos del alumno',
            body: (rowData) => <a style={{color: 'var(--teal-500)'}} href={`${URL_UPLOADS}alumnos/${rowData.id_alumno}/documentos/${rowData.nombre_archivo}`} target='_blank'>{rowData.descripcion}</a>,
        },   
        // { field: 'fecha_subida', header: 'Ciclo Lectivo' },
    ];

    const validarCampos = () => {
        const errores = {};
    
        if (!formState.nombre.trim()) errores.nombre = 'Este campo es obligatorio';
        if (!formState.apellido.trim()) errores.apellido = 'Este campo es obligatorio';
        if (!formState.id_lista_precio) errores.id_lista_precio = 'Este campo es obligatorio';
        if (!formState.id_rol) errores.id_rol = 'Este campo es obligatorio';
        

        // Validar Email
        if (!formState.email.trim()) {
            errores.email = 'Este campo es obligatorio';
        } else if (!validateEmail(formState.email)) {
            errores.email = 'Email inválido';
        }
    
        setFormErrors(errores);
    
        return Object.keys(errores).length === 0;
    };

    useEffect(() => {
        if (alumno) {
            const formData = {
                // Datos personales
                dni: alumno.dni || null,
                apellido: alumno.apellido || null,
                nombre: alumno.nombre || null,
                genero: alumno.genero || null,
                nacionalidad: alumno.nacionalidad || null,
                fecha_nacimiento: alumno.fecha_nacimiento || null,
                // Datos de contacto
                telefono: alumno.telefono || null, 
                direccion: alumno.direccion || null,
                // Datos adicioneles
                obra_social: alumno.obra_social === 1,
                retira_solo: alumno.retira_solo === 1,
                cud: alumno.cud === 1,
                fotocopia_dni: alumno.fotocopia_dni === 1,
                ficha_medica: alumno.ficha_medica === 1,
                ficha_medica_vencimiento: alumno.ficha_medica_vencimiento || null,
            };
            setFormState(formData);
            setOriginalForm(formData); // <-- Guardás el original para comparar después
        }
    }, [alumno]);


    const hayCambios = () => {
        if (!originalForm) return false;
        return Object.keys(originalForm).some(key => formState[key] !== originalForm[key]);
    };

    // Editar Alumno
    const { mutate: updateAlumno, isLoading, isError, error } = useUpdateAlumno();
    const handleSubmit = () => {
        updateAlumno({ id_alumno, data: formState });
    };

    
    if (alumnoLoading) {
        return <AlumnoMain>
            <AlumnoInformacionWrapper>
                <h1><Skeleton width={280} height={24} /></h1>
                <AlumnoInformacion>
                    <li><Skeleton width={150} height={16} /></li>
                    <li><Skeleton width={150} height={16} /></li>
                    <li><Skeleton width={150} height={16} /></li>
                    <li><Skeleton width={150} height={16} /></li>
                    <li><Skeleton width={150} height={16} /></li>
                    <li><Skeleton width={150} height={16} /></li>
                    <li><Skeleton width={150} height={16} /></li>
                </AlumnoInformacion>
            </AlumnoInformacionWrapper>
        </AlumnoMain>
    }
    
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: checked
        }));
    };


    const requisitos = {
        dni: 'DNI',
        fotocopia_dni: 'Fotocopia DNI',
        ficha_medica: 'Ficha médica',
    };

    const faltantes = originalForm
    ? Object.entries(requisitos)
        .filter(([key]) => !originalForm[key])
        .map(([, label]) => label)
    : [];

    return (
    <>
        <AlumnoHeader>
            <h2>{alumno?.nombre} {alumno?.apellido}</h2>
            <AlumnoHeaderDatos>
                <AlumnoHeaderDatosCurso 
                    // to={`/admin/cursos/${alumno?.id_curso}`}
                >
                    <PiChalkboardSimple />
                    Primer grado B
                </AlumnoHeaderDatosCurso>
                {
                    alumno?.retira_solo === 0 ? <AlumnoHeaderDatosItem className='red' title='No se retira solo/a'>
                        <LiaUserCheckSolid />
                    </AlumnoHeaderDatosItem>
                    : <AlumnoHeaderDatosItem className='green' title='Se retira solo/a'>
                    <LiaUserTimesSolid />
                </AlumnoHeaderDatosItem>
                }
                
                
            </AlumnoHeaderDatos>
        </AlumnoHeader>
        <AlumnoMenu id_alumno={id_alumno} />
        <AlumnoMain>
            <AlumnoInformacionWrapper>
                {faltantes.length > 0 && (
                    <AlumnoInformacionAlerta>
                        <p>Se requiere presentar documentación y/o cumplimentar lo siguiente:</p>
                        <AlumnoInformacionAlertaLista>
                            {faltantes.map((item, index) => (
                                <li key={index}>- {item}</li>
                            ))}
                        </AlumnoInformacionAlertaLista>
                    </AlumnoInformacionAlerta>
                )}
                <h2>Datos personales</h2>
                <Form>
                    <InputTextWrapper label={"DNI"}>
                        <InputText
                            name="dni"
                            value={formState.dni}
                            onChange={handleFormChange}
                            disabled={!modoEdicion} />
                    </InputTextWrapper>
                    <InputTextWrapper label={"Apellido"}>
                        <InputText
                            name="apellido"
                            value={formState.apellido}
                            onChange={handleFormChange}
                            disabled={!modoEdicion} />
                    </InputTextWrapper>
                    <InputTextWrapper label={"Nombres"}>
                        <InputText
                            name="nombre"
                            value={formState.nombre}
                            disabled={!modoEdicion}
                            onChange={handleFormChange} />
                    </InputTextWrapper>
                    <InputTextWrapper label={"Genero:"}>
                        <Dropdown
                            name="genero" // <--- esto es clave
                            value={formState.genero}
                            onChange={handleFormChange} // el value ya es el objeto
                            disabled={!modoEdicion}
                            options={[
                                { value: 'M', label: "Masculino" },
                                { value: 'F', label: "Femenino" },
                            ]}
                            optionLabel="label"
                            optionValue="value" />
                    </InputTextWrapper>
                    <InputTextWrapper label={"Nacionalidad"}>
                        <InputText
                            name="nacionalidad"
                            value={formState.nacionalidad}
                            onChange={handleFormChange}
                            disabled={!modoEdicion} />
                    </InputTextWrapper>
                    <InputTextWrapper label={"Fecha de nacimiento:"}>
                        <InputText
                            type={"date"}
                            name="fecha_nacimiento"
                            disabled={!modoEdicion}
                            value={formState.fecha_nacimiento?.split('T')[0] || ''}
                            onChange={handleFormChange} />
                    </InputTextWrapper>
                    <InputTextWrapper label={"Edad"}
                        width={'60px'}
                    >
                        <InputText
                            name="edad"
                            value={calcularEdad(formState.fecha_nacimiento)}
                            disabled />
                    </InputTextWrapper>
                </Form>
                <h2>Datos de contacto</h2>
                <Form>
                    <InputTextWrapper label={"Telefono:"}>
                        <InputText
                            name="telefono"
                            value={formState.telefono}
                            onChange={handleFormChange}
                            disabled={!modoEdicion} />
                    </InputTextWrapper>
                    <InputTextWrapper label={"Dirección:"}>
                        <InputText
                            name="direccion"
                            value={formState.direccion}
                            onChange={handleFormChange}
                            disabled={!modoEdicion} />
                    </InputTextWrapper>
                </Form>
                <h2>Datos adicionales / Documentación</h2>
                <Form>
                    <Checkbox label={"Obra Social"}
                        name="obra_social"
                        checked={formState.obra_social}
                        onChange={handleCheckboxChange}
                        disabled={!modoEdicion} />
                    <Checkbox label={"Se retira solo"}
                        name="retira_solo"
                        checked={formState.retira_solo}
                        onChange={handleCheckboxChange}
                        disabled={!modoEdicion} />
                    <Checkbox label={"CUD"}
                        name="cud"
                        checked={formState.cud}
                        onChange={handleCheckboxChange}
                        disabled={!modoEdicion} />
                    <Checkbox label={"Fotocopia DNI"}
                        name="fotocopia_dni"
                        checked={formState.fotocopia_dni}
                        onChange={handleCheckboxChange}

                        disabled={!modoEdicion} />
                    <Checkbox label={"Ficha medica"}
                        name="ficha_medica"
                        checked={formState.ficha_medica}
                        onChange={handleCheckboxChange}

                        disabled={!modoEdicion} />
                    {formState.ficha_medica && (
                        <InputTextWrapper label={"Vto. ficha medica"}>
                            <InputText
                                type={"date"}
                                name="ficha_medica_vencimiento"
                                value={formState.ficha_medica_vencimiento?.split('T')[0] || ''}
                                onChange={handleFormChange}
                                disabled={!modoEdicion} />
                        </InputTextWrapper>
                    )}

                </Form>
                <Button onClick={() => handleSubmit()} disabled={!hayCambios() || isLoading}>
                    Guardar cambios
                </Button>
            </AlumnoInformacionWrapper>
        </AlumnoMain>
    </>
    )
}

export default Alumno