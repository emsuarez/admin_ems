import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  historialMovimientos: {},
  personalInformeCctv: {},
  personalInformeTrs: {},
  informesTrs: {},
  informesCctv: {},
  actaSeleccionada: {},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_INFORMETRS_START:
    case types.GET_INFORMECCTV_START:
      return { ...state, isLoading: true }

    case types.GET_INFORMETRS_SUCCESS:
      return { ...state, isLoading: false, informesTrs: payload }
    case types.GET_INFORMECCTV_SUCCESS:
      return { ...state, isLoading: false, informesCctv: payload }

    case types.GET_INFORMETRS_FAILED:
    case types.GET_INFORMECCTV_FAILED:
      return { ...state, isLoading: false }

    case types.GET_INFORMETRS_BY_ID_START:
    case types.GET_INFORMECCTV_BY_ID_START:
      return { ...state, isLoading: true }

    case types.GET_INFORMETRS_BY_ID_SUCCESS:
    case types.GET_INFORMECCTV_BY_ID_SUCCESS:
      return { ...state, isLoading: false, actaSeleccionada: payload }

    case types.GET_INFORMETRS_BY_ID_FAILED:
    case types.GET_INFORMECCTV_BY_ID_FAILED:
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
    case types.CRUD_PERSONAL_ACTACCTV_START:
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

    case types.CRUD_PERSONAL_ACTACCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesCctv: {
          ...state.informesCctv,
          results: state.informesCctv.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.CRUD_PERSONAL_ACTA_FAILED:
    case types.CRUD_PERSONAL_ACTACCTV_FAILED:
      return { ...state, isLoading: false }

    case types.CREATE_NOVEDADTRS_START:
    case types.CREATE_NOVEDADCCTV_START:
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

    case types.CREATE_NOVEDADCCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesCctv: {
          ...state.informesCctv,
          results: [payload, ...state.informesCctv.results],
        },
      }

    case types.CREATE_NOVEDADTRS_FAILED:
    case types.CREATE_NOVEDADCCTV_FAILED:
      return { ...state, isLoading: false }

    case types.CREATE_CONSIGNATRS_START:
    case types.CREATE_CONSIGNACCTV_START:
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

    case types.CREATE_CONSIGNACCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesCctv: {
          ...state.informesCctv,
          results: [payload, ...state.informesCctv.results],
        },
      }

    case types.CREATE_CONSIGNATRS_FAILED:
    case types.CREATE_CONSIGNACCTV_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_NOVEDADTRS_START:
    case types.UPDATE_NOVEDADCCTV_START:
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

    case types.UPDATE_NOVEDADCCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesCctv: {
          ...state.informesCctv,
          results: state.informesCctv.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.UPDATE_NOVEDADTRS_FAILED:
    case types.UPDATE_NOVEDADCCTV_FAILED:
      return { ...state, isLoading: false }

    case types.CERRAR_NOVEDADTRS_START:
    case types.CERRAR_NOVEDADCCTV_START:
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

    case types.CERRAR_NOVEDADCCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesCctv: {
          ...state.informesCctv,
          results: state.informesCctv.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.CERRAR_NOVEDADTRS_FAILED:
    case types.CERRAR_NOVEDADCCTV_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_CONSIGNATRS_START:
    case types.UPDATE_CONSIGNACCTV_START:
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

    case types.UPDATE_CONSIGNACCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesCctv: {
          ...state.informesCctv,
          results: state.informesCctv.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.UPDATE_CONSIGNATRS_FAILED:
    case types.UPDATE_CONSIGNACCTV_FAILED:
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

    case types.GET_PERSONAL_INFORMECCTV_START:
    case types.GET_PERSONA_INFORMETRS_START:
      return { ...state, isLoading: true }

    case types.GET_PERSONAL_INFORMECCTV_SUCCESS:
      return { ...state, isLoading: false, personalInformeCctv: payload }

    case types.GET_PERSONAL_INFORMETRS_SUCCESS:
      return { ...state, isLoading: false, personalInformeTrs: payload }

    case types.GET_PERSONAL_INFORMECCTV_FAILED:
    case types.GET_PERSONAL_INFORMETRS_FAILED:
      return { ...state, isLoading: false }

    case types.POST_CONTROL_MOVIMIENTO_START:
      return { ...state, isLoading: true }

    case types.POST_CONTROL_MOVIMIENTO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        historialMovimientos: {
          ...state.historialMovimientos,
          results: [payload, ...state.historialMovimientos.results],
        },
      }

    case types.POST_CONTROL_MOVIMIENTO_FAILED:
      return { ...state, isLoading: false }

    case types.POST_INFORMECCTV_START:
      return { ...state, isLoading: true }

    case types.POST_INFORMECCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // informesCctv: {
        //   ...state.informesCctv,
        //   results: [payload, ...state.informesCctv.results],
        // },
      }

    case types.POST_INFORMECCTV_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
