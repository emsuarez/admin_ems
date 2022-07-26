import { types } from '../actionTypes';

const initialState = {
  isLoading: false,
  historialMovimientos: {},
  allHistorialMovimientos: {},
  informesCctv: {},
  personalInformeCctv: {},
  consignasNovedadesPendientesCctv: {},
  informesTrs: {},
  personalInformeTrs: {},
  actaSeleccionada: {},
  idInformeSeleccionado: 0,
  usernameInformeSeleccionado: '',
  novedadesTrs: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_INFORMETRS_START:
    case types.GET_INFORMECCTV_START:
      return { ...state, isLoading: true };

    case types.GET_INFORMETRS_SUCCESS:
      return { ...state, isLoading: false, informesTrs: payload };
    case types.GET_INFORMECCTV_SUCCESS:
      return { ...state, isLoading: false, informesCctv: payload };

    case types.GET_INFORMETRS_FAILED:
    case types.GET_INFORMECCTV_FAILED:
      return { ...state, isLoading: false };

    case types.GET_INFORMETRS_BY_ID_START:
    case types.GET_INFORMECCTV_BY_ID_START:
      return { ...state, isLoading: true, actaSeleccionada: {} };

    case types.GET_INFORMETRS_BY_ID_SUCCESS:
    case types.GET_INFORMECCTV_BY_ID_SUCCESS:
      return { ...state, isLoading: false, actaSeleccionada: payload };

    case types.GET_INFORMETRS_BY_ID_FAILED:
    case types.GET_INFORMECCTV_BY_ID_FAILED:
      return { ...state, isLoading: false, actaSeleccionada: {} };

    case types.DELETE_INFORMETRS_START:
      return { ...state, isLoading: true, actaSeleccionada: payload };

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
      };

    case types.DELETE_INFORMETRS_FAILED:
      return { ...state, isLoading: false };

    case types.DELETE_INFORMECCTV_START:
      return { ...state, isLoading: true, actaSeleccionada: payload };

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
      };

    case types.DELETE_INFORMECCTV_FAILED:
      return { ...state, isLoading: false };

    case types.CRUD_PERSONAL_ACTA_START:
    case types.CRUD_PERSONAL_ACTACCTV_START:
      return { ...state, isLoading: true };

    case types.CRUD_PERSONAL_ACTA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          protectores: payload.protectores,
          centralistas: payload.centralistas,
        },
      };

    case types.CRUD_PERSONAL_ACTACCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          protectores: payload.protectores,
          centralistas: payload.centralistas,
        },
      };

    case types.CRUD_PERSONAL_ACTA_FAILED:
    case types.CRUD_PERSONAL_ACTACCTV_FAILED:
      return { ...state, isLoading: false };

    case types.CREATE_NOVEDADTRS_START:
    case types.CREATE_NOVEDADCCTV_START:
      return { ...state, isLoading: true };

    case types.CREATE_NOVEDADTRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsnovedad: [...state.actaSeleccionada.trsnovedad, payload],
        },
      };

    case types.CREATE_NOVEDADCCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          cctvnovedad: [...state.actaSeleccionada.cctvnovedad, payload],
        },
      };

    case types.CREATE_NOVEDADTRS_FAILED:
    case types.CREATE_NOVEDADCCTV_FAILED:
      return { ...state, isLoading: false };

    case types.CREATE_CONSIGNATRS_START:
    case types.CREATE_CONSIGNACCTV_START:
      return { ...state, isLoading: true };

    case types.CREATE_CONSIGNATRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsconsigna: [...state.actaSeleccionada.trsconsigna, payload],
        },
      };

    case types.CREATE_CONSIGNACCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          cctvconsigna: [...state.actaSeleccionada.cctvconsigna, payload],
        },
      };

    case types.CREATE_CONSIGNATRS_FAILED:
    case types.CREATE_CONSIGNACCTV_FAILED:
      return { ...state, isLoading: false };

    case types.UPDATE_NOVEDADTRS_START:
    case types.UPDATE_NOVEDADCCTV_START:
      return { ...state, isLoading: true };

    case types.UPDATE_NOVEDADTRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsnovedad: state.actaSeleccionada.trsnovedad.map(novedad =>
            novedad.id === payload.id ? payload : novedad
          ),
        },
        consignasNovedadesPendientes: {
          ...state.consignasNovedadesPendientes,
          novedades: state.consignasNovedadesPendientes.novedades.map(novedad =>
            novedad.id === payload.id ? payload : novedad
          ),
        },
      };

    case types.UPDATE_NOVEDADCCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          cctvnovedad: state.actaSeleccionada.cctvnovedad.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
        consignasNovedadesPendientesCctv: {
          ...state.consignasNovedadesPendientesCctv,
          novedades: state.consignasNovedadesPendientesCctv.novedades.map(
            dato => (dato.id === payload.id ? payload : dato)
          ),
        },
      };

    case types.UPDATE_NOVEDADTRS_FAILED:
    case types.UPDATE_NOVEDADCCTV_FAILED:
      return { ...state, isLoading: false };

    case types.DELETE_NOVEDADTRS_START:
    case types.DELETE_NOVEDADCCTV_START:
      return { ...state, isLoading: true };
    case types.DELETE_NOVEDADCCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          cctvnovedad: state.actaSeleccionada.cctvnovedad.filter(
            dato => dato.id !== payload.id
          ),
        },
        consignasNovedadesPendientesCctv: {
          ...state.consignasNovedadesPendientesCctv,
          novedades: state.consignasNovedadesPendientesCctv.novedades.filter(
            dato => dato.id !== payload.id
          ),
        },
      };

    case types.DELETE_NOVEDADTRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsnovedad: state.actaSeleccionada.trsnovedad.filter(
            dato => dato.id !== payload.id
          ),
        },
        consignasNovedadesPendientes: {
          ...state.consignasNovedadesPendientes,
          novedades: state.consignasNovedadesPendientes.novedades.filter(
            dato => dato.id !== payload.id
          ),
        },
      };

    case types.DELETE_NOVEDADTRS_FAILED:
    case types.DELETE_NOVEDADCCTV_FAILED:
      return { ...state, isLoading: false };

    case types.DELETE_CONSIGNATRS_START:
    case types.DELETE_CONSIGNACCTV_START:
      return { ...state, isLoading: true };

    case types.DELETE_CONSIGNATRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsconsigna: state.actaSeleccionada.trsconsigna.filter(
            dato => dato.id !== payload.id
          ),
        },
        consignasNovedadesPendientes: {
          ...state.consignasNovedadesPendientes,
          consignas: state.consignasNovedadesPendientes.consignas.filter(
            dato => dato.id !== payload.id
          ),
        },
      };

    case types.DELETE_CONSIGNACCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          cctvconsigna: state.actaSeleccionada.cctvconsigna.filter(
            dato => dato.id !== payload.id
          ),
        },
        consignasNovedadesPendientesCctv: {
          ...state.consignasNovedadesPendientesCctv,
          consignas: state.consignasNovedadesPendientesCctv.consignas.filter(
            dato => dato.id !== payload.id
          ),
        },
      };

    case types.DELETE_CONSIGNATRS_FAILED:
    case types.DELETE_CONSIGNACCTV_FAILED:
      return { ...state, isLoading: false };

    case types.CERRAR_NOVEDADTRS_START:
    case types.CERRAR_NOVEDADCCTV_START:
      return { ...state, isLoading: true };

    case types.CERRAR_NOVEDADTRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsnovedad: state.actaSeleccionada.trsnovedad.map(novedad =>
            novedad.id === payload.id ? payload : novedad
          ),
        },
        consignasNovedadesPendientes: {
          ...state.consignasNovedadesPendientes,
          novedades: state.consignasNovedadesPendientes.novedades.map(novedad =>
            novedad.id === payload.id ? payload : novedad
          ),
        },
      };

    case types.CERRAR_NOVEDADCCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          cctvnovedad: state.actaSeleccionada.cctvnovedad.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
        consignasNovedadesPendientesCctv: {
          ...state.consignasNovedadesPendientesCctv,
          novedades: state.consignasNovedadesPendientesCctv.novedades.map(
            dato => (dato.id === payload.id ? payload : dato)
          ),
        },
      };

    case types.CERRAR_NOVEDADTRS_FAILED:
    case types.CERRAR_NOVEDADCCTV_FAILED:
      return { ...state, isLoading: false };

    case types.UPDATE_CONSIGNATRS_START:
    case types.UPDATE_CONSIGNACCTV_START:
      return { ...state, isLoading: true };

    case types.UPDATE_CONSIGNATRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsconsigna: state.actaSeleccionada.trsconsigna.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
        consignasNovedadesPendientes: {
          ...state.consignasNovedadesPendientes,
          consignas: state.consignasNovedadesPendientes.consignas.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      };

    case types.UPDATE_CONSIGNACCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          cctvconsigna: state.actaSeleccionada.cctvconsigna.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
        consignasNovedadesPendientesCctv: {
          ...state.consignasNovedadesPendientesCctv,
          consignas: state.consignasNovedadesPendientesCctv.consignas.map(
            dato => (dato.id === payload.id ? payload : dato)
          ),
        },
      };

    case types.UPDATE_CONSIGNATRS_FAILED:
    case types.UPDATE_CONSIGNACCTV_FAILED:
      return { ...state, isLoading: false };

    case types.CERRAR_CONSIGNATRS_START:
    case types.CERRAR_CONSIGNACCTV_START:
      return { ...state, isLoading: true };

    case types.CERRAR_CONSIGNATRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          trsconsigna: state.actaSeleccionada.trsconsigna.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
        consignasNovedadesPendientes: {
          ...state.consignasNovedadesPendientes,
          consignas: state.consignasNovedadesPendientes.consignas.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
      };

    case types.CERRAR_CONSIGNACCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          cctvconsigna: state.actaSeleccionada.cctvconsigna.map(dato =>
            dato.id === payload.id ? payload : dato
          ),
        },
        consignasNovedadesPendientesCctv: {
          ...state.consignasNovedadesPendientesCctv,
          consignas: state.consignasNovedadesPendientesCctv.consignas.map(
            dato => (dato.id === payload.id ? payload : dato)
          ),
        },
      };

    case types.CERRAR_CONSIGNATRS_FAILED:
    case types.CERRAR_CONSIGNACCTV_FAILED:
      return { ...state, isLoading: false };

    case types.GET_HISTORIAL_MOVIMIENTOS_START:
      return { ...state, isLoading: true };

    case types.GET_HISTORIAL_MOVIMIENTOS_SUCCESS:
      return { ...state, isLoading: false, historialMovimientos: payload };

    case types.GET_HISTORIAL_MOVIMIENTOS_FAILED:
      return { ...state, isLoading: false };

    case types.GET_ALLHISTORIAL_MOVIMIENTOS_START:
      return { ...state, isLoading: true };

    case types.GET_ALLHISTORIAL_MOVIMIENTOS_SUCCESS:
      return { ...state, isLoading: false, allHistorialMovimientos: payload };

    case types.GET_ALLHISTORIAL_MOVIMIENTOS_FAILED:
      return { ...state, isLoading: false };

    case types.GET_PERSONAL_INFORMECCTV_START:
    case types.GET_PERSONA_INFORMETRS_START:
      return { ...state, isLoading: true };

    case types.GET_PERSONAL_INFORMECCTV_SUCCESS:
      return { ...state, isLoading: false, personalInformeCctv: payload };

    case types.GET_PERSONAL_INFORMETRS_SUCCESS:
      return { ...state, isLoading: false, personalInformeTrs: payload };

    case types.GET_PERSONAL_INFORMECCTV_FAILED:
    case types.GET_PERSONAL_INFORMETRS_FAILED:
      return { ...state, isLoading: false };

    case types.POST_CONTROL_MOVIMIENTO_START:
      return { ...state, isLoading: true };

    case types.POST_CONTROL_MOVIMIENTO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        historialMovimientos: {
          ...state.historialMovimientos,
          results: [payload, ...state.historialMovimientos.results],
        },
      };

    case types.POST_CONTROL_MOVIMIENTO_FAILED:
      return { ...state, isLoading: false };

    case types.PATCH_CONTROL_MOVIMIENTO_START:
      return { ...state, isLoading: true };

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
      };

    case types.PATCH_CONTROL_MOVIMIENTO_FAILED:
      return { ...state, isLoading: false };

    case types.DELETE_CONTROLMOVIMIENTO_START:
      return { ...state, isLoading: true };

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
      };

    case types.DELETE_CONTROLMOVIMIENTO_FAILED:
      return { ...state, isLoading: false };

    case types.POST_INFORMECCTV_START:
      return { ...state, isLoading: true };

    case types.POST_INFORMECCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        idInformeSeleccionado: payload.id,
      };

    case types.POST_INFORMECCTV_FAILED:
      return { ...state, isLoading: false, idInformeSeleccionado: null };

    case types.POST_INFORMETRS_START:
      return { ...state, isLoading: true };

    case types.POST_INFORMETRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        idInformeSeleccionado: payload.id,
        usernameInformeSeleccionado: payload.id_user,
      };

    case types.POST_INFORMETRS_FAILED:
      return { ...state, isLoading: false, idInformeSeleccionado: null };

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTES_START:
      return { ...state, isLoading: true };

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        consignasNovedadesPendientes: payload,
      };

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTES_FAILED:
      return { ...state, isLoading: false, consignasNovedadesPendientes: {} };

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTESCCTV_START:
      return { ...state, isLoading: true };

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTESCCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        consignasNovedadesPendientesCctv: payload,
      };

    case types.GET_CONSIGNAS_NOVEDADES_PENDIENTESCCTV_FAILED:
      return {
        ...state,
        isLoading: false,
        consignasNovedadesPendientesCctv: {},
      };

    case types.CERRAR_INFORMECCTV_START:
    case types.CERRAR_INFORMETRS_START:
      return { ...state, isLoading: true };

    case types.CERRAR_INFORMECCTV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          agente_entrante: payload.nombre_entrante,
        },
      };

    case types.CERRAR_INFORMETRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        actaSeleccionada: {
          ...state.actaSeleccionada,
          agente_entrante: payload.nombre_entrante,
        },
      };

    case types.CERRAR_INFORMECCTV_FAILED:
    case types.CERRAR_INFORMETRS_FAILED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
