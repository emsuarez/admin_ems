import axios from 'axios'
import '../global'
import { store } from '../store/store'
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

httpRequest.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.localStorage.removeItem('token')
      window.localStorage.clear()
      window.location.href = '/login'
    }
  }
)

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
