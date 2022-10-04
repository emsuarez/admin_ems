import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  CreateEjecutivo,
  DeleteEjecutivo,
  EditEjecutivo,
  Header,
  ICONS,
  RedirectWithoutLogin,
} from '../../components'
import EditFamilyModal from '../../components/RecursosModals/EditFamilyModal'
import EjecutivosTable from '../../components/RecursosTable/EjecutivosTable'
import ejecutivosReportPDF from '../../reports/Recursos/ejecutivosReportPDF'
import EjecutivosReportPDF from '../../reports/Recursos/ejecutivosReportPDF'
import {
  createNewEjecutivoAction,
  DeleteEjecutivoAction,
  getAllEjecutivosAction,
  getAllFamiliaresAction,
  getEjecutivoAction,
  getGrupoFamiliarAction,
  getGrupoFamiliarByIdAction,
  UpdateEjecutivoAction,
} from '../../store/actions'

const Ejecutivos = () => {
  const dispatch = useDispatch()
  const [openEditModal, setOpenEditModal] = React.useState(false)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [openEditFamiliarModal, setOpenEditFamiliarModal] =
    React.useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')
  const [itemEditarFamily, setItemEditarFamily] = useState('')

  useEffect(() => {
    dispatch(getGrupoFamiliarAction())
    dispatch(getAllFamiliaresAction())
  }, [])

  useEffect(() => {
    dispatch(getEjecutivoAction())
    dispatch(getAllEjecutivosAction())
  }, [dispatch])

  const ejecutivoData = useSelector(state => state.recursos.ejecutivo)
  const allEjecutivosData = useSelector(state => state.recursos.allEjecutivos)

  const handleGuardarEjecutivo = ejecutivo => {
    dispatch(createNewEjecutivoAction(ejecutivo))
  }

  const handleEditarEjecutivo = ejecutivo => {
    const ejecutivoActualizado = { ...ejecutivo, id: itemEditar.id }
    dispatch(UpdateEjecutivoAction(ejecutivoActualizado))
    setOpenEditModal(false)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleCloseEditFamiliarModal = () => {
    setOpenEditFamiliarModal(false)
  }

  const handleOpenEditModal = itemEditar => {
    setOpenEditModal(true)
    setItemEditar(itemEditar)
  }

  const handleOpenEditFamilyModal = itemEditar => {
    setOpenEditFamiliarModal(true)
    setItemEditarFamily(itemEditar)
    console.log(itemEditar, 'itemEditar')
    dispatch(getGrupoFamiliarByIdAction(itemEditar.id))
  }

  const handleOpenDeleteModal = itemEliminar => {
    setOpenDeleteModal(true)
    setItemEliminar(itemEliminar)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleDeleteEjecutivo = ejecutivo => {
    dispatch(DeleteEjecutivoAction({ id: ejecutivo.id }))
    setOpenDeleteModal(false)
  }

  const handleSearch = e => {
    dispatch(getEjecutivoAction('/ejecutivo/?query=' + e.target.value))
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
              <p className=' ml-1'>Recursos</p>
              <ICONS.ChevronRightIconO className='h-3  ml-1' />
              <p className=' ml-1'>Ejecutivo</p>
            </div>

            <div className='bg-white mx-10 py-10'>
              <div className='flex mx-10 justify-between'>
                <div className=''>
                  <CreateEjecutivo
                    tituloModal={'Crear Ejecutivo'}
                    descripcionModal={
                      'Crea a un ejecutivo con su sobrenombre clave.'
                    }
                    handleAction={handleGuardarEjecutivo}
                  />
                </div>

                <div className='flex'>
                  <button
                    onClick={() =>
                      ejecutivosReportPDF(allEjecutivosData.results)
                    }
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
                      placeholder='Buscar'
                      className='border-[1px] outline-none pl-3 rounded-2xl bg-gray-50 py-1'
                      onChange={e => {
                        handleSearch(e)
                      }}
                    />
                  </div>
                </div>
              </div>
              {ejecutivoData && Object.keys(ejecutivoData).length > 0 && (
                <div className=' pt-4 p-16 flex flex-col'>
                  <EjecutivosTable
                    data={ejecutivoData}
                    handleOpenEditModal={handleOpenEditModal}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                    handleOpenEditFamilyModal={handleOpenEditFamilyModal}
                  />
                </div>
              )}
            </div>
            {/* Modales */}
            <EditEjecutivo
              tituloModal={'Editar Ejecutivo'}
              descripcionModal={'Edita los datos del ejecutivo seleccionado.'}
              openModal={openEditModal}
              handleClose={handleCloseEditModal}
              handleAction={handleEditarEjecutivo}
              itemEditar={itemEditar}
            />
            <DeleteEjecutivo
              tipo='Ejecutivo'
              tituloModal={'Eliminar Ejecutivo'}
              descripcionModal={
                'Estas seguro de la eliminación de los datos del ejecutivo, se eliminarán tambien datos asociados con el ejecutivo como:'
              }
              openModal={openDeleteModal}
              handleClose={handleCloseDeleteModal}
              handleAction={handleDeleteEjecutivo}
              itemEliminar={itemEliminar}
            />
            <EditFamilyModal
              tituloModal={'Editar Vínculo Familiar'}
              openModal={openEditFamiliarModal}
              handleClose={handleCloseEditFamiliarModal}
              id_ejecutivo={itemEditarFamily}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Ejecutivos
