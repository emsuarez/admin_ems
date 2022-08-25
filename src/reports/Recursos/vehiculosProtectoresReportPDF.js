// services/reportGenerator.js

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logoEmpresa from '../../assets/logo.png'
// Date Fns is used to format the dates we receive
// from our API call
import { format } from 'date-fns'

// define a generatePDF function that accepts a tickets argument
const vehiculosProtectoresReportPDF = vehiculosProtectores => {
  console.log(vehiculosProtectores, 'vehiculosProtectores')
  // initialize jsPDF
  const doc = new jsPDF()

  // define the columns we want and their titles
  const tableColumn = ['Id', 'Alias', 'Placas', 'Tipo', 'Creado']
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  vehiculosProtectores.forEach(vehiculo => {
    const vechiculosProtectoresData = [
      vehiculo.id,
      vehiculo.alias,
      vehiculo.placas,
      vehiculo.tipo,
      // called date-fns to format the date on the ticket
      format(new Date(vehiculo.created), 'yyyy-MM-dd'),
    ]

    tableRows.push(vechiculosProtectoresData)
  })

  // startY is basically margin-top
  doc.autoTable({
    columns: tableColumn,
    body: tableRows,
    margin: { top: 40 },
    didDrawPage: function (data) {
      doc.addImage(logoEmpresa, 'PNG', 78, 0, 50, 30)
      doc.text(
        'Lista de vehiculos para protectores registrados en el sistema.',
        14,
        35
      )
    },
  })
  const date = Date().split(' ')
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  // ticket title. and margin-top + margin-left

  // we define the name of our PDF file.
  doc.save(`report_vehiculosProtectores_${dateStr}.pdf`)
}

export default vehiculosProtectoresReportPDF