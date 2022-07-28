import React, { useEffect, useState } from 'react'
import { ICONS } from '../components/constants'
import authImage from '../assets/auth-image.jpg'
import authDecorator from '../assets/auth-decoration.png'
import logo from '../assets/logo.png'
import { Route, useNavigate, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserRegister } from '../store/actions'
import { RedirectWithLogin, Toast } from '../components'
// import { getTiposUsuarioAction } from '../store/actions'

const Registration = props => {
  const [usuario, setUsuario] = useState()
  const [nombres, setNombres] = useState()
  const [apellidos, setApellidos] = useState()
  const [email, setEmail] = useState()
  const [contraseña, setContraseña] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [tipo, setTipo] = useState(0)

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const cargarDataNivelUsuario = () => dispatch(getTiposUsuarioAction())

  //   cargarDataNivelUsuario()
  // }, [])

  const dataNivelUsuario = [
    {
      id: 1,
      title: 'Administrador',
    },
    {
      id: 2,
      title: 'Supervidor CCTV',
    },
    {
      id: 3,
      title: 'Supervisor TRS',
    },
  ]

  let navigate = useNavigate()

  //   var token
  //   var tipo

  const handleRegister = async dispatch => {
    const obj = {
      usuario,
      nombres,
      apellidos,
      email,
      contraseña,
      tipo,
    }
    if (usuario && contraseña && nombres && apellidos && email) {
      if (contraseña !== confirmPassword) {
        alert('[ERROR]. Password dont match!')
      } else {
        props.UserRegister(obj)
      }
    } else {
      alert('[ERROR]. Fill all Fields')
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
            <div className='mt-5'>
              <p className='font-medium'>Email</p>
              <input
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
                type='email'
                value={email}
                onChange={item => setEmail(item.target.value)}
              />
            </div>

            {/* Contraseña */}
            <div className='mt-5'>
              <p className='font-medium'>Contraseña</p>
              <input
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
                type='password'
                value={contraseña}
                onChange={item => setContraseña(item.target.value)}
              />
            </div>

            {/* Repite la Contraseña */}
            <div className='mt-5'>
              <p className='font-medium'>Repite la Contraseña</p>
              <input
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
                type='password'
                value={confirmPassword}
                onChange={item => setConfirmPassword(item.target.value)}
              />
            </div>

            {/* Select Nivel de Usuario */}
            <div className='mt-5'>
              <p className='font-medium'>Nivel de Usuario</p>
              <select
                className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none'
                id={tipo}
                value={tipo}
                onChange={item => setTipo(item.target.value)}
              >
                {dataNivelUsuario.map(nivelUser => (
                  <option key={nivelUser.id} value={nivelUser.id}>
                    {nivelUser.title}
                  </option>
                ))}
              </select>
            </div>
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
