import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  CreateVehicleProtect,
  DeleteEjecutivo,
  EditVehicle,
  Header,
  ICONS,
  RedirectWithoutLogin,
  VehiculosProtectTable,
} from '../../components'
import vehiculosProtectoresReportPDF from '../../reports/Recursos/vehiculosProtectoresReportPDF'
import {
  CreateNewVehicleProtectorAction,
  DeleteVehicleProtectorAction,
  getAllVehiculoProtectorAction,
  getVehiculoProtectorAction,
  UpdateVehicleProtectorAction,
} from '../../store/actions'

const VehicleProtectores = () => {
  const dispatch = useDispatch()

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [itemEditar, setItemEditar] = useState('')
  const [itemEliminar, setItemEliminar] = useState('')

  useEffect(() => {
    dispatch(getVehiculoProtectorAction())
    dispatch(getAllVehiculoProtectorAction())
  }, [dispatch])

  const vehiculosProtectoresData = useSelector(
    state => state.recursos.vehiculosProtectores
  )

  const allVehiculosProtectores = useSelector(
    state => state.recursos.allVehiculosProtectores
  )

  const handleOpenEditModal = itemEditar => {
    setOpenEditModal(true)

    setItemEditar(itemEditar)
  }

  const handleOpenDeleteModal = itemEliminar => {
    setOpenDeleteModal(true)
    setItemEliminar(itemEliminar)
  }

  const handleGuardarVehículoProtector = vehiculoProtector => {
    const nuevoVehiculo = {
      placas: vehiculoProtector.placas,
      alias: vehiculoProtector.alias,
      tipo: vehiculoProtector.tipo,
      created: new Date(),
      is_active: true,
    }

    dispatch(CreateNewVehicleProtectorAction(nuevoVehiculo))
    setOpenEditModal(false)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleEditarVehiculoProtector = vehiculo => {
    const vehiculoProtectorActualizado = {
      ...vehiculo,
      id: vehiculo.idVehiculo,
    }

    dispatch(UpdateVehicleProtectorAction(vehiculoProtectorActualizado))
    setOpenEditModal(false)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleDeleteVehiculoProtector = vehiculo => {
    dispatch(DeleteVehicleProtectorAction(vehiculo))
    setOpenDeleteModal(false)
  }

  const handleSearch = e => {
    dispatch(
      getVehiculoProtectorAction('/vehiculoprotector/?query=' + e.target.value)
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
            <p className=' ml-1'>Vehiculos protectores</p>
          </div>

          <div className='bg-white mx-10 py-10'>
            <div className='flex mx-10 justify-between'>
              <div className=''>
                <CreateVehicleProtect
                  tituloModal={'Crear un vehículo'}
                  descripcionModal={
                    'Aquí puedes crear un vehículo y asociarlo a un ejecutivo.'
                  }
                  handleAction={handleGuardarVehículoProtector}
                />
              </div>

              <div className='flex'>
                <button
                  onClick={() =>
                    vehiculosProtectoresReportPDF(
                      allVehiculosProtectores.results
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
            {vehiculosProtectoresData &&
              Object.keys(vehiculosProtectoresData).length > 0 && (
                <div className=' pt-4 p-16 flex flex-col'>
                  <VehiculosProtectTable
                    data={vehiculosProtectoresData}
                    handleOpenEditModal={handleOpenEditModal}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                  />
                </div>
              )}
          </div>
          {/* Modales */}
          <EditVehicle
            tipoComponente={'vehiculoProtector'}
            tituloModal={'Editar un vehículo'}
            descripcionModal={'Aqui puedes editar un vehículo'}
            openModal={openEditModal}
            handleClose={handleCloseEditModal}
            handleAction={handleEditarVehiculoProtector}
            itemEditar={itemEditar}
          />
          <DeleteEjecutivo
            tipo='Vehiculo'
            tituloModal={'Eliminar vehículo'}
            descripcionModal={'Estas por eliminar un vehículo.'}
            openModal={openDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleAction={handleDeleteVehiculoProtector}
            itemEliminar={itemEliminar}
          />
        </>
      )}
    </div>
  )
}

export default VehicleProtectores
