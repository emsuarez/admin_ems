import React from 'react'
import { AdminAuthorized, Header, ICONS, RedirectWithoutLogin,CCTVAuthorized } from '../../components'
import logo from '../../assets/logo.png'
import { MetaTags } from 'react-meta-tags'
import { useLocation } from 'react-router-dom'



const ViewRecepcion = () =>{
    const location = useLocation();

    return(
        <div className='bg-slate-50 h-full'>

            {/* <RedirectWithoutLogin/>
            {
                AdminAuthorized()==-1&&CCTVAuthorized() == -1?
                <div className='z-50 h-screen bg-white flex flex-col justify-center'>
                    <h1 className='font-bold text-3xl text-center'>No tiene permisos para acceder a esta página</h1>
                </div>
            : */}
            <div>
            <Header items="all"/>
                
            <div className='flex items-center bg-slate-100 shadow-sm py-2'>
                    <ICONS.HomeIconS className="h-6 ml-10 text-gray-600"/>
                    <p className=' ml-1'>CCTV</p>
                    <ICONS.ChevronRightIconO className='h-3  ml-1'/>
                    <p className=' ml-1'>Entrega y recepciónde turno</p>
                    <ICONS.ChevronRightIconO className='h-3  ml-1'/>
                    <p className=' ml-1'>{location.state.shift}</p>

            </div>

            <div className='flex ml-11 mt-4'>
                    <h4 className='font-semibold'>{location.state.shift}</h4>
                    <ICONS.ChevronDoubleRightIconO className="h-3 mt-1.5 ml-1"/>
            </div>

            <div className='flex justify-evenly'>
            <ICONS.ChevronDoubleLeftIconO className='h-14 mt-[32vh] text-gray-400 hover:cursor-pointer'/>
            <div className='flex justify-center'>
                <div className='bg-white px-4 border-2 hover:shadow-xl hover:border-2 shadow-sm w-fit h-fit py-8 pb-8'>

                    <div className='flex justify-evenly'>
                        <img src={logo} className="h-14 -ml-14"/> 
                        <h2 className='font-bold text-xl mt-2 -ml-28'>ACTA ENTREGA RECEPCION DE 
GUARDIA EMSECOR</h2>
                    </div>

                    <div className='flex justify-between px-20'>
                        <p className='text-sm text-gray-500'>CENTRAL DE OPERACIONES DIURNA</p>
                        <p className='text-sm text-gray-500'>FETCHA</p>
                    </div>

            {/* FOUR LINES */}
                    <div className='flex mt-12'>
                    {/* LEFT */}
                        <div className='w-1/2'>
                          
                                <h2 className='font-semibold text-center ml-10'>GRUPO DE PROTECCION GUARDIA</h2>
                                
                            <div>
                                <ol style={{listStyleType:'number'}} className="pl-6">
                                    <li className='w-full py-1 border-[1px] border-gray-500 rounded-md '>
                                        <p>Agente de Seguridad A</p>
                                        
                                    </li>
                                    <li className='w-full py-1 border-[1px] border-gray-500 rounded-md '>
                                        <p>Agente de Seguridad B</p>
                                        
                                    </li>
                                    <li className='w-full py-1 border-[1px] border-gray-500 rounded-md '>
                                        <p>Agente de Seguridad C</p>
                                        
                                    </li>
                                    <li className='w-full py-1 border-[1px] border-gray-500 rounded-md '>
                                        <p>Agente de Seguridad D</p>
                                       
                                    </li>
                                </ol>
                            </div>
                        </div>

                    {/* RIGHT */}
                        <div className='w-1/2'>
                            <h2 className='font-semibold text-center ml-10'>GRUPO DE TRABAJO</h2>
                                
                            <div>
                                <ol style={{listStyleType:'number'}} className="pl-6">
                                <li className='w-full py-1 border-[1px] border-gray-500 rounded-md '>
                                        <p>Agente de Seguridad A</p>
                                        
                                    </li>
                                    <li className='w-full py-1 border-[1px] border-gray-500 rounded-md '>
                                        <p>Agente de Seguridad B</p>
                                        
                                    </li>
                                    <li className='w-full py-1 border-[1px] border-gray-500 rounded-md '>
                                        <p>Agente de Seguridad C</p>
                                       
                                    </li>
                                    <li className='w-full py-1 border-[1px] border-gray-500 rounded-md '>
                                        <p>Agente de Seguridad D</p>
                                        
                                    </li>
                                </ol>
                            </div>
                        </div>


                    </div>



                    {/* NEW SECTION */}
                    <div className='flex mt-12'>
                    {/* LEFT */}
                        <div className='w-1/2'>
                                        <h2 className='font-semibold text-gray-500 text-center ml-4'>NOVEDADE ESPECIALES</h2>
                            <div>
                                <ol className="pl-2">
                                    <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                                    <div className='flex'>
                                        <p><b className='text-black'>16:04</b> But I must explain to you how all this mistaken idea of</p>
                                       
                                        </div></li>
                                    <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                                       <div className='flex'>
                                        <p><b className='text-black'>16:04</b> But I must explain to you how all this mistaken idea of</p>
                                        
                                        </div></li>
                                    <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                                       <div className='flex'>
                                        <p><b className='text-black'>16:04</b> But I must explain to you how all this mistaken idea of</p>
                                       
                                        </div></li>
                                    <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                                       <div className='flex'>
                                        <p><b className='text-black'>16:04</b> But I must explain to you how all this mistaken idea of</p>
                                        
                                        </div></li>
                                </ol>
                            </div>
                        </div>

                    {/* RIGHT */}
                        <div className='w-1/2'>
                                    <h2 className='font-semibold text-gray-500 text-center ml-4'>CONSIGNAS ESPECIALES</h2>
                                   
                            <div>
                                <ol className="pl-2">
                                <li className='w-full px-2 py-2 text-blue-500 border-[1px] border-gray-500 mt-0.5'>
                                       <div className='flex'>
                                        <p><b className='text-black'>16:04</b> But I must explain to you how all this mistaken idea of</p>
                                        
                                        </div>
                                        
                                        <div className='group'>
                                        <div className='flex justify-center group  hover:cursor-pointer'>
                                            <p className='text-black text-sm font-semibold'>Cierre: 22/11/2021 16:02</p>
                                            <ICONS.ChevronDownIconO className='h-4 text-black'/>
                                            
                                        </div>
                                        <div className=' px-2 py-2 text-blue-500  flex border-[1px] border-blue-500 mt-0.5'>
                                                <p>But I must explain to you how all this mistaken idea of</p>
                                                      
                                                
                                        </div>
                                        </div>        
                                </li>
                                    <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                                        <b className='text-black'>16:04</b> But I must explain to you how all this mistaken idea of</li>
                                    <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                                        <b className='text-black'>16:04</b> But I must explain to you how all this mistaken idea of</li>
                                    <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                                        <b className='text-black'>16:04</b> But I must explain to you how all this mistaken idea of</li>
                                </ol>
                            </div>
                        </div>
                    </div>


                    {/* FOOTER SECTION */}
                    <div>
                        <div className='flex mt-12 px-2 space-x-1 pt-20'>
                            <div className='border-[1px] h-20 w-1/2 text-center border-gray-500'>
                            <p>CENTRALISTA DE OPERACIONES SALIENTE:</p>
                            <p>Nombre del Agente</p>
                            </div>

                            <div className='border-[1px] h-20 w-1/2 text-center border-gray-500 '>
                                <p>CENTRALISTA DE OPERACIONES ENTRANTE:</p>
                                <p>Nombre del Agente</p>
                            </div>
                        </div>

                        <div className='flex mt-1 px-2 space-x-1'>
                            <p className='border-[1px] h-20 w-1/2 border-gray-500 flex flex-col justify-end p-2'>FIRMA:</p>
                            <p className='border-[1px] h-20 w-1/2 border-gray-500 flex flex-col justify-end p-2'>HORA:</p>
                            <p className='border-[1px] h-20 w-1/2 border-gray-500 flex flex-col justify-end p-2'>FIRMA:</p>
                            <p className='border-[1px] h-20 w-1/2 border-gray-500 flex flex-col justify-end p-2'>HORA:</p>
                        </div>
                    </div>

                </div>
            </div>
            <ICONS.ChevronDoubleRightIconO className='h-14 mt-[32vh] text-gray-400 hover:cursor-pointer'/>
            </div>
            </div>
    {/* } */}
        </div>
    )
}

export default ViewRecepcion