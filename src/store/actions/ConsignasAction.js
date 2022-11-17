import { types } from '../actionTypes'

import ProgressBar from '@badrap/bar-of-progress'
import { httpRequest } from '../../config'
import { setToast } from './ToastAction'

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

export function obtenerConsignasGrafica(id, tipo) {
  return async dispatch => {
    try {
      progress.start()
      if (tipo === 'trs') {
        dispatch(comenzarDescargaConsignasGrafica(id))
      } else {
        dispatch(comenzarDescargaConsignasGraficaCctv(id))
      }

      const token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(`/grafica/?tipo=${id || 1}`, {
        headers: { Authorization: Token },
      })
      const result = respuesta.data.datos

      if (tipo === 'trs') {
        dispatch(comenzarDescargaConsignasGraficaExitosa(result.trs))
      } else {
        dispatch(comenzarDescargaConsignasGraficaExitosaCctv(result.cctv))
      }

      progress.finish()
    } catch (error) {
      if (tipo === 'trs') {
        dispatch(comenzarDescargaConsignasGraficaError(true))
      } else {
        dispatch(comenzarDescargaConsignasGraficaErrorCctv(true))
      }
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

const comenzarDescargaConsignasGraficaCctv = id => ({
  type: types.GET_CONSIGNASGRAFICACCTV_START,
  payload: id,
})

const comenzarDescargaConsignasGraficaExitosaCctv = consignas => ({
  type: types.GET_CONSIGNASGRAFICACCTV_SUCCESS,
  payload: consignas,
})

const comenzarDescargaConsignasGraficaErrorCctv = estado => ({
  type: types.GET_CONSIGNASGRAFICACCTV_FAILED,
  payload: estado,
})

// Seleeccion y cierre de consignas
export function cerrarConsignacTrsAction(consignaTrs, observacionCierre) {
  return async dispatch => {
    try {
      dispatch(obtenerConsignaTrsCerrar(consignaTrs))
      progress.start()
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

export const cerrarConsignacCctvAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CERRAR_CONSIGNACCTV_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token

      const respuesta = await httpRequest.put(`/consignacctv/`, data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CERRAR_CONSIGNACCTV_SUCCESS, payload: data })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CERRAR_CONSIGNACCTV_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

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
