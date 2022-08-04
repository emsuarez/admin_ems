import axios from 'axios'
import { store } from '../store/store'

const baseURL = 'https://cloudbitakor.com/api/1.0'

export const httpRequest = axios.create({
  baseURL: baseURL,
})

export const config = {
  Headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

export const mediaConfig = token => {
  const userToken = store.getState()?.auth?.User?.Token || token
  return {
    headers: {
      Authorization: 'Token ' + userToken,
    },
  }
}

export const getConfig = token => {
  const userToken = store.getState()?.auth?.User?.Token || token
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + userToken,
    },
  }
}
