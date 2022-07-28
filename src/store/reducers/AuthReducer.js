import { ActionTypes } from '@mui/base'
import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  user: {},
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
      return { ...state, isLoading: payload }
    // case types.GET_TIPOUSER_SUCCESS:
    //   return { ...state, isLoading: false, user: payload }

    default:
      return state
  }
}
