import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import {
  AdminAuthorized,
  Header,
  ICONS,
  RedirectWithoutLogin,
} from '../../components'
import CrearEditarModalGenerico from './CrearEditarModalGenerico'
import EliminarModalGenerico from './EliminarModalGenerico'

import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '../../assets/Icon'
import {
  cerrarConsignaTRSAction,
  cerrarNovedadTRSAction,
  createConsignaTRSAction,
  createNovedadTRSAction,
  crudPersonalActaAction,
  deleteConsignaTRSAction,
  deleteNovedadTRSAction,
  getInformeTrsNavegacion,
  updateConsignaTRSAction,
  updateNovedadTRSAction,
} from '../../store/actions'
import ReactToPrint, { useReactToPrint } from 'react-to-print'

const EditRecepcion = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const actaSeleccionada = useSelector(state => state.informes.actaSeleccionada)

  // #region STATE_INICIAL
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
  const [openModalEditarNovedadCerrada, setOpenModalEditarNovedadCerrada] =
    useState(false)
  const [openModalEliminarNovedad, setOpenModalEliminarNovedad] =
    useState(false)

  const [openModalAgregarConsigna, setOpenModalAgregarConsigna] =
    useState(false)
  const [openModalEditarConsigna, setOpenModalEditarConsigna] = useState(false)
  const [openModalEditarConsignaCerrada, setOpenModalEditarConsignaCerrada] =
    useState(false)
  const [openModalEliminarConsigna, setOpenModalEliminarConsigna] =
    useState(false)

  const [openModalCerrarNovedad, setOpenModalCerrarNovedad] = useState(false)
  const [openModalCerrarConsigna, setOpenModalCerrarConsigna] = useState(false)

  const [protectorSeleccionado, setProtectorSeleccionado] = useState()
  const [centralistaSeleccionado, setCentralistaSeleccionado] = useState()

  const [novedadSeleccionada, setNovedadSeleccionada] = useState()
  const [observacionNovedadSeleccionada, setObservacionNovedadSeleccionada] =
    useState()
  const [consignaSeleccionada, setConsignaSeleccionada] = useState()
  const [observacionConsignaSeleccionada, setObservacionConsignaSeleccionada] =
    useState()

  //#endregion

  useEffect(() => {
    const obtenerInfoVista = () => {
      setProtectores(
        actaSeleccionada.protectores !== null
          ? actaSeleccionada.protectores.split(',') || []
          : []
      )
      setCentralistas(
        actaSeleccionada.centralistas !== null
          ? actaSeleccionada.centralistas.split(',') || []
          : []
      )
      setNovedades(actaSeleccionada.trsnovedad || [])
      setConsignas(actaSeleccionada.trsconsigna || [])
      setAgenteSaliente(actaSeleccionada.agente_saliente || '')
      setAgenteEntrante(actaSeleccionada.agente_entrante || '')
    }

    obtenerInfoVista()

    console.log(actaSeleccionada, 'actaSeleccionada')
  }, [actaSeleccionada])

  // #region CRUD_PROTECTORES
  const handleOpenAgregarProtector = () => {
    setOpenModalAgregarProtector(true)
  }

  const handleCloseAgregarProtector = () => {
    setOpenModalAgregarProtector(false)
  }

  const handleAgregarProtector = protector => {
    setOpenModalAgregarProtector(false)
    const newProtector = {
      id: actaSeleccionada.id,
      protectores: String([...protectores, protector]),
      centralistas: actaSeleccionada.centralistas,
      observacion: actaSeleccionada.observacion,
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
      id: actaSeleccionada.id,
      protectores: String(
        protectores.map(p => (p === protectorSeleccionado ? protector : p))
      ),
      centralistas: actaSeleccionada.centralistas,
      observacion: actaSeleccionada.observacion,
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
      id: actaSeleccionada.id,
      protectores: String(protectores.filter(p => p !== protectorSeleccionado)),
      centralistas: actaSeleccionada.centralistas,
      observacion: actaSeleccionada.observacion,
    }
    console.log(protectorEliminado, 'protectorEliminado')
    dispatch(crudPersonalActaAction(protectorEliminado))

    setProtectores(protectores.filter(p => p !== protectorSeleccionado))
  }
  //#endregion

  // #region CRUD_CENTRALISTAS
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
      id: actaSeleccionada.id,
      protectores: actaSeleccionada.protectores,
      centralistas: String([...centralistas, centralista]),
      observacion: actaSeleccionada.observacion,
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
      id: actaSeleccionada.id,
      protectores: actaSeleccionada.protectores,
      centralistas: String(
        centralistas.map(c => (c === centralistaSeleccionado ? centralista : c))
      ),
      observacion: actaSeleccionada.observacion,
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
      id: actaSeleccionada.id,
      protectores: actaSeleccionada.protectores,
      centralistas: String(
        centralistas.filter(c => c !== centralistaSeleccionado)
      ),
      observacion: actaSeleccionada.observacion,
    }

    console.log(centralistaEliminado, 'centralistaEliminado')
    dispatch(crudPersonalActaAction(centralistaEliminado))

    setCentralistas(centralistas.filter(c => c !== centralistaSeleccionado))
  }
  //#endregion

  // #region CRUD_NOVEDADES
  const handleOpenAgregarNovedad = () => {
    setOpenModalAgregarNovedad(true)
  }

  const handleCloseAgregarNovedad = () => {
    setOpenModalAgregarNovedad(false)
  }

  const handleAgregarNovedad = novedad => {
    setOpenModalAgregarNovedad(false)
    const newNovedad = {
      informe_trs_id: actaSeleccionada.id,
      obs_creacion: novedad,
    }
    console.log(newNovedad, 'newNovedad')
    dispatch(createNovedadTRSAction(newNovedad))
    setNovedades([
      ...novedades,
      { id: Date.now(), obs_creacion: novedad, created: new Date(), estado: 1 },
    ])
  }

  const handleOpenEditarNovedad = novedad => {
    setOpenModalEditarNovedad(true)
    setNovedadSeleccionada(novedad)
    setObservacionNovedadSeleccionada(novedad.obs_creacion)
  }

  const handleCloseEditarNovedad = () => {
    setOpenModalEditarNovedad(false)
  }

  const handleEditarNovedad = novedad => {
    setOpenModalEditarNovedad(false)
    const novedadEditada = {
      id: novedadSeleccionada.id,
      informe_trs_id: actaSeleccionada.id,
      obs_creacion: novedad,
    }
    console.log(novedadEditada, 'novedadEditada')
    dispatch(updateNovedadTRSAction(novedadEditada))
    setNovedades(
      novedades.map(n =>
        n.id === novedadSeleccionada.id ? { ...n, obs_creacion: novedad } : n
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

  const handleOpenEditarNovedadCerrada = novedad => {
    setOpenModalEditarNovedadCerrada(true)
    setNovedadSeleccionada(novedad)
    setObservacionNovedadSeleccionada(novedad.obs_cierre)
  }

  const handleCloseEditarNovedadCerrada = () => {
    setOpenModalEditarNovedadCerrada(false)
  }

  const handleEditarNovedadCerrada = novedad => {
    setOpenModalEditarNovedadCerrada(false)
    const novedadEditada = {
      id: novedadSeleccionada.id,
      informe_trs_id: actaSeleccionada.id,
      obs_cierre: novedad,
    }
    console.log(novedadEditada, 'novedadEditada')
    dispatch(updateNovedadTRSAction(novedadEditada))
    setNovedades(
      novedades.map(n =>
        n.id === novedadSeleccionada.id ? { ...n, obs_cierre: novedad } : n
      )
    )
  }

  const handleOpenCerrarNovedad = novedad => {
    setOpenModalCerrarNovedad(true)
    setNovedadSeleccionada(novedad)
  }

  const handleCloseCerrarNovedad = () => {
    setOpenModalCerrarNovedad(false)
  }

  const handleCerrarNovedad = novedad => {
    setOpenModalCerrarNovedad(false)
    const novedadCerrada = {
      id: novedadSeleccionada.id,
      informe_trs_id: actaSeleccionada.id,
      obs_cierre: novedad,
    }
    console.log(novedadCerrada, 'novedadCerrada')
    dispatch(cerrarNovedadTRSAction(novedadCerrada))
    setNovedades(
      novedades.map(n =>
        n.id === novedadSeleccionada.id
          ? {
              ...n,
              obs_cierre: novedad,
              estado: 0,
              fecha_obs_cierre: new Date(),
            }
          : n
      )
    )
  }
  //#endregion

  // #region CRUD_CONSIGNAS
  const handleOpenAgregarConsigna = () => {
    setOpenModalAgregarConsigna(true)
  }

  const handleCloseAgregarConsigna = () => {
    setOpenModalAgregarConsigna(false)
  }

  const handleAgregarConsigna = consigna => {
    setOpenModalAgregarConsigna(false)
    const newConsigna = {
      informe_trs_id: actaSeleccionada.id,
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
      informe_trs_id: actaSeleccionada.id,
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

  const handleOpenEditarConsignaCerrada = consigna => {
    setOpenModalEditarConsignaCerrada(true)
    setConsignaSeleccionada(consigna)
    setObservacionConsignaSeleccionada(consigna.obs_cierre)
  }

  const handleCloseEditarConsignaCerrada = () => {
    setOpenModalEditarConsignaCerrada(false)
  }

  const handleEditarConsignaCerrada = consigna => {
    setOpenModalEditarConsignaCerrada(false)
    const consignaEditada = {
      id: consignaSeleccionada.id,
      informe_trs_id: actaSeleccionada.id,
      obs_cierre: consigna,
    }
    console.log(consignaEditada, 'consignaEditada')
    dispatch(updateConsignaTRSAction(consignaEditada))
    setNovedades(
      consignas.map(c =>
        c.id === consignaSeleccionada.id ? { ...c, obs_cierre: consigna } : c
      )
    )
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
      informe_trs_id: actaSeleccionada.id,
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

  // #endregion

  // #region FUNCIONES_ADICIONALES
  const handleSalir = () => {
    navigate(-1)
  }

  const handleInformeAnterior = async () => {
    dispatch(getInformeTrsNavegacion(actaSeleccionada.id, 0))
  }

  const handleSiguienteInforme = () => {
    dispatch(getInformeTrsNavegacion(actaSeleccionada.id, 1))
  }

  const componentRef = useRef()
  const handleGenerarInformePdf = useReactToPrint({
    content: () => componentRef.current,
  })

  // #endregion
  return (
    <>
      <div>
        <RedirectWithoutLogin />

        <Header />
        <div className='flex items-center bg-slate-100 py-2'>
          <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
          <p className=' ml-1'>TRS</p>
          <ICONS.ChevronRightIconO className='h-3  ml-1' />
          <p className=' ml-1'>Entrega y Recepción de Turno</p>
        </div>

        <div className='flex justify-center items-center '>
          <button onClick={() => handleInformeAnterior()}>
            <Icon
              svgName='ib_flechaizq'
              className='h-14 mx-14 text-gray-400 hover:cursor-pointer'
            />
          </button>
          <div className='flex justify-center bg-white h-[89rem]'>
            <div
              ref={componentRef}
              className='flex  flex-col px-4 border-2 hover:shadow-xl hover:border-2 shadow-sm w-[67rem] h-[86.5rem] py-2'
            >
              <div className='flex justify-between mb-2 mx-10'>
                <img src={logo} className='h-14' />
                <h2 className='font-bold text-lg'>
                  ACTA ENTREGA RECEPCION DE GUARDIA EMSECOR
                </h2>

                <button onClick={handleGenerarInformePdf}>
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
                <p className='font-semibold text-sm'>
                  CENTRAL DE OPERACIONES:{' '}
                  {actaSeleccionada.turno === 1 ? 'DIURNO' : 'NOCTURNO'}
                  <span className='text-blue-800 ml-2'>{agenteSaliente}</span>
                </p>
                <p className='font-semibold text-sm'>
                  FECHA:{' '}
                  {format(new Date(actaSeleccionada.created), 'dd/MM/yyyy')}
                </p>
              </div>

              {/* FOUR LINES */}
              <div className='flex mt-5'>
                {/* LEFT */}
                <div className='w-1/2'>
                  <div className='flex flex-row justify-between'>
                    <h2 className='font-semibold text-center mx-auto text-sm'>
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
                    <ol style={{ listStyleType: 'number' }} className='pl-6'>
                      <div className='border-2 border-gray-500 rounded-md'>
                        {protectores.length > 0 ? (
                          protectores.map((protector, index) => (
                            <li
                              key={index}
                              className='px-2 border-b-2 border-gray-500'
                            >
                              <div className='flex flex-row justify-between text-xs'>
                                <p className='font-semibold'>{protector}</p>
                                <div className='flex flex-row '>
                                  <button
                                    onClick={() =>
                                      handleOpenEditarProtector(protector)
                                    }
                                  >
                                    <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                      <Icon
                                        svgName='ib_editar'
                                        className='h-3 mx-1'
                                      />
                                    </div>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleOpenEliminarProtector(protector)
                                    }
                                  >
                                    <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                      <Icon
                                        svgName='ib_eliminar'
                                        className='h-3 mx-1'
                                      />
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
                    <h2 className='font-semibold text-center mx-auto text-sm'>
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
                    <ol style={{ listStyleType: 'number' }} className='pl-6'>
                      <div className='border-2 border-gray-500 rounded-md'>
                        {centralistas.length > 0 ? (
                          centralistas.map((centralista, index) => (
                            <li
                              key={index}
                              className='pl-2 border-b-2 border-gray-500'
                            >
                              <div className='flex flex-row justify-between'>
                                <p className='font-semibold text-xs'>
                                  {centralista}
                                </p>
                                <div className='flex flex-row'>
                                  <button
                                    onClick={() =>
                                      handleOpenEditarCentralista(centralista)
                                    }
                                  >
                                    <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                      <Icon
                                        svgName='ib_editar'
                                        className='h-3 mx-1'
                                      />
                                    </div>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleOpenEliminarCentralista(centralista)
                                    }
                                  >
                                    <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                      <Icon
                                        svgName='ib_eliminar'
                                        className='h-3 mx-1'
                                      />
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
              <div className='flex mt-2'>
                {/* LEFT */}
                <div className='w-1/2'>
                  <div className='flex flex-row justify-between'>
                    <h2 className='font-semibold text-center mx-auto text-sm'>
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
                  <div className='ml-4'>
                    <ol>
                      {novedades.map((novedad, index) => (
                        <li key={index} className='my-1'>
                          <div className='grid grid-row-2 grid-cols-12 border-2 border-gray-700'>
                            <div className='item1 col-span-2 border-b-2'>
                              <div
                                className={
                                  novedad.estado === 1
                                    ? 'flex flex-col items-center text-[10px] border-r-2 text-red-500 font-bold h-full'
                                    : 'flex flex-col items-center text-[10px] border-r-2 text-green-500 font-bold'
                                }
                              >
                                <span>Creado</span>
                                <span>
                                  {format(
                                    new Date(novedad.created),
                                    'dd/MM/yyyy'
                                  )}
                                </span>
                                <span>
                                  {format(new Date(novedad.created), 'HH:mm')}
                                </span>
                              </div>
                            </div>
                            <div className='item2 col-span-9 border-b-2 text-xs text-center'>
                              {novedad.obs_creacion}
                            </div>
                            <div className='item3 border-b-2 border-l-2'>
                              <div className='flex items-center flex-col'>
                                <button
                                  onClick={() =>
                                    handleOpenEditarNovedad(novedad)
                                  }
                                  className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                                >
                                  <Icon
                                    svgName='ib_editar'
                                    className='h-3 my-1'
                                  />
                                </button>
                                <button
                                  onClick={() =>
                                    handleOpenEliminarNovedad(novedad)
                                  }
                                  className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                                >
                                  <Icon
                                    svgName='ib_eliminar'
                                    className='h-3 my-1'
                                  />
                                </button>
                                {novedad.obs_cierre === null && (
                                  <button
                                    onClick={() =>
                                      handleOpenCerrarNovedad(novedad)
                                    }
                                    className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                                  >
                                    <Icon
                                      svgName='ib_cerrar'
                                      className='h-3 my-1'
                                    />
                                  </button>
                                )}
                              </div>
                            </div>
                            {novedad.obs_cierre && (
                              <>
                                <div className='item-4 col-span-2'>
                                  <div className='flex flex-col items-center text-[10px] border-r-2 text-green-500 font-bold'>
                                    <span>Cerrado</span>
                                    <span>
                                      {format(
                                        new Date(novedad.fecha_obs_cierre),
                                        'dd/MM/yyyy'
                                      )}
                                    </span>
                                    <span>
                                      {format(
                                        new Date(novedad.fecha_obs_cierre),
                                        'HH:mm'
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className='item-5 col-span-9 text-xs text-center'>
                                  {novedad.obs_cierre}
                                </div>
                                <div className='item-6 col-span-1 border-l-2'>
                                  <div className='flex items-center flex-col mt-3'>
                                    <button
                                      onClick={() =>
                                        handleOpenEditarNovedadCerrada(novedad)
                                      }
                                      className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                                    >
                                      <Icon
                                        svgName='ib_editar'
                                        className='h-3 my-1'
                                      />
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
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
                  {/* CIERRE DE NOVEDAD MODAL */}
                  <CrearEditarModalGenerico
                    tipoModal='actualizarTextArea'
                    openModal={openModalCerrarNovedad}
                    handleClose={handleCloseCerrarNovedad}
                    tituloModal='Crear cierre de Novedad Especial'
                    descripcionModal='Escriba una observación para cerar la novedad especial:'
                    handleAction={handleCerrarNovedad}
                  />
                  {/* EDITAR NOVEDAD CERRADA MODAL */}
                  <CrearEditarModalGenerico
                    tipoModal='actualizarTextArea'
                    openModal={openModalEditarNovedadCerrada}
                    handleClose={handleCloseEditarNovedadCerrada}
                    tituloModal='Editar cierre de Novedad Especial'
                    descripcionModal='Edite el cierre de la novedad especial:'
                    handleAction={handleEditarNovedadCerrada}
                    itemSeleccionado={observacionNovedadSeleccionada}
                  />
                </div>

                {/* RIGHT */}
                <div className='w-1/2'>
                  <div className='flex flex-row justify-between'>
                    <h2 className='font-semibold text-center mx-auto text-sm'>
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
                          <div className='grid grid-row-2 grid-cols-12 border-2 border-gray-700'>
                            <div className='item1 col-span-2 border-b-2'>
                              <div
                                className={
                                  consigna.estado === 1
                                    ? 'flex flex-col items-center text-[10px] border-r-2 text-red-500 font-bold h-full'
                                    : 'flex flex-col items-center text-[10px] border-r-2 text-green-500 font-bold'
                                }
                              >
                                <span>Creado</span>
                                <span>
                                  {format(
                                    new Date(consigna.created),
                                    'dd/MM/yyyy'
                                  )}
                                </span>
                                <span>
                                  {format(new Date(consigna.created), 'HH:mm')}
                                </span>
                              </div>
                            </div>
                            <div className='item2 col-span-9 border-b-2 text-xs text-center'>
                              {consigna.obs_creacion}
                            </div>
                            <div className='item3 border-b-2 border-l-2'>
                              <div className='flex items-center flex-col '>
                                <button
                                  onClick={() =>
                                    handleOpenEditarConsigna(consigna)
                                  }
                                  className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                                >
                                  <Icon
                                    svgName='ib_editar'
                                    className='h-3 my-1'
                                  />
                                </button>
                                <button
                                  onClick={() =>
                                    handleOpenEliminarConsigna(consigna)
                                  }
                                  className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                                >
                                  <Icon
                                    svgName='ib_eliminar'
                                    className='h-3 my-1'
                                  />
                                </button>
                                {consigna.obs_cierre === null && (
                                  <button
                                    onClick={() =>
                                      handleOpenCerrarConsigna(consigna)
                                    }
                                    className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                                  >
                                    <Icon
                                      svgName='ib_cerrar'
                                      className='h-3 my-1'
                                    />
                                  </button>
                                )}
                              </div>
                            </div>
                            {consigna.obs_cierre && (
                              <>
                                <div className='item-4 col-span-2'>
                                  <div className='flex flex-col items-center text-[10px] border-r-2 text-green-500 font-bold'>
                                    <span>Cerrado</span>
                                    <span>
                                      {format(
                                        new Date(consigna.fecha_obs_cierre),
                                        'dd/MM/yyyy'
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
                                <div className='item-5 col-span-9 text-xs text-center'>
                                  {consigna.obs_cierre}
                                </div>
                                <div className='item-6 col-span-1 border-l-2'>
                                  <div className='flex items-center flex-col mt-3'>
                                    <button
                                      onClick={() =>
                                        handleOpenEditarConsignaCerrada(
                                          consigna
                                        )
                                      }
                                      className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                                    >
                                      <Icon
                                        svgName='ib_editar'
                                        className='h-3 my-1'
                                      />
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
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
                {/* EDITAR CONSIGNA CERRADA MODAL */}
                <CrearEditarModalGenerico
                  tipoModal='actualizarTextArea'
                  openModal={openModalEditarConsignaCerrada}
                  handleClose={handleCloseEditarConsignaCerrada}
                  tituloModal='Editar cierre de Consigna Especial'
                  descripcionModal='Edite el cierre de la consigna especial:'
                  handleAction={handleEditarConsignaCerrada}
                  itemSeleccionado={observacionConsignaSeleccionada}
                />
              </div>

              {/* FOOTER SECTION */}
              <div className='flex justify-end items-end mt-1 h-full'>
                <div className='border-2 w-full'>
                  <div className='flex border-b-2 border-gray-500'>
                    <div className='p-1 w-1/2 border-r-2 border-gray-500 font-semibold text-sm'>
                      <p>CENTRALISTA DE OPERACIONES SALIENTE:</p>
                      <p className='text-blue-800'>{agenteSaliente}</p>
                    </div>

                    <div className='w-1/2 font-semibold p-1 text-sm'>
                      <p>CENTRALISTA DE OPERACIONES ENTRANTE:</p>
                      <p className='text-blue-800'>{agenteEntrante}</p>
                    </div>
                  </div>

                  <div className='flex text-sm'>
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
          </div>
          <button onClick={() => handleSiguienteInforme()}>
            <Icon
              svgName='ib_flechader'
              className='h-14 mx-14 text-gray-400 hover:cursor-pointer'
            />
          </button>
          <div className='mx-14 text-gray-400 self-end'>
            <button
              className='self-end bg-blue-900 px-10 py-2 text-white rounded-lg hover:bg-blue-800'
              onClick={() => handleSalir()}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditRecepcion
