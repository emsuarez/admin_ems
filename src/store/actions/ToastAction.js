import { types } from '../actionTypes'

export const setToast = (status, message) => dispatch => {
  try {
    dispatch({
      type: types.SHOW_TOAST,
      payload: {
        status,
        message,
      },
    })
  } catch (error) {}
}

export const clearToast = () => dispatch => {
  dispatch({ type: types.HIDE_TOAST })
}
