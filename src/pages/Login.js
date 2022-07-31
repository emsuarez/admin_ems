import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
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
    const obj = {
      username,
      password,
    }
    if (username && password) {
      await props.UserLogin(obj)
    } else {
      await props.setToast(
        'error',
        'Uno de los campos del formulario estan vacios.'
      )
    }
  }

  useEffect(() => {
    token = window.localStorage.getItem('token')
    tipo = window.localStorage.getItem('tipo')
    console.log(token, tipo)
    if (token) {
      switch (tipo) {
        case '1':
          navigate('/dashboard') //admin
          break
        case '2':
          navigate('/cctvdashboard') //cctv
          break
        case '3':
          navigate('/trsdashboard') //trs
          break
        default:
          return
      }

      // if (tipo === '1') {
      //   navigate('/dashboard') //admin
      // } else if (tipo === '2') {
      //   navigate('/cctvdashboard')
      // } else if (tipo === '3') {
      //   navigate('/trsdashboard')
      // }
    }
  }, [])

  return (
    <div className='bg-white flex h-screen justify-center'>
      <RedirectWithLogin />
      {/* LOGIN CARD */}
      <div className='flex flex-col justify-center items-center'>
        <img src={logo} alt='logo' className='h-32' />

        <div className='flex flex-col items-center'>
          <div className='flex space-x-2'>
            <h1 className='text-3xl font-bold'>
              ¡Bienvenido bitácora EMSECOR!
            </h1>
            {/* <ICONS.SparklesIconS className='h-10 pr-20 mt-0 md:mt-1 text-blue-600' /> */}
          </div>
          {/* EMAIL */}
          <div className='mt-10'>
            <p className='font-medium'>Usuario</p>
            <input
              className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
              onChange={item => setUsername(item.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className='mt-10'>
            <p className='font-medium'>Contraseña</p>
            <input
              className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
              type='password'
              onChange={item => setPassword(item.target.value)}
            />
          </div>

          <div className='flex mt-10 space-x-2 border-b-[1px] pb-4 justify-start'>
            <p className='mt-2 hover:underline text-lg hover:cursor-pointer text-gray-600'>
              ¿Olvidé mi contraseña?
            </p>
            <button
              onClick={() => handleLogin()}
              className='bg-blue-900 hover:bg-blue-800 text-white hover:cursor-pointer font-medium text-xl px-3 rounded-md'
            >
              Ingresar
            </button>
          </div>

          <div className='flex space-x-2 mt-5'>
            <p className='text-gray-600 text-lg'>¿No tienes una cuenta?</p>
            <p
              onClick={() => navigate('/register')}
              className='text-blue-800 font-medium hover:cursor-pointer hover:text-blue-700'
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
