import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  informesTrs: {},
  actaSeleccionada: {},
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

    case types.DELETE_INFORMETRS_START:
      return { ...state, isLoading: true }

    case types.DELETE_INFORMETRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesTrs: {
          ...state.informesTrs,
          results: state.informesTrs.results.filter(
            dato => dato.id !== state.actaSeleccionada.id
          ),
        },
        actaSeleccionada: {},
      }

    case types.DELETE_INFORMETRS_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
