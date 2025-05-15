import { useQuery } from "@tanstack/react-query";
import { fetchGrados } from "./grados";

export const useGrados = () => {
    return useQuery({
        queryKey: ["grados"],
        queryFn: fetchGrados,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};