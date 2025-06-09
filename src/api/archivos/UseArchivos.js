import { useQuery } from "@tanstack/react-query";
import { fetchArchivosAlumno } from "./archivos";

export const useArchivosAlumno = (id_alumno) => {
    return useQuery({
        queryKey: ["archivos_alumno", id_alumno],
        queryFn: () => fetchArchivosAlumno(id_alumno),
        enabled: !!id_alumno, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};
