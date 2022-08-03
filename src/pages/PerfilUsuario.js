import React, { useEffect, useState } from 'react'
import { Header, ICONS, RedirectWithoutLogin } from '../components'
import user from '../assets/user.jpg'
import { useSelector } from 'react-redux'
import { info } from 'autoprefixer'

const PerfilUsuario = () => {
  const [editarInformacion, setEditarInformacion] = useState(true)

  const infoUsuario = useSelector(state => state.auth.user.userData)
  const [usuarioState, setUsuarioState] = useState({})

  useEffect(() => {
    setUsuarioState(infoUsuario)
  }, [])

  const handleEditarInformacion = () => {
    setEditarInformacion(!editarInformacion)
  }

  const handleCancelar = () => {
    setEditarInformacion(true)
    setUsuarioState(infoUsuario)
  }

  const handleGuardar = usuarioState => {
    console.log(usuarioState)
  }

  return (
    <div>
      <RedirectWithoutLogin />
      <>
        <Header />
        <div className='flex items-center bg-slate-100 py-2'>
          <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
          <p className=' ml-1'>Perfil</p>
          {editarInformacion === false ? (
            <>
              <ICONS.ChevronRightIconO className='h-3  ml-1' />
              <p className=' ml-1'>Editar perfil</p>
            </>
          ) : null}
        </div>
        <div className='mx-10'>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-start w-full bg-blue-900 pt-20 h-56 z-10'>
              <div className='ml-28'>
                <div className='mr-10 bg-white rounded-[50%]'>
                  <img
                    src={`https://cloudbitakor.com${infoUsuario.imagen}`}
                    alt='imagen de usuario'
                    className={
                      editarInformacion
                        ? 'w-72 rounded-[50%] border-red-700 border-2 p-2'
                        : 'w-72 rounded-[50%] border-red-700 border-2 p-2 hover:opacity-25 hover:cursor-help'
                    }
                  />
                </div>
              </div>
              <div className='text-white text-5xl font-semibold mt-10'>
                PERFIL
              </div>
            </div>

            <div className='text-4xl font-bold mt-10 ml-48'>
              Información básica
            </div>

            <div className='w-full border-b-2 mt z-0 border-gray-300 border-solid'></div>

            <div className='flex flex-col mt-10 w-full'>
              <div className='flex justify-around'>
                <div className='basis-1/8 flex flex-col items-center '>
                  <div className='mt-16 font-semibold text-4xl'>
                    {infoUsuario.first_name + ' ' + infoUsuario.last_name}
                  </div>
                  <div className='text-2xl font-semibold text-gray-400 mt-2'>
                    {infoUsuario.tipo === 1
                      ? 'Administrador'
                      : infoUsuario.tipo
                      ? 'CCTV'
                      : 'TRS'}
                  </div>
                  <div className='mt-5 '>
                    <button className='bg-blue-900 hover:bg-blue-800 text-white hover:cursor-pointer font-medium text-xl px-8 py-3 rounded-md'>
                      Ver Notificaciones
                    </button>
                  </div>
                </div>
                <div className='basis-1/2 flex flex-col items-center'>
                  <div className='grid grid-cols-2 gap-x-36 place-content-center'>
                    <div className='mt-10'>
                      <p className='font-medium text-2xl'>Nombre</p>
                      <input
                        className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none mt-3'
                        disabled={editarInformacion}
                        value={usuarioState.first_name}
                        onChange={e =>
                          setUsuarioState({
                            ...usuarioState,
                            first_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='mt-10'>
                      <p className='font-medium text-2xl'>Apellido</p>
                      <input
                        className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none mt-3'
                        disabled={editarInformacion}
                        value={usuarioState.last_name}
                        onChange={e =>
                          setUsuarioState({
                            ...usuarioState,
                            last_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='mt-10'>
                      <p className='font-medium text-2xl'>Email</p>
                      <input
                        className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none mt-3'
                        disabled={editarInformacion}
                        value={usuarioState.email}
                        onChange={e =>
                          setUsuarioState({
                            ...usuarioState,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='mt-10'>
                      <p className='font-medium text-2xl'>Usuario</p>
                      <input
                        className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none mt-3'
                        disabled
                        value={usuarioState.username}
                      />
                    </div>
                  </div>
                  {editarInformacion ? (
                    <div className='mt-28'>
                      <button
                        className='bg-blue-900 hover:bg-blue-800 text-white hover:cursor-pointer font-medium text-xl px-8 py-3 rounded-md'
                        onClick={() => handleEditarInformacion()}
                      >
                        Editar Información
                      </button>
                    </div>
                  ) : (
                    <div className='mt-28'>
                      <div class='grid grid-cols-2  place-content-center ml-16 gap-x-12'>
                        <button
                          className='bg-red-700 hover:bg-red-600 text-white hover:cursor-pointer font-medium text-xl px-8 py-3 rounded-md'
                          onClick={() => handleCancelar()}
                        >
                          Cancelar
                        </button>
                        <button
                          className='bg-blue-900 hover:bg-blue-800 text-white hover:cursor-pointer font-medium text-xl px-8 py-3 rounded-md'
                          onClick={() => handleGuardar(usuarioState)}
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default PerfilUsuario
