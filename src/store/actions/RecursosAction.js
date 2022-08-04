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
export const GetEjecutivo = () => async dispatch => {
  try {
    dispatch({ type: types.GET_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.get('/ejecutivo/', {
      headers: { Authorization: Token },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.GET_EJECUTIVO_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.GET_EJECUTIVO_FAILED })
  }
}
//Create ejecutivo
export const CreateNewEjecutivo = data => async dispatch => {
  try {
    dispatch({ type: types.POST_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/ejecutivo/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.POST_EJECUTIVO_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.POST_EJECUTIVO_FAILED })
  }
}

//Delete ejecutivo
export const DeleteEjecutivoRecord = data => async dispatch => {
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
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.DELETE_EJECUTIVO_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.DELETE_EJECUTIVO_FAILED })
  }
}

//Update ejecutivo
export const UpdateEjecutivoRecord = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.patch('/ejecutivo/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    console.log('*********jjj*** ', result)
    progress.finish()
    dispatch({ type: types.UPDATE_EJECUTIVO_SUCCESS, payload: result })
  } catch (err) {
    progress.finish()
    console.log(
      'Error in input : -------------------------------------------------------------',
      err
    )
    dispatch({ type: types.UPDATE_EJECUTIVO_FAILED })
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
