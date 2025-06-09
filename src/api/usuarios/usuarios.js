import api from "../axios";

export const fetchUsuarios = async () => {
    try {
        const res = await api.get("/usuarios");
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de usuarios");
    }
};

export const fetchUsuario = async (id_usuario) => {
    try {
        const res = await api.get(`/usuarios/${id_usuario}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar el usuario");
    }
};

