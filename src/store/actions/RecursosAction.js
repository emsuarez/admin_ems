import ProgressBar from '@badrap/bar-of-progress'
import axios from 'axios'
import { httpRequest } from '../../config'
import { types } from '../actionTypes'
import { setToast } from './ToastAction'

const progress = new ProgressBar({
  size: 4,
  color: 'blue',
})

//Get ejecutivo
export const getEjecutivoAction =
  (enlacePaginacion = '/ejecutivo/') =>
  async dispatch => {
    console.log(enlacePaginacion, 'enlacePaginacion')
    try {
      dispatch({ type: types.GET_EJECUTIVO_START })
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token

      const responsePaginacion = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })
      const resultPaginacion = responsePaginacion.data
      dispatch({
        type: types.GET_EJECUTIVO_SUCCESS,
        payload: resultPaginacion,
      })
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_EJECUTIVO_FAILED })
      progress.finish()
    }
  }

export const getAllEjecutivosAction = () => async dispatch => {
  try {
    dispatch({ type: types.GET_ALLEJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token

    const response = await httpRequest.get('/ejecutivo/?limit=1000&offset=0', {
      headers: { Authorization: Token },
    })
    const result = response.data
    dispatch({ type: types.GET_ALLEJECUTIVO_SUCCESS, payload: result })

    progress.finish()
  } catch (error) {
    dispatch({ type: types.GET_ALLEJECUTIVO_FAILED })
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

    const response = await httpRequest.post('/ejecutivo/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({
      type: types.POST_EJECUTIVO_SUCCESS,
      payload: {
        ...data,
        id: result.id,
        familiares: 0,
        created: new Date(),
        is_active: true,
      },
    })
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
      headers: {
        Authorization: Token,
        'content-type': 'multipart/form-data',
      },
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
    dispatch({ type: types.DELETE_EJECUTIVO_START, payload: data })
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

      const result = response.data

      dispatch({ type: types.GET_GRUPOFAMILIAR_SUCCESS, payload: result })

      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_GRUPOFAMILIAR_FAILED })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }

