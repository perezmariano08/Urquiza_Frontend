import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { useAlumno, useAlumnosObservaciones, useUpdateAlumno } from '../../../../api/alumnos/useAlumnos';
import { useCursosAlumno } from '../../../../api/cursos/useCursos';
import DataTable from '../../../../components/DataTable/DataTable';
import { formatearFecha } from '../../../../utils/formatearFecha';
import { AlumnoInformacion, AlumnoInformacionWrapper, AlumnoMain } from '../AlumnosStyles';
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

const Alumno = ({user}) => {
    const id_alumno = parseInt(useParams().id_alumno);
    const { data: observaciones } = useAlumnosObservaciones(id_alumno);
    const { data: alumno, isLoading: alumnoLoading } = useAlumno(id_alumno);
    const { data: cursos } = useCursosAlumno(id_alumno);
    const { data: tutores } = useTutoresAlumno(id_alumno);
    const { data: archivos } = useArchivosAlumno(id_alumno);
    console.log(archivos);
    
    const cursoActual = cursos?.find((c) => c.ciclo_lectivo === new Date().getFullYear())
    const [modoEdicion, setModoEdicion] = useState(false);

    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        dni: '',
        genero: '',
        fecha_nacimiento: '',
        direccion: null,
        telefono: null,
        apellido: '',
        nombre: '',
        retira_solo: '',
        errores: ''
    });  

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
            setFormState({
                dni: alumno.dni || null,
                apellido: alumno.apellido || null,
                nombre: alumno.nombre || null,
                genero: alumno.genero || null,
                fecha_nacimiento: alumno.fecha_nacimiento || null,
                direccion: alumno.direccion || null,
                telefono: alumno.telefono || null,
                retira_solo: alumno.retira_solo || null,
            });
        }
    }, [alumno]);

    const { mutate: updateAlumno, isLoading, isError, error } = useUpdateAlumno();
    const handleSubmit = () => {
        updateAlumno({ id_alumno, data: formState });
        setModoEdicion(false)
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
    
    return (
        <AlumnoMain>
            <AlumnoInformacionWrapper>
                {modoEdicion ? (
                    <>
                    <Form
                        buttons={
                            <>
                                <Button type="submit" onClick={handleSubmit}>Guardar</Button>
                                <Button background='red-500' onClick={() => setModoEdicion(false)}>Cancelar</Button>
                            </>
                        } 
                    >
                        <InputTextWrapper label={"DNI:"}>
                            <InputText
                                name="dni"
                                value={formState.dni}
                                onChange={handleFormChange}
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={"Apellido:"}>
                            <InputText
                                name="apellido"
                                value={formState.apellido}
                                onChange={handleFormChange}
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={"Nombre:"}>
                            <InputText
                                name="nombre"
                                value={formState.nombre}
                                onChange={handleFormChange}
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={"Fecha de nacimiento:"}>
                            <InputText
                                type={"date"}
                                name="fecha_nacimiento"
                                value={formState.fecha_nacimiento?.split('T')[0] || ''}
                                onChange={handleFormChange}
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={"Telefono:"}>
                            <InputText
                                name="telefono"
                                value={formState.telefono}
                                onChange={handleFormChange}
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={"Dirección:"}>
                            <InputText
                                name="direccion"
                                value={formState.direccion}
                                onChange={handleFormChange}
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={"Genero:"}>
                            <Dropdown
                                name="genero" // <--- esto es clave
                                value={formState.genero}
                                onChange={handleFormChange} // el value ya es el objeto
                                options={[
                                    {value: 'M', label: "Masculino"},
                                    {value: 'F', label: "Femenino"},
                                ]}
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Seleccione genero"
                                // error={formState.errores.genero}
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={"¿Se retira solo?"}>
                            <Dropdown
                                name="retira_solo" // <--- esto es clave
                                value={formState.retira_solo}
                                onChange={handleFormChange} // el value ya es el objeto
                                options={[
                                    {value: 'S', label: "Si"},
                                    {value: 'N', label: "No"},
                                ]}
                                optionLabel="label"
                                optionValue="value"
                            />
                        </InputTextWrapper>
                    </Form>
                    </>
                    
                    ) : ( <>
                        <h1>{alumno?.apellido}, {alumno?.nombre}</h1>
                        <AlumnoInformacion>
                            <li><span>Dni</span>: {alumno?.dni}</li>
                            <li><span>Nacionalidad</span>: {alumno?.nacionalidad}</li>
                            <li>
                                <span>Género</span>: {alumno?.genero
                                    ? alumno.genero === "M"
                                    ? "Masculino"
                                    : "Femenino"
                                    : ""}
                            </li>
                            <li><span>Fecha de nacimiento</span>: {formatearFecha(alumno?.fecha_nacimiento)}</li>
                            <li><span>Dirección</span>: {alumno?.direccion}</li>
                            <li><span>Telefono</span>: {alumno?.telefono}</li>
                            <li>
                                <span>¿Se retira solo?</span>: {alumno?.retira_solo
                                    ? alumno.retira_solo === "N"
                                    ? "No"
                                    : "Si"
                                    : ""}
                            </li>                            <li><span>Curso actual</span>: <NavLink to={`/admin/cursos/${cursoActual?.id_curso}`}>{cursoActual?.abreviacion} {cursoActual?.division}</NavLink></li>
                            {tutores?.map((tutor) => (
                                <li key={tutor.id_tutor}>
                                    <span>{capitalizar(tutor.parentesco)}</span>: {tutor.apellido}, {tutor.nombre}
                                </li>
                            ))}

                        </AlumnoInformacion>
                        {(user.id_curso === cursoActual?.id_curso || user.id_rol === 1) && (
                            <Button onClick={() => setModoEdicion(true)}>Editar alumno/a</Button>
                        )}
                    </>)}

                
            </AlumnoInformacionWrapper>
            {
                observaciones?.length > 0 && <DataTable
                    data={observaciones} 
                    columns={columns} 
                />
            }
            <DataTable
                data={archivos} 
                columns={columnsArchivos} 
            />
            <DataTable
                data={cursos} 
                columns={columnsCursos} 
            />
            
        </AlumnoMain>
        
    )
}

export default Alumno