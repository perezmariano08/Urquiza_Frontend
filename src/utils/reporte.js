export function generarReporteMensual(asistencias, mes, anio) {
    const asistenciasMes = asistencias
        .filter(a => {
            const fecha = new Date(a.fecha);
            return (
                fecha.getMonth() + 1 === mes &&
                fecha.getFullYear() === anio &&
                a.detalle === 'PTE'
            );
        })
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        
    const tramos = [];
    let tramoActual = [];

    for (let i = 0; i < asistenciasMes.length; i++) {
        const actual = asistenciasMes[i];
        const siguiente = asistenciasMes[i + 1];

        tramoActual.push(actual);

        const fechaActual = new Date(actual.fecha);
        const fechaSiguiente = siguiente ? new Date(siguiente.fecha) : null;

        const esContinuo =
            siguiente &&
            fechaSiguiente.getDate() === fechaActual.getDate() + 1 &&
            fechaSiguiente.getMonth() === fechaActual.getMonth();

        if (!esContinuo) {
            tramos.push([...tramoActual]);
            tramoActual = [];
        }
    }

    const formatearFechaParaCeldas = (fechaStr) => {
        const fecha = new Date(fechaStr);
        const dd = String(fecha.getDate()).padStart(2, '0');
        const mm = String(fecha.getMonth() + 1).padStart(2, '0');
        const yy = String(fecha.getFullYear()).slice(-2);
        return [...dd, ...mm, ...yy]; // ej: ['2','5','0','6','2','5']
    };

    const reporte = tramos.map(tramo => {
        const desde = tramo[0].fecha;
        const hasta = tramo[tramo.length - 1].fecha;

        return {
            diaAJustificar: formatearFechaParaCeldas(desde),
            nov: 'PTE',
            cod: String(tramo[0].codigo).padStart(2, '0').split(''),
            periodo: {
                desde: formatearFechaParaCeldas(desde),
                hasta: formatearFechaParaCeldas(hasta)
            }
        };
    });

    return reporte;
}
