/* eslint-disable import/no-anonymous-default-export */
import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  ejecutivo: {},
  grupoFamiliar: {},
  lugares: {},
  message: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_EJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.GET_EJECUTIVO_SUCCESS:
      return { ...state, isLoading: false, ejecutivo: payload }
    case types.GET_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.POST_EJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.POST_EJECUTIVO_SUCCESS:
      return { ...state, isLoading: false, message: payload }
    case types.POST_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_EJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.UPDATE_EJECUTIVO_SUCCESS:
      return { ...state, isLoading: false }
    case types.UPDATE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_EJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.DELETE_EJECUTIVO_SUCCESS:
      return { ...state, isLoading: false }
    case types.DELETE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.GET_GRUPOFAMILIAR_START:
      return { ...state, isLoading: true }
    case types.GET_GRUPOFAMILIAR_SUCCESS:
      return { ...state, isLoading: false, grupoFamiliar: payload }
    case types.GET_GRUPOFAMILIAR_FAILED:
      return { ...state, isLoading: false }

    case types.POST_GRUPOFAMILIAR_START:
      return { ...state, isLoading: true }
    case types.POST_GRUPOFAMILIAR_SUCCESS:
      return { ...state, isLoading: false, message: payload }
    case types.POST_GRUPOFAMILIAR_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_GRUPOFAMILIAR_START:
      return { ...state, isLoading: true }
    case types.UPDATE_GRUPOFAMILIAR_SUCCESS:
      return { ...state, isLoading: false }
    case types.UPDATE_GRUPOFAMILIAR_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_GRUPOFAMILIAR_START:
      return { ...state, isLoading: true }
    case types.DELETE_GRUPOFAMILIAR_SUCCESS:
      return { ...state, isLoading: false }
    case types.DELETE_GRUPOFAMILIAR_FAILED:
      return { ...state, isLoading: false }

    case types.GET_LUGARES_START:
      return { ...state, isLoading: true }
    case types.GET_LUGARES_SUCCESS:
      return { ...state, isLoading: false, lugares: payload }
    case types.GET_LUGARES_FAILED:
      return { ...state, isLoading: false }

    case types.POST_LUGARES_START:
      return { ...state, isLoading: true }
    case types.POST_LUGARES_SUCCESS:
      return { ...state, isLoading: false, lugares: payload }
    case types.POST_LUGARES_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_LUGARES_START:
      return { ...state, isLoading: true }
    case types.DELETE_LUGARES_SUCCESS:
      return { ...state, isLoading: false }
    case types.DELETE_LUGARES_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_LUGARES_START:
      return { ...state, isLoading: true }
    case types.UPDATE_LUGARES_SUCCESS:
      return { ...state, isLoading: false }
    case types.UPDATE_LUGARES_FAILED:
      return { ...state, isLoading: false }

    case types.POST_PROTECTOR_START:
      return { ...state, isLoading: true }
    case types.POST_PROTECTOR_SUCCESS:
      return { ...state, isLoading: false }
    case types.POST_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_PROTECTOR_START:
      return { ...state, isLoading: true }
    case types.DELETE_PROTECTOR_SUCCESS:
      return { ...state, isLoading: false }
    case types.DELETE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_PROTECTOR_START:
      return { ...state, isLoading: true }
    case types.UPDATE_PROTECTOR_SUCCESS:
      return { ...state, isLoading: false }
    case types.UPDATE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.POST_VEHICLE_EJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.POST_VEHICLE_EJECUTIVO_SUCCESS:
      return { ...state, isLoading: false }
    case types.POST_VEHICLE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_VEHICLE_EJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.DELETE_VEHICLE_EJECUTIVO_SUCCESS:
      return { ...state, isLoading: false }
    case types.DELETE_VEHICLE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_VEHICLE_EJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.UPDATE_VEHICLE_EJECUTIVO_SUCCESS:
      return { ...state, isLoading: false }
    case types.UPDATE_VEHICLE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.POST_VEHICLE_PROTECTOR_START:
      return { ...state, isLoading: true }
    case types.POST_VEHICLE_PROTECTOR_SUCCESS:
      return { ...state, isLoading: false }
    case types.POST_VEHICLE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_VEHICLE_PROTECTOR_START:
      return { ...state, isLoading: true }
    case types.DELETE_VEHICLE_PROTECTOR_SUCCESS:
      return { ...state, isLoading: false }
    case types.DELETE_VEHICLE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_VEHICLE_PROTECTOR_START:
      return { ...state, isLoading: true }
    case types.UPDATE_VEHICLE_PROTECTOR_SUCCESS:
      return { ...state, isLoading: false }
    case types.UPDATE_VEHICLE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
