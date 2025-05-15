export const formatearFecha = (value) => {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date)) return ''; // Si la fecha no es válida

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
