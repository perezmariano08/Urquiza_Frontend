import { useQuery } from "@tanstack/react-query";
import { fetchTutor, fetchTutores, fetchTutoresAlumno } from "./tutores";

export const useTutores = () => {
    return useQuery({
        queryKey: ["tutores"],
        queryFn: fetchTutores,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};

export const useTutor = (id_tutor) => {
    return useQuery({
        queryKey: ["tutor", id_tutor],
        queryFn: () => fetchTutor(id_tutor),
        enabled: !!id_tutor, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};

export const useTutoresAlumno = (id_alumno) => {
    return useQuery({
        queryKey: ["tutores_alumno", id_alumno],
        queryFn: () => fetchTutoresAlumno(id_alumno),
        enabled: !!id_alumno, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};
