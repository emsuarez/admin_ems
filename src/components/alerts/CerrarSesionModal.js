import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropDown } from '../constants'

const CerrarSesionModal = ({ userInfo, modal, setModal }) => {
  const navigate = useNavigate()
  useEffect(() => {
    console.log(userInfo.userData.tipo)
  }, [])

  const handleCerrarSesion = () => {
    window.localStorage.clear()
    setModal(false)
    navigate('/')
  }
  
  return (
    <>
      {modal ? (
        <div className='flex justify-center w-full z-50 fixed'>
          <div className='mt-10 h-fit pb-4 rounded-md bg-white border-2 shadow-md z-50 lg:w-1/3 absolute'>
            <div className=' z-50 text-left pl-4 pt-2'>
              <h3 className='font-bold text-2xl'>Estas por cerrar sesión</h3>
            </div>

            {userInfo.userData.tipo !== 1 ? (
              <>
                <p className='text-center mt-14'>
                  Debes escojer a tu compañero que relevara tu puesto:
                </p>
                <div className='justify-center flex -mt-12'>
                  <DropDown />
                </div>
              </>
            ) : null}

            <div className='flex justify-center space-x-4 mt-4'>
              <h3
                onClick={() => handleCerrarSesion()}
                className='border-2 w-20 rounded-md text-center font-semibold hover:cursor-pointer
                                hover:bg-slate-200 active:bg-slate-50'
              >
                Salir
              </h3>
              <h3
                onClick={() => setModal(false)}
                className='border-2 w-20 rounded-md text-center font-semibold hover:cursor-pointer
                                hover:bg-slate-200 active:bg-slate-50'
              >
                Cancelar
              </h3>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default CerrarSesionModal
