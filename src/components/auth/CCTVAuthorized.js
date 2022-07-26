import React from 'react'
import { Navigate } from 'react-router-dom'

const CCTVAuthorized = () => {
  var token = window.localStorage.getItem('token')
  var tipo = window.localStorage.getItem('tipo')

  if (token == null || tipo == null) {
    return <Navigate to='/' replace={true} />
  } else if (tipo !== '2') {
    return -1
  }
}

export default CCTVAuthorized
