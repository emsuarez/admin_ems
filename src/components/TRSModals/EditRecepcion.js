import React, { useEffect, useState } from 'react'
import {
  AdminAuthorized,
  Header,
  ICONS,
  RedirectWithoutLogin,
} from '../../components'
import logo from '../../assets/logo.png'
import { MetaTags } from 'react-meta-tags'
import { useLocation, useNavigate } from 'react-router-dom'

const EditRecepcion = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [protectores, setProtectores] = useState([])
  const [centralistas, setCentralistas] = useState([])
  const [novedades, setNovedades] = useState([])
  const [consignas, setConsignas] = useState([])
  const [agenteSaliente, setAgenteSaliente] = useState('')
  const [agenteEntrante, setAgenteEntrante] = useState('')

  useEffect(() => {
    console.log(location.state, 'dataInforme')
    setProtectores(
      location.state.protectores !== null
        ? location.state.protectores.split(',') || []
        : []
    )
    setCentralistas(
      location.state.centralistas !== null
        ? location.state.centralistas.split(',') || []
        : []
    )
    setNovedades(location.state.trsnovedad || [])
    setConsignas(location.state.trsconsigna || [])
    setAgenteSaliente(location.state.agente_saliente || '')
    setAgenteEntrante(location.state.agente_entrante || '')
  }, [])

  const handleSalir = () => {
    navigate(-1)
  }
  return (
    <>
      <div>
        <RedirectWithoutLogin />
        {AdminAuthorized() == -1 ? (
          <div className='bg-white flex flex-col justify-center'>
            <h1 className='font-bold text-3xl text-center'>
              No tiene permisos para acceder a esta página
            </h1>
          </div>
        ) : (
          <>
            <Header />
            <div className='flex items-center bg-slate-100 py-2'>
              <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
              <p className=' ml-1'>TRS</p>
              <ICONS.ChevronRightIconO className='h-3  ml-1' />
              <p className=' ml-1'>Entrega y Recepción de Turno</p>
            </div>

            <div className='flex justify-center items-center'>
              {/* <ICONS.ChevronDoubleLeftIconO className='h-14 mt-[32vh] mx-14 text-gray-400 hover:cursor-pointer' /> */}
              <div className='mx-14 text-gray-400 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                <svg
                  width='73'
                  height='112'
                  viewBox='0 0 73 112'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.71666 59.178C1.9906 57.7879 1.97474 55.1638 3.68386 53.7529L65.2718 2.91192C67.5544 1.02765 71 2.65123 71 5.61105L71 106.053C71 108.993 67.5945 110.623 65.3047 108.779L3.71666 59.178Z'
                    fill='white'
                    stroke='black'
                    stroke-width='3'
                  />
                </svg>
              </div>
              <div className='flex justify-center bg-white'>
                <div className='px-4 border-2 hover:shadow-xl hover:border-2 shadow-sm py-8'>
                  <div className='flex justify-between mb-8 mx-10'>
                    <img src={logo} className='h-14' />
                    <h2 className='font-bold text-xl mt-2'>
                      ACTA ENTREGA RECEPCION DE GUARDIA EMSECOR
                    </h2>

                    <button
                    // onClick={() =>
                    //   ejecutivosReportPDF(allEjecutivosData.results)
                    // }
                    >
                      <div className='flex'>
                        <p className='text-blue-800 hover:cursor-pointer'>
                          Exportar a PDF
                        </p>
                        <ICONS.ChevronDownIconO
                          className='w-3 mb-1.5 ml-2'
                          color='blue'
                        />
                      </div>
                    </button>
                  </div>

                  <div className='flex justify-between px-20'>
                    <p className='font-semibold'>
                      CENTRAL DE OPERACIONES: DIURNA
                    </p>
                    <p className='font-semibold'>
                      FECHA: {location.state.created}
                    </p>
                  </div>

                  {/* FOUR LINES */}
                  <div className='flex mt-12'>
                    {/* LEFT */}
                    <div className='w-1/2'>
                      <div className='flex flex-row justify-between'>
                        <h2 className='font-semibold text-center mx-auto'>
                          GRUPO DE PROTECCION GUARDIA
                        </h2>

                        <ICONS.PlusCircleIconS className='h-6 ml-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md' />
                      </div>

                      <div>
                        <ol
                          style={{ listStyleType: 'number' }}
                          className='pl-6'
                        >
                          <div className='border-2 border-gray-500 rounded-md'>
                            {protectores.length > 0 ? (
                              protectores.map((protector, index) => (
                                <li
                                  key={index}
                                  className='px-2 border-b-2 border-gray-500'
                                >
                                  <div className='flex flex-row justify-between'>
                                    <p className='font-semibold'>{protector}</p>
                                    <div className='flex flex-row '>
                                      <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                        <svg
                                          width='17'
                                          height='15'
                                          viewBox='0 0 17 15'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='h-5 mx-1 '
                                        >
                                          <path
                                            d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
                                            fill='#128868'
                                          />
                                        </svg>
                                      </div>
                                      <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                        <svg
                                          width='13'
                                          height='17'
                                          viewBox='0 0 13 17'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='h-5 mx-1'
                                        >
                                          <path
                                            d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
                                            fill='#D61601'
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className='pl-2 border-b-2 border-gray-500'>
                                <p className='font-semibold'>
                                  No se han registrado protectores
                                </p>
                              </li>
                            )}
                          </div>
                        </ol>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className='w-1/2'>
                      <div className='flex flex-row justify-between'>
                        <h2 className='font-semibold text-center mx-auto'>
                          GRUPO DE TRABAJO
                        </h2>{' '}
                        <ICONS.PlusCircleIconS className='h-6 ml-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md' />
                      </div>
                      <div>
                        <ol
                          style={{ listStyleType: 'number' }}
                          className='pl-6'
                        >
                          <div className='border-2 border-gray-500 rounded-md'>
                            {centralistas.length > 0 ? (
                              centralistas.map((centralista, index) => (
                                <li
                                  key={index}
                                  className='pl-2 border-b-2 border-gray-500'
                                >
                                  <div className='flex flex-row justify-between'>
                                    <p className='font-semibold'>
                                      {centralista}
                                    </p>
                                    <div className='flex flex-row'>
                                      <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                        <svg
                                          width='17'
                                          height='15'
                                          viewBox='0 0 17 15'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='h-5 mx-1'
                                        >
                                          <path
                                            d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
                                            fill='#128868'
                                          />
                                        </svg>
                                      </div>
                                      <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                        <svg
                                          width='13'
                                          height='17'
                                          viewBox='0 0 13 17'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='h-5 mx-1'
                                        >
                                          <path
                                            d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
                                            fill='#D61601'
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className='pl-2 border-b-2 border-gray-500'>
                                <p>No se han registrado centralistas</p>
                              </li>
                            )}
                          </div>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* NEW SECTION */}
                  <div className='flex mt-12 mb-32'>
                    {/* LEFT */}
                    <div className='w-1/2'>
                      <div className='flex flex-row justify-between'>
                        <h2 className='font-semibold text-center mx-auto'>
                          NOVEDADES ESPECIALES
                        </h2>
                        <ICONS.PlusCircleIconS className='h-6 ml-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md' />
                      </div>
                      <div>
                        <ol className='border-2 border-gray-500'>
                          {novedades.map((novedad, index) => (
                            <li className='w-full p-2 border-b-2'>
                              <div className='flex justify-between'>
                                <p className='text-blue-900 '>
                                  <b className='text-black'>
                                    {novedad.created}
                                  </b>{' '}
                                  - {novedad.observacion}
                                </p>
                                <div className='flex flex-col'>
                                  <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                    <svg
                                      width='17'
                                      height='15'
                                      viewBox='0 0 17 15'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                      className='h-5 mx-1'
                                    >
                                      <path
                                        d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
                                        fill='#128868'
                                      />
                                    </svg>
                                  </div>
                                  <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                    <svg
                                      width='13'
                                      height='17'
                                      viewBox='0 0 13 17'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                      className='h-5 mx-1'
                                    >
                                      <path
                                        d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
                                        fill='#D61601'
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className='w-1/2'>
                      <div className='flex flex-row justify-between'>
                        <h2 className='font-semibold text-center mx-auto'>
                          CONSIGNAS ESPECIALES
                        </h2>
                        <ICONS.PlusCircleIconS className='h-6 ml-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md' />
                      </div>

                      <div className='ml-4'>
                        <ol className=''>
                          {consignas.map((consigna, index) => (
                            <li key={index} className='w-full'>
                              <div className='flex flex-row items-center justify-center border-2 border-gray-500'>
                                <div className='text-center self-stretch flex items-center'>
                                  {consigna.created}
                                </div>
                                <div className='flex flex-col w-full border-l-2 border-gray-500'>
                                  <div className='flex flex-row justify-between pr-2'>
                                    <div className='mx-auto'>
                                      {consigna.obs_creacion}
                                    </div>
                                    <div>
                                      <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                        <svg
                                          width='17'
                                          height='15'
                                          viewBox='0 0 17 15'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='h-5 mx-1'
                                        >
                                          <path
                                            d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
                                            fill='#128868'
                                          />
                                        </svg>
                                      </div>
                                      <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                        <svg
                                          width='13'
                                          height='17'
                                          viewBox='0 0 13 17'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='h-5 mx-1'
                                        >
                                          <path
                                            d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
                                            fill='#D61601'
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  {consigna.obs_cierre ? (
                                    <div className='border-b-2 border-gray-400'>
                                      <p className='mx-auto text-center'>
                                        Cierre:{' '}
                                        <span>{consigna.fecha_obs_cierre}</span>
                                      </p>
                                    </div>
                                  ) : null}
                                  {consigna.obs_cierre ? (
                                    <div className='flex flex-row justify-between items-center py-2 text-blue-800'>
                                      <p className='mx-auto'>
                                        {consigna.obs_cierre}
                                      </p>
                                      <div className='pr-2'>
                                        <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                          <svg
                                            width='17'
                                            height='15'
                                            viewBox='0 0 17 15'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 mx-1'
                                          >
                                            <path
                                              d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
                                              fill='#128868'
                                            />
                                          </svg>
                                        </div>
                                        <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                          <svg
                                            width='13'
                                            height='17'
                                            viewBox='0 0 13 17'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 mx-1'
                                          >
                                            <path
                                              d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
                                              fill='#D61601'
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className='flex flex-row justify-between items-center py-2 text-blue-800 mt-5'>
                                      <div></div>
                                      <div className='pr-2'>
                                        <div className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                                          <svg
                                            width='18'
                                            height='18'
                                            viewBox='0 0 18 18'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            xmlnsXlink='http://www.w3.org/1999/xlink'
                                          >
                                            <rect
                                              width='18'
                                              height='18'
                                              fill='url(#pattern0)'
                                            />
                                            <defs>
                                              <pattern
                                                id='pattern0'
                                                patternContentUnits='objectBoundingBox'
                                                width='1'
                                                height='1'
                                              >
                                                <use
                                                  xlinkHref='#image0_2288_4838'
                                                  transform='scale(0.00195312)'
                                                />
                                              </pattern>
                                              <image
                                                id='image0_2288_4838'
                                                width='512'
                                                height='512'
                                                xlinkHref='data:image/png;base64,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hQiw/AE6IwAmaokIsPwBOiQAJmyBCPCCP4BOCYCJO0ME3JLZ8v/8dicCYAgEQAf2iYBbMjvtb/kDdOrs1gOwHXveIvj8WP4A3XMGoCO7ZwKeYvkDIAA6U2u9q/UMALQnAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQwIAADokAACgQztJaushAIDt2klyb+shDvEdrQcAgGWUUs5Lcm7rOc7g3p0kd7ae4hCXtB4AAJb0mNYDHOLOnSRfbz3FIQQAAGMz9N31dWcAAGD9hr677hxDAPy91gMAwJKGvrtGEQBPKKUcaz0EACzh2a0HOMSdO0lubz3FAn6q9QAAsIhSypOSfHfrOQ5x+06S462nWMBzWg8AAAsaw846XpKcl+TuDP9TAZ9Za7229RAAcJBSysOT3Jrk4tazHOJZO7XWe5Lc1nqSBbyplDL0SAGgb7+U4S//JDk+X6ifbjrGYi5P8tLWQwDAfkop35PkVY3HWMT9SW6dB8AYXgeQJG/e/R8MAINRSjk7yX9Nck7rWRbwf2qt35oHwJ81HWVxj0jy/lLKha0HAYA9fiXJ01sPsaA/Tx584d91DQdZ1g8k+a1SSmk9CACUUl6R5JWt51jCdcluANRab09yc9NxlvNTSf5bKeVvtB4EgH6VUl6T5Fdbz7GkDyUnv/VvTGcBkuT5ST5SSvmu1oMA0JdSyjmllLcn+eUkZ7WeZwm31VpvTU4OgD9sNMxRPCnJDaWUZ7UeBIA+lFIuz+yX5p9rPcsKTvyyvzcAPpzk21sf5ei+M8nvl1L+uJTyd1sPA8A0lVIuKaW8I8n/zvAv9nOQEwFQaq0nvltK+WCSq1tMtEYfSPI7ST5Qa/1K62EAGK9SyjlJrsrs4j4vTnJ+24mO5J4kj661fi05PQBekOSaRoOt27eTfCTJHyX5XJI7MrvwkSgAYD8XJnlMkkt2v34os1+KL2o51Br991rrT8//cmoAnJ/k85nOPxYAmHlGrfWD87+c9Nn6tdZvJPm9rY8EAGzSHUn+195v7Hdxnd/eziwAwJZcU2s96YX+Jz0FkCS7V9y7Jcn3bXEwAGAzHkhyrNZ60oX/TjsDUGt9IMm/39ZUAMBGvffU5Z/scwYgOXFVo79I8j2bnwsA2JCa5Ipa642n/mC/1wCk1np/kjdveioAYKPev9/yTw44A5AkpZRzk9ya2XshAYDxeUqt9Yb9frDvGYAkqbXeG68FAICxuvag5Z+c4QxAkpRSzkrysSRXbGAwAGAz7k1yea31Mwfd4MAzAEmy+57BV2X2IgIAYBzefKblnxxyBuDEjUr5jSQvW9dUAMDG3JrZb//3nOlGiwbAI5McT/Kw9cwGAGzIM2ut1x52ozM+BTBXa/1SktcdeSQAYJPeu8jyTxY8A3DixqW8O8kLV50KANiYW5M8qdb6tUVuvGwAXJDkhiSXrTYbALAB9yZ5Wq3144veYaGnAOZqrXcneW6Sbyw5GACwOf9imeWfLBkASVJr/WSSn1/2fgDARryn1vq2Ze+0dAAkSa31N5P8h1XuCwCszZ8m+dlV7rjUawBOumMpJclvJXnRSgcAAI7ieJIfqbV+eZU7rxwASVJKeUiS9ye5euWDAADLuj2zF/19dtUDHCkAkhPvDLguyVOPdCAAYBFfTfKjB13md1ErvQZgr913Bjwjs4sGAQCb89dJnnHU5Z+sIQCSpNb6lSRXJvnDdRwPADjN7Zn95v8n6zjYWgIgSWqtd2Z2JuC96zomAJAk+XRmz/l/cl0HXFsAJEmt9b4k/yTJr63zuADQsRsye7X/yi/4289aAyBJaq0P1Fp/Psk/T3Lfuo8PAB25JsmVuxflW6sjvwvgjAcv5clJ3pPk0o09CABMzzeSvKbW+s5NPcBGAyBJSikXJ3l7kudt9IEAYBo+leR5tdabNvkga38K4FS11q/XWp+f5BVJ7tz04wHASNUk/yXJUza9/JMtnAE46cFKeWyStyZ5ztYeFACG78Ykr6y1Xr+tB9z4GYC9aq3/r9b63CT/IMlntvnYADBAdyd5fZInbXP5J1s+A3DSA5dyXpJfTPILSS5qMgQAtPFAZp+b8/pa61+1GKBZAJwYoJSHJnl1ktcmeUTTYQBgs76V2Vv73lRrPd5ykOYBMLd7UaGXJ3ldksc2HgcA1umbSd6Z5C211ttaD5MMKADmSinnJHlWkpdkdpnhs9tOBAAr+0SSdyW5ptb65dbD7DW4ANirlPKoJC9I8jNJfrDxOACwiDsyO83/rnV+dv+6DToA9iqlHEvy45lddfDpSR7WdCAAmLkvyUeTXJfkQ0mur7V+u+1IhxtNAOxVStlJckWSq5L8cJJjSR6f5JyWcwEweTXJbUluSfKxPLjwv9l0qhWMMgD2U0o5K7NrDhxLclmSxyW5MMkFu/+df52XpDQaE4Dhui/JXbtfd+/58xczW/i3JDlea/1GswnX6P8DgFeMpXnm8YAAAAAASUVORK5CYII='
                                              />
                                            </defs>
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER SECTION */}
                  <div className='border-2'>
                    <div className='flex border-b-2 border-gray-500'>
                      <div className=' w-1/2 text-center py-4 border-r-2 border-gray-500 font-semibold'>
                        <p>CENTRALISTA DE OPERACIONES SALIENTE:</p>
                        <p>{agenteSaliente}</p>
                      </div>

                      <div className='w-1/2 text-center my-4 font-semibold'>
                        <p>CENTRALISTA DE OPERACIONES ENTRANTE:</p>
                        <p>{agenteEntrante}</p>
                      </div>
                    </div>

                    <div className='flex'>
                      <p className='h-20 w-1/2 flex flex-col justify-end p-2 border-r-2 border-gray-500'>
                        Firma:
                      </p>
                      <p className=' h-20 w-1/2 flex flex-col justify-end p-2 border-r-2 border-gray-500'>
                        Hora:
                      </p>
                      <p className='h-20 w-1/2 flex flex-col justify-end p-2 border-r-2 border-gray-500'>
                        Firma:
                      </p>
                      <p className='h-20 w-1/2 flex flex-col justify-end p-2'>
                        Hora:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <ICONS.ChevronDoubleRightIconO className='mx-14 h-14 mt-[32vh] text-gray-400 hover:cursor-pointer' /> */}
              <div className='mx-14 text-gray-400 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                <svg
                  width='72'
                  height='112'
                  viewBox='0 0 72 112'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M69.0962 57.7738L7.73642 108.89C5.46229 110.785 2.00949 109.176 1.99624 106.217L1.54653 5.77548C1.53336 2.83541 4.93157 1.19024 7.22962 3.02411L69.0391 52.349C70.7713 53.7314 70.7989 56.3553 69.0962 57.7738Z'
                    fill='white'
                    stroke='black'
                    stroke-width='3'
                  />
                </svg>
              </div>
              <button
                className='self-end mb-20 bg-blue-900 px-10 py-2 text-white rounded-lg hover:bg-blue-800'
                onClick={() => handleSalir()}
              >
                Salir
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default EditRecepcion
