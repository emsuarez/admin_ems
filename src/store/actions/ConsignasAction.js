import { types } from '../actionTypes'

import { httpRequest } from '../../config'
import ProgressBar from '@badrap/bar-of-progress'

const progress = new ProgressBar({
  size: 4,
  color: 'blue',
})

export function obtenerConsignasCCTVAction() {
  return async dispatch => {
    try {
      dispatch(comenzarDescargaConsignasCCTV())
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get('/consignacctv/?id=0', {
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

export function obtenerConsignasTRSAction() {
  return async dispatch => {
    try {
      dispatch(comenzarDescargaConsignasTRS())
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get('/consignatrs/?id=0', {
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
      dispatch(comenzarDescargaConsignasGrafica(id))
      progress.start()
      const token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(`/grafica/?tipo=${id || 1}`, {
        headers: { Authorization: Token },
      })
      const result = respuesta.data
      console.log(result, 'resultado consignasgrafica')
      progress.finish()
      dispatch(comenzarDescargaConsignasGraficaExitosa(result))
    } catch (error) {
      progress.finish()
      console.log(error, 'DESCARGA CONSIGNAS GRAFICA ERROR')
      dispatch(comenzarDescargaConsignasGraficaError(true))
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
