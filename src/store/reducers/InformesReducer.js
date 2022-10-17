import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  historialMovimientos: {},
  allHistorialMovimientos: {},
  informesCctv: {},
  personalInformeCctv: {},
  consignasNovedadesPendientesCctv: {},
  informesTrs: {},
  personalInformeTrs: {},
  consignasNovedadesPendientes: {},
  actaSeleccionada: {},
  idInformeCreado: null,
  novedadesTrs: [],
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
      return { ...state, isLoading: true, actaSeleccionada: {} }

    case types.GET_INFORMETRS_BY_ID_SUCCESS:
    case types.GET_INFORMECCTV_BY_ID_SUCCESS:
      return { ...state, isLoading: false, actaSeleccionada: payload }

    case types.GET_INFORMETRS_BY_ID_FAILED:
    case types.GET_INFORMECCTV_BY_ID_FAILED:
      return { ...state, isLoading: false, actaSeleccionada: {} }

    case types.DELETE_INFORMETRS_START:
      return { ...state, isLoading: true, actaSeleccionada: payload }

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

    case types.DELETE_INFORMECCTV_START:
      return { ...state, isLoading: true, actaSeleccionada: payload }

    case types.DELETE_INFORMECCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        informesCctv: {
          ...state.informesCctv,
          results: state.informesCctv.results.filter(
            dato => dato.id !== state.actaSeleccionada.id
          ),
        },
        actaSeleccionada: {},
      }

    case types.DELETE_INFORMECCTV_FAILED:
      return { ...state, isLoading: false }

    case types.CRUD_PERSONAL_ACTA_START:
    case types.CRUD_PERSONAL_ACTACCTV_START:
      return { ...state, isLoading: true }

    case types.CRUD_PERSONAL_ACTA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          protectores: payload.protectores,
          centralistas: payload.centralistas,
        },
      }

    case types.CRUD_PERSONAL_ACTACCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          protectores: payload.protectores,
          centralistas: payload.centralistas,
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
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsnovedad: [...state.actaSeleccionada.trsnovedad, payload],
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
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsconsigna: [...state.actaSeleccionada.trsconsigna, payload],
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

    case types.GET_ALLHISTORIAL_MOVIMIENTOS_START:
      return { ...state, isLoading: true }

    case types.GET_ALLHISTORIAL_MOVIMIENTOS_SUCCESS:
      return { ...state, isLoading: false, allHistorialMovimientos: payload }

    case types.GET_ALLHISTORIAL_MOVIMIENTOS_FAILED:
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

    case types.PATCH_CONTROL_MOVIMIENTO_START:
      return { ...state, isLoading: true }

    case types.PATCH_CONTROL_MOVIMIENTO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        historialMovimientos: {
          ...state.historialMovimientos,
          results: state.historialMovimientos.results.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      }

    case types.PATCH_CONTROL_MOVIMIENTO_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_CONTROLMOVIMIENTO_START:
      return { ...state, isLoading: true }

    case types.DELETE_CONTROLMOVIMIENTO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        historialMovimientos: {
          ...state.historialMovimientos,
          results: state.historialMovimientos.results.filter(
            dato => dato.id !== payload.id
          ),
        },
      }

    case types.DELETE_CONTROLMOVIMIENTO_FAILED:
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

    case types.POST_INFORMETRS_START:
      return { ...state, isLoading: true }

    case types.POST_INFORMETRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        idInformeCreado: payload,
        // informesTrs: {
        //   ...state.informesTrs,
        //   results: [payload, ...state.informesTrs.results],
        // },
      }

    case types.POST_INFORMETRS_FAILED:
      return { ...state, isLoading: false, idInformeCreado: null }

    // case types.GET_NOVEDADESTRS_BY_ID_START:
    //   return { ...state, isLoading: true }

    // case types.GET_NOVEDADESTRS_BY_ID_SUCCESS:
    //   return { ...state, isLoading: false, novedadesTrs: payload }

    // case types.GET_NOVEDADESTRS_BY_ID_FAILED:
    //   return { ...state, isLoading: false }

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTES_START:
      return { ...state, isLoading: true }

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        consignasNovedadesPendientes: payload,
      }

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTES_FAILED:
      return { ...state, isLoading: false, consignasNovedadesPendientes: {} }

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTESCCTV_START:
      return { ...state, isLoading: true }

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTESCCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        consignasNovedadesPendientesCctv: payload,
      }

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTESCCTV_FAILED:
      return {
        ...state,
        isLoading: false,
        consignasNovedadesPendientesCctv: {},
      }

    case types.CERRAR_INFORMECCTV_START:
    case types.CERRAR_INFORMETRS_START:
      return { ...state, isLoading: true }

    case types.CERRAR_INFORMECCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          agente_entrante: payload.nombre_entrante,
        },
      }

    case types.CERRAR_INFORMETRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          agente_entrante: payload.nombre_entrante,
        },
      }

    case types.CERRAR_INFORMECCTV_FAILED:
    case types.CERRAR_INFORMETRS_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
