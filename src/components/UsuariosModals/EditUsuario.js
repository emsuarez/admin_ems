import { Dialog } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTiposUsuarioAction } from '../../store/actions'

const EditUsuario = ({
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
  const [nombres, setNombres] = useState()
  const [apellidos, setApellidos] = useState()
  const [cargo, setCargo] = useState()

  useEffect(() => {
    const cargarCargosUsuario = () => {
      dispatch(getTiposUsuarioAction())
    }
    cargarCargosUsuario()
  }, [])

  const cargos = useSelector(state => state.auth.roles)

  useEffect(() => {
    console.log(itemEditar, 'itemEditar')
    const cargarUsuarioSeleccionado = () => {
      setIdUsuario(itemEditar.id)
      setUsername(itemEditar.username)
      setNombres(itemEditar.first_name)
      setApellidos(itemEditar.last_name)
      setCargo(itemEditar.tipo)
    }
    cargarUsuarioSeleccionado()
  }, [itemEditar])

  const handleEjectAndClean = () => {
    const usuario = {
      id: itemEditar.user_id,
      usuario: username,
      nombres: nombres,
      apellidos: apellidos,
      tipo: cargo,
      email: '',
      imagen: '',
    }

    handleAction(usuario)
    setUsername('')
    setNombres('')
    setApellidos('')
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
                        autoComplete='off'
                        type='text'
                        name='username'
                        id='username'
                        className=' bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                        placeholder='Usuario'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-col mx-3'>
                    <div className='flex justify-between'>
                      <label
                        for='nombres'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Nombres:
                      </label>
                    </div>
                    <div>
                      <input
                        autoComplete='off'
                        type='text'
                        name='nombres'
                        id='nombres'
                        className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                        placeholder='Nombres'
                        value={nombres}
                        onChange={e => setNombres(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-col mx-3'>
                    <div className='flex justify-between'>
                      <label
                        for='apellidos'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Apellidos:
                      </label>
                    </div>
                    <div>
                      <input
                       autoComplete='off'
                        type='text'
                        name='apellidos'
                        id='apellidos'
                        className='mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                        placeholder='Apellidos'
                        value={apellidos}
                        onChange={e => setApellidos(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-col mx-3'>
                    <div className='flex justify-between'>
                      <label
                        for='cargo'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Cargo:<span className='text-red-600'>*</span>:
                      </label>
                    </div>
                    <div>
                      {/* Select Propietarios */}
                      <select
                        className='mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5 outline-blue-900'
                        id={cargo}
                        value={cargo}
                        onChange={e => setCargo(e.target.value)}
                      >
                        {cargos.map(rol => (
                          <option key={rol.id} value={rol.id}>
                            {rol.rol}
                          </option>
                        ))}
                      </select>
                    </div>
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

export default EditUsuario
