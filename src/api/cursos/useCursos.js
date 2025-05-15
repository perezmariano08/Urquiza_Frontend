import { useQuery } from "@tanstack/react-query";
import { fetchCursos, fetchCursosAlumno } from "./cursos";

export const useCursos = () => {
    return useQuery({
        queryKey: ["cursos"],
        queryFn: fetchCursos,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};

export const useCursosAlumno = (id_alumno) => {
    return useQuery({
        queryKey: ["cursos_alumno", id_alumno],
        queryFn: () => fetchCursosAlumno(id_alumno),
        enabled: !!id_alumno, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};