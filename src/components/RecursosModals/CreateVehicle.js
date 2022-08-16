import { Box, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { CreateNewVehicleEjecutivo } from '../../store/actions'
import { ICONS } from '../constants'

const CreateVehicle = ({ tituloModal, descripcionModal, handleAction }) => {
  // const {Create,setCreate} = props
  // const [nombre,setNombre] = useState()
  // const [alias,setAlias] = useState()
  // const [placas,setPlacas] = useState()
  // const [tipo,setTipo] = useState()
  // const [ejecutivoData,setEjecutivoData] = useState()
  // const [ejecutivoID,setEjecutivoID] = useState()

  // const handleGetEjecutivos=async()=>{
  //     ejecutivoData = await fetch('https://cloudbitakor.com/api/1.0/ejecutivo/', {
  //       method: 'get',
  //       headers: new Headers({
  //         "Authorization":"Token "+window.localStorage.getItem('token')
  //       })
  //     }).then(response => response.json())
  //     .then(data => setEjecutivoData(data));
  //   }
  //   useEffect(()=>{
  //     handleGetEjecutivos();
  //   },[ejecutivoData])

  // const handleCancel = () =>{
  //     setCreate(false)
  // }

  // const handleCreate=()=>{
  //     const obj={
  //         nombres:nombre,
  //         id_ejecutivo:ejecutivoID,
  //         placas,
  //         alias,
  //         tipo
  //     }
  //     props.CreateNewVehicleEjecutivo(obj)
  //     setCreate(false)
  // }
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    // setNombres('')
    // setAlias('')
  }

  const handleEjectAndClean = () => {
    // const datos = { nombres, alias }
    // handleAction(datos)
    // setNombres('')
    // setAlias('')
    setOpen(false)
  }

  return (
    <>
      <button
        className='bg-blue-900 hover:bg-blue-800 text-white font-bold  p-2 rounded'
        onClick={handleOpen}
      >
        {tituloModal}
      </button>
      <Modal
        open={open}
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
                  <h1 className='text-2xl font-bold'>{tituloModal}</h1>
                  <button
                    type='button'
                    className='bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                    data-modal-toggle='defaultModal'
                    onClick={handleClose}
                  >
                    <svg
                      aria-hidden='true'
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                    <span className='sr-only'>Cerrar modal</span>
                  </button>
                </div>

                <div className='px-6 pt-2 space-y-3'>
                  <h2>{descripcionModal}</h2>
                  <div className='mx-3'>
                    <label
                      for='nombre'
                      className='block text-sm font-medium text-gray-900 '
                    >
                      Nombre del vehículo:
                    </label>
                    <input
                      type='text'
                      name='nombre'
                      id='nombre'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                      placeholder='Nombre del vehículo'
                      //   value={nombres}
                      //   onChange={e => setNombres(e.target.value)}
                      required
                    />
                  </div>
                  <div className='flex flex-col mx-3'>
                    <div className='flex justify-between'>
                      <label
                        for='nombre'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Placas<span className=''> (opcional)</span>:
                      </label>
                    </div>
                    <div>
                      <input
                        type='text'
                        name='alias'
                        id='alias'
                        className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                        placeholder='Placas'
                        // value={alias}
                        // onChange={e => setAlias(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-col mx-3'>
                    <div className='flex justify-between'>
                      <label
                        for='nombre'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Alias<span className='text-red-600'>*</span>:
                      </label>
                    </div>
                    <div>
                      <input
                        type='text'
                        name='alias'
                        id='alias'
                        className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                        placeholder='Alias'
                        // value={alias}
                        // onChange={e => setAlias(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-col mx-3'>
                    <div className='flex justify-between'>
                      <label
                        for='nombre'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        Tipo:
                      </label>
                    </div>
                    <div>
                      <input
                        type='text'
                        name='alias'
                        id='alias'
                        className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                        placeholder='Tipo'
                        // value={alias}
                        // onChange={e => setAlias(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-col mx-3'>
                    <div className='flex justify-between'>
                      <label
                        for='nombre'
                        className='block text-sm font-medium text-gray-900 '
                      >
                        PROPIETARIO<span className='text-red-600'>*</span>:
                      </label>
                    </div>
                    <div>
                      <input
                        type='text'
                        name='alias'
                        id='alias'
                        className='mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-900'
                        placeholder='Propietario'
                        // value={alias}
                        // onChange={e => setAlias(e.target.value)}
                        required
                      />
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
                    Crear
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
      </Modal>
    </>
  )
}

const mapStateToProps = props => {
  return {
    ejecutivo: props.recursos.ejecutivo,
  }
}
export default connect(mapStateToProps, { CreateNewVehicleEjecutivo })(
  CreateVehicle
)
