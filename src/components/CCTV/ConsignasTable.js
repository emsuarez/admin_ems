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
import React from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import {
  obtenerConsignasCCTVAction,
  obtenerConsignasTRSAction,
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

const ConsignasTable = ({
  data,
  confirmarCerrarConsigna,
  tituloTipoTable,
  functionChangePage,
}) => {
  const { results, count } = data

  const dispatch = useDispatch()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    dispatch(functionChangePage(newPage > page ? data.next : data.previous))

    setPage(newPage)
  }
  return (
    <div>
      <div className='mb-0 px-4 py-3 border-0 bg-white w-full'>
        <div className='flex flex-wrap items-center'>
          <div className='relative w-full px-4  flex-grow flex-1'>
            <h3 className='font-semibold text-lg text-blueGray-700 '>
              {tituloTipoTable}
            </h3>
          </div>
        </div>
      </div>
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
              <TableCell className='font-bold'>FECHA/HORA</TableCell>
              <TableCell>CONSIGNAS</TableCell>
            </TableRow>
          </TableHead>
          {data && (
            <TableBody style={{ maxHeight: 300 }}>
              {results.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {format(new Date(row.created), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell>{row.obs_creacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

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
                colSpan={2}
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
    </div>
    // <div className='flex flex-col break-words bg-white w-full shadow-lg h-full'>
    //   <div className='mb-0 px-4 py-3 border-0'>
    //     <div className='flex flex-wrap items-center'>
    //       <div className='relative w-full px-4  flex-grow flex-1'>
    //         <h3 className='font-semibold text-lg text-blueGray-700 '>
    //           {tituloTipoTable}
    //         </h3>
    //       </div>
    //     </div>
    //   </div>

    //   <div className='overflow-y-auto'>
    //     <table className='items-center bg-transparent w-full border-collapse '>
    //       <thead className='bg-gray-200'>
    //         <tr>
    //           <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
    //             FECHA/HORA
    //           </th>
    //           <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
    //             CONSIGNAS
    //           </th>
    //         </tr>
    //       </thead>

    //       {Object.keys(data).length > 0 ? (
    //         <tbody className='overflow-x-auto'>
    //           {data.results.map((item, index) => (
    //             <tr key={index}>
    //               <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 '>
    //                 {item.created}
    //               </th>
    //               <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 '>
    //                 {item.obs_creacion}
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       ) : null}
    //     </table>
    //   </div>

    //   {/* Paginación */}
    //   <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
    //     <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
    //       <div>
    //         <p className='text-sm text-gray-700'>
    //           Mostrando <span className='font-medium'>1</span> -{' '}
    //           <span className='font-medium'>
    //             {Object.keys(data).length > 0 ? results.length : null}
    //           </span>{' '}
    //           de{' '}
    //           <span className='font-medium'>
    //             {Object.keys(data).length > 0 ? count : null}
    //           </span>{' '}
    //           resultados
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default ConsignasTable
