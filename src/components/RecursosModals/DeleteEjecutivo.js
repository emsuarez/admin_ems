import { Box, Modal } from '@mui/material'
import React from 'react'

import { ICONS } from '../constants'

const DeleteEjecutivo = ({
  tipo,
  openModal,
  handleClose,
  tituloModal,
  descripcionModal,
  handleAction,
  itemEliminar,
}) => {
  const handleEjectAction = () => {
    handleAction(itemEliminar)
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box>
          <div
            id='defaultModal'
            tabindex='-1'
            aria-hidden='true'
            className=' overflow-y-auto overflow-x-hidden fixed top-1/3 right-0 left-1/3 z-50 w-full inset-0 h-modal'
          >
            <div className='relative p-4 max-w-lg'>
              <div className='relative bg-white rounded-lg shadow '>
                <div className='flex justify-between items-start px-4 py-2 rounded-t border-b'>
                  <ICONS.ExclamationIconS className='w-14 pt-2 hover:cursor-pointer px-4 text-red-600 ' />
                  <h1 className='text-2xl font-bold'>{tituloModal}</h1>
                  <button
                    type='button'
                    className='bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                    data-modal-toggle='defaultModal'
                    onClick={handleClose}
                  >
                    <span className='sr-only'>Cerrar modal</span>
                  </button>
                </div>

                <div className='px-6 pt-2 space-y-3'>
                  <h2>{descripcionModal}</h2>
                  {tipo === 'Ejecutivo' ? (
                    <ul className='list-disc ml-16'>
                      <li>Historial</li>
                      <li>Miembros familiares</li>
                    </ul>
                  ) : null}
                </div>

                <div className='flex items-end justify-end px-6 py-3 space-x-2 rounded-b border-t border-gray-200 '>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-blue-900 hover:bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-1.5 focus:z-10 '
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-7 py-1.5 text-center '
                    onClick={handleEjectAction}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default DeleteEjecutivo
