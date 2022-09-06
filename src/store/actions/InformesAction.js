import { types } from '../actionTypes'
import { httpRequest } from '../../config'

import { setToast } from './ToastAction'
import ProgressBar from '@badrap/bar-of-progress'

const progress = new ProgressBar({
  size: 4,
  color: 'blue',
})

export const getInformeTrs = (enlacePaginacion = '/informetrs/') => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.GET_INFORMETRS_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })

      const result = respuesta.data
      console.log(result, 'result informe')
      dispatch({ type: types.GET_INFORMETRS_SUCCESS, payload: result })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_INFORMETRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const deleteInformeTRSAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.DELETE_INFORMETRS_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.delete('/informetrs/', {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      })

      const result = respuesta.data

      dispatch({ type: types.DELETE_INFORMETRS_SUCCESS, payload: result })
      dispatch(setToast('success', 'Informe eliminado correctamente'))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.DELETE_INFORMETRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const crudPersonalActaAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CRUD_PERSONAL_ACTA_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.patch('/informetrs/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CRUD_PERSONAL_ACTA_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CRUD_PERSONAL_ACTA_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const createNovedadTRSAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CREATE_NOVEDADTRS_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.post('/novedadtrs/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CREATE_NOVEDADTRS_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CREATE_NOVEDADTRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const updateNovedadTRSAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.UPDATE_NOVEDADTRS_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.patch('/novedadtrs/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.UPDATE_NOVEDADTRS_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.UPDATE_NOVEDADTRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const deleteNovedadTRSAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.DELETE_NOVEDADTRS_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.delete('/novedadtrs/', {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      })

      const result = respuesta.data
      dispatch({ type: types.DELETE_NOVEDADTRS_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.DELETE_NOVEDADTRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const createConsignaTRSAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CREATE_CONSIGNATRS_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.post('/consignatrs/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CREATE_CONSIGNATRS_SUCCESS, payload: result })
      dispatch(setToast('success', 'Consigna ingresada correctamente'))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CREATE_CONSIGNATRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const updateConsignaTRSAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.UPDATE_CONSIGNATRS_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.patch('/consignatrs/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.UPDATE_CONSIGNATRS_SUCCESS, payload: result })
      dispatch(setToast('success', 'Consigna actualizada correctamente'))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.UPDATE_CONSIGNATRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const deleteConsignaTRSAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.DELETE_CONSIGNATRS_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.delete('/consignatrs/', {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      })

      const result = respuesta.data
      dispatch({ type: types.DELETE_CONSIGNATRS_SUCCESS, payload: result })
      dispatch(setToast('success', 'Consigna eliminada correctamente'))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.DELETE_CONSIGNATRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const cerrarConsignaTRSAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CERRAR_CONSIGNATRS_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.put('/consignatrs/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CERRAR_CONSIGNATRS_SUCCESS, payload: result })
      dispatch(setToast('success', 'Consigna cerrada correctamente'))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CERRAR_CONSIGNATRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const getHistorialMovimientosAction = (
  enlacePaginacion = '/controlmovimiento/'
) => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.GET_HISTORIAL_MOVIMIENTOS_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(enlacePaginacion, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({
        type: types.GET_HISTORIAL_MOVIMIENTOS_SUCCESS,
        payload: result,
      })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_HISTORIAL_MOVIMIENTOS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}
