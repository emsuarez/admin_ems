import { httpRequest } from '../../config'
import { types } from '../actionTypes'

import ProgressBar from '@badrap/bar-of-progress'
import { setToast } from './ToastAction'

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

      dispatch({ type: types.GET_INFORMETRS_SUCCESS, payload: result })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_INFORMETRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const getInformeTrsById = informeActual => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.GET_INFORMETRS_BY_ID_START })

      dispatch({
        type: types.GET_INFORMETRS_BY_ID_SUCCESS,
        payload: informeActual,
      })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_INFORMETRS_BY_ID_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const getInformeTrsNavegacion = (informeActual, navega) => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.GET_INFORMETRS_BY_ID_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(
        `/informetrs/?id=${informeActual}&next=${navega}`,
        {
          headers: { Authorization: Token },
        }
      )

      const result = respuesta.data

      if (result.results.length === 0) {
        dispatch(setToast('error', 'Ah llegado al final de la lista'))
        progress.finish()
        return
      }

      dispatch({
        type: types.GET_INFORMETRS_BY_ID_SUCCESS,
        payload: result.results[0],
      })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_INFORMETRS_BY_ID_FAILED, payload: true })
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

export const crudPersonalActaCctvAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CRUD_PERSONAL_ACTACCTV_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.patch('/informecctv/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CRUD_PERSONAL_ACTACCTV_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CRUD_PERSONAL_ACTACCTV_FAILED, payload: true })
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

export const createNovedadCctvAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CREATE_NOVEDADCCTV_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.post('/novedadcctv/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CREATE_NOVEDADCCTV_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CREATE_NOVEDADCCTV_FAILED, payload: true })
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

export const updateNovedadCCTVAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.UPDATE_NOVEDADCCTV_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.patch('/novedadcctv/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.UPDATE_NOVEDADCCTV_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.UPDATE_NOVEDADCCTV_FAILED, payload: true })
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

export const deleteNovedadCCTVAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.DELETE_NOVEDADCCTV_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.delete('/novedadcctv/', {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      })

      const result = respuesta.data
      dispatch({ type: types.DELETE_NOVEDADCCTV_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.DELETE_NOVEDADCCTV_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const cerrarNovedadTRSAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CERRAR_NOVEDADTRS_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.put('/novedadtrs/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CERRAR_NOVEDADTRS_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CERRAR_NOVEDADTRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const cerrarNovedadCCTVAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CERRAR_NOVEDADCCTV_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.put('/novedadcctv/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CERRAR_NOVEDADCCTV_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CERRAR_NOVEDADCCTV_FAILED, payload: true })
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

export const createConsignaCctvAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CREATE_CONSIGNACCTV_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.post('/consignacctv/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.CREATE_CONSIGNACCTV_SUCCESS, payload: result })
      dispatch(setToast('success', 'Consigna ingresada correctamente'))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.CREATE_CONSIGNACCTV_FAILED, payload: true })
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
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.UPDATE_CONSIGNATRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}
export const updateConsignaCCTVAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.UPDATE_CONSIGNACCTV_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.patch('/consignacctv/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })

      const result = respuesta.data
      dispatch({ type: types.UPDATE_CONSIGNACCTV_SUCCESS, payload: result })
      dispatch(setToast('success', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.UPDATE_CONSIGNACCTV_FAILED, payload: true })
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

export const deleteConsignaCCTVAction = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.DELETE_CONSIGNACCTV_START, payload: data })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.delete('/consignacctv/', {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      })

      const result = respuesta.data
      dispatch({ type: types.DELETE_CONSIGNACCTV_SUCCESS, payload: result })
      dispatch(setToast('success', 'Consigna eliminada correctamente'))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.DELETE_CONSIGNACCTV_FAILED, payload: true })
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
      dispatch(setToast('success', result.message))
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

