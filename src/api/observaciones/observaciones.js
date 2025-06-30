import api from "../axios";

export const fetchTutores = async () => {
    try {
        const res = await api.get("/tutores");
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de tutores");
    }
};

export const fetchTutor = async (id_tutor) => {
    try {
        const res = await api.get(`/tutores/${id_tutor}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar el tutor");
    }
};

export const fetchObservacionesDocente = async (id_docente) => {
    try {
        const res = await api.get(`/observaciones/docentes/${id_docente}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar las observaciones del docente");
    }
};

export const fetchObservacionesUsuario = async (id_usuario) => {
    try {
        const res = await api.get(`/observaciones/usuarios/${id_usuario}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar las observaciones del usuario");
    }
};

export const fetchObservacionesAlumno = async (id_alumno) => {
    try {
        const res = await api.get(`/observaciones/alumnos/${id_alumno}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar las observaciones del alumno");
    }
};

export const crearObservacion = async (data) => {
    try {
        const res = await api.post("/observaciones", data);
        return res.data;
    } catch (error) {
        throw new Error("Error al crear la observación");
    }
};

