import { Box, Dialog } from '@mui/material'

import React, { useEffect, useState } from 'react'

const CrearEditarModalGenerico = ({
  tipoModal,
  openModal,
  handleClose,
  tituloModal,
  descripcionModal,
  handleAction,
  itemSeleccionado,
  dataSeleccionable,
}) => {
  const [nuevoValor, setNuevoValor] = useState('')

  useEffect(() => {
    setNuevoValor(itemSeleccionado)
  }, [itemSeleccionado])

  const handleEjectAndClean = () => {
    handleAction(nuevoValor)
    setNuevoValor('')
  }
  return (
    <div>
      <Dialog
        open={openModal}
        onClose={(_, reason) => reason === 'backdropClick' && handleClose()}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box>
          <div
            id='defaultModal'
            tabIndex='-1'
            aria-hidden='true'
            className=' overflow-y-auto overflow-x-hidden fixed top-1/4 left-1/3'
          >
            <div className='relative p-4 max-w-lg'>
              <div className='relative bg-white rounded-lg shadow '>
                <div className='flex justify-between items-start px-4 py-2 rounded-t border-b'>
                  <h1 className='text-2xl font-bold'>{tituloModal}</h1>
                </div>

                <div className='px-6 pt-2 space-y-3'>
                  <h2>{descripcionModal}</h2>

                  <div className='flex flex-col mx-3'>
                    {/* <div className='flex justify-between'>
                      <label
                        for='alias'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Alias<span className='text-red-600'>*</span>:
                      </label>
                    </div> */}
                    {tipoModal === 'agregarProtector' ? (
                      <select
                        className='mb-2 border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-full p-2.5'
                        id={nuevoValor}
                        value={nuevoValor}
                        onChange={e => setNuevoValor(e.target.value)}
                      >
                        <option value='0'>Seleccione un Protector</option>
                        {Object.keys(dataSeleccionable).length > 0
                          ? dataSeleccionable.results.map(prot => (
                              <option key={prot.id} value={prot.alias}>
                                {prot.nombres}
                              </option>
                            ))
                          : null}
                      </select>
                    ) : tipoModal === 'agregarTrabajador' ? (
                      <select
                        className='mb-2 border-[1px] border-neutral-300 rounded-md focus:border-blue-800 outline-none w-full p-2.5'
                        id={nuevoValor}
                        value={nuevoValor}
                        onChange={e => setNuevoValor(e.target.value)}
                      >
                        <option value='0'>Seleccione un Trabajador</option>
                        {Object.keys(dataSeleccionable).length > 0
                          ? dataSeleccionable.results.map(prot => (
                              <option key={prot.id} value={prot.alias}>
                                {prot.nombres}
                              </option>
                            ))
                          : null}
                      </select>
                    ) : (
                      <div>
                        {tipoModal === 'crearTextArea' ||
                        tipoModal === 'actualizarTextArea' ? (
                          <textarea
                            type='text'
                            name='alias'
                            id='alias'
                            className='mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                            placeholder=''
                            value={nuevoValor}
                            onChange={e => setNuevoValor(e.target.value)}
                            required
                          />
                        ) : (
                          <input
                            type='text'
                            name='alias'
                            id='alias'
                            className='mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                            placeholder=''
                            value={nuevoValor}
                            onChange={e => setNuevoValor(e.target.value)}
                            required
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className='flex items-end justify-end px-6 py-3 space-x-2 rounded-b border-t border-gray-200 '>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-7 py-1.5 text-center '
                    onClick={() => {
                      handleEjectAndClean()
                    }}
                  >
                    {tipoModal === 'crear' || tipoModal === 'crearTextArea'
                      ? 'Crear'
                      : 'Actualizar'}
                  </button>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-1.5 focus:z-10 '
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  )
}

export default CrearEditarModalGenerico
