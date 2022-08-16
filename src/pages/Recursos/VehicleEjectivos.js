import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  CreateEjecutivo,
  CreateVehicle,
  Header,
  ICONS,
  RedirectWithoutLogin,
  VehiculosEjecutivoTable,
} from '../../components'
import { getVehiculoEjecutivoAction } from '../../store/actions'

const VehicleEjectivos = () => {
  const dispatch = useDispatch()

  const [openEditModal, setOpenEditModal] = React.useState(false)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')

  useEffect(() => {
    dispatch(getVehiculoEjecutivoAction())
  }, [dispatch])

  const vehiculoEjecutivoData = useSelector(
    state => state.recursos.vehiculosEjecutivos
  )

  const handleOpenEditModal = itemEditar => {
    setOpenEditModal(true)
    setItemEditar(itemEditar)
  }

  const handleOpenDeleteModal = itemEliminar => {
    setOpenDeleteModal(true)
    setItemEliminar(itemEliminar)
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
            <p className=' ml-1'>Vehiculo de ejecutivos</p>
          </div>

          <div className='bg-white mx-10 py-10'>
            <div className='flex mx-10 justify-between'>
              <div className=''>
                <CreateVehicle
                  tituloModal={'Crear un vehículo'}
                  descripcionModal={
                    'Aquí puedes crear un vehículo y asociarlo a un ejecutivo.'
                  }
                  //   handleAction={handleGuardarVehículoEjecutivo}
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
              <VehiculosEjecutivoTable
                data={vehiculoEjecutivoData}
                handleOpenEditModal={handleOpenEditModal}
                handleOpenDeleteModal={handleOpenDeleteModal}
              />
            </div>
          </div>
          {/* Modales */}
          {/* <EditEjecutivo
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
            itemEditarFamily={itemEditarFamily}
          /> */}
        </>
      )}
    </div>
  )
}

export default VehicleEjectivos
