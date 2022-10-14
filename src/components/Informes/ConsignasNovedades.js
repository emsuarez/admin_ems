import React from 'react'
import { format } from 'date-fns'
import Icon from '../../assets/Icon'

const ConsignasNovedades = ({
  lista,
  handleOpenEditar,
  handleOpenEliminar,
  handleOpenCerrarItem,
  handleOpenEditarNovedadCerrada: handleOpenEditarItemCerrado,
}) => {
  const tipo = window.localStorage.getItem('tipo')

  return (
    <div className='ml-4'>
      <ol>
        {lista.map((item, index) => (
          <li key={index} className='my-1'>
            <div className='grid grid-row-2 grid-cols-12 border-2 border-gray-700'>
              <div className='item1 col-span-2 border-b-2'>
                <div
                  className={
                    item.estado === 1
                      ? 'flex flex-col items-center text-[10px] border-r-2 text-red-500 font-bold h-full'
                      : 'flex flex-col items-center text-[10px] border-r-2 text-green-500 font-bold'
                  }
                >
                  <span>Creado</span>
                  <span>{format(new Date(item.created), 'dd/MM/yyyy')}</span>
                  <span>{format(new Date(item.created), 'HH:mm')}</span>
                </div>
              </div>
              <div className='item2 col-span-9 border-b-2 text-xs text-center'>
                {item.obs_creacion}
              </div>
              <div className='item3 border-b-2 border-l-2'>
                <div className='flex items-center flex-col'>
                  {tipo === '1' && (
                    <>
                      <button
                        onClick={() => handleOpenEditar(item)}
                        className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                      >
                        <Icon svgName='ib_editar' className='h-3 my-1' />
                      </button>
                      <button
                        onClick={() => handleOpenEliminar(item)}
                        className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                      >
                        <Icon svgName='ib_eliminar' className='h-3 my-1' />
                      </button>
                    </>
                  )}

                  {item.obs_cierre === null && (
                    <button
                      onClick={() => handleOpenCerrarItem(item)}
                      className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                    >
                      <Icon svgName='ib_cerrar' className='h-3 my-1' />
                    </button>
                  )}
                </div>
              </div>
              {item.obs_cierre && (
                <>
                  <div className='item-4 col-span-2'>
                    <div className='flex flex-col items-center text-[10px] border-r-2 text-green-500 font-bold'>
                      <span>Cerrado</span>
                      <span>
                        {format(new Date(item.fecha_obs_cierre), 'dd/MM/yyyy')}
                      </span>
                      <span>
                        {format(new Date(item.fecha_obs_cierre), 'HH:mm')}
                      </span>
                    </div>
                  </div>
                  <div className='item-5 col-span-9 text-xs text-center'>
                    {item.obs_cierre}
                  </div>
                  <div className='item-6 col-span-1 border-l-2'>
                    <div className='flex items-center flex-col mt-3'>
                      <button
                        onClick={() => handleOpenEditarItemCerrado(item)}
                        className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'
                      >
                        <Icon svgName='ib_editar' className='h-3 my-1' />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ConsignasNovedades
