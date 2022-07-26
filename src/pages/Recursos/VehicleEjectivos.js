import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  DeleteEjecutivo,
  EditVehicle,
  Header,
  ICONS,
  RedirectWithoutLogin,
  VehiculosEjecutivoTable,
} from '../../components'
import CreateVehiculo from '../../components/RecursosModals/CreateVehiculo'
import vehiculosEjecutivosReportPDF from '../../reports/Recursos/vehiculosEjecutivosReportPDF'
import {
  createNewVehicleEjecutivoAction,
  DeleteVehiculoEjecutivoAction,
  getAllEjecutivosAction,
  getAllVehiculosEjecutivoAction,
  getVehiculoEjecutivoAction,
  UpdateVehicleEjecutivoAction,
} from '../../store/actions'

const VehicleEjectivos = () => {
  const dispatch = useDispatch()

  const [openEditModal, setOpenEditModal] = React.useState(false)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')

  useEffect(() => {
    dispatch(getVehiculoEjecutivoAction())
    dispatch(getAllVehiculosEjecutivoAction())
    dispatch(getAllEjecutivosAction())
  }, [])

  const vehiculoEjecutivoData = useSelector(
    state => state.recursos.vehiculosEjecutivos
  )

  const allVehiculosEjecutivosData = useSelector(
    state => state.recursos.allVehiculosEjecutivos
  )

  const propietarios = useSelector(state => state.recursos.allEjecutivos)

  const handleOpenEditModal = itemEditar => {
    setOpenEditModal(true)

    setItemEditar(itemEditar)
  }

  const handleOpenDeleteModal = itemEliminar => {
    setOpenDeleteModal(true)
    setItemEliminar(itemEliminar)
  }

  const handleGuardarVehículoEjecutivo = vehiculoEjecutivo => {
    const nuevoVehiculo = {
      ejecutivo:
        propietarios &&
        propietarios.results.find(
          e => Number(e.id) === Number(vehiculoEjecutivo.propietario)
        ).alias,
      id_ejecutivo: vehiculoEjecutivo.propietario,
      placas: vehiculoEjecutivo.placas,
      alias: vehiculoEjecutivo.alias,
      tipo: vehiculoEjecutivo.tipo,
      is_active: true,
      created: new Date(),
    }

    dispatch(createNewVehicleEjecutivoAction(nuevoVehiculo))
    setOpenEditModal(false)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleEditarVehiculoEjecutivo = vehiculo => {
    const ejecutivoActualizado = {
      ...vehiculo,
      id: itemEditar.idVehiculo,
    }

    dispatch(UpdateVehicleEjecutivoAction(ejecutivoActualizado))
    setOpenEditModal(false)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleDeleteVehiculoEjecutivo = vehiculo => {
    dispatch(DeleteVehiculoEjecutivoAction(vehiculo))
    setOpenDeleteModal(false)
  }

  const handleSearch = e => {
    dispatch(
      getVehiculoEjecutivoAction('/vehiculoejecutivo/?query=' + e.target.value)
    )
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
            <p className=' ml-1'>Vehiculos ejecutivos</p>
          </div>

          <div className='bg-white mx-10 py-10'>
            <div className='flex mx-10 justify-between'>
              <div className=''>
                <CreateVehiculo
                  tituloModal={'Crear un vehículo'}
                  descripcionModal={
                    'Aquí puedes crear un vehículo y asociarlo a un ejecutivo.'
                  }
                  handleAction={handleGuardarVehículoEjecutivo}
                  propietarios={propietarios}
                />
              </div>

              <div className='flex'>
                <button
                  onClick={() =>
                    vehiculosEjecutivosReportPDF(
                      allVehiculosEjecutivosData.results
                    )
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
            {vehiculoEjecutivoData &&
              Object.keys(vehiculoEjecutivoData).length > 0 && (
                <div className=' pt-4 p-16 flex flex-col'>
                  <VehiculosEjecutivoTable
                    data={vehiculoEjecutivoData}
                    handleOpenEditModal={handleOpenEditModal}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                  />
                </div>
              )}
          </div>
          {/* Modales */}
          {openEditModal && (
            <EditVehicle
              tituloModal={'Editar un vehículo'}
              descripcionModal={
                'Aqui puedes editar un vehículo asociado a un Ejecutivo.'
              }
              openModal={openEditModal}
              handleClose={handleCloseEditModal}
              handleAction={handleEditarVehiculoEjecutivo}
              itemEditar={itemEditar}
            />
          )}
          {openDeleteModal && (
            <DeleteEjecutivo
              tipo='Vehiculo'
              tituloModal={'Eliminar vehículo de ejecutivo'}
              descripcionModal={
                'Estas por eliminar un vehículo vinculado a un ejecutivo.'
              }
              openModal={openDeleteModal}
              handleClose={handleCloseDeleteModal}
              handleAction={handleDeleteVehiculoEjecutivo}
              itemEliminar={itemEliminar}
            />
          )}
        </>
      )}
    </div>
  )
}

export default VehicleEjectivos
