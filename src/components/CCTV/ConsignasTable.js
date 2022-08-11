import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import React from 'react'

const ConsignasTable = ({ data, confirmarCerrarConsigna, tituloTipoTable }) => {
  const { results, count } = data

  return (
    <div className='flex flex-col break-words bg-white w-full shadow-lg h-full'>
      <div className='mb-0 px-4 py-3 border-0'>
        <div className='flex flex-wrap items-center'>
          <div className='relative w-full px-4  flex-grow flex-1'>
            <h3 className='font-semibold text-lg text-blueGray-700 '>
              CONSIGNAS ESPECIALES PENDIENTES {tituloTipoTable}
            </h3>
          </div>
        </div>
      </div>

      <div className='overflow-y-auto'>
        <table className='items-center bg-transparent w-full border-collapse '>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                FECHA/HORA
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                CONSIGNAS
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                ESTADO
              </th>
            </tr>
          </thead>

          {Object.keys(data).length > 0 ? (
            <tbody className='overflow-x-auto'>
              {results.map((item, index) => (
                <tr key={item.id}>
                  <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 '>
                    {item.created}
                  </th>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 '>
                    {item.obs_creacion}
                  </td>
                  <button onClick={() => confirmarCerrarConsigna(item)}>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 hover:cursor-pointer text-white hover:text-red-600 mx-auto'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 border-2 rounded-full border-red-700 bg-red-700'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </td>
                  </button>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>

      {/* Paginación */}
      <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
        <div className='flex-1 flex justify-between sm:hidden'>
          <a
            href='#'
            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          >
            Previous
          </a>
          <a
            href='#'
            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          >
            Next
          </a>
        </div>
        <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Mostrando <span className='font-medium'>1</span> -{' '}
              <span className='font-medium'>
                {Object.keys(data).length > 0 ? results.length : null}
              </span>{' '}
              de{' '}
              <span className='font-medium'>
                {Object.keys(data).length > 0 ? count : null}
              </span>{' '}
              resultados
            </p>
          </div>
          <div>
            <nav
              className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              {data.previous && (
                <a
                  href='#'
                  className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                >
                  <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                  {/* <span className='sr-only'> */}
                  Anterior
                  {/* </span> */}
                </a>
              )}

              {data.next && (
                <a
                  href='#'
                  className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                >
                  <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                  {/* <span className='sr-only'> */}
                  Siguiente
                  {/* </span> */}
                </a>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsignasTable
