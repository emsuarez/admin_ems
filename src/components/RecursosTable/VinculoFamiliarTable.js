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
import {
  getGrupoFamiliarAction,
  getGrupoFamiliarByIdAction,
  UpdateEstadoFamiliarAction,
} from '../../store/actions'

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

const VinculoFamiliarTable = ({
  data,
  handleOpenEditModal,
  handleOpenDeleteModal,
  tipo,
  handleOpenEditFamilyModal,
}) => {
  const dispatch = useDispatch()
  const { results, count } = data

  const handleChangeStatusFamiliar = data => {
    const { id, is_active } = data
    const nuevoStatus = {
      clasificador: 'familiar',
      id: id,
      estado: is_active === true ? false : true,
    }
    dispatch(UpdateEstadoFamiliarAction(nuevoStatus))
  }

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    if (tipo === 'modal') {
      dispatch(
        getGrupoFamiliarByIdAction(newPage > page ? data.next : data.previous)
      )
    } else {
      dispatch(
        getGrupoFamiliarAction(newPage > page ? data.next : data.previous)
      )
    }

    setPage(newPage)
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
            <TableCell className='font-bold'>Nombre</TableCell>
            <TableCell>Alias</TableCell>
            {tipo === 'general' && <TableCell>Ejecutivo</TableCell>}
            <TableCell>Creado</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row, index) => (
            <TableRow key={index}>
              <TableCell scope='row'>{row.nombres}</TableCell>
              <TableCell>{row.alias}</TableCell>
              {tipo === 'general' && <TableCell>{row.ejecutivo}</TableCell>}
              <TableCell>
                {row.created &&
                  format(new Date(row.created), 'dd/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell>
                <div className='flex justify-center'>
                  <div
                    className='border-t-0 px-2 border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:bg-gray-300 hover:rounded'
                    onClick={() => handleChangeStatusFamiliar(row)}
                  >
                    {row.is_active ? (
                      <Icon svgName='ib_activo' className='h-5 mx-auto' />
                    ) : (
                      <Icon svgName='ib_inactivo' className='h-5 mx-auto' />
                    )}
                  </div>
                  {tipo === 'general' && (
                    <div
                      className='border-t-0 px-2  border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white  hover:bg-gray-300 hover:rounded'
                      onClick={() => handleOpenEditFamilyModal(row)}
                    >
                      <svg
                        width='25'
                        height='18'
                        viewBox='0 0 25 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5'
                      >
                        <path
                          d='M22.1729 5.35877V3.21526H20.1572V5.35877H18.1414V7.50228H20.1572V9.64579H22.1729V7.50228H24.1886V5.35877H22.1729Z'
                          fill='black'
                        />
                        <path
                          d='M8.06287 8.57403C10.2902 8.57403 12.0943 6.65559 12.0943 4.28702C12.0943 1.91844 10.2902 0 8.06287 0C5.8355 0 4.03143 1.91844 4.03143 4.28702C4.03143 6.65559 5.8355 8.57403 8.06287 8.57403ZM8.06287 2.14351C9.17151 2.14351 10.0786 3.10809 10.0786 4.28702C10.0786 5.46595 9.17151 6.43052 8.06287 6.43052C6.95422 6.43052 6.04715 5.46595 6.04715 4.28702C6.04715 3.10809 6.95422 2.14351 8.06287 2.14351Z'
                          fill='black'
                        />
                        <path
                          d='M8.06287 9.64579C5.37188 9.64579 0 11.0819 0 13.9328V17.1481H16.1257V13.9328C16.1257 11.0819 10.7538 9.64579 8.06287 9.64579ZM14.11 15.0046H2.01572V13.9435C2.21729 13.1719 5.34165 11.7893 8.06287 11.7893C10.7841 11.7893 13.9084 13.1719 14.11 13.9328V15.0046Z'
                          fill='black'
                        />
                        <path
                          d='M12.6083 0.0535879C13.5355 1.18965 14.11 2.66867 14.11 4.28702C14.11 5.90536 13.5355 7.38439 12.6083 8.52044C14.5837 8.25251 16.1257 6.47339 16.1257 4.28702C16.1257 2.10064 14.5837 0.321526 12.6083 0.0535879Z'
                          fill='black'
                        />
                        <path
                          d='M16.6599 10.5353C17.5569 11.4249 18.1414 12.5395 18.1414 13.9328V17.1481H20.1572V13.9328C20.1572 12.3788 18.5547 11.2427 16.6599 10.5353Z'
                          fill='black'
                        />
                      </svg>
                    </div>
                  )}

                  <div
                    className='border-t-0 px-2  border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white  hover:bg-gray-300 hover:rounded'
                    onClick={() => handleOpenEditModal(row)}
                  >
                    <Icon svgName='ib_editar' className='h-4 mx-auto' />
                  </div>

                  <div
                    className='border-t-0 px-2  border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:text-red-600  hover:bg-gray-300 hover:rounded'
                    onClick={() => handleOpenDeleteModal(row)}
                  >
                    <Icon svgName='ib_eliminar' className='h-4 mx-auto' />
                  </div>
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

export default VinculoFamiliarTable
