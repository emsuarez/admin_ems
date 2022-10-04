import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { RedirectWithLogin } from '../components'
import { getTiposUsuarioAction, UserRegister } from '../store/actions'

const Registration = props => {
  const [usuario, setUsuario] = useState()
  const [nombres, setNombres] = useState()
  const [apellidos, setApellidos] = useState()
  const [email, setEmail] = useState()
  const [contraseña, setContraseña] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const [tipo, setTipo] = useState(0)

  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    const cargarDataNivelUsuario = () => dispatch(getTiposUsuarioAction())

    cargarDataNivelUsuario()
  }, [])

  const roles = useSelector(state => state.auth.roles)

  let navigate = useNavigate()

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleRegister = async dispatch => {
    const obj = {
      usuario,
      nombres,
      apellidos,
      email: 'temporal@mail.com',
      contraseña,
      tipo,
    }

    if (usuario && contraseña && nombres && apellidos) {
      if (contraseña !== confirmPassword) {
        alert('[ERROR]. Las contraseñas no coinciden!')
      } else {
        props.UserRegister(obj)
      }
    } else {
      alert('[ERROR]. Llene todos los campos!')
    }
  }

  return (
    <div className='flex bg-white justify-center my-5'>
      <RedirectWithLogin />
      {/*  CARD */}
      <div className='flex flex-col justify-center items-center'>
        <img src={logo} alt='logo' className='h-32' />

        <div className='flex flex-col items-center'>
          <h1 className='text-3xl font-bold text-center'>
            Completa tu registro para ingresar a EMSECOR
          </h1>

          <div className='flex flex-col mt-8'>
            {/* User */}
            <div className='mt-0'>
              <p className='font-medium'>Usuario</p>
              <input
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
                value={usuario}
                onChange={item => setUsuario(item.target.value)}
              />
            </div>

            {/* NAME */}
            <div className='mt-5'>
              <p className='font-medium'>Nombres</p>
              <input
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
                value={nombres}
                onChange={item => setNombres(item.target.value)}
              />
            </div>

            {/* SURNAME */}
            <div className='mt-5'>
              <p className='font-medium'>Apellidos</p>
              <input
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
                value={apellidos}
                onChange={item => setApellidos(item.target.value)}
              />
            </div>

            {/* EMAIL */}
            {/* <div className='mt-5'>
              <p className='font-medium'>Email</p>
              <input
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
                type='email'
                value={email}
                onChange={item => setEmail(item.target.value)}
              />
            </div> */}

            {/* Contraseña */}
            <div className='mt-5 relative'>
              <p className='font-medium'>Contraseña</p>
              <input
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none w-full'
                type={showPassword ? 'password' : 'text'}
                value={contraseña}
                onChange={item => setContraseña(item.target.value)}
              />
              <span className='absolute inset-y-0 flex items-center pt-3 ml-72'>
                <button onClick={togglePassword} className='pt-2'>
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
                </button>
              </span>
            </div>

            {/* Repite la Contraseña */}
            <div className='mt-5 relative'>
              <p className='font-medium'>Repite la Contraseña</p>
              <input
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none w-full'
                type={showConfirmPassword ? 'password' : 'text'}
                value={confirmPassword}
                onChange={item => setConfirmPassword(item.target.value)}
              />
              <span className='absolute inset-y-0 flex items-center pt-3 ml-72'>
                <button onClick={toggleConfirmPassword} className='pt-2'>
                  {!showConfirmPassword ? (
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
                </button>
              </span>
            </div>

            {/* Select Nivel de Usuario */}
            {roles.length === 0 ? null : (
              <div className='mt-5'>
                <p className='font-medium'>Nivel de Usuario</p>
                <select
                  className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
                  id={tipo}
                  value={tipo}
                  onChange={item => setTipo(item.target.value)}
                >
                  <option value='0'>Seleccione nivel de usuario</option>
                  {roles.map(nivelUser => (
                    <option key={nivelUser.id} value={nivelUser.id}>
                      {nivelUser.rol}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className='space-x-3 mt-5 flex flex-row items-center'>
            <p
              className='ml-2 mt-2 flex flex-col justify-center text-lg
                        hover:no-underline text-gray-600 w-80'
            >
              Al registrarte el administrador recibira tu información para
              aprobar tu registro.
            </p>

            <button
              onClick={() => handleRegister()}
              className='bg-blue-900 hover:bg-blue-800 
                        text-white hover:cursor-pointer font-medium text-xl px-3 py-1 rounded-md'
            >
              Registrarte
            </button>
          </div>

          <div className='flex justify-center space-x-2 mt-5'>
            <p className='text-gray-600'>¿Tienes ya tus credenciales?</p>
            <p
              onClick={() => navigate('/')}
              className='text-blue-800 font-medium hover:cursor-pointer hover:text-blue-700'
            >
              Ingresar
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

export default connect(mapStateToProps, { UserRegister })(Registration)
