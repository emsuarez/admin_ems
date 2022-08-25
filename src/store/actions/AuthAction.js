import { types } from '../actionTypes'
import { httpRequest } from '../../config'

import { setToast } from './ToastAction'
import ProgressBar from '@badrap/bar-of-progress'

const progress = new ProgressBar({
  size: 4,
  color: 'blue',
})
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
      window.localStorage.clear()
      window.localStorage.setItem('token', result.userData.token)
      window.localStorage.setItem('userid', result.userData.user_id)
      window.localStorage.setItem('tipo', result.userData.tipo)

      dispatch(setToast('success', result.message))
      progress.finish()
      dispatch({ type: types.LOGIN_SUCCESS, payload: result })
    } else if (result.message) {
      progress.finish()

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

    dispatch(setToast('success', result.message))
    progress.finish()
    dispatch({ type: types.REGISTER_SUCCESS, payload: result })

    progress.finish()
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
    try {
      await dispatch(getTipoUser())
      progress.start()
      const response = await httpRequest.get('/roles')
      dispatch(getTipoUserSuccess(response.data.results))
      progress.finish()
    } catch (error) {
      console.log('Error getRoles ', error)
      dispatch(getTipoUserFailed(true))
      progress.finish()
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

// Funcion obtener info de Usuario
export const getUserInfoAction = () => {
  return async dispatch => {
    await dispatch(getUserInfo())
    try {
      progress.start()
      const token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(`/usuario/`, {
        headers: { Authorization: Token },
      })
      progress.finish()

      dispatch(getUserInfoSuccess(respuesta.data))
      progress.finish()
    } catch (error) {
      console.log('Error getUserInfo ', error)
      progress.finish()
      dispatch(getUserInfoFailed(true))
      progress.finish()
    }
  }
}

const getUserInfo = () => ({
  type: types.GET_USERINFO_START,
  payload: true,
})

const getUserInfoSuccess = user => ({
  type: types.GET_USERINFO_SUCCESS,
  payload: user,
})

const getUserInfoFailed = estadoError => ({
  type: types.GET_USERINFO_FAILED,
  payload: estadoError,
})

// Funcion actualizar info de Usuario
export const updateUserInfoAction = data => {
  return async dispatch => {
    await dispatch(updateUserInfo())
    try {
      progress.start()
      console.log('DATA', data)
      const token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      console.log(data.imagen, 'imagen', data.imagen.name)
      let form_data = new FormData()

      form_data.append('id', data.id)
      form_data.append('usuario', data.usuario)
      form_data.append('nombres', data.nombres)
      form_data.append('apellidos', data.apellidos)
      form_data.append('email', data.email)
      form_data.append('tipo', data.tipo)
      form_data.append('imagen', data.imagen, data.imagen.name)

      console.log(form_data, 'EL FORM DATA CARGO')
      const respuesta = await httpRequest.patch(`/usuario/`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: Token,
        },
      })
      console.log(respuesta.data, 'Nuevo Info user')
      progress.finish()

      dispatch(updateUserInfoSuccess(respuesta.data))
      progress.finish()
    } catch (error) {
      console.log('Error updateUserInfo ', error)
      progress.finish()
      dispatch(updateUserInfoFailed(true))
      progress.finish()
    }
  }
}

const updateUserInfo = () => ({
  type: types.UPDATE_USERINFO_START,
  payload: true,
})

const updateUserInfoSuccess = user => ({
  type: types.UPDATE_USERINFO_SUCCESS,
  payload: user,
})

const updateUserInfoFailed = estadoError => ({
  type: types.UPDATE_USERINFO_FAILED,
  payload: estadoError,
})

// Funcion obtener todos los usuarios
export const getUsersAction = (enlacePaginacion = '/user/') => {
  return async dispatch => {
    await dispatch(getAllUsers())
    try {
      progress.start()
      const token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const respuesta = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })

      const result = respuesta.data

      dispatch(getAllUsersSuccess(result))
      progress.finish()
    } catch (error) {
      dispatch(getAllUsersFailed(true))
      dispatch(setToast('error', error))
      progress.finish()
    }
  }
}

const getAllUsers = () => ({
  type: types.GET_ALLUSERS_START,
  payload: true,
})

const getAllUsersSuccess = users => ({
  type: types.GET_ALLUSERS_SUCCESS,
  payload: users,
})

const getAllUsersFailed = estadoError => ({
  type: types.GET_ALLUSERS_FAILED,
  payload: estadoError,
})

export const UpdateEstadoUsuariosAction = data => {
  return async dispatch => {
    try {
      dispatch({ type: types.UPDATE_ESTADOUSUARIO_START, payload: data })
      progress.start()

      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const response = await httpRequest.post('/estado/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })
      const result = response.data

      dispatch({ type: types.UPDATE_ESTADOUSUARIO_SUCCESS, payload: result })
      dispatch(setToast('', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.UPDATE_ESTADOUSUARIO_FAILED })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const UpdateUserAction = data => {
  return async dispatch => {
    try {
      console.log(data, 'DATA')
      dispatch({ type: types.UPDATE_USUARIO_START, payload: data })
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const response = await httpRequest.patch('/usuario/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })
      const result = response.data

      dispatch({ type: types.UPDATE_USUARIO_SUCCESS, payload: result })
      dispatch(setToast('', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.UPDATE_USUARIO_FAILED })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const UpdatePasswordAction = data => {
  return async dispatch => {
    try {
      console.log(data, 'DATA')
      dispatch({ type: types.UPDATE_PASSWORD_START })
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const response = await httpRequest.post('/usuario/', data, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })
      const result = response.data

      dispatch({ type: types.UPDATE_USUARIO_SUCCESS, payload: result })
      dispatch(setToast('', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.UPDATE_USUARIO_FAILED })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }
}

export const getAllUsersReportAction = () => async dispatch => {
  try {
    dispatch({ type: types.GET_ALLUSERSREPORT_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token

    const response = await httpRequest.get('/user/?limit=1000&offset=1', {
      headers: { Authorization: Token },
    })
    const result = response.data
    dispatch({ type: types.GET_ALLUSERSREPORT_SUCCESS, payload: result })
    console.log(result, 'response getAllEjecutivosAction')
    progress.finish()
  } catch (error) {
    dispatch({ type: types.GET_ALLUSERSREPORT_FAILED })
    progress.finish()
  }
}
