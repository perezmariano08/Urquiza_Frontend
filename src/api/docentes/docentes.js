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

export const fetchCodigosAusentismo = async () => {
    try {
        const res = await api.get("/docentes/codigos");
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de codigos");
    }
};

export const crearAsistenciaObservacion = async (data) => {
    try {
        const res = await api.post("/docentes/asistencias", data);
        return res.data;
    } catch (error) {
        throw new Error("Error al crear la observación");
    }
};

export const eliminarAsistenciaObservacion = async (id_asistencia) => {
    try {
        const res = await api.delete(`/docentes/asistencias/${id_asistencia}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al eliminar la observación");
    }
};
