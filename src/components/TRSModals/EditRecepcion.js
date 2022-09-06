import React, { useEffect, useState } from 'react'
import {
  AdminAuthorized,
  Header,
  ICONS,
  RedirectWithoutLogin,
} from '../../components'
import logo from '../../assets/logo.png'
import { MetaTags } from 'react-meta-tags'
import { useLocation, useNavigate } from 'react-router-dom'
import CrearEditarModalGenerico from './CrearEditarModalGenerico'
import EliminarModalGenerico from './EliminarModalGenerico'

import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import {
  cerrarConsignaTRSAction,
  createConsignaTRSAction,
  createNovedadTRSAction,
  crudPersonalActaAction,
  deleteConsignaTRSAction,
  deleteNovedadTRSAction,
  updateConsignaTRSAction,
  updateNovedadTRSAction,
} from '../../store/actions'
import Icon from '../../assets/Icon'

const EditRecepcion = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const [protectores, setProtectores] = useState([])
  const [centralistas, setCentralistas] = useState([])
  const [novedades, setNovedades] = useState([])
  const [consignas, setConsignas] = useState([])
  const [agenteSaliente, setAgenteSaliente] = useState('')
  const [agenteEntrante, setAgenteEntrante] = useState('')

  const [openModalAgregarProtector, setOpenModalAgregarProtector] =
    useState(false)
  const [openModalEditarProtector, setOpenModalEditarProtector] =
    useState(false)
  const [openModalEliminarProtector, setOpenModalEliminarProtector] =
    useState(false)

  const [openModalAgregarCentralista, setOpenModalAgregarCentralista] =
    useState(false)
  const [openModalEditarCentralista, setOpenModalEditarCentralista] =
    useState(false)
  const [openModalEliminarCentralista, setOpenModalEliminarCentralista] =
    useState(false)

  const [openModalAgregarNovedad, setOpenModalAgregarNovedad] = useState(false)
  const [openModalEditarNovedad, setOpenModalEditarNovedad] = useState(false)
  const [openModalEliminarNovedad, setOpenModalEliminarNovedad] =
    useState(false)

  const [openModalAgregarConsigna, setOpenModalAgregarConsigna] =
    useState(false)
  const [openModalEditarConsigna, setOpenModalEditarConsigna] = useState(false)
  const [openModalEliminarConsigna, setOpenModalEliminarConsigna] =
    useState(false)

  const [openModalCerrarConsigna, setOpenModalCerrarConsigna] = useState(false)

  const [protectorSeleccionado, setProtectorSeleccionado] = useState()
  const [centralistaSeleccionado, setCentralistaSeleccionado] = useState()

  const [novedadSeleccionada, setNovedadSeleccionada] = useState()
  const [observacionNovedadSeleccionada, setObservacionNovedadSeleccionada] =
    useState()
  const [consignaSeleccionada, setConsignaSeleccionada] = useState()
  const [observacionConsignaSeleccionada, setObservacionConsignaSeleccionada] =
    useState()

  useEffect(() => {
    console.log(location.state, 'dataInforme')
    setProtectores(
      location.state.protectores !== null
        ? location.state.protectores.split(',') || []
        : []
    )
    setCentralistas(
      location.state.centralistas !== null
        ? location.state.centralistas.split(',') || []
        : []
    )
    setNovedades(location.state.trsnovedad || [])
    setConsignas(location.state.trsconsigna || [])
    setAgenteSaliente(location.state.agente_saliente || '')
    setAgenteEntrante(location.state.agente_entrante || '')
  }, [])

  const handleSalir = () => {
    navigate(-1)
  }

  // CRUD Protectores
  const handleOpenAgregarProtector = () => {
    setOpenModalAgregarProtector(true)
  }

  const handleCloseAgregarProtector = () => {
    setOpenModalAgregarProtector(false)
  }

  const handleAgregarProtector = protector => {
    setOpenModalAgregarProtector(false)
    const newProtector = {
      id: location.state.id,
      protectores: String([...protectores, protector]),
      centralistas: location.state.centralistas,
      observacion: location.state.observacion,
    }
    console.log(newProtector, 'newProtector')
    dispatch(crudPersonalActaAction(newProtector))

    setProtectores([...protectores, protector])
  }

  const handleOpenEditarProtector = protector => {
    setOpenModalEditarProtector(true)
    setProtectorSeleccionado(protector)
  }

  const handleCloseEditarProtector = () => {
    setOpenModalEditarProtector(false)
  }

  const handleEditarProtector = protector => {
    setOpenModalEditarProtector(false)
    const protectorEditado = {
      id: location.state.id,
      protectores: String(
        protectores.map(p => (p === protectorSeleccionado ? protector : p))
      ),
      centralistas: location.state.centralistas,
      observacion: location.state.observacion,
    }
    console.log(protectorEditado, 'protectorEditado')
    dispatch(crudPersonalActaAction(protectorEditado))

    setProtectores(
      protectores.map(p => (p === protectorSeleccionado ? protector : p))
    )
  }

  const handleOpenEliminarProtector = protector => {
    setOpenModalEliminarProtector(true)
    setProtectorSeleccionado(protector)
  }

  const handleCloseEliminarProtector = () => {
    setOpenModalEliminarProtector(false)
  }

  const handleEliminarProtector = () => {
    setOpenModalEliminarProtector(false)
    const protectorEliminado = {
      id: location.state.id,
      protectores: String(protectores.filter(p => p !== protectorSeleccionado)),
      centralistas: location.state.centralistas,
      observacion: location.state.observacion,
    }
    console.log(protectorEliminado, 'protectorEliminado')
    dispatch(crudPersonalActaAction(protectorEliminado))

    setProtectores(protectores.filter(p => p !== protectorSeleccionado))
  }

  // CRUD Centralistas
  const handleOpenAgregarCentralista = () => {
    setOpenModalAgregarCentralista(true)
  }

  const handleCloseAgregarCentralista = () => {
    setOpenModalAgregarCentralista(false)
  }

  const handleAgregarCentralista = centralista => {
    setOpenModalAgregarCentralista(false)
    setOpenModalAgregarProtector(false)
    const newCentralista = {
      id: location.state.id,
      protectores: location.state.protectores,
      centralistas: String([...centralistas, centralista]),
      observacion: location.state.observacion,
    }
    console.log(newCentralista, 'newCentralista')
    dispatch(crudPersonalActaAction(newCentralista))

    setCentralistas([...centralistas, centralista])
  }

  const handleOpenEditarCentralista = centralista => {
    setOpenModalEditarCentralista(true)
    setCentralistaSeleccionado(centralista)
  }

  const handleCloseEditarCentralista = () => {
    setOpenModalEditarCentralista(false)
  }

  const handleEditarCentralista = centralista => {
    setOpenModalEditarCentralista(false)
    const centralistaEditado = {
      id: location.state.id,
      protectores: location.state.protectores,
      centralistas: String(
        centralistas.map(c => (c === centralistaSeleccionado ? centralista : c))
      ),
      observacion: location.state.observacion,
    }
    console.log(centralistaEditado, 'centralistaEditado')
    dispatch(crudPersonalActaAction(centralistaEditado))

    setCentralistas(
      centralistas.map(c => (c === centralistaSeleccionado ? centralista : c))
    )
  }

  const handleOpenEliminarCentralista = centralista => {
    setOpenModalEliminarCentralista(true)
    setCentralistaSeleccionado(centralista)
  }

  const handleCloseEliminarCentralista = () => {
    setOpenModalEliminarCentralista(false)
  }

  const handleEliminarCentralista = () => {
    setOpenModalEliminarCentralista(false)
    const centralistaEliminado = {
      id: location.state.id,
      protectores: location.state.protectores,
      centralistas: String(
        centralistas.filter(c => c !== centralistaSeleccionado)
      ),
      observacion: location.state.observacion,
    }

    console.log(centralistaEliminado, 'centralistaEliminado')
    dispatch(crudPersonalActaAction(centralistaEliminado))

    setCentralistas(centralistas.filter(c => c !== centralistaSeleccionado))
  }

  // CRUD Novedades
  const handleOpenAgregarNovedad = () => {
    setOpenModalAgregarNovedad(true)
  }

  const handleCloseAgregarNovedad = () => {
    setOpenModalAgregarNovedad(false)
  }

  const handleAgregarNovedad = novedad => {
    setOpenModalAgregarNovedad(false)
    const newNovedad = {
      informe_trs_id: location.state.id,
      observacion: novedad,
    }
    console.log(newNovedad, 'newNovedad')
    dispatch(createNovedadTRSAction(newNovedad))
    setNovedades([
      ...novedades,
      { id: Date.now(), observacion: novedad, created: new Date() },
    ])
  }

  const handleOpenEditarNovedad = novedad => {
    setOpenModalEditarNovedad(true)
    setNovedadSeleccionada(novedad)
    setObservacionNovedadSeleccionada(novedad.observacion)
  }

  const handleCloseEditarNovedad = () => {
    setOpenModalEditarNovedad(false)
  }

  const handleEditarNovedad = novedad => {
    setOpenModalEditarNovedad(false)
    const novedadEditada = {
      id: novedadSeleccionada.id,
      informe_trs_id: location.state.id,
      observacion: novedad,
    }
    console.log(novedadEditada, 'novedadEditada')
    dispatch(updateNovedadTRSAction(novedadEditada))
    setNovedades(
      novedades.map(n =>
        n.id === novedadSeleccionada.id ? { ...n, observacion: novedad } : n
      )
    )
  }

  const handleOpenEliminarNovedad = novedad => {
    setOpenModalEliminarNovedad(true)
    setNovedadSeleccionada(novedad)
  }

  const handleCloseEliminarNovedad = () => {
    setOpenModalEliminarNovedad(false)
  }

  const handleEliminarNovedad = () => {
    setOpenModalEliminarNovedad(false)
    dispatch(deleteNovedadTRSAction({ id: novedadSeleccionada.id }))
    setNovedades(novedades.filter(n => n.id !== novedadSeleccionada.id))
  }

  // CRUD Consignas
  const handleOpenAgregarConsigna = () => {
    setOpenModalAgregarConsigna(true)
  }

  const handleCloseAgregarConsigna = () => {
    setOpenModalAgregarConsigna(false)
  }

  const handleAgregarConsigna = consigna => {
    setOpenModalAgregarConsigna(false)
    const newConsigna = {
      informe_trs_id: location.state.id,
      obs_creacion: consigna,
    }
    console.log(newConsigna, 'newConsigna')
    dispatch(createConsignaTRSAction(newConsigna))
    setConsignas([
      ...consignas,
      {
        id: Date.now(),
        created: new Date(),
        estado: 1,
        fecha_obs_cierre: null,
        obs_cierre: null,
        obs_creacion: consigna,
      },
    ])
  }

  const handleOpenEditarConsigna = consigna => {
    console.log(consigna, 'consigna')
    setOpenModalEditarConsigna(true)
    setConsignaSeleccionada(consigna)
    setObservacionConsignaSeleccionada(consigna.obs_creacion)
  }

  const handleCloseEditarConsigna = () => {
    setOpenModalEditarConsigna(false)
  }

  const handleEditarConsigna = consigna => {
    setOpenModalEditarConsigna(false)
    const consignaEditada = {
      id: consignaSeleccionada.id,
      informe_trs_id: location.state.id,
      obs_creacion: consigna,
      obs_cierre: consignaSeleccionada.obs_cierre,
      estado: consignaSeleccionada.estado,
    }
    console.log(consignaEditada, 'consignaEditada')
    dispatch(updateConsignaTRSAction(consignaEditada))
    setConsignas(
      consignas.map(c =>
        c.id === consignaSeleccionada.id ? { ...c, obs_creacion: consigna } : c
      )
    )
  }

  const handleOpenEliminarConsigna = consigna => {
    setOpenModalEliminarConsigna(true)
    setConsignaSeleccionada(consigna)
  }

  const handleCloseEliminarConsigna = () => {
    setOpenModalEliminarConsigna(false)
  }

  const handleEliminarConsigna = () => {
    setOpenModalEliminarConsigna(false)
    dispatch(deleteConsignaTRSAction({ id: consignaSeleccionada.id }))
    setConsignas(consignas.filter(c => c.id !== consignaSeleccionada.id))
  }

  const handleOpenCerrarConsigna = consigna => {
    setOpenModalCerrarConsigna(true)
    setConsignaSeleccionada(consigna)
  }

  const handleCloseCerrarConsigna = () => {
    setOpenModalCerrarConsigna(false)
  }

  const handleCerrarConsigna = consigna => {
    setOpenModalCerrarConsigna(false)
    const consignaCerrada = {
      id: consignaSeleccionada.id,
      obs_cierre: consigna,
    }
    console.log(consignaCerrada, 'consignaCerrada')
    dispatch(cerrarConsignaTRSAction(consignaCerrada))
    setConsignas(
      consignas.map(c =>
        c.id === consignaSeleccionada.id
          ? {
              ...c,
              obs_cierre: consigna,
              estado: 0,
              fecha_obs_cierre: new Date(),
            }
          : c
      )
    )
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
              <p className=' ml-1'>Entrega y Recepción de Turno</p>
            </div>

            <div className='flex justify-center items-center'>
              {/* <ICONS.ChevronDoubleLeftIconO className='h-14 mt-[32vh] mx-14 text-gray-400 hover:cursor-pointer' /> */}

              <div className='flex justify-center bg-white'>
                <div className='px-4 border-2 hover:shadow-xl hover:border-2 shadow-sm py-8 w-[67rem]'>
                  <div className='flex justify-between mb-8 mx-10'>
                    <img src={logo} className='h-14' />
                    <h2 className='font-bold text-xl mt-2'>
                      ACTA ENTREGA RECEPCION DE GUARDIA EMSECOR
                    </h2>

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
                  </div>

                  <div className='flex justify-between px-20'>
                    <p className='font-semibold'>
                      CENTRAL DE OPERACIONES: DIURNA
                    </p>
                    <p className='font-semibold'>
                      FECHA:{' '}
                      {format(new Date(location.state.created), 'dd/MM/yyyy')}
                    </p>
                  </div>

                  {/* FOUR LINES */}
                  <div className='flex mt-12'>
                    {/* LEFT */}
                    <div className='w-1/2'>
                      <div className='flex flex-row justify-between'>
                        <h2 className='font-semibold text-center mx-auto'>
                          GRUPO DE PROTECCION GUARDIA
                        </h2>
                        <button onClick={handleOpenAgregarProtector}>
                          <ICONS.PlusCircleIconS className='h-6 ml-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md' />
                        </button>
                        <CrearEditarModalGenerico
                          tipoModal='crear'
                          openModal={openModalAgregarProtector}
                          handleClose={handleCloseAgregarProtector}
                          tituloModal='Crear personal de Protección Guardia'
                          descripcionModal='A continuación escriba el nombre del agente:'
                          handleAction={handleAgregarProtector}
                        />
                      </div>

                      <div>
                        <ol
                          style={{ listStyleType: 'number' }}
                          className='pl-6'
                        >
                          <div className='border-2 border-gray-500 rounded-md'>
                            {protectores.length > 0 ? (
                              protectores.map((protector, index) => (
                                <li
                                  key={index}
                                  className='px-2 border-b-2 border-gray-500'
                                >
                                  <div className='flex flex-row justify-between'>
                                    <p className='font-semibold'>{protector}</p>
                                    <div className='flex flex-row '>
                                      <button
                                        onClick={() =>
                                          handleOpenEditarProtector(protector)
                                        }
                                      >
                                        <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                          <svg
                                            width='17'
                                            height='15'
                                            viewBox='0 0 17 15'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 mx-1 '
                                          >
                                            <path
                                              d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
                                              fill='#128868'
                                            />
                                          </svg>
                                        </div>
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleOpenEliminarProtector(protector)
                                        }
                                      >
                                        <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                          <svg
                                            width='13'
                                            height='17'
                                            viewBox='0 0 13 17'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 mx-1'
                                          >
                                            <path
                                              d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
                                              fill='#D61601'
                                            />
                                          </svg>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                  <CrearEditarModalGenerico
                                    tipoModal='actualizar'
                                    openModal={openModalEditarProtector}
                                    handleClose={handleCloseEditarProtector}
                                    tituloModal='Editar personal de Grupo de protección Guardia'
                                    descripcionModal='Edite el nombre del agente:'
                                    handleAction={handleEditarProtector}
                                    itemSeleccionado={protectorSeleccionado}
                                  />
                                </li>
                              ))
                            ) : (
                              <li className='pl-2 border-b-2 border-gray-500'>
                                <p className='font-semibold'>
                                  No se han registrado protectores
                                </p>
                              </li>
                            )}

                            <EliminarModalGenerico
                              openModal={openModalEliminarProtector}
                              handleClose={handleCloseEliminarProtector}
                              tituloModal='Eliminar agente de Grupo de protección Guardia'
                              descripcionModal='Al eliminar un agente, sera de forma definitiva y sin posiblidad de recuperación'
                              handleAction={handleEliminarProtector}
                            />
                          </div>
                        </ol>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className='w-1/2'>
                      <div className='flex flex-row justify-between'>
                        <h2 className='font-semibold text-center mx-auto'>
                          GRUPO DE TRABAJO
                        </h2>{' '}
                        <button onClick={handleOpenAgregarCentralista}>
                          <ICONS.PlusCircleIconS className='h-6 ml-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md' />
                        </button>
                        <CrearEditarModalGenerico
                          tipoModal='crear'
                          openModal={openModalAgregarCentralista}
                          handleClose={handleCloseAgregarCentralista}
                          tituloModal='Crear personal de Trabajo'
                          descripcionModal='A continuación escriba el nombre del agente:'
                          handleAction={handleAgregarCentralista}
                        />
                      </div>
                      <div>
                        <ol
                          style={{ listStyleType: 'number' }}
                          className='pl-6'
                        >
                          <div className='border-2 border-gray-500 rounded-md'>
                            {centralistas.length > 0 ? (
                              centralistas.map((centralista, index) => (
                                <li
                                  key={index}
                                  className='pl-2 border-b-2 border-gray-500'
                                >
                                  <div className='flex flex-row justify-between'>
                                    <p className='font-semibold'>
                                      {centralista}
                                    </p>
                                    <div className='flex flex-row'>
                                      <button
                                        onClick={() =>
                                          handleOpenEditarCentralista(
                                            centralista
                                          )
                                        }
                                      >
                                        <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                          <svg
                                            width='17'
                                            height='15'
                                            viewBox='0 0 17 15'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 mx-1'
                                          >
                                            <path
                                              d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
                                              fill='#128868'
                                            />
                                          </svg>
                                        </div>
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleOpenEliminarCentralista(
                                            centralista
                                          )
                                        }
                                      >
                                        <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                          <svg
                                            width='13'
                                            height='17'
                                            viewBox='0 0 13 17'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 mx-1'
                                          >
                                            <path
                                              d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
                                              fill='#D61601'
                                            />
                                          </svg>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className='pl-2 border-b-2 border-gray-500'>
                                <p>No se han registrado centralistas</p>
                              </li>
                            )}
                            <CrearEditarModalGenerico
                              tipoModal='actualizar'
                              openModal={openModalEditarCentralista}
                              handleClose={handleCloseEditarCentralista}
                              tituloModal='Editar personal de Grupo de trabajo'
                              descripcionModal='Edite el nombre del agente:'
                              handleAction={handleEditarCentralista}
                              itemSeleccionado={centralistaSeleccionado}
                            />
                            <EliminarModalGenerico
                              openModal={openModalEliminarCentralista}
                              handleClose={handleCloseEliminarCentralista}
                              tituloModal='Eliminar agente de Grupo de Trabajo'
                              descripcionModal='Al eliminar un agente, sera de forma definitiva y sin posiblidad de recuperación'
                              handleAction={handleEliminarCentralista}
                            />
                          </div>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* NEW SECTION */}
                  <div className='flex mt-12 mb-32'>
                    {/* LEFT */}
                    <div className='w-1/2'>
                      <div className='flex flex-row justify-between'>
                        <h2 className='font-semibold text-center mx-auto'>
                          NOVEDADES ESPECIALES
                        </h2>
                        <button onClick={handleOpenAgregarNovedad}>
                          <ICONS.PlusCircleIconS className='h-6 ml-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md' />
                        </button>
                        <CrearEditarModalGenerico
                          tipoModal='crearTextArea'
                          openModal={openModalAgregarNovedad}
                          handleClose={handleCloseAgregarNovedad}
                          tituloModal='Crear Novedad Especial'
                          descripcionModal='A continuación escriba la nueva novedad:'
                          handleAction={handleAgregarNovedad}
                        />
                      </div>
                      <div>
                        <ol className='border-2 border-gray-500'>
                          {novedades.map((novedad, index) => (
                            <li key={index} className='w-full p-2 border-b-2'>
                              <div className='flex justify-between'>
                                <div className='flex flex-row items-center'>
                                  <p className='font-semibold text-sm mx-4'>
                                    {format(new Date(novedad.created), 'HH:mm')}
                                  </p>
                                  <p className='text-blue-900'>
                                    {novedad.observacion}
                                  </p>
                                </div>
                                <div className='flex flex-col'>
                                  <button
                                    onClick={() =>
                                      handleOpenEditarNovedad(novedad)
                                    }
                                  >
                                    <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                      <svg
                                        width='17'
                                        height='15'
                                        viewBox='0 0 17 15'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 mx-1'
                                      >
                                        <path
                                          d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
                                          fill='#128868'
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleOpenEliminarNovedad(novedad)
                                    }
                                  >
                                    <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                      <svg
                                        width='13'
                                        height='17'
                                        viewBox='0 0 13 17'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 mx-1'
                                      >
                                        <path
                                          d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
                                          fill='#D61601'
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <CrearEditarModalGenerico
                        tipoModal='actualizarTextArea'
                        openModal={openModalEditarNovedad}
                        handleClose={handleCloseEditarNovedad}
                        tituloModal='Editar Novedad Especial'
                        descripcionModal='Edite la novedad especial:'
                        handleAction={handleEditarNovedad}
                        itemSeleccionado={observacionNovedadSeleccionada}
                      />
                      <EliminarModalGenerico
                        openModal={openModalEliminarNovedad}
                        handleClose={handleCloseEliminarNovedad}
                        tituloModal='Eliminar Novedad Especial'
                        descripcionModal='Al eliminar una novedad, sera de forma definitiva y sin posiblidad de recuperación'
                        handleAction={handleEliminarNovedad}
                      />
                    </div>

                    {/* RIGHT */}
                    <div className='w-1/2'>
                      <div className='flex flex-row justify-between'>
                        <h2 className='font-semibold text-center mx-auto'>
                          CONSIGNAS ESPECIALES
                        </h2>
                        <button onClick={handleOpenAgregarConsigna}>
                          <ICONS.PlusCircleIconS className='h-6 ml-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md' />
                        </button>
                        <CrearEditarModalGenerico
                          tipoModal='crearTextArea'
                          openModal={openModalAgregarConsigna}
                          handleClose={handleCloseAgregarConsigna}
                          tituloModal='Crear Consigna Especial'
                          descripcionModal='A continuación escriba la nueva consigna:'
                          handleAction={handleAgregarConsigna}
                        />
                      </div>

                      <div className='ml-4'>
                        <ol>
                          {consignas.map((consigna, index) => (
                            <li key={index} className='my-1'>
                              <div className='grid grid-row-2 grid-cols-5 border-2 border-gray-700'>
                                <div className='item1 col-span-1 border-b-2'>
                                  <div className='flex flex-col items-center'>
                                    <span>Creado</span>
                                    <span>
                                      {format(
                                        new Date(consigna.created),
                                        'dd/mm/yyyy'
                                      )}
                                    </span>
                                    <span>
                                      {format(
                                        new Date(consigna.created),
                                        'HH:mm'
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className='item2 col-span-3 border-b-2'>
                                  {consigna.obs_creacion}
                                </div>
                                <div className='item3 border-b-2'>
                                  <div className='flex items-center flex-col'>
                                    <Icon
                                      svgName='ib_editar'
                                      className='h-4 my-2'
                                    />
                                    <Icon
                                      svgName='ib_eliminar'
                                      className='h-4'
                                    />
                                  </div>
                                </div>
                                <div className='item-4'>
                                  <div className='flex flex-col items-center'>
                                    <span>Cerrado</span>
                                    <span>
                                      {format(
                                        new Date(consigna.fecha_obs_cierre),
                                        'dd/mm/yyyy'
                                      )}
                                    </span>
                                    <span>
                                      {format(
                                        new Date(consigna.fecha_obs_cierre),
                                        'HH:mm'
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className='item-5 col-span-3'>
                                  {consigna.obs_cierre}
                                </div>
                                <div className='item-6 col-span-1'>
                                  <div className='flex items-center flex-col'>
                                    <Icon
                                      svgName='ib_editar'
                                      className='h-4 my-2'
                                    />
                                    <Icon
                                      svgName='ib_eliminar'
                                      className='h-4'
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <CrearEditarModalGenerico
                      tipoModal='actualizarTextArea'
                      openModal={openModalEditarConsigna}
                      handleClose={handleCloseEditarConsigna}
                      tituloModal='Editar Consigna Especial'
                      descripcionModal='Edite la novedad especial:'
                      handleAction={handleEditarConsigna}
                      itemSeleccionado={observacionConsignaSeleccionada}
                    />
                    <EliminarModalGenerico
                      openModal={openModalEliminarConsigna}
                      handleClose={handleCloseEliminarConsigna}
                      tituloModal='Eliminar Consigna Especial'
                      descripcionModal='Al eliminar una consigna, esta se eliminara con la observación de cierre de ser el caso, sera de forma definitiva y sin posiblidad de recuperación.'
                      handleAction={handleEliminarConsigna}
                    />
                    {/* CIERRE DE CONSIGNA MODAL */}
                    <CrearEditarModalGenerico
                      tipoModal='actualizarTextArea'
                      openModal={openModalCerrarConsigna}
                      handleClose={handleCloseCerrarConsigna}
                      tituloModal='Crear cierre de Consigna Especial'
                      descripcionModal='Escriba una observación para cerar la consigna especial:'
                      handleAction={handleCerrarConsigna}
                    />
                  </div>

                  {/* FOOTER SECTION */}
                  <div className='border-2'>
                    <div className='flex border-b-2 border-gray-500'>
                      <div className=' w-1/2 text-center py-4 border-r-2 border-gray-500 font-semibold'>
                        <p>CENTRALISTA DE OPERACIONES SALIENTE:</p>
                        <p>{agenteSaliente}</p>
                      </div>

                      <div className='w-1/2 text-center my-4 font-semibold'>
                        <p>CENTRALISTA DE OPERACIONES ENTRANTE:</p>
                        <p>{agenteEntrante}</p>
                      </div>
                    </div>

                    <div className='flex'>
                      <p className='h-20 w-1/2 flex flex-col justify-end p-2 border-r-2 border-gray-500'>
                        Firma:
                      </p>
                      <p className=' h-20 w-1/2 flex flex-col justify-end p-2 border-r-2 border-gray-500'>
                        Hora:
                      </p>
                      <p className='h-20 w-1/2 flex flex-col justify-end p-2 border-r-2 border-gray-500'>
                        Firma:
                      </p>
                      <p className='h-20 w-1/2 flex flex-col justify-end p-2'>
                        Hora:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <ICONS.ChevronDoubleRightIconO className='mx-14 h-14 mt-[32vh] text-gray-400 hover:cursor-pointer' /> */}
              <div className='mx-14 text-gray-400 self-end'>
                <button
                  className='self-end mb-20 bg-blue-900 px-10 py-2 text-white rounded-lg hover:bg-blue-800'
                  onClick={() => handleSalir()}
                >
                  Salir
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default EditRecepcion
