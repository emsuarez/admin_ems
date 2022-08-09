/* eslint-disable import/no-anonymous-default-export */
import { types } from '../actionTypes'

const initialState = {
  consignasCctv: {},
  consignasTrs: {},
  consignasGrafica: {},
  consignaCerrar: null,
  error: null,
  loading: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_CONSIGNASCCTV_START:
    case types.GET_CONSIGNASTRS_START:
    case types.GET_CONSIGNASGRAFICA_START:
      return { ...state, loading: payload }

    case types.GET_CONSIGNASCCTV_SUCCESS:
      return { ...state, loading: false, consignasCctv: payload }

    case types.GET_CONSIGNASCCTV_FAILED:
    case types.GET_CONSIGNASTRS_FAILED:
    case types.GET_CONSIGNASGRAFICA_FAILED:
    case types.CONSIGNACERRARTRS_FAILED:
    case types.CONSIGNACERRARCCTV_FAILED:
      return { ...state, loading: false, error: payload }

    case types.GET_CONSIGNASTRS_SUCCESS:
      return { ...state, loading: false, consignasTrs: payload }

    case types.GET_CONSIGNASGRAFICA_SUCCESS:
      return { ...state, loading: false, consignasGrafica: payload }

    case types.GET_CONSIGNACERRARCCTV_START:
    case types.GET_CONSIGNACERRARCTRS_START:
      return { ...state, consignaCerrar: payload }

    case types.CONSIGNACERRARTRS_SUCCESS:
      return {
        ...state,
        consignasTrs: {
          ...state.consignasTrs,
          results: state.consignasTrs.results.filter(
            consigna => consigna.id !== state.consignaCerrar.id
          ),
        },
        consignaCerrar: null,
      }

    case types.CONSIGNACERRARCCTV_SUCCESS:
      return {
        ...state,
        consignasCctv: {
          ...state.consignasCctv,
          results: state.consignasCctv.results.filter(
            consigna => consigna.id !== state.consignaCerrar.id
          ),
        },
        consignaCerrar: null,
      }

    default:
      return state
  }
}
