import React from 'react'

const AlertCrudConfirm = ({ modal, setModal, handleGuardar }) => {
  return (
    <>
      {modal ? (
        <div className='flex justify-center w-full z-50 fixed'>
          <div className='mt-10 h-fit pb-4 rounded-md bg-white border-2 shadow-md z-50 lg:w-1/3 absolute'>
            <div className=' z-50 text-left pl-4 pt-2'>
              <h3 className='font-bold text-2xl'>
                Esta seguro de guardar su información?
              </h3>
            </div>

            <div className='flex justify-center space-x-4 mt-4'>
              <h3
                onClick={() => setModal(false)}
                className='border-2 w-20 rounded-md text-center font-semibold hover:cursor-pointer
                                hover:bg-slate-200 active:bg-slate-50'
              >
                Cancelar
              </h3>
              <h3
                onClick={() => handleGuardar()}
                className='border-2 w-20 rounded-md text-center font-semibold hover:cursor-pointer
                                hover:bg-slate-200 active:bg-slate-50'
              >
                Confirmar
              </h3>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default AlertCrudConfirm
