import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  CreateEjecutivo,
  DeleteEjecutivo,
  EditEjecutivo,
  EditLugar,
  Header,
  ICONS,
  LugaresTable,
  ProtectoresTable,
  RedirectWithoutLogin,
} from '../../components'
import lugaresReportPDF from '../../reports/Recursos/lugaresReportPDF'
import {
  CreateNewLugarAction,
  DeleteLugaresAction,
  GetAllLugaresAction,
  GetLugaresAction,
  UpdateLugarAction,
} from '../../store/actions'

const Lugares = () => {
  const dispatch = useDispatch()
  const [openEditModal, setOpenEditModal] = React.useState(false)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')

  useEffect(() => {
    dispatch(GetLugaresAction())
    dispatch(GetAllLugaresAction())
  }, [dispatch])

  const lugaresData = useSelector(state => state.recursos.lugares)
  const allLugaresData = useSelector(state => state.recursos.allLugares)

  const handleOpenEditModal = itemEditar => {
    setOpenEditModal(true)
    setItemEditar(itemEditar)
  }
  const handleOpenDeleteModal = itemEliminar => {
    setOpenDeleteModal(true)
    setItemEliminar(itemEliminar)
  }

  const handleGuardarLugar = lugar => {
    console.log(lugar)
    const nuevoLugar = {
      ...lugar,
      lugar: lugar.nombres,
    }
    console.log(nuevoLugar, 'nuevoLugar')
    dispatch(CreateNewLugarAction(nuevoLugar))
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleEditarLugar = lugar => {
    const lugarActualizado = { ...lugar, id: itemEditar.id }
    dispatch(UpdateLugarAction(lugarActualizado))
    setOpenEditModal(false)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleDeleteLugar = lugar => {
    dispatch(DeleteLugaresAction({ id: lugar.id }))
    setOpenDeleteModal(false)
  }

  return (
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
            <p className=' ml-1'>Recursos</p>
            <ICONS.ChevronRightIconO className='h-3  ml-1' />
            <p className=' ml-1'>Lugares</p>
          </div>

          <div className='bg-white mx-10 py-10'>
            <div className='flex mx-10 justify-between'>
              <div className=''>
                <CreateEjecutivo
                  tituloModal={'Crear un Lugar'}
                  descripcionModal={
                    'Los lugares son las ubicaciones que servira para los registros de movimiento.'
                  }
                  handleAction={handleGuardarLugar}
                />
              </div>
              <button onClick={() => lugaresReportPDF(allLugaresData.results)}>
                <div className='flex'>
                  <div className='flex'>
                    <p className='text-blue-800 hover:cursor-pointer'>
                      Exportar a PDF
                    </p>
                    <ICONS.ChevronDownIconO
                      className='w-3 mb-1.5 ml-2'
                      color='blue'
                    />
                  </div>
                  <div className='flex flex-col ml-4'>
                    <input
                      placeholder='Buscar'
                      className='border-[1px] outline-none pl-3 rounded-2xl bg-gray-50 py-1'
                    />
                  </div>
                </div>
              </button>
            </div>

            <div className=' pt-4 p-16 flex flex-col'>
              <LugaresTable
                data={lugaresData}
                handleOpenEditModal={handleOpenEditModal}
                handleOpenDeleteModal={handleOpenDeleteModal}
              />
            </div>
          </div>
          {/* Modales */}
          <EditLugar
            tituloModal={'Editar Lugar'}
            descripcionModal={'Edita los datos del lugar seleccionado.'}
            openModal={openEditModal}
            handleClose={handleCloseEditModal}
            handleAction={handleEditarLugar}
            itemEditar={itemEditar}
          />
          <DeleteEjecutivo
            tipo='lugares'
            tituloModal={'Eliminar Lugar'}
            descripcionModal={'Estas por eliminar un lugar'}
            openModal={openDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleAction={handleDeleteLugar}
            itemEliminar={itemEliminar}
          />
        </>
      )}
    </div>
  )
}

export default Lugares
