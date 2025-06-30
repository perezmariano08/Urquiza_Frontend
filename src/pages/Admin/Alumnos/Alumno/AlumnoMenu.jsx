import React from 'react'
import { AlumnosMenuWrapper } from '../AlumnosStyles'
import { NavLink } from 'react-router-dom'

const AlumnoMenu = ({id_alumno}) => {
    return (
        <AlumnosMenuWrapper>
            <NavLink to={`/admin/alumnos/${id_alumno}`} end>Legajo</NavLink>
            <NavLink to={`/admin/alumnos/${id_alumno}/observaciones`} end>Observaciones</NavLink>
            {/* <NavLink to={`/admin/alumnos/${id_alumno}/inasistencias`}>Inasistencias</NavLink>
            <NavLink to={`/admin/alumnos/${id_alumno}/inscripciones`}>Inscripciones</NavLink> */}
        </AlumnosMenuWrapper>
    )
}

export default AlumnoMenu