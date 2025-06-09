import { useQuery } from "@tanstack/react-query";
import { fetchUsuario, fetchUsuarios } from "./usuarios";

export const useUsuarios = () => {
    return useQuery({
        queryKey: ["usuarios"],
        queryFn: fetchUsuarios,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};

export const useUsuario = (id_usuario) => {
    return useQuery({
        queryKey: ["usuario", id_usuario],
        queryFn: () => fetchUsuario(id_usuario),
        enabled: !!id_usuario, // Solo ejecuta si hay un id_curso
        staleTime: 1000 * 60 * 0.5,
    });
};