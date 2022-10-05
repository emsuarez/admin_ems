import { types } from '../actionTypes'

import ProgressBar from '@badrap/bar-of-progress'
import { httpRequest } from '../../config'

const progress = new ProgressBar({
  size: 4,
  color: 'blue',
})

export function obtenerConsignasCCTVAction(
  enlacePaginacion = '/consignacctv/?id=0'
) {
  return async dispatch => {
    try {
      dispatch(comenzarDescargaConsignasCCTV())
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })

      progress.finish()
      dispatch(comenzarDescargaConsignasCCTVExitosa(respuesta.data))
    } catch (error) {
      console.log(error, 'DESCARGA CONSIGNAS CCTV ERROR')
      dispatch(comenzarDescargaConsignasCCTVError(true))
    }
  }
}

const comenzarDescargaConsignasCCTV = () => ({
  type: types.GET_CONSIGNASCCTV_START,
  payload: true,
})

const comenzarDescargaConsignasCCTVExitosa = consignas => ({
  type: types.GET_CONSIGNASCCTV_SUCCESS,
  payload: consignas,
})

const comenzarDescargaConsignasCCTVError = estado => ({
  type: types.GET_CONSIGNASCCTV_FAILED,
  payload: estado,
})

export function obtenerConsignasTRSAction(
  enlacePaginacion = '/consignatrs/?id=0'
) {
  return async dispatch => {
    try {
      dispatch(comenzarDescargaConsignasTRS())
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })

      progress.finish()
      dispatch(comenzarDescargaConsignasTRSExitosa(respuesta.data))
    } catch (error) {
      console.log(error, 'DESCARGA CONSIGNAS TRS ERROR')
      dispatch(comenzarDescargaConsignasTRSError(true))
    }
  }
}

const comenzarDescargaConsignasTRS = () => ({
  type: types.GET_CONSIGNASTRS_START,
  payload: true,
})

const comenzarDescargaConsignasTRSExitosa = consignas => ({
  type: types.GET_CONSIGNASTRS_SUCCESS,
  payload: consignas,
})

const comenzarDescargaConsignasTRSError = estado => ({
  type: types.GET_CONSIGNASTRS_FAILED,
  payload: estado,
})

export function obtenerConsignasGrafica(id) {
  return async dispatch => {
    try {
      progress.start()
      dispatch(comenzarDescargaConsignasGrafica(id))
      const token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(`/grafica/?tipo=${id || 1}`, {
        headers: { Authorization: Token },
      })
      const result = respuesta.data

      dispatch(comenzarDescargaConsignasGraficaExitosa(result))
      progress.finish()
    } catch (error) {
      console.log(error, 'DESCARGA CONSIGNAS GRAFICA ERROR')
      dispatch(comenzarDescargaConsignasGraficaError(true))
      progress.finish()
    }
  }
}

const comenzarDescargaConsignasGrafica = id => ({
  type: types.GET_CONSIGNASGRAFICA_START,
  payload: id,
})

const comenzarDescargaConsignasGraficaExitosa = consignas => ({
  type: types.GET_CONSIGNASGRAFICA_SUCCESS,
  payload: consignas,
})

const comenzarDescargaConsignasGraficaError = estado => ({
  type: types.GET_CONSIGNASGRAFICA_FAILED,
  payload: estado,
})

// Seleeccion y cierre de consignas
export function cerrarConsignacTrsAction(consignaTrs, observacionCierre) {
  return async dispatch => {
    try {
      dispatch(obtenerConsignaTrsCerrar(consignaTrs))
      progress.start()
      console.log(consignaTrs, 'CONSIGNACERRARCTRS')
      const token = window.localStorage.getItem('token')
      const Token = 'Token ' + token

      const consignaCerrar = {
        id: consignaTrs.id,
        estado: observacionCierre,
      }

      await httpRequest.put(`/consignatrs/`, consignaCerrar, {
        headers: { Authorization: Token },
      })

      dispatch(cerrarConsignaTrsExitosa())
      progress.finish()
    } catch (error) {
      console.log(error, 'CERRAR CONSIGNAS TRS ERROR')
      dispatch(cerrarConsignaTrsError(true))
      progress.finish()
    }
  }
}

