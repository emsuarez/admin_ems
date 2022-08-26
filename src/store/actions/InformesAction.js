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
