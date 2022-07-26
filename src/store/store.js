import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/AuthReducer';
import RecursosReducer from './reducers/RecursosReducer';
import { ToastReducer } from './reducers/ToastReducer';

export const store = createStore(
    combineReducers({
        auth:AuthReducer,
        toast:ToastReducer,
        recursos:RecursosReducer,
    }),
    {},
    applyMiddleware(thunk)
);