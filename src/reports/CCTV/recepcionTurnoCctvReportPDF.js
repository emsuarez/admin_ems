// services/reportGenerator.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logoEmpresa from '../../assets/logo.png';
// Date Fns is used to format the dates we receive
// from our API call
import { format } from 'date-fns';

// define a generatePDF function that accepts a tickets argument
const recepcionTurnoCctvReportPDF = historialRecepcionTurno => {
  // initialize jsPDF
  const doc = new jsPDF('landscape');

  // define the columns we want and their titles
  const tableColumn = [
    'Centralista de operaciones salientes',
    'Centralista de operaciones entrantes',
    'Fecha y Hora',
    'Turno',
  ];

  // define an empty array of rows
  const tableRows = [];
  // for each ticket pass all its data into an array
  historialRecepcionTurno.forEach(recepcionTurno => {
    const historialData = [
      recepcionTurno.agente_saliente,
      recepcionTurno.agente_entrante,
      format(new Date(recepcionTurno.created), 'dd/MM/yyyy HH:mm'),
      recepcionTurno.turno === 1 ? 'Diurno' : 'Nocturno',
    ];

    tableRows.push(historialData);
  });

  // startY is basically margin-top
  doc.autoTable({
    columns: tableColumn,
    body: tableRows,
    margin: { top: 40 },
    didDrawPage: function (data) {
      doc.addImage(logoEmpresa, 'PNG', 115, 0, 70, 30);
      doc.text('Historial de recepcion turno CCTV.', 14, 35);
    },
  });
  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left

  // we define the name of our PDF file.
  doc.save(`report_historial_recepcion_turno_cctv_${dateStr}.pdf`);
};

export default recepcionTurnoCctvReportPDF;
