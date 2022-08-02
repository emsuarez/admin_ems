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
      console.log(error)
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
      console.log(error)
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
