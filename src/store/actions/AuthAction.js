import { types } from '../actionTypes'
import { httpRequest } from '../../config'
import qs from 'qs'
import { setToast } from './ToastAction'
import ProgressBar from '@badrap/bar-of-progress'
import { Navigate } from 'react-router-dom'

export const UserLogin = data => async dispatch => {
  var response
  const progress = new ProgressBar({
    size: 4,
    color: 'blue',
  })

  try {
    dispatch({ type: types.LOGIN_START })
    progress.start()
    response = await httpRequest.post('/login/', data, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    if (result.message === 'Bienvenido a Emsecor') {
      window.localStorage.setItem('token', result.userData.token)
      window.localStorage.setItem('userid', result.userData.user_id)
      window.localStorage.setItem('tipo', result.userData.tipo)

      dispatch(setToast('success', result.message))
      progress.finish()
      dispatch({ type: types.LOGIN_SUCCESS, payload: result })
    } else if (result.message) {
      progress.finish()
      console.log(result.message)
      dispatch({ type: types.LOGIN_FAILED })
      dispatch(setToast('error', result.message))
    }
  } catch (error) {
    response = await httpRequest
      .post('/login/', data, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .catch(err => {
        console.log(err.request.response)
        dispatch(setToast('error', err.request.response))
      })
    progress.finish()
    dispatch({ type: types.LOGIN_FAILED })
  }
}

// REGISTER
export const UserRegister = data => async dispatch => {
  var response
  console.log('POL', data)
  const progress = new ProgressBar({
    size: 4,
    color: 'blue',
  })

  try {
    dispatch({ type: types.REGISTER_START })
    progress.start()
    response = await httpRequest.post('/register/', data, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    // if(result.message === 'Bienvenido a Emsecor'){

    //   console.log(result)

    //      window.localStorage.setItem('token',result.userData.token)
    //      window.localStorage.setItem('userid',  result.userData.user_id)
    //      window.localStorage.setItem('tipo',  result.userData.tipo)
    //         console.log("test ",window.localStorage.getItem('token'))
    dispatch(setToast('success', result.message))
    progress.finish()
    dispatch({ type: types.REGISTER_SUCCESS, payload: result })

    // }
    // else if(result.message){

    progress.finish()
    // dispatch({ type: types.REGISTER_FAILED })
    // dispatch(setToast('error', result.message))

    // }
  } catch (error) {
    response = await httpRequest
      .post('/register/', data, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .catch(err => {
        console.log(err.request.response)
        dispatch(setToast('error', err.request.response))
      })
    progress.finish()
    dispatch({ type: types.LOGIN_FAILED })
  }
}

// Función de carga de niveles de usuario (tipos)

export const getTiposUsuarioAction = () => {
  return async dispatch => {
    await dispatch(getTipoUser())
    try {
      const response = await httpRequest.get('/roles')
      dispatch(getTipoUserSuccess(response.data.results))
    } catch (error) {
      console.log('Error getRoles ', error)
      dispatch(getTipoUserFailed(true))
    }
  }
}

const getTipoUser = () => ({
  type: types.GET_TIPOUSER_START,
  payload: true,
})

const getTipoUserSuccess = roles => ({
  type: types.GET_TIPOUSER_SUCCESS,
  payload: roles,
})

const getTipoUserFailed = estadoError => ({
  type: types.GET_TIPOUSER_FAILED,
  payload: estadoError,
})
