import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Header, ICONS, RedirectWithoutLogin } from '../../components'
import CrearEditarModalGenerico from './CrearEditarModalGenerico'
import EliminarModalGenerico from './EliminarModalGenerico'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import Icon from '../../assets/Icon'
import {
  cerrarConsignaTRSAction,
  cerrarInformeTrs,
  cerrarNovedadTRSAction,
  createConsignaTRSAction,
  createNovedadTRSAction,
  crudPersonalActaAction,
  deleteConsignaTRSAction,
  deleteNovedadTRSAction,
  getAllProtectoresAction,
  getAllUsersReportAction,
  getInformeTrsById,
  getInformeTrsNavegacion,
  getNovedadesConsignasTrsPendientes,
  setToast,
  updateConsignaTRSAction,
  updateNovedadTRSAction,
} from '../../store/actions'
import AlertOperadorCierre from '../alerts/AlertOperadorCierre'
import ConsignasNovedades from '../Informes/ConsignasNovedades'

const EditRecepcion = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const ultimaActaCreada = useSelector(
    state => state.informes.informesTrs.results[0]
  )

  const actaSeleccionada = useSelector(state => state.informes.actaSeleccionada)
  const {
    agente_saliente,
    agente_entrante,
    protectores,
    centralistas,
    trsconsigna,
    turno,
    trsnovedad,
    created,
  } = actaSeleccionada || {}

  const consignasNovedadesPendientesTrs = useSelector(
    state => state.informes.consignasNovedadesPendientes
  )
  const { consignas, novedades } = consignasNovedadesPendientesTrs || {}

  // #region STATE_INICIAL

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

  const [openModalAgregarOperadorCierre, setOpenModalAgregarOperadorCierre] =
    useState(false)

  const tipo = window.localStorage.getItem('tipo')

  const [personalSeleccionable, setPersonalSeleccionable] = useState([])
  //#endregion

  const protectoresState = useSelector(state => state.recursos.allProtectores)
  const usuariosState = useSelector(state => state.auth.allUsers)

  useEffect(() => {
    const cargarDatos = () => {
      dispatch(getInformeTrsById(location.state))
      dispatch(getNovedadesConsignasTrsPendientes())
      dispatch(getAllProtectoresAction())
      dispatch(getAllUsersReportAction())
    }
    cargarDatos()
  }, [])

  useEffect(() => {
    if (protectoresState && usuariosState) {
      const nuevoProtectores = protectoresState.results?.map(persona => {
        return {
          id: persona.id + new Date().getTime(),
          nombres: persona.nombres,
        }
      })
      const nuevoUsuarios = usuariosState.results?.map(usuario => {
        return {
          id: usuario.user_id + new Date().getTime(),
          nombres: `${usuario.first_name} ${usuario.last_name}`,
        }
      })

      const personalCompleto = nuevoProtectores &&
        nuevoUsuarios && [...nuevoProtectores, ...nuevoUsuarios]

      setPersonalSeleccionable(personalCompleto)
    }
  }, [protectoresState, usuariosState])

  // #region CRUD_PROTECTORES
  const handleOpenAgregarProtector = () => {
    const prevProtectores = protectores?.split(',')?.map(protector => {
      return protector.trim()
    })
    if (prevProtectores.length > 4) {
      dispatch(setToast('error', 'Alcanzo el limite maximo protectores'))
      return
    }
    setOpenModalAgregarProtector(true)
  }

  const handleCloseAgregarProtector = () => {
    setOpenModalAgregarProtector(false)
  }

  const handleAgregarProtector = protector => {
    setOpenModalAgregarProtector(false)
    const prevProtectores = protectores?.split(',')?.map(protector => {
      return protector.trim()
    })

    const newProtector = {
      id: actaSeleccionada.id,
      protectores: prevProtectores
        ? String([...prevProtectores, protector])
        : protector,
      centralistas: actaSeleccionada.centralistas,
      observacion: actaSeleccionada.observacion,
    }

    dispatch(crudPersonalActaAction(newProtector))
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
        protectores
          ?.split(',')
          ?.map(p => (p === protectorSeleccionado ? protector : p))
      ),
      centralistas: actaSeleccionada.centralistas,
      observacion: actaSeleccionada.observacion,
    }

    dispatch(crudPersonalActaAction(protectorEditado))
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
      protectores: String(
        protectores?.split(',')?.filter(p => p !== protectorSeleccionado)
      ),
      centralistas: actaSeleccionada.centralistas,
      observacion: actaSeleccionada.observacion,
    }

    dispatch(crudPersonalActaAction(protectorEliminado))
  }
  //#endregion

  // #region CRUD_CENTRALISTAS
  const handleOpenAgregarCentralista = () => {
    const prevCentralistas = centralistas?.split(',')?.map(cent => {
      return cent.trim()
    })
    if (prevCentralistas.length > 4) {
      dispatch(setToast('error', 'Alcanzo el limite maximo centralistas'))
      return
    }
    setOpenModalAgregarCentralista(true)
  }

  const handleCloseAgregarCentralista = () => {
    setOpenModalAgregarCentralista(false)
  }

  const handleAgregarCentralista = centralista => {
    setOpenModalAgregarCentralista(false)
    const prevCentralistas = centralistas?.split(',')?.map(cent => {
      return cent.trim()
    })

    const newCentralista = {
      id: actaSeleccionada.id,
      protectores: actaSeleccionada.protectores,
      centralistas: prevCentralistas
        ? String([...prevCentralistas, centralista])
        : centralista,
      observacion: actaSeleccionada.observacion,
    }

    dispatch(crudPersonalActaAction(newCentralista))
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
        centralistas
          ?.split(',')
          ?.map(c => (c === centralistaSeleccionado ? centralista : c))
      ),
      observacion: actaSeleccionada.observacion,
    }

    dispatch(crudPersonalActaAction(centralistaEditado))
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

    dispatch(crudPersonalActaAction(centralistaEliminado))
  }
  //#endregion

  // #region CRUD_NOVEDADES
  const handleOpenAgregarNovedad = () => {
    if (trsnovedad.length > 13) {
      dispatch(
        setToast('Error', 'Se ha alcanzado el límite máximo de novedades')
      )
      return
    }
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
      fecha_obs_cierre: null,
      obs_cierre: null,
      created: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      estado: 1,
    }

    dispatch(createNovedadTRSAction(newNovedad))
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

    dispatch(updateNovedadTRSAction(novedadEditada))
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
      ...novedadSeleccionada,
      informe_trs_id: actaSeleccionada.id,
      obs_cierre: novedad,
    }

    dispatch(updateNovedadTRSAction(novedadEditada))
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
      ...novedadSeleccionada,
      informe_trs_id: actaSeleccionada.id,
      obs_cierre: novedad,
      estado: 0,
    }

    dispatch(cerrarNovedadTRSAction(novedadCerrada))
  }
  //#endregion

  // #region CRUD_CONSIGNAS
  const handleOpenAgregarConsigna = () => {
    if (trsconsigna.length > 13) {
      dispatch(
        setToast('Error', 'Se ha alcanzado el límite máximo de consignas')
      )
      return
    }
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
      fecha_obs_cierre: null,
      obs_cierre: null,
      created: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      estado: 1,
    }

    dispatch(createConsignaTRSAction(newConsigna))
  }

  const handleOpenEditarConsigna = consigna => {
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
      ...consignaSeleccionada,
      informe_trs_id: actaSeleccionada.id,
      obs_creacion: consigna,
    }

    dispatch(updateConsignaTRSAction(consignaEditada))
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
      ...consignaSeleccionada,
      informe_trs_id: actaSeleccionada.id,
      obs_cierre: consigna,
    }

    dispatch(updateConsignaTRSAction(consignaEditada))
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
      ...consignaSeleccionada,
      informe_trs_id: actaSeleccionada.id,
      obs_cierre: consigna,
      estado: 0,
    }

    dispatch(cerrarConsignaTRSAction(consignaCerrada))
  }

  // #endregion

  // #region FUNCIONES_ADICIONALES
  const handleSalir = () => {
    navigate(-1)
  }
  const listaInformesTrs = useSelector(state => state.informes.informesTrs)

  const handleInformeAnterior = () => {
    console.log(actaSeleccionada, 'acta anterior')
    if (
      actaSeleccionada.id !==
      listaInformesTrs.results[listaInformesTrs.results.length - 1].id
    ) {
      dispatch(getInformeTrsNavegacion(actaSeleccionada.id, 0))
    } else {
      dispatch(getInformeTrsById(listaInformesTrs.results[0].id))
    }
  }

  const handleSiguienteInforme = () => {
    console.log(actaSeleccionada, 'acta siguiente')
    if (actaSeleccionada.id !== listaInformesTrs.results[0].id) {
      dispatch(getInformeTrsNavegacion(actaSeleccionada.id, 1))
    } else {
      dispatch(
        getInformeTrsById(
          listaInformesTrs.results[listaInformesTrs.results.length - 1].id
        )
      )
    }
  }

  const componentRef = useRef()
  const handleGenerarInformePdf = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleOpenModalAgregarOperadorCierre = () => {
    setOpenModalAgregarOperadorCierre(true)
  }

  const handleCloseAgregarOperadorCierre = () => {
    setOpenModalAgregarOperadorCierre(false)
  }

  const handleAgregarOperadorCierre = operador => {
    setOpenModalAgregarOperadorCierre(false)
    const operadorCierre = {
      id: actaSeleccionada.id,
      username: operador.username,
      nombre_entrante: `${operador.first_name} ${operador.last_name}`,
    }

    dispatch(cerrarInformeTrs(operadorCierre))
  }

  const validarFecha = fecha => {
    const fechaActual = new Date().setHours(0, 0, 0, 0)
    const fechaValidar = new Date(fecha).setHours(0, 0, 0, 0)

    return fechaActual === fechaValidar
  }
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
          {tipo === '1' && (
            <button onClick={() => handleInformeAnterior()}>
              <Icon
                svgName='ib_flechaizq'
                className='h-14 mx-14 text-gray-400 hover:cursor-pointer'
              />
            </button>
          )}

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
                  CENTRAL DE OPERACIONES: {turno === 1 ? 'DIURNO' : 'NOCTURNO'}
                  <span className='text-blue-800 ml-2'>{agente_saliente}</span>
                </p>
                <p className='font-semibold text-sm'>
                  FECHA: {created?.split(' ')[0]}
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
                    {openModalAgregarProtector && (
                      <CrearEditarModalGenerico
                        tipoModal='agregarProtector'
                        openModal={openModalAgregarProtector}
                        handleClose={handleCloseAgregarProtector}
                        tituloModal='Crear personal de Protección Guardia'
                        descripcionModal='A continuación seleccione el nombre del agente:'
                        handleAction={handleAgregarProtector}
                        dataSeleccionable={personalSeleccionable}
                      />
                    )}
                  </div>

                  <div>
                    <ol style={{ listStyleType: 'number' }} className='pl-6'>
                      <div className='border-2 border-gray-500 rounded-md'>
                        {protectores?.length > 0 ? (
                          protectores?.split(',')?.map((protector, index) => (
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
                              {openModalEditarProtector && (
                                <CrearEditarModalGenerico
                                  tipoModal='agregarProtector'
                                  openModal={openModalEditarProtector}
                                  handleClose={handleCloseEditarProtector}
                                  tituloModal='Editar personal de Grupo de protección Guardia'
                                  descripcionModal='Edite el nombre del agente:'
                                  handleAction={handleEditarProtector}
                                  itemSeleccionado={protectorSeleccionado}
                                  dataSeleccionable={personalSeleccionable}
                                />
                              )}
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
                    {openModalAgregarCentralista && (
                      <CrearEditarModalGenerico
                        tipoModal='agregarTrabajador'
                        openModal={openModalAgregarCentralista}
                        handleClose={handleCloseAgregarCentralista}
                        tituloModal='Crear personal de Trabajo'
                        descripcionModal='A continuación seleccione el nombre del agente:'
                        handleAction={handleAgregarCentralista}
                        dataSeleccionable={personalSeleccionable}
                      />
                    )}
                  </div>
                  <div>
                    <ol style={{ listStyleType: 'number' }} className='pl-6'>
                      <div className='border-2 border-gray-500 rounded-md'>
                        {centralistas?.length > 0 ? (
                          centralistas
                            ?.split(',')
                            ?.map((centralista, index) => (
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
                                        handleOpenEliminarCentralista(
                                          centralista
                                        )
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
                        {openModalEditarCentralista && (
                          <CrearEditarModalGenerico
                            tipoModal='agregarTrabajador'
                            openModal={openModalEditarCentralista}
                            handleClose={handleCloseEditarCentralista}
                            tituloModal='Editar personal de Grupo de trabajo'
                            descripcionModal='Edite el nombre del agente:'
                            handleAction={handleEditarCentralista}
                            itemSeleccionado={centralistaSeleccionado}
                            dataSeleccionable={personalSeleccionable}
                          />
                        )}

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
                    {openModalAgregarNovedad && (
                      <CrearEditarModalGenerico
                        tipoModal='crearTextArea'
                        openModal={openModalAgregarNovedad}
                        handleClose={handleCloseAgregarNovedad}
                        tituloModal='Crear Novedad Especial'
                        descripcionModal='A continuación escriba la nueva novedad:'
                        handleAction={handleAgregarNovedad}
                      />
                    )}
                  </div>
                  {/* Novedades Pendientes */}
                  {novedades &&
                    ultimaActaCreada?.id === actaSeleccionada?.id && (
                      <ConsignasNovedades
                        lista={novedades?.filter(
                          n => !trsnovedad?.some(n2 => n.id == n2.id)
                        )}
                        handleOpenEditar={handleOpenEditarNovedad}
                        handleOpenEliminar={handleOpenEliminarNovedad}
                        handleOpenCerrarItem={handleOpenCerrarNovedad}
                        handleOpenEditarItemCerrado={
                          handleOpenEditarNovedadCerrada
                        }
                      />
                    )}
                  <ConsignasNovedades
                    lista={trsnovedad}
                    handleOpenEditar={handleOpenEditarNovedad}
                    handleOpenEliminar={handleOpenEliminarNovedad}
                    handleOpenCerrarItem={handleOpenCerrarNovedad}
                    handleOpenEditarItemCerrado={handleOpenEditarNovedadCerrada}
                  />

                  {openModalEditarNovedad && (
                    <CrearEditarModalGenerico
                      tipoModal='actualizarTextArea'
                      openModal={openModalEditarNovedad}
                      handleClose={handleCloseEditarNovedad}
                      tituloModal='Editar Novedad Especial'
                      descripcionModal='Edite la novedad especial:'
                      handleAction={handleEditarNovedad}
                      itemSeleccionado={observacionNovedadSeleccionada}
                    />
                  )}

                  <EliminarModalGenerico
                    openModal={openModalEliminarNovedad}
                    handleClose={handleCloseEliminarNovedad}
                    tituloModal='Eliminar Novedad Especial'
                    descripcionModal='Al eliminar una novedad, sera de forma definitiva y sin posiblidad de recuperación'
                    handleAction={handleEliminarNovedad}
                  />
                  {/* CIERRE DE NOVEDAD MODAL */}
                  {openModalCerrarNovedad && (
                    <CrearEditarModalGenerico
                      tipoModal='actualizarTextArea'
                      openModal={openModalCerrarNovedad}
                      handleClose={handleCloseCerrarNovedad}
                      tituloModal='Crear cierre de Novedad Especial'
                      descripcionModal='Escriba una observación para cerar la novedad especial:'
                      handleAction={handleCerrarNovedad}
                    />
                  )}

                  {/* EDITAR NOVEDAD CERRADA MODAL */}
                  {openModalEditarNovedadCerrada && (
                    <CrearEditarModalGenerico
                      tipoModal='actualizarTextArea'
                      openModal={openModalEditarNovedadCerrada}
                      handleClose={handleCloseEditarNovedadCerrada}
                      tituloModal='Editar cierre de Novedad Especial'
                      descripcionModal='Edite el cierre de la novedad especial:'
                      handleAction={handleEditarNovedadCerrada}
                      itemSeleccionado={observacionNovedadSeleccionada}
                    />
                  )}
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
                    {openModalAgregarConsigna && (
                      <CrearEditarModalGenerico
                        tipoModal='crearTextArea'
                        openModal={openModalAgregarConsigna}
                        handleClose={handleCloseAgregarConsigna}
                        tituloModal='Crear Consigna Especial'
                        descripcionModal='A continuación escriba la nueva consigna:'
                        handleAction={handleAgregarConsigna}
                      />
                    )}
                  </div>
                  {/* Consignas Pendientes */}
                  {consignas &&
                    ultimaActaCreada?.id === actaSeleccionada?.id && (
                      <ConsignasNovedades
                        lista={consignas?.filter(
                          c => !trsconsigna?.some(c2 => c.id == c2.id)
                        )}
                        handleOpenEditar={handleOpenEditarConsigna}
                        handleOpenEliminar={handleOpenEliminarConsigna}
                        handleOpenCerrarItem={handleOpenCerrarConsigna}
                        handleOpenEditarItemCerrado={
                          handleOpenEditarConsignaCerrada
                        }
                      />
                    )}

                  <ConsignasNovedades
                    lista={trsconsigna}
                    handleOpenEditar={handleOpenEditarConsigna}
                    handleOpenEliminar={handleOpenEliminarConsigna}
                    handleOpenCerrarItem={handleOpenCerrarConsigna}
                    handleOpenEditarItemCerrado={
                      handleOpenEditarConsignaCerrada
                    }
                  />
                </div>
                {openModalEditarConsigna && (
                  <CrearEditarModalGenerico
                    tipoModal='actualizarTextArea'
                    openModal={openModalEditarConsigna}
                    handleClose={handleCloseEditarConsigna}
                    tituloModal='Editar Consigna Especial'
                    descripcionModal='Edite la novedad especial:'
                    handleAction={handleEditarConsigna}
                    itemSeleccionado={observacionConsignaSeleccionada}
                  />
                )}

                <EliminarModalGenerico
                  openModal={openModalEliminarConsigna}
                  handleClose={handleCloseEliminarConsigna}
                  tituloModal='Eliminar Consigna Especial'
                  descripcionModal='Al eliminar una consigna, esta se eliminara con la observación de cierre de ser el caso, sera de forma definitiva y sin posiblidad de recuperación.'
                  handleAction={handleEliminarConsigna}
                />
                {/* CIERRE DE CONSIGNA MODAL */}
                {openModalCerrarConsigna && (
                  <CrearEditarModalGenerico
                    tipoModal='actualizarTextArea'
                    openModal={openModalCerrarConsigna}
                    handleClose={handleCloseCerrarConsigna}
                    tituloModal='Crear cierre de Consigna Especial'
                    descripcionModal='Escriba una observación para cerar la consigna especial:'
                    handleAction={handleCerrarConsigna}
                  />
                )}

                {/* EDITAR CONSIGNA CERRADA MODAL */}
                {openModalEditarConsignaCerrada && (
                  <CrearEditarModalGenerico
                    tipoModal='actualizarTextArea'
                    openModal={openModalEditarConsignaCerrada}
                    handleClose={handleCloseEditarConsignaCerrada}
                    tituloModal='Editar cierre de Consigna Especial'
                    descripcionModal='Edite el cierre de la consigna especial:'
                    handleAction={handleEditarConsignaCerrada}
                    itemSeleccionado={observacionConsignaSeleccionada}
                  />
                )}
              </div>

              {/* FOOTER SECTION */}
              <div className='flex justify-end items-end mt-1 h-full'>
                <div className='border-2 w-full'>
                  <div className='flex border-b-2 border-gray-500'>
                    <div className='p-1 w-1/2 border-r-2 border-gray-500 font-semibold text-sm'>
                      <p>CENTRALISTA DE OPERACIONES SALIENTE:</p>
                      <p className='text-blue-800'>{agente_saliente}</p>
                    </div>

                    <div className='w-1/2 font-semibold p-1 text-sm flex justify-between'>
                      <div>
                        <p>CENTRALISTA DE OPERACIONES ENTRANTE:</p>
                        <p className='text-blue-800'>
                          {agente_entrante || 'N/A'}
                        </p>
                      </div>
                      {validarFecha(created) && (
                        <img
                          src={
                            require('../../assets/cerrar-sesion 2.svg').default
                          }
                          alt='mySvgImage'
                          className='hover: cursor-pointer hover:bg-gray-200 rounded-md'
                          onClick={handleOpenModalAgregarOperadorCierre}
                        />
                      )}
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
              <AlertOperadorCierre
                openModal={openModalAgregarOperadorCierre}
                handleClose={handleCloseAgregarOperadorCierre}
                tituloModal='Operador entrante'
                descripcionModal='Seleccione el nombre del operador:'
                handleAction={handleAgregarOperadorCierre}
              />
            </div>
          </div>
          {tipo === '1' && (
            <button onClick={() => handleSiguienteInforme()}>
              <Icon
                svgName='ib_flechader'
                className='h-14 mx-14 text-gray-400 hover:cursor-pointer'
              />
            </button>
          )}

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
