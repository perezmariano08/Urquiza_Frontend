import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { crearObservacion, fetchObservacionesDocente, fetchObservacionesUsuario } from "./observaciones";


export const useObservacionesDocente = (id_docente) => {
    return useQuery({
        queryKey: ["observaciones_docente", id_docente],
        queryFn: () => fetchObservacionesDocente(id_docente),
        enabled: !!id_docente, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};


export const useObservacionesUsuario = (id_usuario) => {
    return useQuery({
        queryKey: ["observaciones_usuario", id_usuario],
        queryFn: () => fetchObservacionesUsuario(id_usuario),
        enabled: !!id_usuario, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};

export const useCrearObservacion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: crearObservacion,
        onSuccess: (_, { id_docente }) => {
            // Refrescar observaciones del docente
            queryClient.invalidateQueries(["observaciones_docente", id_docente]);
        },
    });
};