const obtenerConsignaTrsCerrar = consignaTrs => ({
  type: types.GET_CONSIGNACERRARCTRS_START,
  payload: consignaTrs,
})

const cerrarConsignaTrsExitosa = () => ({
  type: types.CONSIGNACERRARTRS_SUCCESS,
})

const cerrarConsignaTrsError = estado => ({
  type: types.CONSIGNACERRARTRS_FAILED,
  payload: estado,
})

export function cerrarConsignacCctvAction(consignaCctv, observacionCierre) {
  return async dispatch => {
    try {
      dispatch(obtenerConsignaCctvCerrar(consignaCctv))
      progress.start()
      console.log(consignaCctv, 'CONSIGNACERRARCCTV')
      const token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const consignaCerrar = {
        id: consignaCctv.id,
        estado: observacionCierre,
      }
      await httpRequest.put(`/consignacctv/`, consignaCerrar, {
        headers: { Authorization: Token },
      })
      dispatch(cerrarConsignaCctvExitosa())
      progress.finish()
    } catch (error) {
      console.log(error, 'CERRAR CONSIGNAS CCTV ERROR')
      dispatch(cerrarConsignaCctvError(true))
      progress.finish()
    }
  }
}

const obtenerConsignaCctvCerrar = consignaCctv => ({
  type: types.GET_CONSIGNACERRARCCTV_START,
  payload: consignaCctv,
})

const cerrarConsignaCctvExitosa = () => ({
  type: types.CONSIGNACERRARCCTV_SUCCESS,
})

const cerrarConsignaCctvError = estado => ({
  type: types.CONSIGNACERRARCCTV_FAILED,
  payload: estado,
})

export function obtenerNovedadesCCTVAction(
  enlacePaginacion = '/novedadcctv/?id=0'
) {
  return async dispatch => {
    try {
      dispatch(obtenerNovedadesCCTV())
      progress.start()
      const token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })
      const result = respuesta.data
      dispatch(obtenerNovedadesCCTVExitosa(result))
      progress.finish()
    } catch (error) {
      console.log(error, 'DESCARGA NOVEDADES CCTV ERROR')
      dispatch(obtenerNovedadesCCTVError(true))
      progress.finish()
    }
  }
}

const obtenerNovedadesCCTV = () => ({
  type: types.GET_NOVEDADESCCTV_START,
})

const obtenerNovedadesCCTVExitosa = novedades => ({
  type: types.GET_NOVEDADESCCTV_SUCCESS,
  payload: novedades,
})

const obtenerNovedadesCCTVError = estado => ({
  type: types.GET_NOVEDADESCCTV_FAILED,
  payload: estado,
})

export function obtenerNovedadesTRSAction(
  enlacePaginacion = '/novedadtrs/?id=0'
) {
  return async dispatch => {
    try {
      console.log(enlacePaginacion, 'ENLACE PAGINACION')
      dispatch(comenzarDescargaNovedadesTRS())
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })

      dispatch(comenzarDescargaNovedadesTRSExitosa(respuesta.data))
      progress.finish()
    } catch (error) {
      console.log(error, 'DESCARGA NOVEDADES TRS ERROR')
      dispatch(comenzarDescargaNovedadesTRSError(true))
    }
  }
}

const comenzarDescargaNovedadesTRS = () => ({
  type: types.GET_NOVEDADESTRS_START,
  payload: true,
})

const comenzarDescargaNovedadesTRSExitosa = novedades => ({
  type: types.GET_NOVEDADESTRS_SUCCESS,
  payload: novedades,
})

const comenzarDescargaNovedadesTRSError = estado => ({
  type: types.GET_NOVEDADESTRS_FAILED,
  payload: estado,
})
