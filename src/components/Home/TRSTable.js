import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { ICONS } from '../constants'

interface Column {
  id: 'FECHA' | 'CONSIGNAS' | 'ESTADO';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'FECHA', label: 'FECHA/HORA', minWidth: 200 },
  { id: 'CONSIGNAS', label: 'CONSIGNAS', minWidth: 450 },
  { id: 'ESTADO', label: 'ESTADO', minWidth: 100 },
]

interface Data {
  FECHA: string;
  CONSIGNAS: string;
  ESTADO: string;
}

function createData(FECHA: string, CONSIGNAS: string, ESTADO: string): Data {
  return { FECHA, CONSIGNAS, ESTADO }
}

const rows = [
  createData(
    '13/05/2022-15:24',
    'Entregar llaves a cliente porque se olvido, pero regresa la siguiente semana.'
  ),
  createData(
    '13/05/2022-15:24',
    'Entregar llaves a cliente porque se olvido, pero regresa la siguiente semana.'
  ),
  createData(
    '13/05/2022-15:24',
    'Entregar llaves a cliente porque se olvido, pero regresa la siguiente semana.'
  ),
  createData(
    '13/05/2022-15:24',
    'Entregar llaves a cliente porque se olvido, pero regresa la siguiente semana.'
  ),
  createData(
    '13/05/2022-15:24',
    'Entregar llaves a cliente porque se olvido, pero regresa la siguiente semana.'
  ),
]

export default function TRSTable(props) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={12}>
              <h3 className='font-semibold text-left'>
                CONSIGNAS ESPECIALES PENDIENTES TRS
              </h3>
            </TableCell>
          </TableRow>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={
                  column.id == 'ESTADO'
                    ? {
                        top: 57,
                        maxWidth: '100%',
                        textAlign: 'end',
                        paddingRight: '4vh',
                        backgroundColor: '#F8F9FA',
                        fontWeight: 'bold',
                      }
                    : {
                        top: 57,
                        maxWidth: '100%',
                        backgroundColor: '#F8F9FA',
                        fontWeight: 'bold',
                      }
                }
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>

      <TableContainer sx={{ maxHeight: props.height }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {[column.id] == 'ESTADO' ? (
                            <ICONS.XCircleIconS
                              className='h-6 hover:cursor-pointer'
                              color='red'
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage='Filas por página:'
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
