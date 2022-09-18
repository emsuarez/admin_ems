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
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Icon from '../../assets/Icon'
import {
  getGrupoFamiliarAction,
  UpdateEstadoFamiliarAction,
} from '../../store/actions'
import { format } from 'date-fns'

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
  seBusco,
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
    dispatch(getGrupoFamiliarAction(newPage > page ? data.next : data.previous))

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
            <TableCell>Ejecutivo</TableCell>
            <TableCell>Creado</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(row => (
            <TableRow key={row.id}>
              <TableCell scope='row'>{row.nombres}</TableCell>
              <TableCell>{row.alias}</TableCell>
              <TableCell>{row.ejecutivo}</TableCell>
              <TableCell>
                {format(new Date(row.created), 'dd/MM/yyyy HH:mm')}
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
    // <div className='flex flex-col break-words bg-white w-full shadow-lg h-full'>
    //   <div className='overflow-y-auto'>
    //     <table className='items-center bg-transparent w-full border-collapse'>
    //       <thead className='border-gray-200'>
    //         <tr>
    //           <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
    //             Nombre
    //           </th>
    //           <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
    //             Alias
    //           </th>
    //           <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
    //             Ejecutivo
    //           </th>
    //           <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
    //             Creado
    //           </th>
    //           <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
    //             Opciones
    //           </th>
    //         </tr>
    //       </thead>

    //       {JSON.stringify(data) !== '{}' ? (
    //         <tbody className='overflow-x-auto'>
    //           {results.map((item, index) => (
    //             <tr key={item.id}>
    //               <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-left text-blueGray-700 '>
    //                 {item.nombres}
    //               </th>
    //               <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
    //                 {item.alias}
    //               </td>
    //               <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
    //                 {item.id_ejecutivo}
    //               </td>
    //               <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
    //                 {item.created}
    //               </td>

    //               <button
    //                 className='mt-2'
    //                 onClick={() => handleChangeStatusFamiliar(item)}
    //               >
    //                 <td className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-gray-300 hover:rounded'>
    //                   {item.is_active ? (
    //                     <svg
    //                       width='23'
    //                       height='24'
    //                       viewBox='0 0 23 24'
    //                       fill='none'
    //                       xmlns='http://www.w3.org/2000/svg'
    //                       className='h-5'
    //                     >
    //                       <path
    //                         d='M11.0858 0.930908C4.96611 0.930908 -0.000610352 5.98223 -0.000610352 12.2062C-0.000610352 18.4301 4.96611 23.4815 11.0858 23.4815C17.2055 23.4815 22.1723 18.4301 22.1723 12.2062C22.1723 5.98223 17.2055 0.930908 11.0858 0.930908ZM8.86854 17.8438L3.32532 12.2062L4.88851 10.6164L8.86854 14.6529L17.2831 6.09498L18.8463 7.69607L8.86854 17.8438Z'
    //                         fill='#128868'
    //                       />
    //                     </svg>
    //                   ) : (
    //                     <svg
    //                       width='23'
    //                       height='23'
    //                       viewBox='0 0 23 23'
    //                       fill='none'
    //                       xmlns='http://www.w3.org/2000/svg'
    //                       className='h-5'
    //                     >
    //                       <path
    //                         d='M11.0858 0.208252C4.96611 0.208252 -0.000610352 5.25957 -0.000610352 11.4835C-0.000610352 17.7075 4.96611 22.7588 11.0858 22.7588C17.2055 22.7588 22.1723 17.7075 22.1723 11.4835C22.1723 5.25957 17.2055 0.208252 11.0858 0.208252ZM8.86854 17.1212L3.32532 11.4835L4.88851 9.89371L8.86854 13.9303L17.2831 5.37233L18.8463 6.97342L8.86854 17.1212Z'
    //                         fill='#D61601'
    //                       />
    //                     </svg>
    //                   )}
    //                 </td>
    //               </button>

    //               {tipo !== 'modal' ? (
    //                 <button onClick={() => handleOpenEditFamilyModal(item)}>
    //                   <td className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white  mx-auto hover:bg-gray-300 hover:rounded'>
    //                     <svg
    //                       width='25'
    //                       height='18'
    //                       viewBox='0 0 25 18'
    //                       fill='none'
    //                       xmlns='http://www.w3.org/2000/svg'
    //                       className='h-5'
    //                     >
    //                       <path
    //                         d='M22.1729 5.35877V3.21526H20.1572V5.35877H18.1414V7.50228H20.1572V9.64579H22.1729V7.50228H24.1886V5.35877H22.1729Z'
    //                         fill='black'
    //                       />
    //                       <path
    //                         d='M8.06287 8.57403C10.2902 8.57403 12.0943 6.65559 12.0943 4.28702C12.0943 1.91844 10.2902 0 8.06287 0C5.8355 0 4.03143 1.91844 4.03143 4.28702C4.03143 6.65559 5.8355 8.57403 8.06287 8.57403ZM8.06287 2.14351C9.17151 2.14351 10.0786 3.10809 10.0786 4.28702C10.0786 5.46595 9.17151 6.43052 8.06287 6.43052C6.95422 6.43052 6.04715 5.46595 6.04715 4.28702C6.04715 3.10809 6.95422 2.14351 8.06287 2.14351Z'
    //                         fill='black'
    //                       />
    //                       <path
    //                         d='M8.06287 9.64579C5.37188 9.64579 0 11.0819 0 13.9328V17.1481H16.1257V13.9328C16.1257 11.0819 10.7538 9.64579 8.06287 9.64579ZM14.11 15.0046H2.01572V13.9435C2.21729 13.1719 5.34165 11.7893 8.06287 11.7893C10.7841 11.7893 13.9084 13.1719 14.11 13.9328V15.0046Z'
    //                         fill='black'
    //                       />
    //                       <path
    //                         d='M12.6083 0.0535879C13.5355 1.18965 14.11 2.66867 14.11 4.28702C14.11 5.90536 13.5355 7.38439 12.6083 8.52044C14.5837 8.25251 16.1257 6.47339 16.1257 4.28702C16.1257 2.10064 14.5837 0.321526 12.6083 0.0535879Z'
    //                         fill='black'
    //                       />
    //                       <path
    //                         d='M16.6599 10.5353C17.5569 11.4249 18.1414 12.5395 18.1414 13.9328V17.1481H20.1572V13.9328C20.1572 12.3788 18.5547 11.2427 16.6599 10.5353Z'
    //                         fill='black'
    //                       />
    //                     </svg>
    //                   </td>
    //                 </button>
    //               ) : null}
    //               <button onClick={() => handleOpenEditModal(item)}>
    //                 <td className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-gray-300 hover:rounded'>
    //                   <svg
    //                     width='17'
    //                     height='15'
    //                     viewBox='0 0 17 15'
    //                     fill='none'
    //                     xmlns='http://www.w3.org/2000/svg'
    //                     className='h-5'
    //                   >
    //                     <path
    //                       d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
    //                       fill='#128868'
    //                     />
    //                   </svg>
    //                 </td>
    //               </button>
    //               <button onClick={() => handleOpenDeleteModal(item)}>
    //                 <td className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:text-red-600 mx-auto hover:bg-gray-300 hover:rounded'>
    //                   <svg
    //                     width='13'
    //                     height='17'
    //                     viewBox='0 0 13 17'
    //                     fill='none'
    //                     xmlns='http://www.w3.org/2000/svg'
    //                     className='h-5'
    //                   >
    //                     <path
    //                       d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
    //                       fill='#D61601'
    //                     />
    //                   </svg>
    //                 </td>
    //               </button>
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
    //           Mostrando <span className='font-medium'>{cuentaDesdePagina}</span>{' '}
    //           -{' '}
    //           <span className='font-medium'>
    //             {Object.keys(data).length > 0 ? cuentaHastaPagina : null}
    //           </span>{' '}
    //           de{' '}
    //           <span className='font-medium'>
    //             {Object.keys(data).length > 0 ? count : null}
    //           </span>{' '}
    //           resultados
    //         </p>
    //       </div>
    //       <div>
    //         <nav
    //           className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
    //           aria-label='Pagination'
    //         >
    //           <button
    //             disabled={data.previous === null ? true : false}
    //             className={data.previous !== null ? 'cursor-pointer' : null}
    //             onClick={() => handlePreviousPage(data.previous)}
    //           >
    //             <div
    //               className={
    //                 data.previous === null
    //                   ? 'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-blue-900 bg-gray-300'
    //                   : 'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-blue-900 hover:bg-gray-50'
    //               }
    //             >
    //               <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
    //               {/* <span className='sr-only'> */}
    //               Anterior
    //               {/* </span> */}
    //             </div>
    //           </button>

    //           {/* {data.next || data.previous
    //           ? cantidadPaginas.map(pagina => (
    //               <a
    //                 href='#'
    //                 class='py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
    //               >
    //                 {pagina}
    //               </a>
    //             ))
    //           : null} */}
    //           <button
    //             disabled={data.next === null ? true : false}
    //             className={data.next !== null ? 'cursor-pointer' : null}
    //             onClick={() => handleNextPage(data.next)}
    //           >
    //             <div
    //               className={
    //                 data.next === null
    //                   ? 'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-blue-900 bg-gray-300'
    //                   : 'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-blue-900 hover:bg-gray-50'
    //               }
    //             >
    //               {/* <span className='sr-only'> */}
    //               Siguiente
    //               <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
    //               {/* </span> */}
    //             </div>
    //           </button>
    //         </nav>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default VinculoFamiliarTable
