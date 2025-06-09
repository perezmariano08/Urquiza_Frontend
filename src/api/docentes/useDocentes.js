import { useQuery } from "@tanstack/react-query";
import { fetchAsistenciasDocente, fetchDocente, fetchDocentes } from "./docentes";

export const useDocentes = () => {
    return useQuery({
        queryKey: ["docentes"],
        queryFn: fetchDocentes,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};

export const useDocente = (id_docente) => {
    return useQuery({
        queryKey: ["docente", id_docente],
        queryFn: () => fetchDocente(id_docente),
        enabled: !!id_docente, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};


export const useAsistenciasDocente = (id_docente) => {
    return useQuery({
        queryKey: ["asistencias_docente", id_docente],
        queryFn: () => fetchAsistenciasDocente(id_docente),
        enabled: !!id_docente, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};
