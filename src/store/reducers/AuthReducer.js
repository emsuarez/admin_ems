import { ActionTypes } from '@mui/base'
import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  user: {},
  roles: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_START:
      return { ...state, isLoading: true }
    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: payload }
    case types.LOGIN_FAILED:
      return { ...state, isLoading: false }

    case types.REGISTER_START:
      return { ...state, isLoading: true }
    case types.REGISTER_SUCCESS:
      return { ...state, isLoading: false, user: payload }
    case types.REGISTER_FAILED:
      return { ...state, isLoading: false }

    case types.GET_TIPOUSER_START:
      return { ...state, isLoading: true }
    case types.GET_TIPOUSER_SUCCESS:
      return { ...state, isLoading: false, roles: payload }
    case types.GET_TIPOUSER_FAILED:
      return { ...state, isLoading: false }

    case types.GET_USERINFO_START:
      return { ...state, isLoading: true }
    case types.GET_USERINFO_SUCCESS:
      return { ...state, isLoading: false, user: payload }
    case types.GET_USERINFO_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_USERINFO_START:
      return { ...state, isLoading: true }
    case types.UPDATE_USERINFO_SUCCESS:
      return { ...state, isLoading: false, user: payload }
    case types.UPDATE_USERINFO_FAILED:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
