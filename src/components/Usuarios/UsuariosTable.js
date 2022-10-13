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
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getUsersAction,
  UpdateEstadoUsuariosAction,
  updateUserInfoAction,
} from '../../store/actions/AuthAction'
import CambiarImagenModal from '../UsuariosModals/CambiarImagenModal'

import { format } from 'date-fns'
import Icon from '../../assets/Icon'

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

const UsuariosTable = ({
  data,
  handleOpenEditModal,
  handleOpenResetearPasswordModal,
}) => {
  const { results, count } = data
  const dispatch = useDispatch()

  const [imagenNueva, setImagenNueva] = useState()
  const [imagenSeleccionada, setImagenSeleccionada] = useState()
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState()

  const [openModal, setOpenModal] = useState(false)

  const handleChangeStatusUser = data => {
    const nuevoStatus = {
      clasificador: 'usuario',
      id: data.user_id,
      estado: data.is_active === true ? false : true,
    }
    dispatch(UpdateEstadoUsuariosAction(nuevoStatus))
  }

  const handleImage = (e, usuario) => {
    const [file] = e.target.files

    setImagenNueva(e.target.files[0])
    setImagenSeleccionada(URL.createObjectURL(file))
    setOpenModal(true)
    setUsuarioSeleccionado(usuario)
  }

  const handleImageSubmit = () => {
    const usuario = {
      id: usuarioSeleccionado.user_id,
      usuario: usuarioSeleccionado.username,
      nombres: usuarioSeleccionado.first_name,
      apellidos: usuarioSeleccionado.last_name,
      tipo: usuarioSeleccionado.tipo,
      imagen: imagenNueva,
    }

    dispatch(updateUserInfoAction(usuario))
    setOpenModal(false)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    dispatch(getUsersAction(newPage > page ? data.next : data.previous))

    setPage(newPage)
  }

  return (
    <>
      <CambiarImagenModal
        openModal={openModal}
        handleClose={handleCloseModal}
        tituloModal='Cambiar imagen'
        descripcionModal='Esta seguro que desea cambiar la imagen del usuario?'
        handleAction={handleImageSubmit}
        itemModificar={usuarioSeleccionado}
      />
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
              <TableCell className='font-bold'>Usuario</TableCell>
              <TableCell>Nombre y Apellido</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row, index) => (
              <TableRow key={index}>
                <TableCell scope='row'>{row.username}</TableCell>
                <TableCell> {`${row.first_name} ${row.last_name}`}</TableCell>
                <TableCell>
                  {' '}
                  {row.tipo === '1'
                    ? 'Administrador'
                    : row.tipo === '2'
                    ? 'Operador CCTV'
                    : 'Operador TRS'}
                </TableCell>
                <TableCell>
                  {format(new Date(row.created), 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  <div className='flex justify-center'>
                    <div className='border-t-0 px-2 border-l-0 border-r-0 text-base whitespace-nowrap text-white '>
                      <img
                        src={`${global.urlMedia}${row.imagen}`}
                        alt={row.username}
                        className='rounded-full mt-0.5 w-6 h-6 object-cover'
                      />
                    </div>

                    <label className='border-t-0 px-2 border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:bg-gray-300 hover:rounded'>
                      <svg
                        width='22'
                        height='22'
                        viewBox='0 0 22 22'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                      >
                        <rect width='22' height='22' fill='#E5E5E5' />
                        <rect
                          x='-1192'
                          y='-378'
                          width='1440'
                          height='958'
                          fill='#F0F2F7'
                        />
                        <rect
                          x='-1146'
                          y='-319'
                          width='1346'
                          height='865'
                          fill='white'
                        />
                        <rect width='22' height='22' fill='url(#pattern01)' />
                        <defs>
                          <pattern
                            id='pattern01'
                            patternContentUnits='objectBoundingBox'
                            width='1'
                            height='1'
                          >
                            <use
                              xlinkHref='#image0_1392_1891'
                              transform='scale(0.00195312)'
                            />
                          </pattern>

                          <image
                            id='image0_1392_1891'
                            width='512'
                            height='512'
                            xlinkHref='data:image/png;base64,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'
                          />
                        </defs>
                      </svg>
                      <input
                        id='dropzone-file'
                        type='file'
                        className='hidden'
                        accept='image/png, image/gif, image/jpeg'
                        onChange={e => handleImage(e, row)}
                      />
                    </label>

                    <div
                      className='border-t-0 px-2 border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:bg-gray-300 hover:rounded'
                      onClick={() => {
                        handleOpenResetearPasswordModal(row)
                      }}
                    >
                      <svg
                        width='23'
                        height='23'
                        viewBox='0 0 23 23'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                      >
                        <rect width='23' height='23' fill='url(#pattern0)' />
                        <defs>
                          <pattern
                            id='pattern0'
                            patternContentUnits='objectBoundingBox'
                            width='1'
                            height='1'
                          >
                            <use
                              xlinkHref='#image0_2130_3365'
                              transform='scale(0.00195312)'
                            />
                          </pattern>
                          <image
                            id='image0_2130_3365'
                            width='512'
                            height='512'
                            xlinkHref='data:image/png;base64,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'
                          />
                        </defs>
                      </svg>
                    </div>

                    <div
                      className='border-t-0 px-2 border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:bg-gray-300 hover:rounded'
                      onClick={() => handleChangeStatusUser(row)}
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
    </>
  )
}

export default UsuariosTable
