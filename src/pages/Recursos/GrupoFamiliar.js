import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  CreateEjecutivo,
  DeleteEjecutivo,
  EditEjecutivo,
  EjectivosTable,
  FamilyTable,
  Header,
  ICONS,
  RedirectWithoutLogin,
} from '../../components'
import VinculoFamiliarTable from '../../components/RecursosTable/VinculoFamiliarTable'
import {
  createNewFamiliarAction,
  getGrupoFamiliarAction,
} from '../../store/actions'

const GrupoFamiliar = () => {
  const dispatch = useDispatch()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')

  useEffect(() => {
    dispatch(getGrupoFamiliarAction())
  }, [dispatch])

  const familiaData = useSelector(state => state.recursos.grupoFamiliar)
  console.log(familiaData, 'familiaData')
  const handleGuardarNuevoFamiliar = familiar => {
    dispatch(createNewFamiliarAction(familiar))
  }

  const handleEditarGrupoFamiliar = grupoFamiliar => {
    const familiarActualizado = { ...grupoFamiliar, id: itemEditar.id }
    // dispatch(UpdateGrupoFamiliarAction(grupoFamiliarActualizado))
    setOpenEditModal(false)
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

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleDeleteGrupoFamiliar = () => {
    // dispatch(DeleteGrupoFamiliarAction(itemEliminar))
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
            <p className=' ml-1'>Grupo Familiar</p>
          </div>

          <div className='bg-white mx-10 py-10'>
            <div className='flex mx-10 justify-between'>
              <div className=''>
                {/* Modal Guardar hACERLO Más generico */}
                <CreateEjecutivo
                  tituloModal={'Crear Familiar'}
                  descripcionModal={''}
                  handleAction={handleGuardarNuevoFamiliar}
                />
              </div>

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
            </div>

            <div className=' pt-4 p-16 flex flex-col'>
              <VinculoFamiliarTable
                data={familiaData}
                handleOpenEditModal={handleOpenEditModal}
                handleOpenDeleteModal={handleOpenDeleteModal}
              />
            </div>
          </div>
          {/* Modales CAMBIAR NOMBRE para hacer del componente más generico */}
          <EditEjecutivo
            tituloModal={'Editar Familiar del Ejecutivo'}
            descripcionModal={''}
            openModal={openEditModal}
            handleClose={handleCloseEditModal}
            handleAction={handleEditarGrupoFamiliar}
            itemEditar={itemEditar}
          />
          <DeleteEjecutivo
            tipo='Familiar'
            tituloModal={'Eliminar Familiar de Ejecutivo'}
            descripcionModal={
              'Estas por eliminar a familiar vinculado a un ejecutivo'
            }
            openModal={openDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleAction={handleDeleteGrupoFamiliar}
            itemEliminar={itemEliminar}
          />
        </>
      )}
    </div>
  )
}

export default GrupoFamiliar
