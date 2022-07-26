import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  tablePaginationClasses,
  TableRow,
  useTheme,
} from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import { useDispatch } from 'react-redux'
import Icon from '../../assets/Icon'
import { getInformeCctv, getInformeTrs } from '../../store/actions'

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1)
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
        ) : (
          <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
        ) : (
          <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
        )}
      </IconButton>
    </Box>
  )
}

const RecepcionTurnoTable = ({
  data,
  handleOpenViewInforme,
  handleOpenEditInforme,
  handleOpenDeleteActa,
  tipoTabla,
}) => {
  const dispatch = useDispatch()
  const { results, count } = data

  const tipo = window.localStorage.getItem('tipo')
  const idUsuario = window.localStorage.getItem('userid')

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    if (tipoTabla === 'trs') {
      dispatch(getInformeTrs(newPage > page ? data.next : data.previous))
    }
    if (tipoTabla === 'cctv') {
      dispatch(getInformeCctv(newPage > page ? data.next : data.previous))
    }
    setPage(newPage)
  }

  const validarFecha = fecha => {
    const fechaActual = new Date().setHours(0, 0, 0, 0)
    const fechaValidar = new Date(fecha).setHours(0, 0, 0, 0)

    return fechaActual === fechaValidar
  }
  return (
    <TableContainer className='shadow-lg' component={Paper}>
      <Table
        size='small'
        className='shadow-none'
        aria-label='custom pagination table'
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
          },
        }}
      >
        <TableHead
          className='border-y-[1.5px] border-gray-200'
          sx={{
            [`& .${tableCellClasses.head}`]: {
              color: '#26346E',
              fontSize: '0.875rem',
              fontWeight: '600',
              lineHeight: '1.25rem',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              padding: '1.1rem 1rem',
            },
          }}
        >
          <TableRow>
            <TableCell className='font-bold'>
              Centralista de operaciones salientes
            </TableCell>
            <TableCell>Centralista de operaciones entrantes</TableCell>
            <TableCell>Fecha y Hora</TableCell>
            <TableCell>Turno</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row, index) => (
            <TableRow key={index}>
              <TableCell scope='row'>{row.agente_saliente}</TableCell>
              <TableCell>{row.agente_entrante}</TableCell>
              <TableCell>
                {row.created
                  ? format(new Date(row.created), 'dd/MM/yyyy HH:mm')
                  : ''}
              </TableCell>
              <TableCell>{row.turno === 1 ? 'Diurno' : 'Nocturno'}</TableCell>
              <TableCell>
                <div className='flex justify-center'>
                  {tipo === '1' ? (
                    <>
                      <div
                        className='border-t-0 px-2  border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white  hover:bg-gray-300 hover:rounded'
                        onClick={() => handleOpenEditInforme(row)}
                      >
                        <Icon svgName='ib_editar' className='h-4 mx-auto' />
                      </div>
                      <div
                        className='bg-blue-900 rounded-md mx-1'
                        onClick={() => handleOpenViewInforme(row)}
                      >
                        <span className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-blue-600 hover:rounded'>
                          Ver
                        </span>
                      </div>
                    </>
                  ) : row === results[0] &&
                    validarFecha(row.created) &&
                    row.id_agente_saliente === Number(idUsuario) ? (
                    <>
                      <div
                        className='border-t-0 px-2  border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white  hover:bg-gray-300 hover:rounded'
                        onClick={() => handleOpenEditInforme(row)}
                      >
                        <Icon svgName='ib_editar' className='h-4 mx-auto' />
                      </div>
                      <div
                        className='bg-blue-900 rounded-md mx-1'
                        onClick={() => handleOpenViewInforme(row)}
                      >
                        <span className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-blue-600 hover:rounded'>
                          Ver
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className='bg-blue-900 rounded-md mx-1'
                        onClick={() => handleOpenViewInforme(row)}
                      >
                        <span className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-blue-600 hover:rounded'>
                          Ver
                        </span>
                      </div>
                    </>
                  )}

                  {tipo === '1' && (
                    <div
                      className='border-t-0 px-2  border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:text-red-600  hover:bg-gray-300 hover:rounded'
                      onClick={() => handleOpenDeleteActa(row)}
                    >
                      <Icon svgName='ib_eliminar' className='h-4 mx-auto' />
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className='border-y-[1.5px] border-gray-200'>
          <TableRow>
            <TablePagination
              sx={{
                [`& .${tablePaginationClasses.spacer}`]: {
                  display: 'none',
                },
                [`& .${tablePaginationClasses.toolbar}`]: {
                  justifyContent: 'space-between',
                  padding: '0rem 3rem',
                },
              }}
              colSpan={5}
              count={count}
              rowsPerPageOptions={[]}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'filas por pagina',
                },
                native: true,
              }}
              labelDisplayedRows={({ from, to, count }) => {
                return (
                  'Mostrando ' +
                  from +
                  ' - ' +
                  to +
                  ' de ' +
                  count +
                  ' resultados'
                )
              }}
              backIconButtonProps={{
                inputProps: {
                  'aria-label': 'pagina anterior',
                },
              }}
              nextIconButtonProps={{
                color: 'secondary',
              }}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default RecepcionTurnoTable
