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
      console.log(result, 'result getEjecutivoAction')
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
    dispatch({ type: types.UPDATE_EJECUTIVO_START, payload: data })
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

// update Estado de ejecutivo
export const UpdateEstadoEjecutivoAction = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_ESTADOEJECUTIVO_START, payload: data.id })
    progress.start()
    console.log(data, 'data')
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/estado/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.UPDATE_ESTADOEJECUTIVO_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.UPDATE_ESTADOEJECUTIVO_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

// Get Vinculo Familiar
export const getGrupoFamiliarAction =
  (enlacePaginacion = '/familiar/') =>
  async dispatch => {
    try {
      dispatch({ type: types.GET_GRUPOFAMILIAR_START })
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const response = await httpRequest.get(enlacePaginacion, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })
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

// Get Vinculo Familiar por id
export const getGrupoFamiliarByIdAction = data => async dispatch => {
  try {
    dispatch({ type: types.GET_GRUPOFAMILIAR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token

    const urlGet = `/familiar/?id_ejecutivo=${data.id}`
    console.log(urlGet)
    const response = await httpRequest.get(urlGet, {
      headers: {
        Authorization: Token,
        'content-type': 'multipart/form-data',
      },
    })

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

//Update familiar de ejecutivo
export const UpdateFamiliarAction = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_GRUPOFAMILIAR_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.patch('/familiar/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.UPDATE_GRUPOFAMILIAR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.UPDATE_GRUPOFAMILIAR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

//Delete familiar de ejecutivo
export const DeleteFamiliarAction = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_GRUPOFAMILIAR_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.delete('/familiar/', {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
      data: data,
    })
    const result = response.data

    dispatch({ type: types.DELETE_GRUPOFAMILIAR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.DELETE_GRUPOFAMILIAR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

// update Estado de ejecutivo
export const UpdateEstadoFamiliarAction = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_ESTADOFAMILIAR_START, payload: data })
    progress.start()
    console.log(data, 'data')
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/estado/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.UPDATE_ESTADOFAMILIAR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.UPDATE_ESTADOFAMILIAR_FAILED })
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

export const getVehiculoEjecutivoAction =
  (enlacePaginacion = '/vehiculoejecutivo/') =>
  async dispatch => {
    try {
      dispatch({ type: types.GET_VEHICULOEJECUTIVO_START })
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const response = await httpRequest.get(enlacePaginacion, {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      })
      const result = response.data
      dispatch({ type: types.GET_VEHICULOEJECUTIVO_SUCCESS, payload: result })
      progress.finish()
    } catch (error) {
      dispatch(setToast('error', error.message))
      dispatch({ type: types.GET_VEHICULOEJECUTIVO_FAILED })
      progress.finish()
    }
  }

//Create Vehicle Ejecutivo
export const createNewVehicleEjecutivoAction = data => async dispatch => {
  try {
    dispatch({ type: types.POST_VEHICLE_EJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/vehiculoejecutivo/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data
    dispatch({ type: types.POST_VEHICLE_EJECUTIVO_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch(setToast('error', error.message))
    dispatch({ type: types.POST_VEHICLE_EJECUTIVO_FAILED })
    progress.finish()
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
export const UpdateVehicleEjecutivoAction = data => async dispatch => {
  try {
    console.log(data,'data PRUEBA')
    dispatch({ type: types.UPDATE_VEHICLE_EJECUTIVO_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token

    const ejecutivoActualizado = {
      id_ejecutivo: data.propietario,
      id: data.idVehiculo,
      placas: data.placas,
      alias: data.alias,
      tipo: data.tipo,
    }

    const response = await httpRequest.patch(
      '/vehiculoejecutivo/',
      ejecutivoActualizado,
      {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      }
    )
    const result = response.data

    dispatch({ type: types.UPDATE_VEHICLE_EJECUTIVO_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch(setToast('error', error.message))
    dispatch({ type: types.UPDATE_VEHICLE_EJECUTIVO_FAILED })
    progress.finish()
  }
}

// update Estado de vehiculo ejecutivo
export const UpdateEstadoVehiculoEjecutivoAction = data => async dispatch => {
  try {
    dispatch({
      type: types.UPDATE_ESTADO_VEHICULOEJECUTIVO_START,
      payload: data,
    })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/estado/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({
      type: types.UPDATE_ESTADO_VEHICULOEJECUTIVO_SUCCESS,
      payload: result,
    })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.UPDATE_ESTADO_VEHICULOEJECUTIVO_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
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
