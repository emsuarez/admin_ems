import { TextField } from '@mui/material'
import React, { useState } from 'react'

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { getGrupoFamiliarByIdAction, setToast } from '../../store/actions'
import Icon from '../../assets/Icon'

const FormCrearEvento = ({
  handleClose,
  handleAction,
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
  const [lugarSalida, setLugarSalida] = useState('0')
  const [horaSalida, setHoraSalida] = React.useState(dayjs(new Date()))

  const [lugarLlegada, setLugarLlegada] = useState('0')
  const [horaLlegada, setHoraLlegada] = React.useState(dayjs(new Date()))

  const [observacion, setObservacion] = useState('')

  const [vehiculosEjecutivos, setVehiculosEjecutivos] = useState([])

  const [editarLugarSalida, setEditarLugarSalida] = useState(true)
  const [editarLugarLlegada, setEditarLugarLlegada] = useState(true)
  const [lugarSalidaTexto, setLugarSalidaTexto] = useState('')
  const [lugarLlegadaTexto, setLugarLlegadaTexto] = useState('')

  const tipo = window.localStorage.getItem('tipo')

  const handleNuevoEvento = () => {
    console.log(typeof lugarLlegada)
    if (lugarSalida !== '0' || lugarSalidaTexto !== '') {
      const nuevoEvento = {
        ejecutivo: ejecutivo,
        ejecutivo_nombre: ejecutivos.results.find(
          ejecutivoItem => ejecutivoItem.id === Number(ejecutivo)
        ).nombres,
        familiar: grupoFamiliar,
        vehiculo_ejecutivo: vehiculoEjecutivo,
        vehiculo_ejecutivo_nombre: vehiculosEjecutivo.results.find(
          vehiculoItem => vehiculoItem.id === Number(vehiculoEjecutivo)
        ).alias,
        vehiculo_observacion: observacionVehiculo,
        protector: protector,
        protector_nombre: protectores.results.find(
          protectorItem => protectorItem.id === Number(protector)
        ).nombres,
        vehiculo_protector: vehiculoProtector,
        vehiculo_protector_nombre: vehiculosProtector.results.find(
          vehiculoItem => vehiculoItem.id === Number(vehiculoProtector)
        ).alias,

        lugar_salida: lugarSalida === '0' ? null : lugarSalida,
        lugar_salida_nombre:
          lugarSalida !== '0'
            ? lugares.results.find(
                lugarItem => lugarItem.id === Number(lugarSalida)
              ).alias
            : lugarSalidaTexto,
        lugar_salida_texto: lugarSalidaTexto !== '' ? lugarSalidaTexto : null,
        lugar_llegada: lugarLlegada === '0' ? null : lugarLlegada,
        lugar_llegada_nombre:
          lugarLlegada !== '0'
            ? lugares.results.find(
                lugarItem => lugarItem.id === Number(lugarLlegada)
              ).alias
            : lugarLlegadaTexto,
        lugar_llegada_texto:
          lugarLlegadaTexto !== '0' ? lugarLlegadaTexto : null,
        hora_salida: new Date(horaSalida),
        hora_llegada: lugarLlegada === '0' ? null : new Date(horaLlegada),
        observacion: observacion,
      }
      console.log(nuevoEvento)
      // handleAction(nuevoEvento)
    } else {
      dispatch(setToast('', 'Debe seleccionar un lugar de salida'))
    }
  }

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
                    <>
                      <select
                        className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                        id={ejecutivo}
                        value={ejecutivo}
                        onChange={e => seleccionaEjecutivo(e)}
                      >
                        <option value='0'>Seleccione un ejecutivo</option>
                        {Object.keys(ejecutivos).length > 0 &&
                          ejecutivos.results.map(ejecutivo => (
                            <option key={ejecutivo.id} value={ejecutivo.id}>
                              {ejecutivo.nombres}
                            </option>
                          ))}
                      </select>
                      <img
                        src={require('../../assets/ib_obligatorio.svg').default}
                        alt='mySvgImage'
                        className='w-3 ml-1'
                      />
                    </>
                  )}
                </p>
                <p className='text-sm flex justify-start'>
                  <span className='font-semibold text-sm pr-4 w-40 '>
                    Vehículo ejecutivo:
                  </span>
                  {vehiculosEjecutivos && (
                    <select
                      className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                      id={vehiculoEjecutivo}
                      value={vehiculoEjecutivo}
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
                    id={grupoFamiliar}
                    value={grupoFamiliar}
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
                    <>
                      <select
                        className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
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
                      <img
                        src={require('../../assets/ib_obligatorio.svg').default}
                        alt='mySvgImage'
                        className='w-3 ml-1'
                      />
                    </>
                  )}
                </p>
                <p className='text-sm flex justify-start'>
                  <span className='font-semibold text-sm pr-4 w-40 '>
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
                          <option key='0' value='0'>
                            Seleccione un lugar
                          </option>
                          {Object.keys(lugares).length > 0
                            ? lugares.results.map(lugar => (
                                <option key={lugar.id} value={lugar.id}>
                                  {lugar.alias}
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
                        onChange={e => setLugarSalidaTexto(e.target.value)}
                      />
                    </>
                  )}
                  <img
                    src={require('../../assets/ib_obligatorio.svg').default}
                    alt='mySvgImage'
                    className='w-3 ml-1'
                  />
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
                {tipo === '1' ? (
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
                ) : null}
              </div>
              <div className='flex flex-col ml-2'>
                <p className='text-sm flex justify-start mb-6'>
                  {editarLugarLlegada ? (
                    <>
                      <span className='font-semibold text-sm pr-4 w-40 '>
                        Lugar llegada:
                      </span>
                      {lugares && (
                        <select
                          className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                          id={lugarLlegada}
                          value={lugarLlegada}
                          onChange={e => setLugarLlegada(e.target.value)}
                        >
                          <option key='0' value={0}>
                            Seleccione un lugar
                          </option>
                          {Object.keys(lugares).length > 0
                            ? lugares.results.map(lugar => (
                                <option key={lugar.id} value={lugar.id}>
                                  {lugar.alias}
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
                        onChange={e => setLugarLlegadaTexto(e.target.value)}
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
                {tipo === '1' ? (
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
                ) : null}
              </div>
            </div>

            <div className='flex flex-col px-6 py-3 border-gray-200 items-center'>
              <div className='flex my-4'>
                <div className='flex flex-col '>
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
              <button
                data-modal-toggle='defaultModal'
                type='button'
                className='w-80  text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-1.5 focus:z-10 '
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
