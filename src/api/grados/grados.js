import api from "../axios";

export const fetchGrados = async () => {
    try {
        const res = await api.get("/grados");
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de grados");
    }
};
