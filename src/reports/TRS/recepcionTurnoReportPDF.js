// services/reportGenerator.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logoEmpresa from '../../assets/logo.png';
// Date Fns is used to format the dates we receive
// from our API call
import { format } from 'date-fns';

// define a generatePDF function that accepts a tickets argument
const recepcionTurnoReportPDF = historialControlMovimiento => {
  // initialize jsPDF
  const doc = new jsPDF('landscape');

  // define the columns we want and their titles
  const tableColumn = [
    'Ejecutivo',
    'Lugar salida',
    'Lugar llegada',
    'Vehiculo Ejecutivo',
    'Vehiculo Protector',
    'Hora salida',
    'Hora llegada',
    'Protector',
    'Observaciones',
  ];

  // define an empty array of rows
  const tableRows = [];
  // for each ticket pass all its data into an array
  historialControlMovimiento.forEach(controlMovimiento => {
    const lugaresData = [
      controlMovimiento.ejecutivo,

      controlMovimiento.lugar_salida_texto
        ? controlMovimiento.lugar_salida_texto
        : controlMovimiento.lugar_salida,
      controlMovimiento.lugar_llegada_texto
        ? controlMovimiento.lugar_llegada_texto
        : controlMovimiento.lugar_llegada,
      controlMovimiento.vehiculo_ejecutivo,
      controlMovimiento.vehiculo_protector,
      format(new Date(controlMovimiento.hora_salida), 'dd/MM/yyyy HH:mm'),
      format(new Date(controlMovimiento.hora_llegada), 'dd/MM/yyyy HH:mm'),
      controlMovimiento.protector,
      controlMovimiento.observacion,
      // called date-fns to format the date on the ticket
      format(new Date(controlMovimiento.created), 'yyyy-MM-dd'),
    ];

    tableRows.push(lugaresData);
  });

  // startY is basically margin-top
  doc.autoTable({
    columns: tableColumn,
    body: tableRows,
    margin: { top: 40 },
    didDrawPage: function (data) {
      doc.addImage(logoEmpresa, 'PNG', 115, 0, 70, 30);
      doc.text('Historial de control de movimiento.', 14, 35);
    },
  });
  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left

  // we define the name of our PDF file.
  doc.save(`report_historial_recepcion_turno_${dateStr}.pdf`);
};

export default recepcionTurnoReportPDF;
