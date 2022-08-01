import React from 'react'

const ConsignasTable = () => {
  return (
    <div className='w-full mb-12 mx-auto h-full border-2 border-gray-200'>
      <div className='flex flex-col break-words bg-white w-full mb-6 shadow-lg h-full'>
        <div className='mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4  flex-grow flex-1'>
              <h3 className='font-semibold text-xl text-blueGray-700 '>
                CONSIGNAS ESPECIALES PENDIENTES CCTV
              </h3>
            </div>
          </div>
        </div>

        <div className='w-full overflow-x-auto'>
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

            <tbody>
              <tr>
                <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 '>
                  13/05/2022-15:24
                </th>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 '>
                  Entregar llaves a cliente porque se olvido, pero regresa la
                  siguiente semana.
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 hover:cursor-pointer text-white hover:text-red-600'>
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
              </tr>
              <tr>
                <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700'>
                  13/05/2022-15:24
                </th>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4'>
                  Entregar llaves a cliente porque se olvido, pero regresa la
                  siguiente semana.
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 hover:cursor-pointer text-white hover:text-red-600'>
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
              </tr>
              <tr>
                <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700'>
                  13/05/2022-15:24
                </th>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4'>
                  Entregar llaves a cliente porque se olvido, pero regresa la
                  siguiente semana.
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 hover:cursor-pointer text-white hover:text-red-600'>
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
              </tr>
              <tr>
                <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700'>
                  13/05/2022-15:24
                </th>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4'>
                  Entregar llaves a cliente porque se olvido, pero regresa la
                  siguiente semana.
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 hover:cursor-pointer text-white hover:text-red-600'>
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ConsignasTable
