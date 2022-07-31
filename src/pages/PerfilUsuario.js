import React from 'react'
import {
  AdminAuthorized,
  Header,
  ICONS,
  RedirectWithoutLogin,
} from '../components'
import user from '../assets/user.jpg'

const PerfilUsuario = () => {
  return (
    <div>
      <RedirectWithoutLogin />
      {AdminAuthorized() == -1 ? (
        <div className='z-50 bg-white flex flex-col justify-center'>
          <h1 className='font-bold text-3xl text-center'>
            No tiene permisos para acceder a esta página
          </h1>
        </div>
      ) : (
        <>
          <Header items='all' />
          <div className='flex items-center bg-slate-100 py-2'>
            <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
            <p className=' ml-1'>Perfil</p>
            <ICONS.ChevronRightIconO className='h-3  ml-1' />
            <p className=' ml-1'>Editar perfil</p>
          </div>
          <div className='mx-10'>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex justify-start w-full bg-blue-900 pt-20 h-56 z-10'>
                <div className='ml-28'>
                  <div className='mr-10 bg-white rounded-[50%]'>
                    <img
                      src={user}
                      className='w-72 rounded-[50%] border-red-700 border-2 p-2'
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
                      Iman Loreto
                    </div>
                    <div className='text-2xl font-semibold text-gray-400 mt-2'>
                      Administrador
                    </div>
                    <div className='mt-5 '>
                      <button className='bg-blue-900 hover:bg-blue-800 text-white hover:cursor-pointer font-medium text-xl px-8 py-3 rounded-md'>
                        Ver Notificaciones
                      </button>
                    </div>
                  </div>
                  <div className='basis-1/2 flex flex-col items-center'>
                    <div class='grid grid-cols-2 gap-x-36 place-content-center'>
                      <div className='mt-10'>
                        <p className='font-medium text-2xl'>Nombre</p>
                        <input className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none mt-3' />
                      </div>
                      <div className='mt-10'>
                        <p className='font-medium text-2xl'>Apellido</p>
                        <input className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none mt-3' />
                      </div>
                      <div className='mt-10'>
                        <p className='font-medium text-2xl'>Email</p>
                        <input className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none mt-3' />
                      </div>
                      <div className='mt-10'>
                        <p className='font-medium text-2xl'>Usuario</p>
                        <input className='border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none mt-3' />
                      </div>
                    </div>
                    <div className='mt-28'>
                      <button className='bg-blue-900 hover:bg-blue-800 text-white hover:cursor-pointer font-medium text-xl px-8 py-3 rounded-md'>
                        Editar Información
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PerfilUsuario