export const getInformeCctv = (enlacePaginacion = '/informecctv/') => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.GET_INFORMECCTV_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })

      const result = respuesta.data

      dispatch({ type: types.GET_INFORMECCTV_SUCCESS, payload: result })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_INFORMECCTV_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const getInformeCctvById = informeActual => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.GET_INFORMECCTV_BY_ID_START })

      dispatch({
        type: types.GET_INFORMECCTV_BY_ID_SUCCESS,
        payload: informeActual,
      })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_INFORMECCTV_BY_ID_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const getInformeCctvNavegacion = (informeActual, navega) => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.GET_INFORMECCTV_BY_ID_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(
        `/informecctv/?id=${informeActual}&next=${navega}`,
        {
          headers: { Authorization: Token },
        }
      )

      const result = respuesta.data

      if (result.results.length === 0) {
        dispatch(setToast('error', 'Ah llegado al final de la lista'))
        progress.finish()
        return
      }

      dispatch({
        type: types.GET_INFORMECCTV_BY_ID_SUCCESS,
        payload: result.results[0],
      })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_INFORMECCTV_BY_ID_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const getPersonalInformeCctv = () => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.GET_PERSONAL_INFORMECCTV_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.options('/informecctv/', {
        headers: { Authorization: Token },
      })

      const result = respuesta.data

      const personal = {
        protectores: result.lista.protectores.split(','),
        centralistas: result.lista.centralistas.split(','),
      }
      dispatch({
        type: types.GET_PERSONAL_INFORMECCTV_SUCCESS,
        payload: personal,
      })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_PERSONAL_INFORMECCTV_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const getPersonalInformeTrs = () => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.GET_PERSONAL_INFORMETRS_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.options('/informetrs/', {
        headers: { Authorization: Token },
      })

      const result = respuesta.data
      const personal = {
        protectores: result.lista.protectores.split(','),
        centralistas: result.lista.centralistas.split(','),
      }
      dispatch({
        type: types.GET_PERSONAL_INFORMETRS_SUCCESS,
        payload: personal,
      })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_PERSONAL_INFORMETRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const postControlMovimiento = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.POST_CONTROL_MOVIMIENTO_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.post('/controlmovimiento/', data, {
        headers: { Authorization: Token },
      })

      const result = respuesta.data

      dispatch({ type: types.POST_CONTROL_MOVIMIENTO_SUCCESS, payload: data })
      dispatch(setToast('success', result.message))

      progress.finish()
    } catch (error) {
      dispatch({ type: types.POST_CONTROL_MOVIMIENTO_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const postInformeCctv = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.POST_INFORMECCTV_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const param = {
        turno: data,
      }
      const respuesta = await httpRequest.post('/informecctv/', param, {
        headers: { Authorization: Token },
      })

      const resultado = respuesta.data

      dispatch({ type: types.POST_INFORMECCTV_SUCCESS, payload: data })
      dispatch(setToast('success', resultado.message))

      const response = await httpRequest.get(
        '/informecctv/?id=' + resultado.id,
        {
          headers: { Authorization: Token },
        }
      )

      const result = response.data

      dispatch({
        type: types.GET_INFORMECCTV_BY_ID_SUCCESS,
        payload: result.results[0],
      })

      progress.finish()
    } catch (error) {
      dispatch({ type: types.POST_INFORMECCTV_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}
export const postInformeTrs = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.POST_INFORMETRS_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const param = {
        turno: data,
      }
      const respuesta = await httpRequest.post('/informetrs/', param, {
        headers: { Authorization: Token },
      })

      const resultado = respuesta.data

      dispatch({ type: types.POST_INFORMETRS_SUCCESS, payload: data })
      dispatch(setToast('success', resultado.message))

      const response = await httpRequest.get(
        '/informetrs/?id=' + resultado.id,
        {
          headers: { Authorization: Token },
        }
      )

      const result = response.data

      const responseConsigna = await httpRequest.get('/informetrs/?id=0', {
        headers: { Authorization: Token },
      })

      const resultConsigna = responseConsigna.data
      dispatch({
        type: types.GET_INFORMETRS_BY_ID_SUCCESS,
        payload: [...result.results[0], ...resultConsigna.results],
      })

      progress.finish()
    } catch (error) {
      dispatch({ type: types.POST_INFORMETRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const cerrarInformeCctv = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CERRAR_INFORMECCTV_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.put('/informecctv/', data, {
        headers: { Authorization: Token },
      })

      const result = respuesta.data

      dispatch({ type: types.CERRAR_INFORMECCTV_SUCCESS, payload: data })
      dispatch(setToast('success', result.message))

      progress.finish()
    } catch (error) {
      dispatch({ type: types.CERRAR_INFORMECCTV_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const cerrarInformeTrs = data => {
  return async dispatch => {
    try {
      progress.start()
      dispatch({ type: types.CERRAR_INFORMETRS_START })
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.put('/informetrs/', data, {
        headers: { Authorization: Token },
      })

      const result = respuesta.data

      dispatch({ type: types.CERRAR_INFORMETRS_SUCCESS, payload: data })
      dispatch(setToast('success', result.message))

      progress.finish()
    } catch (error) {
      dispatch({ type: types.CERRAR_INFORMETRS_FAILED, payload: true })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}
