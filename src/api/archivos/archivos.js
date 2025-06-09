import api from "../axios";

export const fetchArchivosAlumno = async (id_alumno) => {
    try {
        const res = await api.get(`/archivos/alumnos/${id_alumno}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los tutores del alumno");
    }
};
