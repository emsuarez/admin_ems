import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  EditMovimiento,
  Header,
  HistorialMovimientoTable,
  ICONS,
  RedirectWithoutLogin,
} from '../../components'

import {
  getAllEjecutivosAction,
  getAllFamiliaresAction,
  getAllHistorialMovimientosAction,
  GetAllLugaresAction,
  getAllProtectoresAction,
  getAllVehiculoProtectorAction,
  getAllVehiculosEjecutivoAction,
  getGrupoFamiliarByIdAction,
  getHistorialMovimientosAction,
  getInformeTrs,
  getVehiculoEjecutivoAction,
  patchControlMovimiento,
  postControlMovimiento,
} from '../../store/actions'

// import dayjs from 'dayjs'
import EliminarModalGenerico from '../../components/TRSModals/EliminarModalGenerico'
import FormCrearEvento from '../../components/TRSModals/FormCrearEvento'
import VerEventoModal from '../../components/TRSModals/VerEventoModal'
import Icon from '../../assets/Icon'
import controlMovimientoReportPDF from '../../reports/TRS/controlMovimientoReportPDF'
const ControlMovimiento = () => {
  const dispatch = useDispatch()

  const [openViewModal, setOpenViewModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [itemVisualizar, setItemVisualizar] = useState({})
  const [itemEditar, setItemEditar] = useState({})

  const [itemEliminar, setItemEliminar] = useState('')

  useEffect(() => {
    const obtenerInfoVista = () => {
      dispatch(getAllEjecutivosAction())
      dispatch(getVehiculoEjecutivoAction('/vehiculoejecutivo/?id=-1'))
      dispatch(getAllProtectoresAction())
      dispatch(getAllVehiculosEjecutivoAction())
      dispatch(getAllVehiculoProtectorAction())
      dispatch(GetAllLugaresAction())
      dispatch(getHistorialMovimientosAction())
      dispatch(getAllHistorialMovimientosAction())
      dispatch(getGrupoFamiliarByIdAction())
      dispatch(getAllFamiliaresAction())
    }
    obtenerInfoVista()
  }, [dispatch])

  const historiales = useSelector(state => state.informes.historialMovimientos)
  const allHistoriales = useSelector(
    state => state.informes.allHistorialMovimientos
  )
  const allEjecutivos = useSelector(state => state.recursos.allEjecutivos)
  const allVehiculosEjecutivos = useSelector(
    state => state.recursos.allVehiculosEjecutivos
  )

  const allProtectores = useSelector(state => state.recursos.allProtectores)
  const allVehiculosProtectores = useSelector(
    state => state.recursos.allVehiculosProtectores
  )
  const allLugares = useSelector(state => state.recursos.allLugares)
  const familiaresEjecutivo = useSelector(
    state => state.recursos.grupoFamiliarByEjecutivo
  )
  const allFamiliaresEjecutivo = useSelector(
    state => state.recursos.allFamiliares
  )

  const handleSearch = e => {
    dispatch(getInformeTrs('/controlmovimiento/?query=' + e.target.value))
  }

  const handleOpenViewInforme = informe => {
    setOpenViewModal(true)
    setItemVisualizar(informe)
  }

  const handleCloseViewModal = () => {
    setOpenViewModal(false)
  }

  const handleOpenEditInforme = informe => {
    setItemEditar(informe)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleCrearEvento = infoEvento => {
    dispatch(postControlMovimiento(infoEvento))
  }

  const handleEditInformeModal = informe => {
    dispatch(patchControlMovimiento(informe))
  }

  const handleOpenDeleteEvento = itemEliminar => {
    console.log(itemEliminar, 'itemEliminar')
    setOpenDeleteModal(true)
    setItemEliminar(itemEliminar)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleDeleteEvento = acta => {
    // dispatch(deleteInformeTRSAction({ id: acta.id }))
    console.log(acta, 'acta')
    setOpenDeleteModal(false)
  }

  return (
    <>
      <div>
        <RedirectWithoutLogin />

        <Header />
        <div className='flex items-center bg-slate-100 py-2'>
          <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
          <p className=' ml-1'>TRS</p>
          <ICONS.ChevronRightIconO className='h-3  ml-1' />
          <p className=' ml-1'>Control de movimiento</p>
        </div>

        <div className='bg-white mx-10 py-10'>
          <div className='flex mx-10 justify-between'>
            <div className='mx-auto'>
              {allEjecutivos &&
                familiaresEjecutivo &&
                allVehiculosEjecutivos && (
                  <FormCrearEvento
                    ejecutivos={allEjecutivos}
                    familiaresEjecutivo={familiaresEjecutivo}
                    vehiculosEjecutivo={allVehiculosEjecutivos}
                    protectores={allProtectores}
                    vehiculosProtector={allVehiculosProtectores}
                    lugares={allLugares}
                    handleAction={handleCrearEvento}
                  />
                )}
            </div>
            <div className='self-end space-y-2 mb-8'>
              <p className='flex'>
                <Icon svgName='luzRoja' className='h-6 mx-2' title='Luz Roja' />
                <span>Falta lugar de llegada y hora.</span>
              </p>
              <p className='flex'>
                <Icon
                  svgName='luzNaranja'
                  className='h-6 mx-2'
                  title='Luz Roja'
                />
                <span>Falta la hora de llegada.</span>
              </p>
              <p className='flex'>
                <Icon
                  svgName='luzVerde'
                  className='h-6 mx-2'
                  title='Luz Roja'
                />
                <span>Completo.</span>
              </p>
            </div>
          </div>
          <div className='flex flex-row justify-between align-bottom mx-16'>
            <div></div>
            <div className='flex'>
              <button
                onClick={() =>
                  controlMovimientoReportPDF(allHistoriales.results)
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
              <div className='flex flex-col ml-4 '>
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
          {Object.keys(historiales).length > 0 && (
            <div className=' pt-4 p-16 flex flex-col'>
              <HistorialMovimientoTable
                data={historiales}
                handleOpenViewInforme={handleOpenViewInforme}
                handleOpenEditInforme={handleOpenEditInforme}
                handleOpenDelete={handleOpenDeleteEvento}
              />
            </div>
          )}
        </div>
        {/* Modales */}
        <VerEventoModal
          openModal={openViewModal}
          handleClose={handleCloseViewModal}
          dataSeleccionada={itemVisualizar}
        />

        {openEditModal && (
          <EditMovimiento
            dataSeleccionada={itemEditar}
            ejecutivos={allEjecutivos}
            familiaresEjecutivo={allFamiliaresEjecutivo}
            vehiculosEjecutivo={allVehiculosEjecutivos}
            protectores={allProtectores}
            vehiculosProtector={allVehiculosProtectores}
            lugares={allLugares}
            handleAction={handleEditInformeModal}
            openModal={openEditModal}
            handleClose={handleCloseEditModal}
          />
        )}
        <EliminarModalGenerico
          tituloModal={'Eliminar Evento'}
          descripcionModal={
            'Al eliminar este evento, sera de forma definitiva y sin posibilidad de recuperación.'
          }
          openModal={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleAction={handleDeleteEvento}
          itemEliminar={itemEliminar}
        />
      </div>
    </>
  )
}

export default ControlMovimiento
