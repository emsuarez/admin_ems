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
import { getHistorialMovimientosAction } from '../../store/actions'

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const fechaActual = new Date()

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

const HistorialMovimientoTable = ({
  data,
  handleOpenViewInforme,
  handleOpenEditInforme,
  handleOpenDelete,
}) => {
  const dispatch = useDispatch()
  const { results, count } = data

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    dispatch(
      getHistorialMovimientosAction(newPage > page ? data.next : data.previous)
    )

    setPage(newPage)
  }
  const tipo = window.localStorage.getItem('tipo')
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
            <TableCell></TableCell>
            <TableCell colSpan={2} align='center'>
              Lugares
            </TableCell>
            <TableCell colSpan={2} align='center'>
              Vehículo
            </TableCell>
            <TableCell colSpan={2} align='center'>
              Hora
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-bold'>Ejecutivo o familiar</TableCell>
            <TableCell>Salida</TableCell>
            <TableCell>Llegada</TableCell>
            <TableCell>Ejecutivo</TableCell>
            <TableCell>Protector</TableCell>
            <TableCell>Salida</TableCell>
            <TableCell>Llegada</TableCell>
            <TableCell>Protector</TableCell>
            <TableCell>Observación</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row, index) => (
            <TableRow key={index}>
              <TableCell scope='row'>{row.ejecutivo}</TableCell>
              <TableCell>
                {row.lugar_salida_texto
                  ? row.lugar_salida_texto
                  : row.lugar_salida}
              </TableCell>
              <TableCell>
                {row.lugar_llegada_texto
                  ? row.lugar_llegada_texto
                  : row.lugar_llegada}
              </TableCell>
              <TableCell>{row.vehiculo_ejecutivo}</TableCell>
              <TableCell>{row.vehiculo_protector}</TableCell>
              <TableCell>
                {format(new Date(row.hora_salida), 'dd/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell>
                {row.hora_llegada === null
                  ? ''
                  : format(new Date(row.hora_llegada), 'dd/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell>{row.protector}</TableCell>
              <TableCell>{row.observacion}</TableCell>

              <TableCell>
                <div className='flex justify-between'>
                  <div className='border-t-0 px-2 border-l-0 border-r-0 text-base whitespace-nowrap  text-white'>
                    {row.estado === 1 ? (
                      <Icon svgName='luzVerde' className='h-4' />
                    ) : row.estado === 2 ? (
                      <Icon svgName='luzNaranja' className='h-4' />
                    ) : (
                      <Icon svgName='luzRoja' className='h-4' />
                    )}
                  </div>
                  {row.estado !== 1 || tipo === '1' ? (
                    <div
                      className='border-t-0 px-2  border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white  hover:bg-gray-300 hover:rounded'
                      onClick={() => handleOpenEditInforme(row)}
                    >
                      <Icon svgName='ib_editar' className='h-4 mx-auto' />
                    </div>
                  ) : null}

                  <div className='border-t-0 px-2  border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:text-white-600  hover:rounded'>
                    <button
                      className='bg-blue-900 rounded-md hover:bg-blue-600 px-2'
                      onClick={() => handleOpenViewInforme(row)}
                    >
                      Ver
                    </button>
                  </div>
                  {tipo === '1' && (
                    <div
                      className='border-t-0 px-2  border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white  hover:bg-gray-300 hover:rounded'
                      onClick={() => handleOpenDelete(row)}
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
              colSpan={10}
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

export default HistorialMovimientoTable
