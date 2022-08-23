import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Login } from '../../pages'

const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    const logeado = window.localStorage.getItem('token')
    if (logeado) {
      setIsAuth(true)
    }
  }, [])

  return isAuth !== '' ? <Outlet /> : <Login />
}

export default ProtectedRoutes
