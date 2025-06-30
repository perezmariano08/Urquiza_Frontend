import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function generarExcelParteOficial(asistencias) {
  // Ordenar por fecha
  const ordenadas = [...asistencias].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  );

  // Crear hoja de trabajo
  const ws = XLSX.utils.aoa_to_sheet([]);

  // Configuración de encabezados y celdas combinadas
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 1, c: 5 } },
    { s: { r: 0, c: 6 }, e: { r: 1, c: 7 } },
    { s: { r: 0, c: 8 }, e: { r: 1, c: 9 } },
    { s: { r: 0, c: 10 }, e: { r: 0, c: 21 } },
    { s: { r: 1, c: 10 }, e: { r: 1, c: 15 } },
    { s: { r: 1, c: 16 }, e: { r: 1, c: 21 } }
  ];

  XLSX.utils.sheet_add_aoa(ws, [
    ["DIA A JUSTIFICAR", , , , , , "NOV", , "COD", , "PERIODO", , , , , , , , , , , ],
    [, , , , , , , , , , "DESDE", , , , , , "HASTA", , , , , ]
  ], { origin: "A1" });

  let rowIndex = 2;
  let i = 0;

  while (i < ordenadas.length) {
    const actual = ordenadas[i];

    if (actual.codigo === 99 && actual.detalle === "PTE") {
      let desde = new Date(actual.fecha);
      let hasta = new Date(actual.fecha);
      let j = i + 1;
      let tieneObservacionMismoDia = false;

      // Buscar hasta dónde llega el período PTE
      while (j < ordenadas.length) {
        const nextItem = ordenadas[j];
        const nextDate = new Date(nextItem.fecha);
        
        // Verificar si es PTE consecutivo
        if (nextItem.codigo === 99 && nextItem.detalle === "PTE") {
          const expectedDate = new Date(hasta);
          expectedDate.setDate(expectedDate.getDate() + 1);
          
          // Saltar fines de semana
          while (expectedDate < nextDate) {
            const dayOfWeek = expectedDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) break;
            expectedDate.setDate(expectedDate.getDate() + 1);
          }

          if (expectedDate.getTime() === nextDate.getTime()) {
            hasta = new Date(nextDate);
            j++;
          } else {
            break;
          }
        } 
        // Verificar si hay una observación el mismo día que el último PTE
        else if (nextDate.getTime() === hasta.getTime()) {
          tieneObservacionMismoDia = true;
          j++;
          break;
        } else {
          break;
        }
      }

      // Agregar fila PTE (incluyendo el día con observación en HASTA)
      const desdeStr = formatDateParts(desde);
      const hastaStr = formatDateParts(hasta);

      XLSX.utils.sheet_add_aoa(ws, [
        [
          , , , , , , 
          "PTE", ,
          ...splitNumber(actual.codigo),
          ...desdeStr,
          ...hastaStr
        ]
      ], { origin: XLSX.utils.encode_cell({ r: rowIndex, c: 0 }) });

      rowIndex++;

      // Si había una observación el último día, agregarla ahora
      if (tieneObservacionMismoDia) {
        const observacion = ordenadas[j-1];
        const fechaParts = formatDateParts(new Date(observacion.fecha));

        XLSX.utils.sheet_add_aoa(ws, [
          [
            ...fechaParts,
            observacion.detalle, ,
            ...splitNumber(observacion.codigo),
            , , , , , , , , , , , ,
          ]
        ], { origin: XLSX.utils.encode_cell({ r: rowIndex, c: 0 }) });

        rowIndex++;
      }

      i = j;
    } else {
      // Procesar observaciones que no son PTE
      const fecha = new Date(actual.fecha);
      const fechaParts = formatDateParts(fecha);

      XLSX.utils.sheet_add_aoa(ws, [
        [
          ...fechaParts,
          actual.detalle, ,
          ...splitNumber(actual.codigo),
          , , , , , , , , , , , ,
        ]
      ], { origin: XLSX.utils.encode_cell({ r: rowIndex, c: 0 }) });

      i++;
      rowIndex++;
    }
  }

  // Ajustar anchos de columnas
  ws["!cols"] = [
    { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 },
    { wch: 4 }, { wch: 4 },
    { wch: 3 }, { wch: 3 },
    { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 },
    { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }, { wch: 3 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Parte Diario");
  const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "parte_diario_formato_oficial.xlsx");
}

// Funciones auxiliares
function formatDateParts(date) {
  const str = date.toISOString().slice(0, 10);
  return [str[8], str[9], str[5], str[6], str[2], str[3]];
}

function splitNumber(num) {
  const str = num.toString().padStart(2, "0");
  return [str[0], str[1]];
}
