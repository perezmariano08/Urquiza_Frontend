import api from "../axios";

export const fetchAuthLogin = async ({ dni, password }) => {
    // En axios, la respuesta está en res.data y NO tiene res.ok ni res.json()
    const res = await api.post('auth/login', { dni, password });
    return res.data; // Devuelve directamente la data para que useMutation la reciba
};

