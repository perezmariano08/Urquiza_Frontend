import api from "../axios";

export const fetchAlumnos = async () => {
    try {
        const res = await api.get("/alumnos");
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de alumnos");
    }
};

export const fetchAlumno = async (id_alumno) => {
    try {
        const res = await api.get(`/alumnos/${id_alumno}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar el alumno");
    }
};

export const fetchAlumnosCurso = async (id_curso) => {
    try {
        const res = await api.get(`/alumnos/curso/${id_curso}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los alumnos del curso");
    }
};

export const fetchAlumnosObservaciones = async (id_alumno) => {
    try {
        const res = await api.get(`/alumnos/${id_alumno}/observaciones`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los alumnos del curso");
    }
};

export const updateAlumno = async ({ id_alumno, data }) => {
    try {
        const res = await api.put(`/alumnos/update/${id_alumno}`, data);
        return res.data;
    } catch (error) {
        throw new Error("Error al actualizar el alumno");
    }
};
