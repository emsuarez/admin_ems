import { Box, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import Icon from '../../assets/Icon'
import logo from '../../assets/logo.png'
import { getGrupoFamiliarByIdAction, setToast } from '../../store/actions'
import { data } from 'jquery'
import { isAllOf } from '@reduxjs/toolkit'
import { format } from 'date-fns'

const EditMovimiento = ({
  openModal,
  handleClose,
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

  const [ejecutivo, setEjecutivo] = useState('0')
  const [vehiculoEjecutivo, setVehiculoEjecutivo] = useState('')
  const [protector, setProtector] = useState('')
  const [vehiculoProtector, setVehiculoProtector] = useState('')
  const [grupoFamiliar, setGrupoFamiliar] = useState('')
  const [observacionVehiculo, setObservacionVehiculo] = useState('')
  const [lugarSalida, setLugarSalida] = useState('')
  const [horaSalida, setHoraSalida] = React.useState(dayjs(new Date()))

  const [lugarLlegada, setLugarLlegada] = useState('')
  const [horaLlegada, setHoraLlegada] = React.useState(dayjs(new Date()))

  const [observacion, setObservacion] = useState('')

  const [vehiculosEjecutivos, setVehiculosEjecutivos] = useState([])
  const [familiares, setFamiliares] = useState([])

  const [editarLugarSalida, setEditarLugarSalida] = useState(true)
  const [editarLugarLlegada, setEditarLugarLlegada] = useState(true)
  const [lugarSalidaTexto, setLugarSalidaTexto] = useState('')
  const [lugarLlegadaTexto, setLugarLlegadaTexto] = useState('')

  const [confirmoLlegada, setConfirmoLlegada] = useState(false)

  const tipo = window.localStorage.getItem('tipo')

  useEffect(() => {
    if (!dataSeleccionada) {
      return
    }
    if (!ejecutivos) {
      return
    }
    if (!vehiculosEjecutivo) {
      return
    }
    if (!vehiculosProtector) {
      return
    }
    if (!familiaresEjecutivo) {
      return
    }
    console.log(dataSeleccionada, 'dataSeleccionada')
    const ejecutivoSeleccionado =
      ejecutivos.results &&
      ejecutivos.results?.find(eje => eje.id === dataSeleccionada.ejecutivo)?.id
    const protectorSeleccionado =
      protectores.results &&
      protectores.results.find(pro => pro.id === dataSeleccionada.protector)?.id

    const vehiculoProtectorSeleccionado =
      Array.isArray(vehiculosProtector.results) &&
      vehiculosProtector.results.find(
        veh => veh.id === dataSeleccionada.vehiculo_protector
      )?.id

    const idEjecutivo = ejecutivos.results.find(
      eje => eje.id === dataSeleccionada.ejecutivo
    )?.id
    dispatch(getGrupoFamiliarByIdAction(idEjecutivo))
    setEjecutivo(ejecutivoSeleccionado ? ejecutivoSeleccionado : '0')

    setProtector(protectorSeleccionado ? protectorSeleccionado : '0')

    setVehiculosEjecutivos(
      vehiculosEjecutivo.results &&
        vehiculosEjecutivo.results.filter(
          vehiculo => vehiculo.id_ejecutivo === idEjecutivo
        )
    )

    const idVehiculoEjec = vehiculosEjecutivo.results.find(
      vehiculo => vehiculo.id === dataSeleccionada.vehiculo_ejecutivo
    )?.id

    setVehiculoEjecutivo(idVehiculoEjec ? idVehiculoEjec : '0')
    setVehiculoProtector(
      vehiculoProtectorSeleccionado ? vehiculoProtectorSeleccionado : '0'
    )

    setFamiliares(
      familiaresEjecutivo.results &&
        familiaresEjecutivo.results.filter(
          familiar => familiar.id_ejecutivo === idEjecutivo
        )
    )

    const idFamiliar =
      familiaresEjecutivo.results &&
      familiaresEjecutivo.results?.find(
        fam => fam.id === dataSeleccionada.familiar
      )?.id

    setGrupoFamiliar(idFamiliar ? idFamiliar : null)

    const lugarSalidaId =
      lugares.results?.find(lugar => lugar.id === dataSeleccionada.lugar_salida)
        ?.id || '0'
    console.log(lugarSalidaId, 'lugarSalidaId')
    setLugarSalida(lugarSalidaId ? lugarSalidaId : '0')

    setLugarSalidaTexto(dataSeleccionada.lugar_salida_texto)

    const lugarLlegadaId = dataSeleccionada.lugar_llegada
      ? lugares.results?.find(
          lugar => lugar.id === dataSeleccionada.lugar_llegada
        )?.id
      : '0'
    setLugarLlegada(lugarLlegadaId ? lugarLlegadaId : '0')

    setLugarLlegadaTexto(dataSeleccionada.lugar_llegada_texto)

    setObservacion(
      dataSeleccionada.observacion ? dataSeleccionada.observacion : ''
    )
  }, [dataSeleccionada])

  const seleccionaEjecutivo = e => {
    setEjecutivo(e.target.value)
    dispatch(getGrupoFamiliarByIdAction(e.target.value))

    setVehiculosEjecutivos(
      vehiculosEjecutivo.results.filter(
        vehiculo => vehiculo.id_ejecutivo === Number(e.target.value)
      ) || []
    )

    setFamiliares(
      familiaresEjecutivo.results.filter(
        familiar => familiar.id_ejecutivo === Number(e.target.value)
      ) || []
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

  // #region Handle Editar
  const handleEditarEvento = () => {
    if (lugarLlegada === '0' && lugarLlegadaTexto === '') {
      dispatch(setToast('error', 'Debe seleccionar un lugar de llegada'))

      return
    }
    if (confirmoLlegada === false) {
      dispatch(setToast('error', 'Debe confirmar la llegada'))
      return
    }

    const eventoEditado = {
      id: dataSeleccionada.id,
      ejecutivo: ejecutivo,
      familiar: grupoFamiliar,
      vehiculo_ejecutivo: vehiculoEjecutivo,

      vehiculo_observacion: observacionVehiculo,
      protector: protector,

      vehiculo_protector: vehiculoProtector,

      lugar_salida: lugarSalida,

      lugar_salida_texto: lugarSalidaTexto !== '' ? lugarSalidaTexto : null,
      lugar_llegada: lugarLlegada,

      lugar_llegada_texto: lugarLlegadaTexto !== '' ? lugarLlegadaTexto : null,
      hora_salida: new Date(horaSalida),
      hora_llegada: new Date(horaLlegada),
      observacion: observacion,
    }

    console.log(eventoEditado)
    handleAction(eventoEditado)
  }
  // #endregion

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
                          <>
                            <select
                              className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                              id={ejecutivo}
                              value={ejecutivo}
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
                            <img
                              src={
                                require('../../assets/ib_obligatorio.svg')
                                  .default
                              }
                              alt='mySvgImage'
                              className='w-3 ml-1'
                            />
                          </>
                        )}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-40'>
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
                        {familiares && (
                          <select
                            className='border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-44'
                            id={grupoFamiliar}
                            value={grupoFamiliar}
                            onChange={e => setGrupoFamiliar(e.target.value)}
                          >
                            <option value='0'>Seleccione un familiar</option>
                            {Object.keys(familiares).length > 0
                              ? familiares.map(familiar => (
                                  <option key={familiar.id} value={familiar.id}>
                                    {familiar.nombres}
                                  </option>
                                ))
                              : null}
                          </select>
                        )}
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
                              src={
                                require('../../assets/ib_obligatorio.svg')
                                  .default
                              }
                              alt='mySvgImage'
                              className='w-3 ml-1'
                            />
                          </>
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
                              onChange={e =>
                                setLugarSalidaTexto(e.target.value)
                              }
                            />
                          </>
                        )}
                        <img
                          src={
                            require('../../assets/ib_obligatorio.svg').default
                          }
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

                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-40'>
                          Hora salida:
                        </span>

                        {dataSeleccionada.created &&
                          format(
                            new Date(dataSeleccionada?.created),
                            'dd/MM/yyyy HH:mm'
                          )}
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
                          Confirmación llegada:
                        </span>

                        <input
                          type={'checkbox'}
                          id='confirmaLlegada'
                          value={confirmoLlegada}
                          onChange={e => setConfirmoLlegada(e.target.checked)}
                        />
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
                        onClick={() => handleEditarEvento()}
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
