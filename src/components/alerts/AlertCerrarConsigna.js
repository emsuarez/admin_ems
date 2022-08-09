import React, { useEffect } from 'react'
import { DropDown } from '../constants'

const AlertCerrarConsigna = ({
  modal,
  setModal,
  infoConsigna,
  handleCerrarConsigna,
}) => {
  return (
    <>
      {modal ? (
        <div className='flex justify-center w-full z-50 fixed'>
          <div className='mt-10 h-fit pb-4 rounded-md bg-white border-2 shadow-md z-50 lg:w-1/3 absolute'>
            <div className=' z-50 text-left pl-4 pt-2'>
              <h3 className='font-bold text-2xl'>
                Estas por cerrar la siguiente consigna:
              </h3>
            </div>

            <p className='text-center mt-14  bg-blue-900 text-white mx-10 rounded-lg'>
              {infoConsigna.obs_creacion}
            </p>
            <p className='text-center mt-6'>
              Agregue una observación de cierre para su consigna:
            </p>
            <div className='justify-center flex '>
              <input
                type='text'
                className='w-full mx-10 p-5 my-5 border-2 border-gray-200 outline-blue-900'
              />
            </div>

            <div className='flex justify-center space-x-4 mt-4'>
              <h3
                onClick={() => handleCerrarConsigna()}
                className='border-2 w-20 rounded-md text-center font-semibold hover:cursor-pointer
                              hover:bg-slate-200 active:bg-slate-50'
              >
                Confirmar
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

export default AlertCerrarConsigna
