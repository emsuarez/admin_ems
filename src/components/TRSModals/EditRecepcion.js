import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Header, ICONS, RedirectWithoutLogin } from '../../components'
import CrearEditarModalGenerico from './CrearEditarModalGenerico'
import EliminarModalGenerico from './EliminarModalGenerico'

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
  updateConsignaTRSAction,
  updateNovedadTRSAction,
} from '../../store/actions'
import AlertOperadorCierre from '../alerts/AlertOperadorCierre'
import ConsignasNovedades from '../Informes/ConsignasNovedades'

const EditRecepcion = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const actaSeleccionada = useSelector(state => state.informes.actaSeleccionada)

  const consignasNovedadesPendientes = useSelector(
    state => state.informes.consignasNovedadesPendientes
  )
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

  const [openModalAgregarOperadorCierre, setOpenModalAgregarOperadorCierre] =
    useState(false)

  const tipo = window.localStorage.getItem('tipo')

  const [personalSeleccionable, setPersonalSeleccionable] = useState([])
  //#endregion

  const protectoresState = useSelector(state => state.recursos.allProtectores)
  const usuariosState = useSelector(state => state.auth.allUsers)
  const novedadesState = useSelector(state => state.informes.novedadesState)

  useEffect(() => {
    dispatch(getInformeTrsById(location.state))
    dispatch(getNovedadesConsignasTrsPendientes())
    dispatch(getAllProtectoresAction())
    dispatch(getAllUsersReportAction())
    const obtenerInfoVista = () => {
      if (actaSeleccionada) {
        if (Object.keys(actaSeleccionada).length > 0) {
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
          const fechaActual = new Date()
          const fechaActaSeleccionada = new Date(actaSeleccionada.created)
          fechaActual.setHours(0, 0, 0, 0)
          fechaActaSeleccionada.setHours(0, 0, 0, 0)

          // if (
          //   consignasNovedadesPendientes.consignas &&
          //   fechaActaSeleccionada.getTime() == fechaActual.getTime()
          // ) {
          //   setConsignas([
          //     ...consignasNovedadesPendientes.consignas,
          //     ...actaSeleccionada.trsconsigna,
          //   ])
          // } else {
          setConsignas(actaSeleccionada.trsconsigna || [])
          // }

          // if (
          //   consignasNovedadesPendientes.novedades &&
          //   fechaActaSeleccionada.getTime() == fechaActual.getTime()
          // ) {
          //   setNovedades([
          //     ...consignasNovedadesPendientes.novedades,
          //     ...actaSeleccionada.trsnovedad,
          //   ])
          // } else {
          setNovedades(actaSeleccionada.trsnovedad || [])
          // }
          setAgenteSaliente(actaSeleccionada.agente_saliente || '')
          setAgenteEntrante(actaSeleccionada.agente_entrante || '')
        }
      }
    }

    obtenerInfoVista()
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

      const personalCompleto = [...nuevoProtectores, ...nuevoUsuarios]

      setPersonalSeleccionable(personalCompleto)
    }
  }, [protectoresState, usuariosState])

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
      fecha_obs_cierre: null,
      obs_cierre: null,
      created: new Date(),
      estado: 1,
    }

    dispatch(createNovedadTRSAction(newNovedad))

    setNovedades([...novedades, newNovedad])
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
      fecha_obs_cierre: null,
      obs_cierre: null,
      created: new Date(),
      estado: 1,
    }

    dispatch(createConsignaTRSAction(newConsigna))

    setConsignas([...consignas, newConsigna])
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
      id: consignaSeleccionada.id,
      informe_trs_id: actaSeleccionada.id,
      obs_creacion: consigna,
      obs_cierre: consignaSeleccionada.obs_cierre,
      estado: consignaSeleccionada.estado,
    }

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

  const handleInformeAnterior = () => {
    dispatch(getInformeTrsNavegacion(actaSeleccionada.id, 0))
  }

  const handleSiguienteInforme = () => {
    dispatch(getInformeTrsNavegacion(actaSeleccionada.id, 1))
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
      nombre_saliente: `${operador.first_name} ${operador.last_name}`,
    }

    dispatch(cerrarInformeTrs(operadorCierre))
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
                  CENTRAL DE OPERACIONES:{' '}
                  {actaSeleccionada && actaSeleccionada.turno === 1
                    ? 'DIURNO'
                    : 'NOCTURNO'}
                  <span className='text-blue-800 ml-2'>{agenteSaliente}</span>
                </p>
                <p className='font-semibold text-sm'>
                  FECHA:{' '}
                  {actaSeleccionada.created &&
                    actaSeleccionada.created.split(' ')[0]}
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
                              {openModalEditarProtector && (
                                <CrearEditarModalGenerico
                                  tipoModal='actualizar'
                                  openModal={openModalEditarProtector}
                                  handleClose={handleCloseEditarProtector}
                                  tituloModal='Editar personal de Grupo de protección Guardia'
                                  descripcionModal='Edite el nombre del agente:'
                                  handleAction={handleEditarProtector}
                                  itemSeleccionado={protectorSeleccionado}
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
                        {openModalEditarCentralista && (
                          <CrearEditarModalGenerico
                            tipoModal='actualizar'
                            openModal={openModalEditarCentralista}
                            handleClose={handleCloseEditarCentralista}
                            tituloModal='Editar personal de Grupo de trabajo'
                            descripcionModal='Edite el nombre del agente:'
                            handleAction={handleEditarCentralista}
                            itemSeleccionado={centralistaSeleccionado}
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
                  {novedades && novedades.length > 0 && (
                    <ConsignasNovedades
                      lista={novedades}
                      handleOpenEditar={handleOpenEditarNovedad}
                      handleOpenEliminar={handleOpenEliminarNovedad}
                      handleOpenCerrarItem={handleOpenCerrarNovedad}
                      handleOpenEditarItemCerrado={
                        handleOpenEditarNovedadCerrada
                      }
                    />
                  )}
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
                  {consignas && consignas.length > 0 && (
                    <ConsignasNovedades
                      lista={consignas}
                      handleOpenEditar={handleOpenEditarConsigna}
                      handleOpenEliminar={handleOpenEliminarConsigna}
                      handleOpenCerrarItem={handleOpenCerrarConsigna}
                      handleOpenEditarItemCerrado={
                        handleOpenEditarConsignaCerrada
                      }
                    />
                  )}
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
                      <p className='text-blue-800'>{agenteSaliente}</p>
                    </div>

                    <div className='w-1/2 font-semibold p-1 text-sm flex justify-between'>
                      <div>
                        <p>CENTRALISTA DE OPERACIONES ENTRANTE:</p>
                        <p className='text-blue-800'>{agenteEntrante}</p>
                      </div>

                      <img
                        src={
                          require('../../assets/cerrar-sesion 2.svg').default
                        }
                        alt='mySvgImage'
                        className='hover: cursor-pointer hover:bg-gray-200 rounded-md'
                        onClick={handleOpenModalAgregarOperadorCierre}
                      />
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
