import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import {
  obtenerConsignasCCTVAction,
  obtenerConsignasGrafica,
  obtenerConsignasTRSAction,
  setToast,
  UserLogin,
} from '../store/actions'
import { ICONS, RedirectWithLogin } from '../components'

const Login = props => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [showPassword, setShowPassword] = useState(true)

  let navigate = useNavigate()

  useEffect(() => {
    token = window.localStorage.getItem('token')
    tipo = window.localStorage.getItem('tipo')

    if (token) {
      console.log('TOKEN ', token, 'Tipo', tipo)
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
    }
  }, [])

  var token
  var tipo

  const dispatch = useDispatch()
  const cargarConsignas = () => {
    dispatch(obtenerConsignasGrafica(1))
    dispatch(obtenerConsignasTRSAction())
    dispatch(obtenerConsignasCCTVAction())
  }

  const handleLogin = async () => {
    const obj = {
      username,
      password,
    }
    if (username && password) {
      await props.UserLogin(obj)

      cargarConsignas()
    } else {
      await props.setToast(
        'error',
        'Uno de los campos del formulario estan vacios.'
      )
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

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
              className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none order-2'
              onChange={item => setUsername(item.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className='mt-10 relative w-80'>
            <p className='font-medium'>Contraseña</p>
            <div>
              <div className='relative w-full'>
                <div className='absolute inset-y-0 right-0 flex items-center p-2'>
                  <span onClick={togglePassword}>
                    {!showPassword ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                        <path
                          fillRule='evenodd'
                          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z'
                          clipRule='evenodd'
                        />
                        <path d='M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z' />
                      </svg>
                    )}
                  </span>
                </div>
                <input
                  autoComplete='new-password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900 order-1'
                  id='newPassword'
                  name='newPassword'
                  type={showPassword ? 'password' : 'text'}
                  placeholder='Nueva contraseña'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
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
