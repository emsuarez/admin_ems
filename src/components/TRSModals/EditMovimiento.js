import React, { useEffect, useState } from 'react'
import { Box, Modal, TextField } from '@mui/material'

import logo from '../../assets/logo.png'
import { ICONS } from '../constants'
import format from 'date-fns/format'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

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
}) => {
  const [ejecutivo, setEjecutivo] = useState()
  const [vehiculoEjecutivo, setVehiculoEjecutivo] = useState()
  const [protector, setProtector] = useState()
  const [vehiculoProtector, setVehiculoProtector] = useState()
  const [grupoFamiliar, setGrupoFamiliar] = useState()
  const [observacionVehiculo, setObservacionVehiculo] = useState()
  const [lugarSalida, setLugarSalida] = useState()
  const [horaSalida, setHoraSalida] = React.useState(
    dayjs('2021-08-18T21:11:54')
  )
  const [lugarLlegada, setLugarLlegada] = useState()
  const [horaLlegada, setHoraLlegada] = React.useState(
    dayjs('2021-08-18T21:11:54')
  )
  const [observacion, setObservacion] = useState()
  useEffect(() => {
    console.log(lugares, 'lugares')
    if (
      dataSeleccionada &&
      ejecutivos &&
      vehiculosEjecutivo &&
      protectores &&
      vehiculosProtector &&
      lugares
    ) {
      setEjecutivo(
        ejecutivos.results?.find(e => e.alias === dataSeleccionada.ejecutivo)
      )
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
            <div className='p-4 w-[950px]'>
              <div className=' bg-white rounded-lg p-2'>
                <div className='grid grid-rows-7'>
                  <div className='flex justify-end'>
                    <p className='text-blue-800 hover:cursor-pointer'>
                      Exportar a PDF
                    </p>
                    <ICONS.ChevronDownIconO className='w-3 ml-2' color='blue' />
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <img src={logo} className='h-14' />
                    <h1 className='text-2xl font-bold'>Editar Evento:</h1>
                  </div>
                  <div className='flex justify-evenly mx-8 my-4'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start mb-6'>
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Ejecutivo:
                        </span>
                        {ejecutivo && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                            id={ejecutivo.id}
                            value={ejecutivo.id}
                            onChange={e => setEjecutivo(e.target.value)}
                          >
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
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Vehículo ejecutivo:
                        </span>
                        {vehiculoEjecutivo && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                            id={vehiculoEjecutivo.id}
                            value={vehiculoEjecutivo.id}
                            onChange={e => setVehiculoEjecutivo(e.target.value)}
                          >
                            {Object.keys(vehiculosEjecutivo).length > 0
                              ? vehiculosEjecutivo.results.map(vehiculo => (
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
                          className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                          id={ejecutivo}
                          value={ejecutivo}
                          onChange={e => setGrupoFamiliar(e.target.value)}
                        >
                          {Object.keys(ejecutivos).length > 0
                            ? ejecutivos.results.map(ejecutivo => (
                                <option key={ejecutivo.id} value={ejecutivo.id}>
                                  {ejecutivo.nombres}
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
                          value={observacionVehiculo}
                          onChange={e => setObservacionVehiculo(e.target.value)}
                        />
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-evenly -ml-40 my-4'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start mb-6'>
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Protector:
                        </span>
                        {protector && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                            id={protector.id}
                            value={protector.id}
                            onChange={e => setProtector(e.target.value)}
                          >
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
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Vehículo protector:
                        </span>
                        {vehiculoProtector && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                            id={vehiculoProtector.id}
                            value={vehiculoProtector.id}
                            onChange={e => setVehiculoProtector(e.target.value)}
                          >
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
                  <div className='flex justify-evenly mx-8 my-4'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start mb-6'>
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Lugar salida:
                        </span>
                        {lugarSalida && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                            id={lugarSalida.id}
                            value={lugarSalida.id}
                            onChange={e => setLugarSalida(e.target.value)}
                          >
                            {Object.keys(lugares).length > 0
                              ? lugares.results.map(lugar => (
                                  <option key={lugar.id} value={lugar.id}>
                                    {lugar.lugar}
                                  </option>
                                ))
                              : null}
                          </select>
                        )}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-40 '>
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
                            value={horaSalida}
                            onChange={e => setHoraSalida(e.target.value)}
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
                        <span className='font-semibold text-sm pr-4 w-40 '>
                          Lugar llegada:
                        </span>
                        {lugarLlegada && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                            id={lugarLlegada.id}
                            value={lugarLlegada.id}
                            onChange={e => setLugarLlegada(e.target.value)}
                          >
                            {Object.keys(lugares).length > 0
                              ? lugares.results.map(lugar => (
                                  <option key={lugar.id} value={lugar.id}>
                                    {lugar.lugar}
                                  </option>
                                ))
                              : null}
                          </select>
                        )}
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
                            value={horaLlegada}
                            onChange={e => setHoraLlegada(e.target.value)}
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

                  <div className='flex justify-between ml-20 my-4'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-36'>
                          Observación:
                        </span>
                        <textarea
                          className='border-[1px] px-1 border-neutral-300 rounded-md text-sm focus:border-blue-800 outline-none w-64'
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
        </Box>
      </Modal>
    </>
  )
}

export default EditMovimiento
