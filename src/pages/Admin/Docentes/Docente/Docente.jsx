import React, { useEffect, useState } from 'react'
import DocenteMenu from './DocenteMenu'
import { useParams } from 'react-router-dom';
import { useDocente } from '../../../../api/docentes/useDocentes';
import useForm from '../../../../hooks/useForm';
import { DocenteHeader, DocentesMain } from '../DocentesStyles';
import { AlumnoInformacionWrapper } from '../../Alumnos/AlumnosStyles';
import Form from '../../../../components/UI/Form/Form';
import InputTextWrapper from '../../../../components/UI/InputText/InputTextWrapper';
import InputText from '../../../../components/UI/InputText/InputText';
import Button from '../../../../components/UI/Button/Button';
import Dropdown from '../../../../components/UI/Dropdown/Dropdown';

const Docente = ({user}) => {
    const id_docente = parseInt(useParams().id_docente);
    // const { data: observaciones } = useAlumnosObservaciones(id_alumno);
    const { data: docente, isLoading: alumnoLoading } = useDocente(id_docente);

    const modoEdicion = user.id_docente === id_docente || user.id_rol === 1

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


    useEffect(() => {
        if (docente) {
            const formData = {
                // Datos personales
                dni: docente.dni || null,
                apellido: docente.apellido || null,
                nombre: docente.nombre || null,
                fecha_nacimiento: docente.fecha_nacimiento || null,
                cargo: docente.cargo || null,
                email: docente.email || null,
                telefono: docente.telefono || null,
            };
            setFormState(formData);
            setOriginalForm(formData); // <-- Guardás el original para comparar después
        }
    }, [docente]);

    return (
        <>
            <DocenteHeader>
                <h2>{docente?.nombre} {docente?.apellido}</h2>
            </DocenteHeader>
            <DocenteMenu id_docente={id_docente} user={user} />
            <DocentesMain>
                <AlumnoInformacionWrapper>
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
                        {/* <InputTextWrapper label={"Genero:"}>
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
                        </InputTextWrapper> */}
                        {/* <InputTextWrapper label={"Nacionalidad"}>
                            <InputText
                                name="nacionalidad"
                                value={formState.nacionalidad}
                                onChange={handleFormChange}
                                disabled={!modoEdicion} />
                        </InputTextWrapper> */}
                        <InputTextWrapper label={"Fecha de nacimiento:"}>
                            <InputText
                                type={"date"}
                                name="fecha_nacimiento"
                                disabled={!modoEdicion}
                                value={formState.fecha_nacimiento?.split('T')[0] || ''}
                                onChange={handleFormChange} />
                        </InputTextWrapper>
                        <InputTextWrapper label={"Cargo"}>
                            <InputText
                                name="cargo"
                                value={formState.cargo}
                                disabled={!modoEdicion}
                                onChange={handleFormChange} />
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
                        <InputTextWrapper label={"Email:"}>
                            <InputText
                                name="email"
                                value={formState.email}
                                onChange={handleFormChange}
                                disabled={!modoEdicion} />
                        </InputTextWrapper>
                        {/* <InputTextWrapper label={"Dirección:"}>
                            <InputText
                                name="direccion"
                                value={formState.direccion}
                                onChange={handleFormChange}
                                disabled={!modoEdicion} />
                        </InputTextWrapper> */}
                    </Form>
                    {/* <h2>Datos adicionales / Documentación</h2>
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

                    </Form> */}
                    <Button 
                    // onClick={() => handleSubmit()} disabled={!hayCambios() || isLoading}
                    >
                        Guardar cambios
                    </Button>
                </AlumnoInformacionWrapper>
            </DocentesMain>
        </>
        
    )
}

export default Docente