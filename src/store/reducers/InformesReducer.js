import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  informesTrs: {},
  actaSeleccionada: {},
  historialMovimientos: {},
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

    case types.GET_INFORMETRS_BY_ID_START:
      return { ...state, isLoading: true }

    case types.GET_INFORMETRS_BY_ID_SUCCESS:
      return { ...state, isLoading: false, actaSeleccionada: payload }

    case types.GET_INFORMETRS_BY_ID_FAILED:
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

    case types.CRUD_PERSONAL_ACTA_START:
      return { ...state, isLoading: true }

    case types.CRUD_PERSONAL_ACTA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesTrs: {
          ...state.informesTrs,
          results: state.informesTrs.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.CRUD_PERSONAL_ACTA_FAILED:
      return { ...state, isLoading: false }

    case types.CREATE_NOVEDADTRS_START:
      return { ...state, isLoading: true }

    case types.CREATE_NOVEDADTRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesTrs: {
          ...state.informesTrs,
          results: [payload, ...state.informesTrs.results],
        },
      }

    case types.CREATE_NOVEDADTRS_FAILED:
      return { ...state, isLoading: false }

    case types.CREATE_CONSIGNATRS_START:
      return { ...state, isLoading: true }

    case types.CREATE_CONSIGNATRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesTrs: {
          ...state.informesTrs,
          results: [payload, ...state.informesTrs.results],
        },
      }

    case types.CREATE_CONSIGNATRS_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_NOVEDADTRS_START:
      return { ...state, isLoading: true }

    case types.UPDATE_NOVEDADTRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesTrs: {
          ...state.informesTrs,
          results: state.informesTrs.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.UPDATE_NOVEDADTRS_FAILED:
      return { ...state, isLoading: false }

    case types.CERRAR_NOVEDADTRS_START:
      return { ...state, isLoading: true }

    case types.CERRAR_NOVEDADTRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesTrs: {
          ...state.informesTrs,
          results: state.informesTrs.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.CERRAR_NOVEDADTRS_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_CONSIGNATRS_START:
      return { ...state, isLoading: true }

    case types.UPDATE_CONSIGNATRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesTrs: {
          ...state.informesTrs,
          results: state.informesTrs.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.UPDATE_CONSIGNATRS_FAILED:
      return { ...state, isLoading: false }

    case types.CERRAR_CONSIGNATRS_START:
      return { ...state, isLoading: true }

    case types.CERRAR_CONSIGNATRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesTrs: {
          ...state.informesTrs,
          results: state.informesTrs.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.CERRAR_CONSIGNATRS_FAILED:
      return { ...state, isLoading: false }

    case types.GET_HISTORIAL_MOVIMIENTOS_START:
      return { ...state, isLoading: true }

    case types.GET_HISTORIAL_MOVIMIENTOS_SUCCESS:
      return { ...state, isLoading: false, historialMovimientos: payload }

    case types.GET_HISTORIAL_MOVIMIENTOS_FAILED:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
