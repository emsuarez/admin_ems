import { Box, Modal } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToast } from '../../store/actions'
import { ICONS } from '../constants'

const CerrarSesionModal = ({ userInfo, openModal, setModal }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const informes = useSelector(state => state.informes)
  const handleCerrarSesion = () => {
    const tipo = window.localStorage.getItem('tipo')

    if (tipo === '2') {
      if (informes.informesCctv.results[0].agente_entrante.length === 0) {
        dispatch(
          setToast(
            'error',
            'No se puede cerrar sesión, ingrese un agente de relevo en su útimo informe'
          )
        )
        setModal(false)
        navigate('/recepcionturnocctv')
        return
      }
    }

    if (tipo === '3') {
      if (informes.informesTrs.results[0].agente_entrante.length === 0) {
        dispatch(
          setToast(
            'error',
            'No se puede cerrar sesión, ingrese un agente de relevo en su útimo informe'
          )
        )
        setModal(false)
        navigate('/recepcionturno')
        return
      }
    }
    window.localStorage.clear()
    setModal(false)
    navigate('/')
  }

  return (
    // <>
    //   {modal ? (
    //     <div className='flex justify-center w-full z-50 fixed'>
    //       <div className='mt-10 h-fit pb-4 rounded-md bg-white border-2 shadow-md z-50 lg:w-1/3 absolute'>
    //         <div className=' z-50 text-left pl-4 pt-2'>
    //           <h3 className='font-bold text-2xl'>Estas por cerrar sesión</h3>
    //         </div>

    //         {userInfo.userData.tipo !== 1 ? (
    //           <>
    //             <p className='text-center mt-14'>
    //               Debes escojer a tu compañero que relevara tu puesto:
    //             </p>
    //             <div className='justify-center flex -mt-12'>
    //               <DropDown />
    //             </div>
    //           </>
    //         ) : null}

    //         <div className='flex justify-center space-x-4 mt-4'>
    //           <h3
    //             onClick={() => handleCerrarSesion()}
    //             className='border-2 w-20 rounded-md text-center font-semibold hover:cursor-pointer
    //                             hover:bg-slate-200 active:bg-slate-50'
    //           >
    //             Salir
    //           </h3>
    //           <h3
    //             onClick={() => setModal(false)}
    //             className='border-2 w-20 rounded-md text-center font-semibold hover:cursor-pointer
    //                             hover:bg-slate-200 active:bg-slate-50'
    //           >
    //             Cancelar
    //           </h3>
    //         </div>
    //       </div>
    //     </div>
    //   ) : null}
    // </>
    <>
      <Modal
        open={openModal}
        onClose={() => setModal(false)}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box>
          <div
            id='defaultModal'
            tabIndex='-1'
            aria-hidden='true'
            className=' overflow-y-auto overflow-x-hidden fixed top-1/3 left-1/3 w-96'
          >
            <div className='relative p-4 max-w-lg'>
              <div className='relative bg-white rounded-lg shadow '>
                <div className='flex justify-start items-start px-4 py-2 rounded-t border-b'>
                  <ICONS.ExclamationIconS className='w-14 pt-2 hover:cursor-pointer px-4 text-red-600 ' />
                  <h1 className='text-2xl font-bold'>Cerrar sesión</h1>
                </div>

                <div className='px-6 pt-2 space-y-3'>
                  <h2>Estas por cerrar sesión</h2>
                </div>
                {/* {usuarios && (
                  <div className='justify-center flex '>
                    <select
                      className='border-[1px] border-neutral-300 rounded-md py-1.5 w-full focus:border-blue-800 outline-none m-6'
                      id={user}
                      onChange={e => setUser(e.target.value)}
                      value={user}
                    >
                      <option value='0'>Seleccione un operador</option>
                      {Object.keys(usuarios).length > 0
                        ? usuarios.results.map(usuario => (
                            <option value={usuario.username}>
                              {usuario.first_name} {usuario.last_name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                )} */}

                <div className='flex items-end justify-end px-6 py-3 space-x-2 rounded-b border-t border-gray-200 '>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-blue-900 hover:bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-1.5 focus:z-10 '
                    onClick={() => handleCerrarSesion()}
                  >
                    Salir
                  </button>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-1.5 text-center '
                    onClick={() => setModal(false)}
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

export default CerrarSesionModal
