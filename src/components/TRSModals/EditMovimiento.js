import { Box, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import logo from '../../assets/logo.png'
import { ICONS } from '../constants'
import { getGrupoFamiliarByIdAction } from '../../store/actions'
import { useDispatch } from 'react-redux'
import Icon from '../../assets/Icon'

const EditMovimiento = ({
  openModal,
  handleClose,
  tituloModal,
  descripcionModal,
  handleAction,
  dataSeleccionada,
  ejecutivos,
  vehiculosEjecutivo,
  protectores,
  vehiculosProtector,
  lugares,
  familiaresEjecutivo,
}) => {
  const dispatch = useDispatch()
  const [ejecutivo, setEjecutivo] = useState('')
  const [vehiculoEjecutivo, setVehiculoEjecutivo] = useState('')
  const [protector, setProtector] = useState('')
  const [vehiculoProtector, setVehiculoProtector] = useState('')
  const [grupoFamiliar, setGrupoFamiliar] = useState('')
  const [observacionVehiculo, setObservacionVehiculo] = useState('')
  const [lugarSalida, setLugarSalida] = useState('')
  const [horaSalida, setHoraSalida] = React.useState(
    dayjs('2021-08-18T21:11:54')
  )
  const [lugarLlegada, setLugarLlegada] = useState('')
  const [horaLlegada, setHoraLlegada] = React.useState(
    dayjs('2021-08-18T21:11:54')
  )
  const [observacion, setObservacion] = useState('')

  const [vehiculosEjecutivos, setVehiculosEjecutivos] = useState([])

  const [editarLugarSalida, setEditarLugarSalida] = useState(true)
  const [editarLugarLlegada, setEditarLugarLlegada] = useState(true)
  const [lugarSalidaTexto, setLugarSalidaTexto] = useState('')
  const [lugarLlegadaTexto, setLugarLlegadaTexto] = useState('')

  useEffect(() => {
    if (
      dataSeleccionada &&
      ejecutivos &&
      vehiculosEjecutivo &&
      protectores &&
      vehiculosProtector &&
      lugares &&
      familiaresEjecutivo
    ) {
      console.log(dataSeleccionada)
      console.log(vehiculosEjecutivo)

      setEjecutivo(
        ejecutivos &&
          ejecutivos.results?.find(e => e.alias === dataSeleccionada.ejecutivo)
      )
      setGrupoFamiliar(
        familiaresEjecutivo.results?.find(
          e => e.alias === dataSeleccionada.familiar
        )
      )
      // setVehiculosEjecutivos(
      //   vehiculosEjecutivo &&
      //     vehiculosEjecutivo.results?.filter(
      //       vehiculo =>
      //         vehiculo?.id_ejecutivo ===
      //         Number(
      //           ejecutivos.results?.find(
      //             e => e.alias === dataSeleccionada.ejecutivo
      //           ).id
      //         )
      //     )
      // )
      setVehiculoEjecutivo(
        vehiculosEjecutivo.results?.find(
          e => e.alias === dataSeleccionada.vehiculo_ejecutivo
        )
      )
      setProtector(
        protectores.results?.find(e => e.alias === dataSeleccionada.protector)
      )
      setVehiculoProtector(
        vehiculosProtector.results?.find(
          e => e.alias === dataSeleccionada.vehiculo_protector
        )
      )
      setObservacionVehiculo(dataSeleccionada.observacion_vehiculo)
      setLugarSalida(
        lugares.results?.find(e => e.alias === dataSeleccionada.lugar_salida)
      )
      setHoraSalida(dayjs(dataSeleccionada.hora_salida))
      setLugarLlegada(
        lugares.results?.find(e => e.alias === dataSeleccionada.lugar_llegada)
      )
      setHoraLlegada(dayjs(dataSeleccionada.hora_llegada))
      setObservacion(dataSeleccionada.observacion)
    }
  }, [dataSeleccionada])

  const seleccionaEjecutivo = e => {
    setEjecutivo(e.target.value)
    dispatch(getGrupoFamiliarByIdAction(e.target.value))

    setVehiculosEjecutivos(
      vehiculosEjecutivo.results.filter(
        vehiculo => vehiculo.id_ejecutivo === Number(e.target.value)
      )
    )
  }

  const handleLugarSalidaComponente = lugarSalidaTF => {
    setEditarLugarSalida(lugarSalidaTF)

    if (lugarSalidaTF === true) {
      setLugarSalidaTexto('')
    }
  }

  const handleLugarLlegadaComponente = lugarLlegadaTF => {
    setEditarLugarLlegada(lugarLlegadaTF)

    if (lugarLlegadaTF === true) {
      setLugarLlegadaTexto('')
    }
  }
  return (
    <>
      <Modal
        open={openModal}
        onClose={(_, reason) => reason === 'backdropClick' && handleClose()}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <div id='defaultModal' aria-hidden='true' className=''>
            <div className='p-4 w-full'>
              <div className=' bg-white rounded-lg p-2 w-full px-14'>
                <div className='grid grid-rows-7'>
                  <div className='flex justify-end'>
                    <p className='text-blue-800 hover:cursor-pointer'>
                      Exportar a PDF
                    </p>
                    <ICONS.ChevronDownIconO className='w-3 ml-2' color='blue' />
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <img src={logo} className='h-14' alt='logo' />
                    <h1 className='text-2xl font-bold'>Editar Evento:</h1>
                  </div>
                  <div className='flex justify-between my-4'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-between mb-6'>
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Ejecutivo:
                        </span>
                        {ejecutivos && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                            id={ejecutivo?.id}
                            value={ejecutivo?.id}
                            onChange={e => seleccionaEjecutivo(e)}
                          >
                            <option value='0'>Seleccione un ejecutivo</option>
                            {Object.keys(ejecutivos).length > 0
                              ? ejecutivos.results.map(ejecutivo => (
                                  <option
                                    key={ejecutivo.id}
                                    value={ejecutivo.id}
                                  >
                                    {ejecutivo.nombres}
                                  </option>
                                ))
                              : null}
                          </select>
                        )}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-40'>
                          Vehículo ejecutivo:
                        </span>
                        {vehiculosEjecutivos && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                            id={vehiculoEjecutivo?.id}
                            value={vehiculoEjecutivo?.id}
                            onChange={e => setVehiculoEjecutivo(e.target.value)}
                          >
                            <option value='0'>Seleccione un vehículo</option>
                            {Object.keys(vehiculosEjecutivos).length > 0
                              ? vehiculosEjecutivos.map(vehiculo => (
                                  <option key={vehiculo.id} value={vehiculo.id}>
                                    {vehiculo.alias}
                                  </option>
                                ))
                              : null}
                          </select>
                        )}
                      </p>
                    </div>
                    <div className='flex flex-col ml-2'>
                      <p className='text-sm flex justify-start mb-6'>
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Grupo Familiar:
                        </span>
                        <select
                          className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                          id={grupoFamiliar?.id}
                          value={grupoFamiliar?.id}
                          onChange={e => setGrupoFamiliar(e.target.value)}
                        >
                          <option value='0'>Seleccione un familiar</option>
                          {familiaresEjecutivo &&
                          Object.keys(familiaresEjecutivo).length > 0
                            ? familiaresEjecutivo.results.map(familiar => (
                                <option key={familiar.id} value={familiar.id}>
                                  {familiar.nombres}
                                </option>
                              ))
                            : null}
                        </select>
                      </p>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Observación Vehículo:
                        </span>
                        <input
                          type='text'
                          className='border-[1px] px-1 border-neutral-300 rounded-md text-sm focus:border-blue-800 outline-none w-48'
                          value={observacionVehiculo || ''}
                          onChange={e => setObservacionVehiculo(e.target.value)}
                        />
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-start my-4'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start mb-6'>
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Protector:
                        </span>
                        {protector && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                            id={protector.id}
                            value={protector.id}
                            onChange={e => setProtector(e.target.value)}
                          >
                            <option value='0'>Seleccione un protector</option>
                            {Object.keys(protectores).length > 0
                              ? protectores.results.map(p => (
                                  <option key={p.id} value={p.id}>
                                    {p.nombres}
                                  </option>
                                ))
                              : null}
                          </select>
                        )}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-40'>
                          Vehículo protector:
                        </span>
                        {vehiculosProtector && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                            id={vehiculoProtector}
                            value={vehiculoProtector}
                            onChange={e => setVehiculoProtector(e.target.value)}
                          >
                            <option value='0'>Seleccione un vehículo</option>
                            {Object.keys(vehiculosProtector).length > 0
                              ? vehiculosProtector.results.map(vP => (
                                  <option key={vP.id} value={vP.id}>
                                    {vP.alias}
                                  </option>
                                ))
                              : null}
                          </select>
                        )}
                      </p>
                    </div>
                    <div></div>
                  </div>
                  <div className='flex justify-start my-4'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start mb-6'>
                        {editarLugarSalida ? (
                          <>
                            <span className='font-semibold text-sm pr-4 w-40 '>
                              Lugar salida:
                            </span>
                            {lugares && (
                              <select
                                className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                                id={lugarSalida}
                                value={lugarSalida}
                                onChange={e => setLugarSalida(e.target.value)}
                              >
                                <option value='0'>Seleccione un lugar</option>
                                {Object.keys(lugares).length > 0
                                  ? lugares.results.map(lugar => (
                                      <option key={lugar.id} value={lugar.id}>
                                        {lugar.lugar}
                                      </option>
                                    ))
                                  : null}
                              </select>
                            )}
                          </>
                        ) : (
                          <>
                            <span className='font-semibold text-sm pr-4 w-40 '>
                              Lugar salida:
                            </span>
                            <input
                              type='text'
                              className='border-[1px] px-1 border-neutral-300 rounded-md text-sm focus:border-blue-800 outline-none w-44'
                              value={lugarSalidaTexto}
                              onChange={e =>
                                setLugarSalidaTexto(e.target.value)
                              }
                            />
                          </>
                        )}
                        <button
                          onClick={() =>
                            handleLugarSalidaComponente(!editarLugarSalida)
                          }
                        >
                          <Icon
                            svgName='ib_editar'
                            className='h-3 ml-2 my-auto hover:bg-gray-300 rounded cursor-pointer'
                          />
                        </button>
                      </p>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-40'>
                          Hora salida:
                        </span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            inputProps={{
                              style: {
                                padding: `0.5rem 10px`,
                                buttonColor: 'blue',
                              },
                            }}
                            // label='Date Time picker'
                            inputFormat='DD/MM/YYYY HH:mm A'
                            value={horaSalida}
                            onChange={hSalida => setHoraSalida(hSalida)}
                            renderInput={params => (
                              <TextField
                                {...params}
                                sx={{
                                  svg: { color: '#26346E' },
                                  input: {
                                    fontSize: '0.85rem',
                                    padding: '0.1rem 5px !important',
                                    margin: '0',
                                  },
                                }}
                                className='text-sm border-[1px] border-neutral-300 pl-2 rounded-md w-48 focus:border-blue-800 outline-none'
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </p>
                    </div>
                    <div className='flex flex-col ml-2'>
                      <p className='text-sm flex justify-start mb-6'>
                        {editarLugarLlegada ? (
                          <>
                            <span className='font-semibold text-sm pr-4 w-40'>
                              Lugar llegada:
                            </span>
                            {lugares && (
                              <select
                                className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                                id={lugarLlegada}
                                value={lugarLlegada}
                                onChange={e => setLugarLlegada(e.target.value)}
                              >
                                <option value='0'>Seleccione un lugar</option>
                                {Object.keys(lugares).length > 0
                                  ? lugares.results.map(lugar => (
                                      <option key={lugar.id} value={lugar.id}>
                                        {lugar.lugar}
                                      </option>
                                    ))
                                  : null}
                              </select>
                            )}
                          </>
                        ) : (
                          <>
                            <span className='font-semibold text-sm pr-4 w-40 '>
                              Lugar llegada:
                            </span>
                            <input
                              type='text'
                              className='border-[1px] px-1 border-neutral-300 rounded-md text-sm focus:border-blue-800 outline-none w-44'
                              value={lugarLlegadaTexto}
                              onChange={e =>
                                setLugarLlegadaTexto(e.target.value)
                              }
                            />
                          </>
                        )}

                        <button
                          onClick={() =>
                            handleLugarLlegadaComponente(!editarLugarLlegada)
                          }
                        >
                          <Icon
                            svgName='ib_editar'
                            className='h-3 ml-2 my-auto hover:bg-gray-300 rounded cursor-pointer'
                          />
                        </button>
                      </p>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Hora llegada:
                        </span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            inputProps={{
                              style: {
                                padding: `0.5rem 10px`,
                                buttonColor: 'blue',
                              },
                            }}
                            // label='Date Time picker'
                            inputFormat='DD/MM/YYYY HH:mm A'
                            value={horaLlegada}
                            onChange={hLlegada => setHoraLlegada(hLlegada)}
                            renderInput={params => (
                              <TextField
                                {...params}
                                sx={{
                                  svg: { color: '#26346E' },
                                  input: {
                                    fontSize: '0.85rem',
                                    padding: '0.1rem 5px !important',
                                    margin: '0',
                                  },
                                }}
                                className='text-sm border-[1px] border-neutral-300 pl-2 rounded-md w-48 focus:border-blue-800 outline-none'
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col px-6 py-3 border-gray-200 items-center'>
                    <div className='flex my-4'>
                      <div className='flex flex-col'>
                        <p className='text-sm flex justify-start items-start self-start'>
                          <span className='font-semibold text-sm pr-4'>
                            Observación:
                          </span>
                          <textarea
                            className='border-[1px] px-1 border-neutral-300 rounded-md text-sm focus:border-blue-800 outline-none w-96'
                            value={observacion}
                            onChange={e => setObservacion(e.target.value)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className='flex items-end justify-center px-6 py-3  border-gray-200 '>
                      <button
                        data-modal-toggle='defaultModal'
                        type='button'
                        className='mx-4 text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-1.5 focus:z-10 '
                        onClick={() => handleAction()}
                      >
                        Actualizar
                      </button>

                      <button
                        data-modal-toggle='defaultModal'
                        type='button'
                        className=' text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-1.5 focus:z-10 '
                        onClick={handleClose}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default EditMovimiento
