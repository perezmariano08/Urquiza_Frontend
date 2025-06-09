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

export const fetchTutoresAlumno = async (id_alumno) => {
    try {
        const res = await api.get(`/tutores/alumnos/${id_alumno}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los tutores del alumno");
    }
};
