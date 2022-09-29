/* eslint-disable import/no-anonymous-default-export */
import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  ejecutivo: {},
  allEjecutivos: {},
  grupoFamiliar: {},
  allFamiliares: {},
  grupoFamiliarByEjecutivo: {},
  vehiculosEjecutivos: {},
  allVehiculosEjecutivos: {},
  protectores: {},
  allProtectores: {},
  vehiculosProtectores: {},
  allVehiculosProtectores: {},
  lugares: {},
  allLugares: {},
  ejecutivoSeleccionado: {},
  familiarSeleccionado: {},
  protectorSeleccionado: {},
  vehiculoEjecutivoSeleccionado: {},
  vehiculoProtectorSeleccionado: {},
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

    case types.GET_ALLEJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.GET_ALLEJECUTIVO_SUCCESS:
      return { ...state, isLoading: false, allEjecutivos: payload }
    case types.GET_ALLEJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.POST_EJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.POST_EJECUTIVO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ejecutivo: {
          ...state.ejecutivo,
          results: [payload, ...state.ejecutivo.results],
        },
        allEjecutivos: {
          ...state.allEjecutivos,
          results: [payload, ...state.allEjecutivos.results],
        },
      }

    case types.POST_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_EJECUTIVO_START:
      return { ...state, isLoading: true, ejecutivoSeleccionado: payload }
    case types.UPDATE_EJECUTIVO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ejecutivo: {
          ...state.ejecutivo,
          results: state.ejecutivo.results.map(dato => {
            return dato.id === state.ejecutivoSeleccionado.id
              ? { ...dato, ...state.ejecutivoSeleccionado }
              : { ...dato, dato }
          }),
        },
        allEjecutivos: {
          ...state.allEjecutivos,
          results: state.allEjecutivos.results.map(dato => {
            return dato.id === state.ejecutivoSeleccionado.id
              ? { ...dato, ...state.ejecutivoSeleccionado }
              : { ...dato, dato }
          }),
        },
        ejecutivoSeleccionado: {},
      }
    case types.UPDATE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_EJECUTIVO_START:
      return { ...state, isLoading: true, ejecutivoSeleccionado: payload }
    case types.DELETE_EJECUTIVO_SUCCESS:
      return {
        ejecutivo: {
          ...state.ejecutivo,
          results: state.ejecutivo.results.filter(
            dato => dato.id !== state.ejecutivoSeleccionado.id
          ),
        },
        allEjecutivos: {
          ...state.allEjecutivos,
          results: state.allEjecutivos.results.filter(
            dato => dato.id !== state.ejecutivoSeleccionado.id
          ),
        },
        ejecutivoSeleccionado: {},
      }
    case types.DELETE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_ESTADOEJECUTIVO_START:
      return { ...state, isLoading: true, ejecutivoSeleccionado: payload }

    case types.UPDATE_ESTADOEJECUTIVO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ejecutivo: {
          ...state.ejecutivo,
          results: state.ejecutivo.results.map(dato => {
            return dato.id === state.ejecutivoSeleccionado
              ? { ...dato, is_active: !dato.is_active }
              : { ...dato, dato }
          }),
        },
        ejecutivoSeleccionado: {},
      }
    case types.UPDATE_ESTADOEJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.GET_GRUPOFAMILIAR_START:
      return { ...state, isLoading: true }
    case types.GET_GRUPOFAMILIAR_SUCCESS:
      return { ...state, isLoading: false, grupoFamiliar: payload }
    case types.GET_GRUPOFAMILIAR_FAILED:
      return { ...state, isLoading: false }

    case types.GET_ALLGRUPOFAMILIAR_START:
      return { ...state, isLoading: true }
    case types.GET_ALLGRUPOFAMILIAR_SUCCESS:
      return { ...state, isLoading: false, allFamiliares: payload }
    case types.GET_ALLGRUPOFAMILIAR_FAILED:
      return { ...state, isLoading: false }

    case types.GET_GRUPOFAMILIARBYEJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.GET_GRUPOFAMILIARBYEJECUTIVO_SUCCESS:
      return { ...state, isLoading: false, grupoFamiliarByEjecutivo: payload }
    case types.GET_GRUPOFAMILIARBYEJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.POST_GRUPOFAMILIAR_START:
      return { ...state, isLoading: true }
    case types.POST_GRUPOFAMILIAR_SUCCESS:
      return { ...state, isLoading: false, message: payload }
    case types.POST_GRUPOFAMILIAR_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_GRUPOFAMILIAR_START:
      return { ...state, isLoading: true, familiarSeleccionado: payload }
    case types.UPDATE_GRUPOFAMILIAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        grupoFamiliar: {
          ...state.grupoFamiliar,
          results: state.grupoFamiliar.results.map(dato => {
            return dato.id === state.familiarSeleccionado.id
              ? { ...dato, ...state.familiarSeleccionado }
              : { ...dato, dato }
          }),
        },
        grupoFamiliarByEjecutivo: {
          ...state.grupoFamiliarByEjecutivo,
          results: state.grupoFamiliarByEjecutivo.results.map(dato => {
            return dato.id === state.familiarSeleccionado.id
              ? { ...dato, ...state.familiarSeleccionado }
              : { ...dato, dato }
          }),
        },
        familiarSeleccionado: {},
      }
    case types.UPDATE_GRUPOFAMILIAR_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_GRUPOFAMILIAR_START:
      return { ...state, isLoading: true, familiarSeleccionado: payload }
    case types.DELETE_GRUPOFAMILIAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        grupoFamiliar: {
          ...state.grupoFamiliar,
          results: state.grupoFamiliar.results.filter(
            dato => dato.id !== state.familiarSeleccionado.id
          ),
        },
        grupoFamiliarByEjecutivo: {
          ...state.grupoFamiliarByEjecutivo,
          results: state.grupoFamiliarByEjecutivo.results.filter(
            dato => dato.id !== state.familiarSeleccionado.id
          ),
        },

        familiarSeleccionado: {},
      }
    case types.DELETE_GRUPOFAMILIAR_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_ESTADOFAMILIAR_START:
      return { ...state, isLoading: true, familiarSeleccionado: payload }
    case types.UPDATE_ESTADOFAMILIAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        grupoFamiliar: {
          ...state.grupoFamiliar,
          results: state.grupoFamiliar.results.map(dato => {
            return dato.id === state.familiarSeleccionado.id
              ? { ...dato, is_active: !dato.is_active }
              : { ...dato, dato }
          }),
        },
        grupoFamiliarByEjecutivo: {
          ...state.grupoFamiliarByEjecutivo,
          results: state.grupoFamiliarByEjecutivo.results.map(dato => {
            return dato.id === state.familiarSeleccionado.id
              ? { ...dato, is_active: !dato.is_active }
              : { ...dato, dato }
          }),
        },

        familiarSeleccionado: {},
      }
    case types.UPDATE_ESTADOFAMILIAR_FAILED:
      return { ...state, isLoading: false, familiarSeleccionado: {} }

    case types.GET_PROTECTOR_START:
      return { ...state, isLoading: true }
    case types.GET_PROTECTOR_SUCCESS:
      return { ...state, isLoading: false, protectores: payload }
    case types.GET_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.GET_ALLPROTECTOR_START:
      return { ...state, isLoading: true }
    case types.GET_ALLPROTECTOR_SUCCESS:
      return { ...state, isLoading: false, allProtectores: payload }
    case types.GET_ALLPROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.POST_PROTECTOR_START:
      return { ...state, isLoading: true }
    case types.POST_PROTECTOR_SUCCESS:
      return { ...state, isLoading: false, message: payload }
    case types.POST_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_PROTECTOR_START:
      return { ...state, isLoading: true, protectorSeleccionado: payload }
    case types.DELETE_PROTECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        protectores: {
          ...state.protectores,
          results: state.protectores.results.filter(
            dato => dato.id !== state.protectorSeleccionado.id
          ),
        },
        protectorSeleccionado: {},
      }
    case types.DELETE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_PROTECTOR_START:
      return { ...state, isLoading: true, protectorSeleccionado: payload }
    case types.UPDATE_PROTECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        protectores: {
          ...state.protectores,
          results: state.protectores.results.map(dato => {
            return dato.id === state.protectorSeleccionado.id
              ? { ...dato, ...state.protectorSeleccionado }
              : { ...dato, dato }
          }),
        },
        protectorSeleccionado: {},
      }
    case types.UPDATE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_ESTADOPROTECTOR_START:
      return { ...state, isLoading: true, protectorSeleccionado: payload }

    case types.UPDATE_ESTADOPROTECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        protectores: {
          ...state.protectores,
          results: state.protectores.results.map(dato => {
            return dato.id === state.protectorSeleccionado.id
              ? { ...dato, is_active: !dato.is_active }
              : { ...dato, dato }
          }),
        },
        protectorSeleccionado: {},
      }
    case types.UPDATE_ESTADOPROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.GET_LUGARES_START:
      return { ...state, isLoading: true }
    case types.GET_LUGARES_SUCCESS:
      return { ...state, isLoading: false, lugares: payload }
    case types.GET_LUGARES_FAILED:
      return { ...state, isLoading: false }

    case types.GET_ALLLUGARES_START:
      return { ...state, isLoading: true }
    case types.GET_ALLLUGARES_SUCCESS:
      return { ...state, isLoading: false, allLugares: payload }
    case types.GET_ALLLUGARES_FAILED:
      return { ...state, isLoading: false }

    case types.POST_LUGARES_START:
      return { ...state, isLoading: true }
    case types.POST_LUGARES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lugares: {
          ...state.lugares,
          results: [payload, ...state.lugares.results],
        },
        allLugares: {
          ...state.allLugares,
          results: [payload, ...state.allLugares.results],
        },
      }
    case types.POST_LUGARES_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_LUGARES_START:
      return { ...state, isLoading: true, lugarSeleccionado: payload }
    case types.DELETE_LUGARES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lugares: {
          ...state.lugares,
          results: state.lugares.results.filter(
            dato => dato.id !== state.lugarSeleccionado.id
          ),
        },
        allLugares: {
          ...state.allLugares,
          results: state.allLugares.results.filter(
            dato => dato.id !== state.lugarSeleccionado.id
          ),
        },
        lugarSeleccionado: {},
      }
    case types.DELETE_LUGARES_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_LUGARES_START:
      return { ...state, isLoading: true, lugarSeleccionado: payload }
    case types.UPDATE_LUGARES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lugares: {
          ...state.lugares,
          results: state.lugares.results.map(dato => {
            return dato.id === state.lugarSeleccionado.id
              ? { ...dato, ...state.lugarSeleccionado }
              : { ...dato, dato }
          }),
        },
        allLugares: {
          ...state.allLugares,
          results: state.allLugares.results.map(dato => {
            return dato.id === state.lugarSeleccionado.id
              ? { ...dato, ...state.lugarSeleccionado }
              : { ...dato, dato }
          }),
        },
        lugarSeleccionado: {},
      }

    case types.UPDATE_LUGARES_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_ESTADOLUGAR_START:
      return { ...state, isLoading: true, lugarSeleccionado: payload }
    case types.UPDATE_ESTADOLUGAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lugares: {
          ...state.lugares,
          results: state.lugares.results.map(dato => {
            return dato.id === state.lugarSeleccionado.id
              ? { ...dato, is_active: !dato.is_active }
              : { ...dato, dato }
          }),
        },
        lugarSeleccionado: {},
      }
    case types.UPDATE_ESTADOLUGAR_FAILED:
      return { ...state, isLoading: false }

    case types.GET_VEHICULOEJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.GET_VEHICULOEJECUTIVO_SUCCESS:
      return { ...state, isLoading: false, vehiculosEjecutivos: payload }
    case types.GET_VEHICULOEJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.GET_ALLVEHICULOEJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.GET_ALLVEHICULOEJECUTIVO_SUCCESS:
      return { ...state, isLoading: false, allVehiculosEjecutivos: payload }
    case types.GET_ALLVEHICULOEJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.POST_VEHICLE_EJECUTIVO_START:
      return { ...state, isLoading: true }
    case types.POST_VEHICLE_EJECUTIVO_SUCCESS:
      return { ...state, isLoading: false }
    case types.POST_VEHICLE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_VEHICLE_EJECUTIVO_START:
      return {
        ...state,
        isLoading: true,
        vehiculoEjecutivoSeleccionado: payload,
      }
    case types.DELETE_VEHICLE_EJECUTIVO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vehiculosEjecutivos: {
          ...state.vehiculosEjecutivos,
          results: state.vehiculosEjecutivos.results.filter(
            dato => dato.id !== state.vehiculoEjecutivoSeleccionado.id
          ),
        },
        vehiculoEjecutivoSeleccionado: {},
      }
    case types.DELETE_VEHICLE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_VEHICLE_EJECUTIVO_START:
      return {
        ...state,
        isLoading: true,
        vehiculoEjecutivoSeleccionado: payload,
      }
    case types.UPDATE_VEHICLE_EJECUTIVO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vehiculosEjecutivos: {
          ...state.vehiculosEjecutivos,
          results: state.vehiculosEjecutivos.results.map(dato => {
            return dato.id === state.vehiculoEjecutivoSeleccionado.idVehiculo
              ? { ...dato, ...state.vehiculoEjecutivoSeleccionado }
              : { ...dato, dato }
          }),
        },
      }
    case types.UPDATE_VEHICLE_EJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_ESTADO_VEHICULOEJECUTIVO_START:
      return {
        ...state,
        isLoading: true,
        vehiculoEjecutivoSeleccionado: payload,
      }

    case types.UPDATE_ESTADO_VEHICULOEJECUTIVO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vehiculosEjecutivos: {
          ...state.vehiculosEjecutivos,
          results: state.vehiculosEjecutivos.results.map(dato => {
            return dato.id === state.vehiculoEjecutivoSeleccionado.id
              ? { ...dato, is_active: !dato.is_active }
              : { ...dato, dato }
          }),
        },
        vehiculoEjecutivoModificar: {},
      }
    case types.UPDATE_ESTADO_VEHICULOEJECUTIVO_FAILED:
      return { ...state, isLoading: false }

    case types.GET_VEHICULOEPROTECTOR_START:
      return { ...state, isLoading: true }
    case types.GET_VEHICULOEPROTECTOR_SUCCESS:
      return { ...state, isLoading: false, vehiculosProtectores: payload }
    case types.GET_VEHICULOEPROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.GET_ALLVEHICULOEPROTECTOR_START:
      return { ...state, isLoading: true }
    case types.GET_ALLVEHICULOEPROTECTOR_SUCCESS:
      return { ...state, isLoading: false, allVehiculosProtectores: payload }
    case types.GET_ALLVEHICULOEPROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.POST_VEHICLE_PROTECTOR_START:
      return {
        ...state,
        isLoading: true,
        vehiculoProtectorSeleccionado: payload,
      }
    case types.POST_VEHICLE_PROTECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vehiculosProtectores: {
          ...state.vehiculosProtectores,
          results: [
            { ...state.vehiculoProtectorSeleccionado, id: payload.id },
            ...state.vehiculosProtectores.results,
          ],
        },
      }
    case types.POST_VEHICLE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.DELETE_VEHICLE_PROTECTOR_START:
      return {
        ...state,
        isLoading: true,
        vehiculoProtectorSeleccionado: payload,
      }
    case types.DELETE_VEHICLE_PROTECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vehiculosProtectores: {
          ...state.vehiculosProtectores,
          results: state.vehiculosProtectores.results.filter(
            dato => dato.id !== state.vehiculoProtectorSeleccionado.id
          ),
        },
        vehiculoProtectorSeleccionado: {},
      }
    case types.DELETE_VEHICLE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_VEHICLE_PROTECTOR_START:
      return {
        ...state,
        isLoading: true,
        vehiculoProtectorSeleccionado: payload,
      }
    case types.UPDATE_VEHICLE_PROTECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vehiculosProtectores: {
          ...state.vehiculosProtectores,
          results: state.vehiculosProtectores.results.map(dato => {
            return dato.id === state.vehiculoProtectorSeleccionado.id
              ? { ...dato, ...state.vehiculoProtectorSeleccionado }
              : { ...dato, dato }
          }),
        },
        vehiculoProtectorSeleccionado: {},
      }
    case types.UPDATE_VEHICLE_PROTECTOR_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_ESTADO_VEHICULOPROTECTOR_START:
      return {
        ...state,
        isLoading: true,
        vehiculoProtectorSeleccionado: payload,
      }

    case types.UPDATE_ESTADO_VEHICULOPROTECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vehiculosProtectores: {
          ...state.vehiculosProtectores,
          results: state.vehiculosProtectores.results.map(dato => {
            return dato.id === state.vehiculoProtectorSeleccionado.id
              ? { ...dato, is_active: !dato.is_active }
              : { ...dato, dato }
          }),
        },
        vehiculoProtectorSeleccionado: {},
      }
    case types.UPDATE_ESTADO_VEHICULOPROTECTOR_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
