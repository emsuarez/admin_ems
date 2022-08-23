// services/reportGenerator.js

import jsPDF from 'jspdf'
// import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import logoEmpresa from '../../assets/logo.png'
// Date Fns is used to format the dates we receive
// from our API call
import { format } from 'date-fns'

// define a generatePDF function that accepts a tickets argument
const ejecutivosReportPDF = ejecutivos => {
  console.log(ejecutivos, 'ejecutivos')
  // initialize jsPDF
  const doc = new jsPDF()

  // define the columns we want and their titles
  const tableColumn = ['Id', 'Ejecutivo', 'Alias', 'Familiares', 'Creado']
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  ejecutivos.forEach(ejecutivo => {
    const ejecutivoData = [
      ejecutivo.id,
      ejecutivo.nombres,
      ejecutivo.alias,
      ejecutivo.familiares,
      // called date-fns to format the date on the ticket
      format(new Date(ejecutivo.created), 'yyyy-MM-dd'),
    ]

    tableRows.push(ejecutivoData)
  })

  // startY is basically margin-top
  doc.autoTable({
    columns: tableColumn,
    body: tableRows,
    margin: { top: 40 },
    didDrawPage: function (data) {
      doc.addImage(logoEmpresa, 'PNG', 78, 0, 50, 30)
      doc.text('Lista de ejecutivos registrados en el sistema.', 14, 35)
    },
  })
  const date = Date().split(' ')
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  // ticket title. and margin-top + margin-left

  // doc.addImage(logoEmpresa, 'PNG', 78, 0, 50, 30)

  // doc.text('Lista de ejecutivos registrados en el sistema.', 14, 35)

  // we define the name of our PDF file.
  doc.save(`report_ejecutivos_${dateStr}.pdf`)
}

export default ejecutivosReportPDF
