import React, { useEffect, useState } from 'react'
import { ICONS } from '../components/constants'
import authImage from '../assets/auth-image.jpg'
import authDecorator from '../assets/auth-decoration.png'
import logo from '../assets/logo.png'
import { Route, useNavigate, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { setToast, UserLogin } from '../store/actions'
import { RedirectWithLogin } from '../components'

const Login = props => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  let navigate = useNavigate()

  var token
  var tipo

  const handleLogin = async () => {
    console.log('handleLogin')
    const obj = {
      username,
      password,
    }
    if (username && password) {
      await props.UserLogin(obj)
      token = window.localStorage.getItem('token')
      tipo = window.localStorage.getItem('tipo')
      if (token) {
        if (tipo === '1') {
          navigate('/dashboard') //admin
        } else if (tipo === '2') {
          navigate('/cctvdashboard')
        } else if (tipo === '3') {
          navigate('/trsdashboard')
        }
      }
    } else {
      await props.setToast(
        'error',
        'Uno de los campos del formulario estan vacios.'
      )
      //dispatch(setToast('error',result.message))
    }
  }

  return (
    <div className='bg-white  flex h-screen w-screen justify-center overflow-hidden'>
      <RedirectWithLogin />
      {/* LOGIN CARD */}
      <div className='flex bg-white shadow-md border-2 lg:px-52 -mt-32 md:mt-0   flex-col justify-center'>
        <div className=''>
          <img src={logo} className='h-24 flex ml-28 -mt-1' />
        </div>

        <div className='items-center mx-8'>
          <div className='flex space-x-2'>
            <h1 className='text-4xl font-semibold'>¡Bienvenido de nuevo!</h1>
            <ICONS.SparklesIconS className='h-10 pr-20 mt-0 md:mt-1 text-blue-600' />
          </div>
          {/* EMAIL */}
          <div className='mt-10'>
            <p className='font-medium'>Usuario</p>
            <input
              className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-96 focus:border-blue-500 outline-none'
              onChange={item => setUsername(item.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className='mt-10'>
            <p className='font-medium'>Contraseña</p>
            <input
              className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-96 focus:border-blue-500 outline-none'
              type='password'
              onChange={item => setPassword(item.target.value)}
            />
          </div>

          <div className='flex justify-between mt-10 border-b-[1px] pb-8'>
            <p className='ml-2 mt-2 underline text-lg hover:cursor-pointer hover:no-underline text-gray-600'>
              ¿Olvidé mi contraseña?
            </p>
            <h4
              onClick={() => handleLogin()}
              className='bg-blue-600 hover:bg-blue-500 text-white hover:cursor-pointer font-medium text-lg p-2 rounded-lg'
            >
              Ingresar{' '}
            </h4>
          </div>

          <div className='flex space-x-2 mt-10'>
            <p className='text-gray-600'>¿No tienes una cuenta?</p>
            <p
              onClick={() => navigate('/register')}
              className='text-blue-600 font-medium hover:cursor-pointer hover:text-blue-700'
            >
              Regístrate
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = props => {
  return {
    isLoading: props.auth.isLoading,
  }
}

export default connect(mapStateToProps, { UserLogin, setToast })(Login)
