/* eslint-disable import/no-anonymous-default-export */
import { types } from '../actionTypes'

const initialState = {
  consignasCctv: {},
  consignasTrs: {},
  consignasGrafica: {},
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
      return { ...state, loading: false, error: payload }
    case types.GET_CONSIGNASTRS_SUCCESS:
      return { ...state, loading: false, consignasTrs: payload }
    case types.GET_CONSIGNASGRAFICA_SUCCESS:
      return { ...state, loading: false, consignasGrafica: payload }
    default:
      return state
  }
}
