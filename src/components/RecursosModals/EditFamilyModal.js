import { Box, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DeleteFamiliarAction,
  getGrupoFamiliarAction,
  UpdateFamiliarAction,
} from '../../store/actions'
import VinculoFamiliarTable from '../RecursosTable/VinculoFamiliarTable'
import CreateEjecutivo from './CreateEjecutivo'
import DeleteEjecutivo from './DeleteEjecutivo'
import EditEjecutivo from './EditEjecutivo'

const EditFamilyModal = ({
  openModal,
  handleClose,
  tituloModal,
  id_ejecutivo,
}) => {
  const dispatch = useDispatch()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')

  const familiaData = useSelector(state => state.recursos.grupoFamiliar)

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleEditarGrupoFamiliar = grupoFamiliar => {
    console.log(grupoFamiliar, 'grupoFamiliar')
    console.log(itemEditar, 'itemEditar')
    const familiarActualizado = {
      ...grupoFamiliar,
      id: itemEditar.id,
      id_ejecutivo: itemEditar.id_ejecutivo,
    }
    dispatch(UpdateFamiliarAction(familiarActualizado))
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
    dispatch(DeleteFamiliarAction(itemEliminar))
    setOpenDeleteModal(false)
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box>
          <div
            id='defaultModal'
            tabIndex='-1'
            aria-hidden='true'
            className='overflow-y-auto overflow-x-hidden fixed top-1/4 right-0 left-1/4 z-50 w-full inset-0 h-modal'
          >
            <div className='relative p-4 max-w-4xl'>
              <div className='relative bg-white rounded-lg shadow '>
                <div className='flex justify-between items-start px-4 py-2 rounded-t border-b'>
                  <h1 className='text-2xl font-bold'>{tituloModal}</h1>
                  <button
                    type='button'
                    className='bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                    data-modal-toggle='defaultModal'
                    onClick={handleClose}
                  >
                    <span className='sr-only'>Cerrar modal</span>
                  </button>
                  <div className='flex flex-col justify-center items-center'>
                    <div>
                      <label className='font-semibold'>Ejecutivo:</label>{' '}
                      {id_ejecutivo.nombres}
                    </div>
                    <div>
                      <label className='font-semibold'>Alias:</label>{' '}
                      {id_ejecutivo.alias}
                    </div>
                  </div>
                </div>
                <div className='p-4'>
                  <CreateEjecutivo
                    tituloModal={'Crear Familiar'}
                    descripcionModal={''}
                    // handleAction={handleGuardarNuevoFamiliar}
                  />
                </div>
                <VinculoFamiliarTable
                  data={familiaData}
                  handleOpenEditModal={handleOpenEditModal}
                  handleOpenDeleteModal={handleOpenDeleteModal}
                  tipo='modal'
                />

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
                <div className='flex items-end justify-end px-6 py-3 space-x-2 rounded-b border-t border-gray-200 '>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-7 py-1.5 text-center '
                    onClick={handleClose}
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default EditFamilyModal
