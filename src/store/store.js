import { combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import RecursosReducer from './reducers/RecursosReducer'
import { ToastReducer } from './reducers/ToastReducer'

let rootReducers = combineReducers({
  auth: AuthReducer,
  toast: ToastReducer,
  recursos: RecursosReducer,
})

export const store = configureStore({ reducer: rootReducers })

//   applyMiddleware(thunk)
