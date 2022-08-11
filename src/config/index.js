import axios from 'axios'
import { store } from '../store/store'
import '../global'
// const baseURL = 'https://cloudbitakor.com/api/1.0'
const baseURL = global.baseUrl

export const httpRequest = axios.create({
  baseURL: baseURL,
})

let token = window.localStorage.getItem('token')
const Token = 'Token ' + token
export const config = {
  Headers: {
    Authorization: Token,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

// export const mediaConfig = token => {
//   const userToken = store.getState()?.auth?.User?.Token || token
//   return {
//     headers: {
//       Authorization: 'Token ' + userToken,
//     },
//   }
// }

// export const getConfig = token => {
//   const userToken = store.getState()?.auth?.User?.Token || token
//   return {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Token ' + userToken,
//     },
//   }
// }
