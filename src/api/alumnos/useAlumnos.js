import { useQuery } from "@tanstack/react-query";
import { fetchAlumno, fetchAlumnos, fetchAlumnosCurso, fetchAlumnosObservaciones } from "./alumnos";

export const useAlumnos = () => {
    return useQuery({
        queryKey: ["alumnos"],
        queryFn: fetchAlumnos,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};

export const useAlumno = (id_alumno) => {
    return useQuery({
        queryKey: ["alumno", id_alumno],
        queryFn: () => fetchAlumno(id_alumno),
        enabled: !!id_alumno, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};

export const useAlumnosCurso = (id_curso) => {
    return useQuery({
        queryKey: ["alumnos_curso", id_curso],
        queryFn: () => fetchAlumnosCurso(id_curso),
        enabled: !!id_curso, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};

export const useAlumnosObservaciones = (id_alumno) => {
    return useQuery({
        queryKey: ["alumnos_observaciones", id_alumno],
        queryFn: () => fetchAlumnosObservaciones(id_alumno),
        enabled: !!id_alumno, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};