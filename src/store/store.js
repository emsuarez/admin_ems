import { combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import RecursosReducer from './reducers/RecursosReducer'
import { ToastReducer } from './reducers/ToastReducer'
import ConsignasReducer from './reducers/ConsignasReducer'
import InformesReducer from './reducers/InformesReducer'

// redux - persist
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'counter',
  storage,
}

let rootReducers = combineReducers({
  auth: AuthReducer,
  toast: ToastReducer,
  recursos: RecursosReducer,
  consignas: ConsignasReducer,
  informes: InformesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

// export const store = configureStore({ reducer: rootReducers })
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
})

applyMiddleware(thunk)
