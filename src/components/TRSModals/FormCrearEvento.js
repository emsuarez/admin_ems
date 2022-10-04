import React, { useEffect, useState } from 'react'
import { Box, Modal, TextField } from '@mui/material'

import logo from '../../assets/logo.png'
import { ICONS } from '../constants'
import format from 'date-fns/format'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEjecutivosAction } from '../../store/actions'

const FormCrearEvento = ({
  handleClose,
  handleAction,

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
  const [horaSalida, setHoraSalida] = React.useState(dayjs(new Date()))
  const [lugarLlegada, setLugarLlegada] = useState()
  const [horaLlegada, setHoraLlegada] = React.useState(dayjs(new Date()))
  const [observacion, setObservacion] = useState()

  useEffect(() => {
    if (
      ejecutivos &&
      vehiculosEjecutivo &&
      protectores &&
      vehiculosProtector &&
      lugares
    ) {
      setEjecutivo(ejecutivos.results[0].id)
      setGrupoFamiliar(ejecutivos.results[0].id)
      setVehiculoEjecutivo(vehiculosEjecutivo.results[0].id)
      setProtector(protectores.results[0].id)
      setVehiculoProtector(vehiculosProtector.results[0].id)

      setLugarSalida(lugares.results[0].id)

      // setHoraSalida(dayjs(dataSeleccionada.hora_salida))
      setLugarLlegada(lugares.results[0].id)
      // setHoraLlegada(dayjs(dataSeleccionada.hora_llegada))
    }
  }, [])

  const handleNuevoEvento = () => {
    const nuevoEvento = {
      ejecutivo: ejecutivo,
      familiar: grupoFamiliar,
      vehiculo_ejecutivo: vehiculoEjecutivo,
      vehiculo_observacion: observacionVehiculo,
      protector: protector,
      vehiculo_protector: vehiculoProtector,
      lugar_salida: lugarSalida,
      lugar_llegada: lugarLlegada,
      hora_salida: new Date(horaSalida),
      hora_llegada: new Date(horaLlegada),
      observacion: observacion,
    }
    handleAction(nuevoEvento)
  }

  return (
    <>
      <div className='p-4 w-full'>
        <div className=' bg-white rounded-lg p-2 w-full'>
          <div className='grid grid-rows-7'>
            <div className='flex flex-col justify-start items-start'>
              <h1 className='text-2xl font-bold'>
                Formulario para crear evento:
              </h1>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex flex-col'>
                <p className='text-sm flex justify-between mb-6'>
                  <span className='font-semibold text-sm pr-4 w-40 '>
                    Ejecutivo:
                  </span>
                  {ejecutivos && (
                    <select
                      className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                      id={ejecutivo}
                      value={ejecutivo}
                      onChange={e => setEjecutivo(e.target.value)}
                    >
                      <option value='0'>Seleccione un ejecutivo</option>
                      {Object.keys(ejecutivos).length > 0 &&
                        ejecutivos.results.map(ejecutivo => (
                          <option key={ejecutivo.id} value={ejecutivo.id}>
                            {ejecutivo.nombres}
                          </option>
                        ))}
                    </select>
                  )}
                </p>
                <p className='text-sm flex justify-start'>
                  <span className='font-semibold text-sm pr-4 w-40 '>
                    Vehículo ejecutivo:
                  </span>
                  {vehiculosEjecutivo && (
                    <select
                      className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                      id={vehiculoEjecutivo}
                      value={vehiculoEjecutivo}
                      onChange={e => setVehiculoEjecutivo(e.target.value)}
                    >
                      <option value='0'>Seleccione un vehículo</option>
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
                    id={grupoFamiliar}
                    value={grupoFamiliar}
                    onChange={e => setGrupoFamiliar(e.target.value)}
                  >
                    <option value='0'>Seleccione un ejecutivo</option>
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
            <div className='flex justify-start my-4'>
              <div className='flex flex-col'>
                <p className='text-sm flex justify-start mb-6'>
                  <span className='font-semibold text-sm pr-4 w-40 '>
                    Protector:
                  </span>
                  {protectores && (
                    <select
                      className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
                      id={protector}
                      value={protector}
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
                  <span className='font-semibold text-sm pr-4 w-40 '>
                    Vehículo protector:
                  </span>
                  {vehiculosProtector && (
                    <select
                      className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
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
                  <span className='font-semibold text-sm pr-4 w-40 '>
                    Lugar salida:
                  </span>
                  {lugares && (
                    <select
                      className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
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
                  <span className='font-semibold text-sm pr-4 w-40 '>
                    Lugar llegada:
                  </span>
                  {lugares && (
                    <select
                      className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-40'
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

            <div className='flex justify-start my-4'>
              <div className='flex flex-col'>
                <p className='text-sm flex justify-start'>
                  <span className='font-semibold text-sm pr-4 w-full'>
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
            <div className='flex mx-auto px-6 py-3  border-gray-200 w-80'>
              <button
                data-modal-toggle='defaultModal'
                type='button'
                className='w-80 text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-1.5 focus:z-10 '
                onClick={() => handleNuevoEvento()}
              >
                Crear Evento
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormCrearEvento
