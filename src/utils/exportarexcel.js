import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function generarExcelParteOficial(asistencias) {
  // Ordenar por fecha
  const ordenadas = [...asistencias].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  );

  // Crear hoja de trabajo
  const ws = XLSX.utils.aoa_to_sheet([]);

  // Agregar encabezados con celdas combinadas
  ws["!merges"] = [
    // DIA A JUSTIFICAR - combina 2 filas y 6 columnas (A1:F2)
    { s: { r: 0, c: 0 }, e: { r: 1, c: 5 } },
    // NOV - combina 2 filas y 2 columnas (G1:H2)
    { s: { r: 0, c: 6 }, e: { r: 1, c: 7 } },
    // COD - combina 2 filas y 2 columnas (I1:J2)
    { s: { r: 0, c: 8 }, e: { r: 1, c: 9 } },
    // PERIODO - combina 1 fila y 12 columnas (K1:V1)
    { s: { r: 0, c: 10 }, e: { r: 0, c: 21 } },
    // DESDE - combina 1 fila y 6 columnas (K2:P2)
    { s: { r: 1, c: 10 }, e: { r: 1, c: 15 } },
    // HASTA - combina 1 fila y 6 columnas (Q2:V2)
    { s: { r: 1, c: 16 }, e: { r: 1, c: 21 } }
  ];

  // Escribir encabezados
  XLSX.utils.sheet_add_aoa(ws, [
    ["DIA A JUSTIFICAR", , , , , , "NOV", , "COD", , "PERIODO", , , , , , , , , , , ],
    [, , , , , , , , , , "DESDE", , , , , , "HASTA", , , , , ]
  ], { origin: "A1" });

  let rowIndex = 2; // Comenzar en la fila 3 (0-based)
  let i = 0;

  while (i < ordenadas.length) {
    const actual = ordenadas[i];

    if (actual.codigo === 99 && actual.detalle === "PTE") {
      // Procesar período de presentes consecutivos (incluyendo fines de semana)
      let desde = new Date(actual.fecha);
      let hasta = new Date(actual.fecha);
      let j = i + 1;

      while (j < ordenadas.length && ordenadas[j].codigo === 99 && ordenadas[j].detalle === "PTE") {
        const nextDate = new Date(ordenadas[j].fecha);
        const expectedNextDate = new Date(hasta);
        expectedNextDate.setDate(expectedNextDate.getDate() + 1);
        
        // Verificar si la siguiente fecha es la esperada (ignorando fines de semana)
        while (expectedNextDate < nextDate) {
          // Si hay un hueco, verificar si es fin de semana
          const dayOfWeek = expectedNextDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) { // No es domingo (0) ni sábado (6)
            break; // Hay un día laboral faltante, terminar el período
          }
          expectedNextDate.setDate(expectedNextDate.getDate() + 1);
        }

        if (expectedNextDate.getTime() !== nextDate.getTime()) {
          break; // Hay un día laboral faltante, terminar el período
        }

        hasta = new Date(nextDate);
        j++;
      }

      // Formatear fechas para DESDE y HASTA
      const desdeStr = formatDateParts(desde);
      const hastaStr = formatDateParts(hasta);

      // Agregar fila para PTE
      XLSX.utils.sheet_add_aoa(ws, [
        [
          , , , , , ,  // DIA A JUSTIFICAR vacío (6 celdas)
          "PTE", ,     // NOV (celda combinada)
          ...splitNumber(actual.codigo), // COD (2 celdas)
          ...desdeStr,  // DESDE (6 celdas)
          ...hastaStr   // HASTA (6 celdas)
        ]
      ], { origin: XLSX.utils.encode_cell({ r: rowIndex, c: 0 }) });

      i = j;
    } else {
      // Procesar otras observaciones (FJ, etc.)
      const fecha = new Date(actual.fecha);
      const fechaParts = formatDateParts(fecha);

      // Agregar fila para observación
      XLSX.utils.sheet_add_aoa(ws, [
        [
          ...fechaParts,  // DIA A JUSTIFICAR (6 celdas)
          actual.detalle, , // NOV (celda combinada)
          ...splitNumber(actual.codigo), // COD (2 celdas)
          , , , , , , , , , , , ,  // PERIODO vacío (12 celdas)
        ]
      ], { origin: XLSX.utils.encode_cell({ r: rowIndex, c: 0 }) });

      i++;
    }
    rowIndex++;
  }

  // Ajustar anchos de columnas
  ws["!cols"] = [
    { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, // DIA A JUSTIFICAR
    { wch: 4 }, { wch: 4 }, // NOV
    { wch: 3 }, { wch: 3 }, // COD
    { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, // DESDE
    { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }  // HASTA
  ];

  // Crear libro y guardar
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Parte Diario");
  const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "parte_diario_formato_oficial.xlsx");
}

// Función para formatear fecha en partes (día, mes, año)
function formatDateParts(date) {
  const str = date.toISOString().slice(0, 10);
  return [
    str[8], str[9], // día (2 dígitos)
    str[5], str[6], // mes (2 dígitos)
    str[2], str[3]  // año (2 últimos dígitos)
  ];
}

// Función para dividir un número en dos dígitos (9 -> ["0", "9"], 99 -> ["9", "9"])
function splitNumber(num) {
  const str = num.toString().padStart(2, "0");
  return [str[0], str[1]];
}