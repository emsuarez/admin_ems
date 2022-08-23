import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  CreateEjecutivo,
  DeleteEjecutivo,
  EditEjecutivo,
  Header,
  ICONS,
  ProtectoresTable,
  RedirectWithoutLogin,
} from '../../components'
import protectoresReportPDF from '../../reports/Recursos/protectoresReportPDF'
import {
  createNewProtectorAction,
  DeleteProtectorAction,
  getAllProtectoresAction,
  getProtectoresAction,
  UpdateProtectorAction,
} from '../../store/actions'

const Protectores = () => {
  const dispatch = useDispatch()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')

  useEffect(() => {
    dispatch(getProtectoresAction())
    dispatch(getAllProtectoresAction())
  }, [dispatch])

  const protectoresData = useSelector(state => state.recursos.protectores)
  const allProtectoresData = useSelector(state => state.recursos.allProtectores)

  const handleGuardarProtector = ejecutivo => {
    dispatch(createNewProtectorAction(ejecutivo))
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleOpenEditModal = itemEditar => {
    setOpenEditModal(true)
    setItemEditar(itemEditar)
  }

  const handleOpenDeleteModal = itemEliminar => {
    setOpenDeleteModal(true)
    setItemEliminar(itemEliminar)
  }

  const handleEditarProtector = protector => {
    const protectorActualizado = { ...protector, id: itemEditar.id }
    dispatch(UpdateProtectorAction(protectorActualizado))
    setOpenEditModal(false)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleDeleteProtector = protector => {
    dispatch(DeleteProtectorAction({ id: protector.id }))
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
            <p className=' ml-1'>Protectores</p>
          </div>

          <div className='bg-white mx-10 py-10'>
            <div className='flex mx-10 justify-between'>
              <div className=''>
                <CreateEjecutivo
                  tituloModal={'Crear protector'}
                  descripcionModal={'Crea a un protector con su alias.'}
                  handleAction={handleGuardarProtector}
                />
              </div>
              <button
                onClick={() => protectoresReportPDF(allProtectoresData.results)}
              >
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
              <ProtectoresTable
                data={protectoresData}
                handleOpenEditModal={handleOpenEditModal}
                handleOpenDeleteModal={handleOpenDeleteModal}
              />
            </div>
          </div>
          {/* Modales */}
          <EditEjecutivo
            tituloModal={'Editar Protector'}
            descripcionModal={'Edita los datos del protector seleccionado.'}
            openModal={openEditModal}
            handleClose={handleCloseEditModal}
            handleAction={handleEditarProtector}
            itemEditar={itemEditar}
          />
          <DeleteEjecutivo
            tipo='Protector'
            tituloModal={'Eliminar protector'}
            descripcionModal={'Estas por eliminar a un protector:'}
            openModal={openDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleAction={handleDeleteProtector}
            itemEliminar={itemEliminar}
          />
        </>
      )}
    </div>
  )
}

export default Protectores
