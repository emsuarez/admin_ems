import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  informesTrs: {},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_INFORMETRS_START:
      return { ...state, isLoading: true }

    case types.GET_INFORMETRS_SUCCESS:
      return { ...state, isLoading: false, informesTrs: payload }

    case types.GET_INFORMETRS_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
