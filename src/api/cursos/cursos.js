import api from "../axios";

export const fetchCursos = async () => {
    try {
        const res = await api.get("/cursos");
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de cursos");
    }
};

export const fetchCursosAlumno = async (id_alumno) => {
    try {
        const res = await api.get(`/cursos/alumnos/${id_alumno}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los cursos del alumno");
    }
};
