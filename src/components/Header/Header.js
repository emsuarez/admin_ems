import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { DropDown } from '../constants'
import CCTV from './CCTV'
import Recursos from './Recursos'
import RightImage from './RightImage'
import TRS from './TRS'
import Usuarios from './Usuarios'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfoAction } from '../../store/actions'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [modal, setModal] = useState(false)
  const [items, setItems] = useState('')

  const handleModal = () => {
    setModal(!modal)
  }
  const Leave = () => {
    handleModal()
    navigate('/')
  }
  const [tipoDashboard, setTipoDashboard] = useState('')

  useEffect(() => {
    const tipo = window.localStorage.getItem('tipo')
    switch (tipo) {
      case '1':
        setTipoDashboard('/dashboard') //admin
        setItems('all')
        break
      case '2':
        setTipoDashboard('/cctvdashboard') //cctv
        setItems('cctv')
        break
      case '3':
        setTipoDashboard('/trsdashboard') //trs
        setItems('trs')
        break
      default:
        return
    }

    const cargarInfoUsuario = () => {
      dispatch(getUserInfoAction())
    }
    cargarInfoUsuario()
  }, [])

  const userInfo = useSelector(state => state.auth.user)

  return (
    <div>
      <div className='flex sticky top-0 z-50 h-16 bg-white items-center p-2 lg:px-5 shadow-2xl shadow-gray-800/40 '>
        {/* Left */}
        <div className='flex items-center'>
          <Link to={tipoDashboard}>
            <img src={logo} className='w-28 ml-6 -mt-1 hover:cursor-pointer' />
          </Link>
        </div>

        {/* Center */}
        <nav className='hidden md:flex ml-14 border-2 divide-x-2'>
          {(items == 'all' || items == 'recursos') && (
            <div className='px-4  hover:border-b-blue-500 hover:border-b-2  hover:cursor-pointer py-1'>
              <Recursos item={items} />
            </div>
          )}
          {(items == 'all' || items == 'trs') && (
            <div className='px-4 hover:border-b-blue-500 hover:border-b-2  hover:cursor-pointer py-1'>
              <TRS item={items} />
            </div>
          )}
          {(items == 'all' || items == 'cctv') && (
            <div className='px-4  hover:border-b-blue-500  hover:border-b-2  hover:cursor-pointer py-1'>
              <CCTV item={items} />
            </div>
          )}
          {items == 'all' && (
            <div className='px-4  hover:border-b-blue-500  hover:border-b-2  hover:cursor-pointer py-1'>
              <Usuarios item={items} />
            </div>
          )}
        </nav>

        {/* Right */}
        <div className='flex items-center sm:space-x-2 flex-grow justify-end md:pr-10 '>
          {/* <Notification /> */}
          {/* <ICONS.SpeakerphoneIconO className='icon' /> */}
          <div className='cursor-pointer md:mx-3 p-1 hover:bg-blue-600 hover:p-1 hover:rounded-full hover:text-white'>
            <svg
              className='h-6 w-6 text-gray-600  hover:text-inherit'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
          </div>
          <RightImage handleModal={() => Leave()} userInfo={userInfo} />
        </div>
      </div>

      {/* MOBILE */}
      <div>
        <nav className=' justify-center md:hidden flex h-10 bg-slate-200 border-blue-200  space-x-2'>
          {(items == 'all' || items == 'recursos') && <Recursos item={items} />}
          {(items == 'all' || items == 'trs') && <TRS item={items} />}
          {(items == 'all' || items == 'cctv') && <CCTV item={items} />}
        </nav>
      </div>

      {modal &&
      (items === 'cctv' || items === 'trs' || items === 'recursos') ? (
        <div className='flex justify-center w-full z-50 fixed'>
          <div className='mt-10 h-fit pb-4 rounded-md bg-white border-2 shadow-md z-50 lg:w-1/3 absolute'>
            <div className=' z-50 text-left pl-4 pt-2'>
              <h3 className='font-bold text-2xl'>Estas por cerrar sesión</h3>
            </div>
            <p className='text-center mt-14'>
              Debes escojer a tu compañero que relevara tu puesto:
            </p>

            <div className='justify-center flex -mt-12'>
              <DropDown />
            </div>

            <div className='flex justify-center space-x-4 mt-4'>
              <h3
                onClick={() => Leave()}
                className='border-2 w-20 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-slate-200 active:bg-slate-50'
              >
                Salir
              </h3>
              <h3
                onClick={() => handleModal()}
                className='border-2 w-20 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-slate-200 active:bg-slate-50'
              >
                Cancelar
              </h3>
            </div>
          </div>
        </div>
      ) : // navigate('/')
      // setNavegar(true)
      null}
    </div>
  )
}

export default Header
