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
import Asistencias from '../../Asistencias/Asistencias';

const DocenteAsistencias = ({user}) => {
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
            <DocenteMenu id_docente={id_docente} user={user}/>
            <DocentesMain>
                <Asistencias id_docente={id_docente} />
            </DocentesMain>
        </>
        
    )
}

export default DocenteAsistencias