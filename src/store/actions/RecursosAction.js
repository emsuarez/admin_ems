import { types } from '../actionTypes'
import { httpRequest } from '../../config'
import qs from 'qs'
import ProgressBar from '@badrap/bar-of-progress'
import { setToast } from './ToastAction'
import axios from 'axios'

const progress = new ProgressBar({
  size: 4,
  color: 'blue',
})

//Get ejecutivo
export const getEjecutivoAction =
  (enlacePaginacion = '/ejecutivo/') =>
  async dispatch => {
    try {
      dispatch({ type: types.GET_EJECUTIVO_START })
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const response = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })
      const result = response.data

      dispatch({ type: types.GET_EJECUTIVO_SUCCESS, payload: result })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_EJECUTIVO_FAILED })
      progress.finish()
    }
  }

//Create ejecutivo
export const createNewEjecutivoAction = data => async dispatch => {
  try {
    dispatch({ type: types.POST_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    console.log(data, 'data')
    const response = await httpRequest.post('/ejecutivo/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.POST_EJECUTIVO_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.POST_EJECUTIVO_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

//Update ejecutivo
export const UpdateEjecutivoAction = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.patch('/ejecutivo/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.UPDATE_EJECUTIVO_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.UPDATE_EJECUTIVO_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

//Delete ejecutivo
export const DeleteEjecutivoAction = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await axios.delete(
      'https://cloudbitakor.com/api/1.0/ejecutivo/',
      {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      }
    )
    const result = response.data

    dispatch({ type: types.DELETE_EJECUTIVO_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.DELETE_EJECUTIVO_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

// Get Vinculo Familiar
export const getGrupoFamiliarAction =
  (id_ejecutivo = '') =>
  async dispatch => {
    console.log(id_ejecutivo, 'id')
    try {
      dispatch({ type: types.GET_GRUPOFAMILIAR_START })
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const response = await httpRequest.get(
        `/familiar/?id_ejecutivo=${id_ejecutivo}`,
        {
          headers: {
            Authorization: Token,
            'content-type': 'multipart/form-data',
          },
        }
      )
      console.log(response, 'response')
      const result = response.data

      dispatch({ type: types.GET_GRUPOFAMILIAR_SUCCESS, payload: result })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_GRUPOFAMILIAR_FAILED })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }

// Create Vinculo Familiar
export const createNewFamiliarAction = data => async dispatch => {
  try {
    dispatch({ type: types.POST_GRUPOFAMILIAR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/familiar/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.POST_GRUPOFAMILIAR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.POST_GRUPOFAMILIAR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

//Get lugares
export const GetLugares = () => async dispatch => {
  try {
    dispatch({ type: types.GET_LUGARES_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.get('/lugares/', {
      headers: { Authorization: Token },
    })
    const result = response.data
    progress.finish()
    dispatch({ type: types.GET_LUGARES_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.GET_LUGARES_FAILED })
  }
}

//Create Lugar
export const CreateNewLugar = data => async dispatch => {
  try {
    dispatch({ type: types.POST_LUGARES_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/lugares/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.POST_LUGARES_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.POST_LUGARES_FAILED })
  }
}

//Delete Lugares
export const DeleteLugaresRecord = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_LUGARES_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await axios.delete(
      'https://cloudbitakor.com/api/1.0/lugares/',
      {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      }
    )
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.DELETE_LUGARES_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.DELETE_LUGARES_FAILED })
  }
}

//Update LUGAR
export const UpdateLugarRecord = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_LUGARES_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.patch('/lugares/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.UPDATE_LUGARES_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.UPDATE_LUGARES_FAILED })
  }
}

//Create Protector
export const CreateNewProtector = data => async dispatch => {
  try {
    dispatch({ type: types.POST_PROTECTOR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/protector/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.POST_PROTECTOR_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.POST_PROTECTOR_FAILED })
  }
}

//Delete Protector
export const DeleteProtectorRecord = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_PROTECTOR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await axios.delete(
      'https://cloudbitakor.com/api/1.0/protector/',
      {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      }
    )
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.DELETE_PROTECTOR_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.DELETE_PROTECTOR_FAILED })
  }
}

//Update Protector
export const UpdateProtectorRecord = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_PROTECTOR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.patch('/protector/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.UPDATE_PROTECTOR_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.UPDATE_PROTECTOR_FAILED })
  }
}

//Create Vehicle Ejecutivo
export const CreateNewVehicleEjecutivo = data => async dispatch => {
  try {
    dispatch({ type: types.POST_VEHICLE_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/vehiculoejecutivo/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.POST_VEHICLE_EJECUTIVO_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.POST_VEHICLE_EJECUTIVO_FAILED })
  }
}

//Delete Vehicle Ejecutivo
export const DeleteVehicleEjecutivoRecord = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_VEHICLE_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await axios.delete(
      'https://cloudbitakor.com/api/1.0/vehiculoejecutivo/',
      {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      }
    )
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.DELETE_VEHICLE_EJECUTIVO_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.DELETE_VEHICLE_EJECUTIVO_FAILED })
  }
}

//Update Vehicle Ejecutivo
export const UpdateVehicleEjecutivoRecord = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_VEHICLE_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.patch('/vehiculoejecutivo/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.UPDATE_VEHICLE_EJECUTIVO_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.UPDATE_VEHICLE_EJECUTIVO_FAILED })
  }
}

//Create Vehicle Protector
export const CreateNewVehicleProtector = data => async dispatch => {
  try {
    dispatch({ type: types.POST_VEHICLE_PROTECTOR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/vehiculoprotector/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.POST_VEHICLE_PROTECTOR_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.POST_VEHICLE_PROTECTOR_FAILED })
  }
}

//Delete Vehicle Ejecutivo
export const DeleteVehicleProtectorRecord = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_VEHICLE_PROTECTOR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await axios.delete(
      'https://cloudbitakor.com/api/1.0/vehiculoprotector/',
      {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
        data: data,
      }
    )
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.DELETE_VEHICLE_PROTECTOR_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.DELETE_VEHICLE_PROTECTOR_FAILED })
  }
}

//Update Vehicle Ejecutivo
export const UpdateVehicleProtectorRecord = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_VEHICLE_PROTECTOR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.patch('/vehiculoprotector/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.UPDATE_VEHICLE_PROTECTOR_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.UPDATE_VEHICLE_PROTECTOR_FAILED })
  }
}
