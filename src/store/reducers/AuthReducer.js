import { ActionTypes } from '@mui/base'
import { types } from '../actionTypes'

const initialState = {
  isLoading: false,
  user: {},
  roles: [],
  users: {},
  usuarioSeleccionado: {},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_START:
      return { ...state, isLoading: true }
    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: payload }
    case types.LOGIN_FAILED:
      return { ...state, isLoading: false }

    case types.REGISTER_START:
      return { ...state, isLoading: true }
    case types.REGISTER_SUCCESS:
      return { ...state, isLoading: false, user: payload }
    case types.REGISTER_FAILED:
      return { ...state, isLoading: false }

    case types.GET_TIPOUSER_START:
      return { ...state, isLoading: true }
    case types.GET_TIPOUSER_SUCCESS:
      return { ...state, isLoading: false, roles: payload }
    case types.GET_TIPOUSER_FAILED:
      return { ...state, isLoading: false }

    case types.GET_USERINFO_START:
      return { ...state, isLoading: true }
    case types.GET_USERINFO_SUCCESS:
      return { ...state, isLoading: false, user: payload }
    case types.GET_USERINFO_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_USERINFO_START:
      return { ...state, isLoading: true }
    case types.UPDATE_USERINFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: { ...state.user, userData: payload.userData },
      }
    case types.UPDATE_USERINFO_FAILED:
      return { ...state, isLoading: false }

    case types.GET_ALLUSERS_START:
      return { ...state, isLoading: true }
    case types.GET_ALLUSERS_SUCCESS:
      return { ...state, isLoading: false, users: payload }
    case types.GET_ALLUSERS_FAILED:
      return { ...state, isLoading: false }

    case type.UPDATE_USUARIO_START:
      return { ...state, isLoading: true, usuarioSeleccionado: payload }
    case type.UPDATE_USUARIO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: {
          ...state.users,
          results: state.users.results.map(dato => {
            return dato.user_id === state.usuarioSeleccionado.id
              ? { ...dato, ...state.usuarioSeleccionado }
              : { ...dato, dato }
          }),
        },
        usuarioSeleccionado: {},
      }
    case type.UPDATE_USUARIO_FAILED:
      return { ...state, isLoading: false }

    case types.UPDATE_ESTADOUSUARIO_START:
      return { ...state, isLoading: true, usuarioSeleccionado: payload }
    case types.UPDATE_ESTADOUSUARIO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: {
          ...state.users,
          results: state.usuarios.results.map(dato => {
            return dato.user_id === state.usuarioSeleccionado.id
              ? { ...dato, is_active: !dato.is_active }
              : { ...dato, dato }
          }),
        },
        usuarioSeleccionado: {},
      }
    case types.UPDATE_ESTADOUSUARIO_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
