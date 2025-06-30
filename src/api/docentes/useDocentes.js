import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { crearAsistenciaObservacion, fetchAsistenciasDocente, fetchCodigosAusentismo, fetchDocente, fetchDocentes } from "./docentes";

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

export const useCodigosAusentismo = () => {
    return useQuery({
        queryKey: ["codigos_ausentismo"],
        queryFn: fetchCodigosAusentismo,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};

export const useCrearAsistenciaObservacion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: crearAsistenciaObservacion,
        onSuccess: () => {
            // Refrescar observaciones del docente
            queryClient.invalidateQueries(["asistencias_docente"]);
        },
    });
};

import { eliminarAsistenciaObservacion } from "./docentes";

export const useEliminarAsistenciaObservacion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: eliminarAsistenciaObservacion,
        onSuccess: (_, id_asistencia) => {
            // Invalida todas las asistencias para refrescar
            queryClient.invalidateQueries({ queryKey: ["asistencias_docente"] });
        },
    });
};

