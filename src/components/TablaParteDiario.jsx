import React from "react";

// Utilidades
const descomponerFecha = (fecha) => {
  const f = new Date(fecha);
  const dia = f.getDate().toString().padStart(2, "0");
  const mes = (f.getMonth() + 1).toString().padStart(2, "0");
  const anio = f.getFullYear().toString().slice(-2);
  return [...dia, ...mes, ...anio]; // ['0','9','0','4','2','5']
};

const agruparJustificaciones = (asistencias) => {
  const porDocente = {};

  asistencias.forEach(({ documento, fecha, codigo }) => {
    if (!codigo || codigo === "") return;

    if (!porDocente[documento]) porDocente[documento] = {};

    if (!porDocente[documento][codigo]) porDocente[documento][codigo] = [];

    porDocente[documento][codigo].push(new Date(fecha));
  });

  // Agrupar fechas consecutivas
  const agrupadas = [];

  Object.entries(porDocente).forEach(([documento, codigos]) => {
    Object.entries(codigos).forEach(([codigo, fechas]) => {
      const ordenadas = fechas.sort((a, b) => a - b);

      let grupo = [ordenadas[0]];

      for (let i = 1; i < ordenadas.length; i++) {
        const anterior = ordenadas[i - 1];
        const actual = ordenadas[i];

        const diferencia = (actual - anterior) / (1000 * 60 * 60 * 24);

        if (diferencia === 1) {
          grupo.push(actual);
        } else {
          agrupadas.push({ documento, codigo, desde: grupo[0], hasta: grupo[grupo.length - 1] });
          grupo = [actual];
        }
      }

      if (grupo.length > 0) {
        agrupadas.push({ documento, codigo, desde: grupo[0], hasta: grupo[grupo.length - 1] });
      }
    });
  });

  return agrupadas;
};

const TablaJustificaciones = ({ asistencias }) => {
  const datos = agruparJustificaciones(asistencias);

  return (
    <table border="1" cellPadding="4" cellSpacing="0" style={{ fontSize: 12, borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th colSpan={6}>DÍA A JUSTIFICAR</th>
          <th colSpan={2}>NOV</th>
          <th>COD</th>
          <th colSpan={6}>DESDE</th>
          <th colSpan={6}>HASTA</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((d, i) => (
          <tr key={i}>
            {descomponerFecha(d.desde).map((n, idx) => (
              <td key={`dia-${idx}`}>{n}</td>
            ))}
            {[...d.codigo.padStart(2, "0")].map((n, idx) => (
              <td key={`nov-${idx}`}>{n}</td>
            ))}
            <td>{d.codigo}</td>
            {descomponerFecha(d.desde).map((n, idx) => (
              <td key={`desde-${idx}`}>{n}</td>
            ))}
            {descomponerFecha(d.hasta).map((n, idx) => (
              <td key={`hasta-${idx}`}>{n}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaJustificaciones;
