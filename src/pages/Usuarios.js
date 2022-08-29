import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  Header,
  ICONS,
  RedirectWithoutLogin,
} from '../components'
import UsuariosTable from '../components/Usuarios/UsuariosTable'
import EditUsuario from '../components/UsuariosModals/EditUsuario'
import ResetearPassword from '../components/UsuariosModals/ResetearPassword'
import usuariosReportPDF from '../reports/Usuarios/usuariosReportPDF'
import {
  getAllUsersReportAction,
  getUsersAction,
  UpdatePasswordAction,
  UpdateUserAction,
} from '../store/actions'

const Usuarios = () => {
  const dispatch = useDispatch()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openResetearPasswordModal, setOpenResetearPasswordModal] =
    useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')

  useEffect(() => {
    dispatch(getUsersAction())
    dispatch(getAllUsersReportAction())
  }, [dispatch])

  const usuariosData = useSelector(state => state.auth.users)
  const allUsuariosData = useSelector(state => state.auth.allUsers)

  const handleOpenEditModal = itemEditar => {
    setOpenEditModal(true)

    setItemEditar(itemEditar)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleEditarUsuario = usuario => {
    dispatch(UpdateUserAction(usuario))
    setOpenEditModal(false)
  }

  const handleOpenResetearPasswordModal = itemEditar => {
    setOpenResetearPasswordModal(true)
    setItemEditar(itemEditar)
  }

  const handleResetearPasswordUsuario = usuario => {
    dispatch(UpdatePasswordAction(usuario))
    setOpenResetearPasswordModal(false)
  }

  const handleCloseResetearPasswordModal = () => {
    setOpenResetearPasswordModal(false)
  }

  const handleSearch = e => {
    dispatch(getUsersAction('/user/?query=' + e.target.value))
  }

  return (
    <>
      <div>
        <RedirectWithoutLogin />
        {AdminAuthorized() == -1 ? (
          <div className='bg-white flex flex-col justify-center'>
            <h1 className='font-bold text-3xl text-center'>
              No tiene permisos para acceder a esta página
            </h1>
          </div>
        ) : (
          <>
            <Header />
            <div className='flex items-center bg-slate-100 py-2'>
              <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
              <p className=' ml-1'>Usuarios</p>
              <ICONS.ChevronRightIconO className='h-3  ml-1' />
              <p className=' ml-1'>Administrar</p>
            </div>

            <div className='bg-white mx-10 py-10'>
              <div className='flex mx-10 justify-between'>
                <div className=''></div>

                <div className='flex'>
                  <button
                    onClick={() => usuariosReportPDF(allUsuariosData.results)}
                  >
                    <div className='flex'>
                      <p className='text-blue-800 hover:cursor-pointer'>
                        Exportar a PDF
                      </p>
                      <ICONS.ChevronDownIconO
                        className='w-3 mb-1.5 ml-2'
                        color='blue'
                      />
                    </div>
                  </button>
                  <div className='flex flex-col ml-4'>
                    <input
                      autoComplete='off'
                      id='search'
                      name='search'
                      placeholder='Buscar'
                      className='border-[1px] outline-none pl-3 rounded-2xl bg-gray-50 py-1'
                      onChange={e => {
                        handleSearch(e)
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className=' pt-4 p-16 flex flex-col'>
                <UsuariosTable
                  data={usuariosData}
                  handleOpenEditModal={handleOpenEditModal}
                  handleOpenResetearPasswordModal={
                    handleOpenResetearPasswordModal
                  }
                />
              </div>
            </div>
            {/* Modales */}
            <EditUsuario
              tituloModal={'Editar usuario'}
              descripcionModal={'Edita los datos del usuario.'}
              openModal={openEditModal}
              handleClose={handleCloseEditModal}
              handleAction={handleEditarUsuario}
              itemEditar={itemEditar}
            />
            <ResetearPassword
              tituloModal={'Resetear contraseña'}
              descripcionModal={'Resetear contraseña del usuario.'}
              openModal={openResetearPasswordModal}
              handleClose={handleCloseResetearPasswordModal}
              handleAction={handleResetearPasswordUsuario}
              itemEditar={itemEditar}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Usuarios
