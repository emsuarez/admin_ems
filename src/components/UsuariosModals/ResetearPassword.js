import { Dialog } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../../store/actions'

const ResetearPassword = ({
  openModal,
  handleClose,
  tituloModal,
  descripcionModal,
  handleAction,
  itemEditar,
}) => {
  const dispatch = useDispatch()

  const [idUsuario, setIdUsuario] = useState()
  const [username, setUsername] = useState()
  const [nuevaContrasenia, setNuevaContrasenia] = useState('')
  const [repetirContrasenia, setRepetirContrasenia] = useState('')

  const [showPassword, setShowPassword] = useState(true)
  const [showRepetirPassword, setShowRepetirPassword] = useState(true)
  useEffect(() => {
    console.log(itemEditar, 'itemEditar')
    const cargarUsuarioSeleccionado = () => {
      setIdUsuario(itemEditar.id)
      setUsername(itemEditar.username)
    }
    cargarUsuarioSeleccionado()
  }, [itemEditar])

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleRepetirPassword = () => {
    setShowRepetirPassword(!showRepetirPassword)
  }

  const handleEjectAndClean = () => {
    if (nuevaContrasenia === repetirContrasenia) {
      const usuario = {
        id: itemEditar.user_id,
        nuevacontraseña: nuevaContrasenia,
      }

      handleAction(usuario)
      setUsername('')
      setNuevaContrasenia('')
      setRepetirContrasenia('')
    } else {
      dispatch(setToast('error', 'Las contraseñas no coinciden'))
      setUsername('')
      setNuevaContrasenia('')
      setRepetirContrasenia('')
    }
  }

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={(_, reason) => reason === 'backdropClick' && handleClose()}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
        PaperProps={{ sx: { width: '30%' } }}
      >
        <Box>
          <div
            aria-hidden='true'
            className=' overflow-y-auto top-1/4 left-1/3 '
          >
            <div className='relative w-full'>
              <div className='relative rounded-lg shadow '>
                <div className='flex justify-between items-start px-4 py-2 rounded-t border-b'>
                  <h1 className='text-2xl font-bold'>{tituloModal}</h1>
                </div>

                <div className='px-6 pt-2 space-y-3'>
                  <h2>{descripcionModal}</h2>

                  <div className='flex flex-col mx-3 '>
                    <div className='flex justify-between'>
                      <label
                        for='username'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Usuario:
                      </label>
                    </div>
                    <div>
                      <input
                        type='text'
                        name='username'
                        id='username'
                        className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                        placeholder='Usuario'
                        value={username}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col mx-3'>
                    <div className='flex justify-between'>
                      <label
                        for='newPassword'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Nueva contraseña:
                      </label>
                    </div>
                    <div>
                      <div class='relative w-full'>
                        <div class='absolute inset-y-0 right-0 flex items-center p-2'>
                          <span>
                            <button onClick={togglePassword}>
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
                        <input
                          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                          id='password'
                          type={showPassword ? 'password' : 'text'}
                          autoComplete='off'
                          placeholder='Nueva contraseña'
                          value={nuevaContrasenia}
                          onChange={e => setNuevaContrasenia(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col mx-3'>
                    <div className='flex justify-between'>
                      <label
                        for='repeatPassword'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Repetir nueva contraseña:
                      </label>
                    </div>
                    <div>
                      <div class='relative w-full'>
                        <div class='absolute inset-y-0 right-0 flex items-center p-2'>
                          <span>
                            <button onClick={toggleRepetirPassword}>
                              {!showRepetirPassword ? (
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
                        <input
                          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                          id='repeatPassword'
                          type={showRepetirPassword ? 'password' : 'text'}
                          autoComplete='off'
                          placeholder='Repetir nueva contraseña'
                          value={repetirContrasenia}
                          onChange={e => setRepetirContrasenia(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex items-end justify-end px-6 py-3 mt-3 space-x-2 rounded-b border-t border-gray-200 '>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-7 py-1.5 text-center '
                    onClick={() => {
                      handleEjectAndClean()
                    }}
                  >
                    Actualizar
                  </button>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-1.5 focus:z-10 '
                    onClick={handleClose}
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

export default ResetearPassword
