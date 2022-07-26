import { types } from '../actionTypes'

const initialState = {
  isToastShowing: false,
  config: {},
}

export const ToastReducer = (toast = initialState, action) => {
  switch (action.type) {
    case types.SHOW_TOAST:
      return { ...toast, isToastShowing: true, config: action.payload }
    case types.HIDE_TOAST:
      return { ...toast, isToastShowing: false, config: {} }
    default:
      return toast
  }
}