// Get Vinculo Familiar
export const getAllFamiliaresAction = () => async dispatch => {
  try {
    dispatch({ type: types.GET_ALLGRUPOFAMILIAR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.get('/familiar/?limit=1000&offset=0', {
      headers: {
        Authorization: Token,
        'content-type': 'multipart/form-data',
      },
    })

    const result = response.data

    dispatch({ type: types.GET_ALLGRUPOFAMILIAR_SUCCESS, payload: result })

    progress.finish()
  } catch (error) {
    dispatch({ type: types.GET_ALLGRUPOFAMILIAR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

// Get Vinculo Familiar por id
export const getGrupoFamiliarByIdAction = data => async dispatch => {
  try {
    dispatch({ type: types.GET_GRUPOFAMILIARBYEJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token

    const urlGet = `/familiar/?id_ejecutivo=${data}`

    const response = await httpRequest.get(urlGet, {
      headers: {
        Authorization: Token,
        'content-type': 'multipart/form-data',
      },
    })

    const result = response.data

    dispatch({
      type: types.GET_GRUPOFAMILIARBYEJECUTIVO_SUCCESS,
      payload: result,
    })
    progress.finish()
  } catch (error) {
    dispatch({ type: types.GET_GRUPOFAMILIARBYEJECUTIVO_FAILED })
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
export const GetLugaresAction =
  (enlacePaginacion = '/lugares/') =>
  async dispatch => {
    try {
      dispatch({ type: types.GET_LUGARES_START })
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

      dispatch({ type: types.GET_LUGARES_SUCCESS, payload: result })
      dispatch(setToast('', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_LUGARES_FAILED })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }

export const GetAllLugaresAction = () => async dispatch => {
  try {
    dispatch({ type: types.GET_ALLLUGARES_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.get('/lugares/?limit=1000&offset=0', {
      headers: {
        Authorization: Token,
        'content-type': 'multipart/form-data',
      },
    })
    const result = response.data

    dispatch({ type: types.GET_ALLLUGARES_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.GET_ALLLUGARES_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

//Create Lugar
export const CreateNewLugarAction = data => async dispatch => {
  try {
    progress.start()
    dispatch({ type: types.POST_LUGARES_START })
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/lugares/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    data = { ...data, id: result.id }
    console.log(data, 'data con id recibido')
    dispatch({ type: types.POST_LUGARES_SUCCESS, payload: data })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (err) {
    dispatch({ type: types.POST_LUGARES_FAILED })
    dispatch(setToast('error', err.message))
    progress.finish()
  }
}

//Delete Lugares
export const DeleteLugaresAction = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_LUGARES_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.delete('/lugares/', {
      headers: {
        Authorization: Token,
        'content-type': 'multipart/form-data',
      },
      data: data,
    })
    const result = response.data

    dispatch({ type: types.DELETE_LUGARES_SUCCESS, payload: result })
    dispatch(setToast('', result.message))

    progress.finish()
  } catch (err) {
    dispatch({ type: types.DELETE_LUGARES_FAILED })
    dispatch(setToast('error', err.message))
    progress.finish()
  }
}

//Update LUGAR
export const UpdateLugarAction = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_LUGARES_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.patch('/lugares/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.UPDATE_LUGARES_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (err) {
    dispatch({ type: types.UPDATE_LUGARES_FAILED })
    dispatch(setToast('error', err.message))
    progress.finish()
  }
}

export const UpdateEstadoLugarAction = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_ESTADOLUGAR_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/estado/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.UPDATE_ESTADOLUGAR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.UPDATE_ESTADOLUGAR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

//Create Protector
export const createNewProtectorAction = data => async dispatch => {
  try {
    dispatch({ type: types.POST_PROTECTOR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/protector/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.POST_PROTECTOR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.POST_PROTECTOR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

//Delete Protector
export const DeleteProtectorAction = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_PROTECTOR_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.delete('/protector/', {
      headers: {
        Authorization: Token,
        'content-type': 'multipart/form-data',
      },
      data: data,
    })
    const result = response.data

    dispatch({ type: types.DELETE_PROTECTOR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (err) {
    dispatch({ type: types.DELETE_PROTECTOR_FAILED })
    dispatch(setToast('error', err.message))
    progress.finish()
  }
}

//Update Protector
export const UpdateProtectorAction = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_PROTECTOR_START, payload: data })
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

export const getAllVehiculosEjecutivoAction = () => async dispatch => {
  try {
    dispatch({ type: types.GET_ALLVEHICULOEJECUTIVO_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.get(
      'vehiculoejecutivo/?limit=1000&offset=0',
      {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      }
    )
    const result = response.data
    dispatch({ type: types.GET_ALLVEHICULOEJECUTIVO_SUCCESS, payload: result })
    progress.finish()
  } catch (error) {
    dispatch(setToast('error', error.message))
    dispatch({ type: types.GET_ALLVEHICULOEJECUTIVO_FAILED })
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
export const DeleteVehiculoEjecutivoAction = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_VEHICLE_EJECUTIVO_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.delete('/vehiculoejecutivo/', {
      headers: {
        Authorization: Token,
        'content-type': 'multipart/form-data',
      },
      data: data,
    })
    const result = response.data

    dispatch({ type: types.DELETE_VEHICLE_EJECUTIVO_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch(setToast('error', error.message))
    dispatch({ type: types.DELETE_VEHICLE_EJECUTIVO_FAILED })
    progress.finish()
  }
}

//Update Vehicle Ejecutivo
export const UpdateVehicleEjecutivoAction = data => async dispatch => {
  try {
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

export const getProtectoresAction =
  (enlacePaginacion = '/protector/') =>
  async dispatch => {
    try {
      dispatch({ type: types.GET_PROTECTOR_START })
      progress.start()
      let token = window.localStorage.getItem('token')
      const Token = 'Token ' + token
      const response = await httpRequest.get(enlacePaginacion, {
        headers: { Authorization: Token },
      })
      const result = response.data

      dispatch({ type: types.GET_PROTECTOR_SUCCESS, payload: result })
      dispatch(setToast('', result.message))
      progress.finish()
    } catch (error) {
      dispatch({ type: types.GET_PROTECTOR_FAILED })
      dispatch(setToast('error', error.message))
      progress.finish()
    }
  }

export const getAllProtectoresAction = () => async dispatch => {
  try {
    dispatch({ type: types.GET_ALLPROTECTOR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.get('/protector/?limit=1000&offset=0', {
      headers: { Authorization: Token },
    })
    const result = response.data

    dispatch({ type: types.GET_ALLPROTECTOR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.GET_ALLPROTECTOR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

// update Estado de PROTECTOR
export const UpdateEstadoProtectorAction = data => async dispatch => {
  try {
    dispatch({
      type: types.UPDATE_ESTADOPROTECTOR_START,
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
      type: types.UPDATE_ESTADOPROTECTOR_SUCCESS,
      payload: result,
    })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.UPDATE_ESTADOPROTECTOR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

//Create Vehicle Protector
export const CreateNewVehicleProtectorAction = data => async dispatch => {
  try {
    dispatch({ type: types.POST_VEHICLE_PROTECTOR_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.post('/vehiculoprotector/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.POST_VEHICLE_PROTECTOR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.POST_VEHICLE_PROTECTOR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

//Delete Vehicle Ejecutivo
export const DeleteVehicleProtectorAction = data => async dispatch => {
  try {
    dispatch({ type: types.DELETE_VEHICLE_PROTECTOR_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.delete('/vehiculoprotector/', {
      headers: {
        Authorization: Token,
        'content-type': 'multipart/form-data',
      },
      data: data,
    })
    const result = response.data

    dispatch({ type: types.DELETE_VEHICLE_PROTECTOR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (err) {
    dispatch({ type: types.DELETE_VEHICLE_PROTECTOR_FAILED })
    dispatch(setToast('error', err.message))
    progress.finish()
  }
}

//Update Vehicle Ejecutivo
export const UpdateVehicleProtectorAction = data => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_VEHICLE_PROTECTOR_START, payload: data })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.patch('/vehiculoprotector/', data, {
      headers: { Authorization: Token, 'content-type': 'multipart/form-data' },
    })
    const result = response.data

    dispatch({ type: types.UPDATE_VEHICLE_PROTECTOR_SUCCESS, payload: result })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (err) {
    dispatch({ type: types.UPDATE_VEHICLE_PROTECTOR_FAILED })
    dispatch(setToast('error', err.message))
    progress.finish()
  }
}

export const UpdateEstadoVehiculoProtectorAction = data => async dispatch => {
  try {
    dispatch({
      type: types.UPDATE_ESTADO_VEHICULOPROTECTOR_START,
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
      type: types.UPDATE_ESTADO_VEHICULOPROTECTOR_SUCCESS,
      payload: result,
    })
    dispatch(setToast('', result.message))
    progress.finish()
  } catch (error) {
    dispatch({ type: types.UPDATE_ESTADO_VEHICULOPROTECTOR_FAILED })
    dispatch(setToast('error', error.message))
    progress.finish()
  }
}

export const getVehiculoProtectorAction =
  (enlacePaginacion = '/vehiculoprotector/') =>
  async dispatch => {
    try {
      dispatch({ type: types.GET_VEHICULOEPROTECTOR_START })
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
      dispatch({ type: types.GET_VEHICULOEPROTECTOR_SUCCESS, payload: result })
      progress.finish()
    } catch (error) {
      dispatch(setToast('error', error.message))
      dispatch({ type: types.GET_VEHICULOEPROTECTOR_FAILED })
      progress.finish()
    }
  }

export const getAllVehiculoProtectorAction = () => async dispatch => {
  try {
    dispatch({ type: types.GET_ALLVEHICULOEPROTECTOR_START })
    progress.start()
    let token = window.localStorage.getItem('token')
    const Token = 'Token ' + token
    const response = await httpRequest.get(
      '/vehiculoprotector/?limit=1000&offset=0',
      {
        headers: {
          Authorization: Token,
          'content-type': 'multipart/form-data',
        },
      }
    )
    const result = response.data
    dispatch({ type: types.GET_ALLVEHICULOEPROTECTOR_SUCCESS, payload: result })
    progress.finish()
  } catch (error) {
    dispatch(setToast('error', error.message))
    dispatch({ type: types.GET_ALLVEHICULOEPROTECTOR_FAILED })
    progress.finish()
  }
}
