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
  getProtectoresAction,
  UpdateEstadoProtectorAction,
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
const ProtectoresTable = ({
  data,
  handleOpenEditModal,
  handleOpenDeleteModal,
}) => {
  const { results, count } = data
  const dispatch = useDispatch()

  const handleChangeStatusEjecutvo = data => {
    const { id, is_active } = data
    const nuevoStatus = {
      clasificador: 'protector',
      id: id,
      estado: is_active === true ? false : true,
    }
    dispatch(UpdateEstadoProtectorAction(nuevoStatus))
  }

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    dispatch(getProtectoresAction(newPage > page ? data.next : data.previous))

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
            <TableCell className='font-bold'>Protector</TableCell>
            <TableCell>Alias</TableCell>
            <TableCell>Creado</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(row => (
            <TableRow key={row.id}>
              <TableCell scope='row'>{row.nombres}</TableCell>
              <TableCell>{row.alias}</TableCell>
              <TableCell>
                {format(new Date(row.created), 'dd/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell>
                <div className='flex justify-center'>
                  <div
                    className='border-t-0 px-2 border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:bg-gray-300 hover:rounded'
                    onClick={() => handleChangeStatusEjecutvo(row)}
                  >
                    {row.is_active ? (
                      <Icon svgName='ib_activo' className='h-5 mx-auto' />
                    ) : (
                      <Icon svgName='ib_inactivo' className='h-5 mx-auto' />
                    )}
                  </div>

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
              colSpan={4}
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

export default ProtectoresTable
