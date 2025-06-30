import React from 'react'
import { NavLink } from 'react-router-dom'
import { AlumnosMenuWrapper } from '../../Alumnos/AlumnosStyles'

const DocenteMenu = ({id_docente, user}) => {
    return (
        <AlumnosMenuWrapper>
            <NavLink to={`/admin/docentes/${id_docente}`} end>Legajo</NavLink>
            {
                (user?.id_docente == id_docente || user?.id_rol === 1) && (
                    <NavLink to={`/admin/docentes/${id_docente}/asistencias`} end>Inasistencias</NavLink>
                )
            }

            
            {/* <NavLink to={`/admin/alumnos/${id_alumno}/inasistencias`}>Inasistencias</NavLink>
            <NavLink to={`/admin/alumnos/${id_alumno}/inscripciones`}>Inscripciones</NavLink> */}
        </AlumnosMenuWrapper>
    )
}

export default DocenteMenu