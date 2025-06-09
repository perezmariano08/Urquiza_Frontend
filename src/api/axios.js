import axios from 'axios';

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'https://apiurquiza.vercel.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
