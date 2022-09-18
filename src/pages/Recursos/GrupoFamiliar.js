import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  CreateEjecutivo,
  DeleteEjecutivo,
  EditEjecutivo,
  FamilyTable,
  Header,
  ICONS,
  RedirectWithoutLogin,
} from '../../components'
import EditFamilyModal from '../../components/RecursosModals/EditFamilyModal'
import VinculoFamiliarTable from '../../components/RecursosTable/VinculoFamiliarTable'
import grupoFamiliarReportPDF from '../../reports/Recursos/grupoFamiliarReportPDF'
import {
  createNewFamiliarAction,
  DeleteFamiliarAction,
  getAllFamiliaresAction,
  getGrupoFamiliarAction,
  getGrupoFamiliarByIdAction,
  UpdateFamiliarAction,
} from '../../store/actions'

const GrupoFamiliar = () => {
  const dispatch = useDispatch()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditFamiliarModal, setOpenEditFamiliarModal] =
    React.useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')
  const [itemEditarFamily, setItemEditarFamily] = useState('')

  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [familiaresBuscador, setFamiliaresBuscador] = useState({})

  useEffect(() => {
    dispatch(getGrupoFamiliarAction())
    dispatch(getAllFamiliaresAction())
  }, [dispatch])

  const familiaData = useSelector(state => state.recursos.grupoFamiliar)
  const allFamiliarData = useSelector(state => state.recursos.allFamiliares)

  const handleEditarGrupoFamiliar = grupoFamiliar => {
    console.log(itemEditar, 'itemEditar')
    const familiarActualizado = {
      ...grupoFamiliar,
      id: itemEditar.id,
      id_ejecutivo: itemEditar.id_ejecutivo,
    }
    dispatch(UpdateFamiliarAction(familiarActualizado))
    setOpenEditModal(false)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleOpenEditModal = itemEditar => {
    setOpenEditModal(true)
    setItemEditar(itemEditar)
  }

  const handleOpenEditFamilyModal = itemEditar => {
    setOpenEditFamiliarModal(true)
    setItemEditarFamily(itemEditar)
    console.log(itemEditar, 'itemEditar')
    dispatch(getGrupoFamiliarByIdAction(itemEditar.id_ejecutivo))
  }

  const handleCloseEditFamiliarModal = () => {
    setOpenEditFamiliarModal(false)
  }

  const handleOpenDeleteModal = itemEliminar => {
    setOpenDeleteModal(true)
    setItemEliminar(itemEliminar)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleDeleteGrupoFamiliar = itemEliminar => {
    dispatch(DeleteFamiliarAction(itemEliminar))
    setOpenDeleteModal(false)
  }

  const [seBusco, setSeBusco] = useState(false)
  const handleSearch = e => {
    dispatch(getGrupoFamiliarAction('/familiar/?query=' + e.target.value))
    if (e.target.value !== '') {
      setSeBusco(false)
    }
    setSeBusco(true)
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
                {/* <CreateEjecutivo
                  tituloModal={'Crear Familiar'}
                  descripcionModal={''}
                  handleAction={handleGuardarNuevoFamiliar}
                /> */}
              </div>

              <div className='flex'>
                <button
                  onClick={() =>
                    grupoFamiliarReportPDF(allFamiliarData.results)
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
                    onChange={e => {
                      handleSearch(e)
                    }}
                    placeholder='Buscar'
                    className='border-[1px] outline-none pl-3 rounded-2xl bg-gray-50 py-1'
                  />
                </div>
              </div>
            </div>
            {Object.keys(familiaData).length > 0 && (
              <div className=' pt-4 p-16 flex flex-col'>
                <VinculoFamiliarTable
                  data={familiaData}
                  handleOpenEditModal={handleOpenEditModal}
                  handleOpenDeleteModal={handleOpenDeleteModal}
                  tipo='general'
                  handleOpenEditFamilyModal={handleOpenEditFamilyModal}
                  seBusco={seBusco}
                />
              </div>
            )}
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
          <EditFamilyModal
            tituloModal={'Editar Vínculo Familiar'}
            openModal={openEditFamiliarModal}
            handleClose={handleCloseEditFamiliarModal}
            id_ejecutivo={itemEditarFamily}
          />
        </>
      )}
    </div>
  )
}

export default GrupoFamiliar
