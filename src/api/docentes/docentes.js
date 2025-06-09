import api from "../axios";

export const fetchDocentes = async () => {
    try {
        const res = await api.get("/docentes");
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de docentes");
    }
};

export const fetchDocente = async (id_docente) => {
    try {
        const res = await api.get(`/docentes/${id_docente}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar el docente");
    }
};

export const fetchAsistenciasDocente = async (id_docente) => {
    try {
        const res = await api.get(`/docentes/asistencias/${id_docente}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar las asitencias");
    }
};