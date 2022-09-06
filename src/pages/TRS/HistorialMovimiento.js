import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  EditMovimiento,
  Header,
  HistorialMovimientoTable,
  ICONS,
  RecepcionTurnoTable,
  RedirectWithoutLogin,
} from '../../components'

import {
  deleteInformeTRSAction,
  getAllEjecutivosAction,
  GetAllLugaresAction,
  getAllProtectoresAction,
  getAllVehiculoProtectorAction,
  getAllVehiculosEjecutivoAction,
  getHistorialMovimientosAction,
  getInformeTrs,
} from '../../store/actions'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import EliminarModalGenerico from '../../components/TRSModals/EliminarModalGenerico'
import Icon from '../../assets/Icon'
import VerEventoModal from '../../components/TRSModals/VerEventoModal'
const HistorialMovimiento = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [openViewModal, setOpenViewModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [itemVisualizar, setItemVisualizar] = useState({})
  const [itemEditar, setItemEditar] = useState({})

  const [itemEliminar, setItemEliminar] = useState('')

  useEffect(() => {
    const obtenerInfoVista = async () => {
      await dispatch(getHistorialMovimientosAction())
      await dispatch(getAllEjecutivosAction())
      await dispatch(getAllVehiculosEjecutivoAction())
      await dispatch(getAllProtectoresAction())
      await dispatch(getAllVehiculoProtectorAction())
      await dispatch(GetAllLugaresAction())
    }
    obtenerInfoVista()
  }, [])

  const [value, setValue] = React.useState(dayjs('2021-08-18T21:11:54'))

  const handleChange = newValue => {
    setValue(newValue)
  }

  const historiales = useSelector(state => state.informes.historialMovimientos)
  const allEjecutivos = useSelector(state => state.recursos.allEjecutivos)
  const allVehiculosEjecutivos = useSelector(
    state => state.recursos.allVehiculosEjecutivos
  )
  const allProtectores = useSelector(state => state.recursos.allProtectores)
  const allVehiculosProtectores = useSelector(
    state => state.recursos.allVehiculosProtectores
  )
  const allLugares = useSelector(state => state.recursos.allLugares)

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
              <p className=' ml-1'>TRS</p>
              <ICONS.ChevronRightIconO className='h-3  ml-1' />
              <p className=' ml-1'>Historial de control de movimiento</p>
            </div>

            <div className='bg-white mx-10 py-10'>
              <div className='flex mx-10 justify-between'>
                <div>
                  <div className='flex justify-between align-middle text-center mt-4'>
                    <div className='ml-10 mt-2 mr-4 font-semibold'>Desde:</div>
                    <div className='w-60'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          inputProps={{
                            style: {
                              padding: `0.5rem 10px`,
                              buttonColor: 'blue',
                            },
                            className:
                              ' border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none',
                          }}
                          // label='Date Time picker'
                          value={value}
                          onChange={handleChange}
                          renderInput={params => (
                            <TextField
                              {...params}
                              sx={{
                                svg: { color: '#26346E' },
                                // input: { color },
                                // label: { color },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className='flex justify-between align-middle text-center mt-4'>
                    <div className='ml-10 mt-2 mr-4 font-semibold'>Hasta:</div>
                    <div className='w-60'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          inputProps={{
                            style: {
                              padding: `0.5rem 10px`,
                              buttonColor: 'blue',
                            },
                            className:
                              ' border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none',
                          }}
                          // label='Date Time picker'
                          value={value}
                          onChange={handleChange}
                          renderInput={params => (
                            <TextField
                              {...params}
                              sx={{
                                svg: { color: '#26346E' },
                                // input: { color },
                                // label: { color },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className='flex justify-between text-center mt-4'>
                    <div className='ml-10 mt-2 mr-4 font-semibold'>
                      Ejecutivo:
                    </div>
                    <div className='w-60'>
                      <select className='border-[1px] border-neutral-300 rounded-md py-1.5 w-full focus:border-blue-800 outline-none'>
                        {Object.keys(allEjecutivos).length > 0
                          ? allEjecutivos.results.map(ejecutivo => (
                              <option value={ejecutivo.id}>
                                {ejecutivo.nombres}
                              </option>
                            ))
                          : null}
                      </select>
                    </div>
                  </div>
                  <div className='flex justify-between align-middle text-center mt-4'>
                    <span className='ml-10 mt-2 mr-4 font-semibold text-white cursor-default'>
                      Buscar:
                    </span>
                    <div className='w-60'>
                      <button className='bg-blue-900 hover:bg-blue-800 text-white hover:cursor-pointer font-semibold text-base p-1 rounded-md w-full'>
                        Buscar
                      </button>
                    </div>
                  </div>
                </div>
                <div className='self-center space-y-2'>
                  <p className='flex'>
                    <Icon
                      svgName='luzRoja'
                      className='h-6 mx-2'
                      title='Luz Roja'
                    />
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
                  // onClick={() =>
                  //   ejecutivosReportPDF(allEjecutivosData.results)
                  // }
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
              <div className=' pt-4 p-16 flex flex-col'>
                <HistorialMovimientoTable
                  data={historiales}
                  handleOpenViewInforme={handleOpenViewInforme}
                  handleOpenEditInforme={handleOpenEditInforme}
                  handleOpenDelete={handleOpenDeleteEvento}
                />
              </div>
            </div>
            {/* Modales */}
            <VerEventoModal
              openModal={openViewModal}
              handleClose={handleCloseViewModal}
              dataSeleccionada={itemVisualizar}
            />
            <EditMovimiento
              openModal={openEditModal}
              handleClose={handleCloseEditModal}
              dataSeleccionada={itemEditar}
              ejecutivos={allEjecutivos}
              vehiculosEjecutivo={allVehiculosEjecutivos}
              protectores={allProtectores}
              vehiculosProtector={allVehiculosProtectores}
              lugares={allLugares}
            />
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
          </>
        )}
      </div>
    </>
  )
}

export default HistorialMovimiento
