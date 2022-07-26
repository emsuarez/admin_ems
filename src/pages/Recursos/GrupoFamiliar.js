import React from 'react'
import { AdminAuthorized, CreateEjecutivo, EjectivosTable, FamilyTable, Header, ICONS, RedirectWithoutLogin } from '../../components'

const GrupoFamiliar = () =>{




    return(
        <div className='h-screen'>
            
            <RedirectWithoutLogin/>

            {
                AdminAuthorized()==-1?
                <div className='z-50 h-screen bg-white flex flex-col justify-center'>
                    <h1 className='font-bold text-3xl text-center'>No tiene permisos para acceder a esta página</h1>
                </div>
            :
            <div>
            <Header items="all"/>
                <div className='flex items-center bg-slate-100 shadow-sm py-2'>
                    <ICONS.HomeIconS className="h-6 ml-10 text-gray-600"/>
                    <p className=' ml-1'>Recursos</p>
                    <ICONS.ChevronRightIconO className='h-3  ml-1'/>
                    <p className=' ml-1'>Grupo Familiar</p>
                </div>


                <div className='flex ml-11 mt-4'>
                    <h4 className='font-semibold'>Grupo Familiar</h4>
                    <ICONS.ChevronDoubleRightIconO className="h-3 mt-1.5 ml-1"/>
                </div>
                {/* <div onClick={()=>setCreate(true)}>
                <h3 className='ml-11 mt-3 bg-blue-500 w-32 text-center font-semibold rounded-sm
                 text-white hover:cursor-pointer'>Crear Ejecutivo</h3>
                </div> */}
                 
                 <div className='flex justify-end mr-16'>
                    <p className="text-blue-500 hover:cursor-pointer">Export as PDF</p>
                    <ICONS.ChevronDownIconO className="h-3 mt-1.5 mr-4" color="blue"/>
                    <input
                        placeholder='Buscar'
                        className='border-[1px] outline-none pl-3 rounded-sm'
                    />
                    <ICONS.SearchIconS className="h-5 pr-2 mt-0.5 hover:cursor-pointer absolute text-gray-400"/>
                </div>


            <div className=' pt-4 w-screen p-16 flex flex-col justify-center  '>
                {/* <div className='md:w-fit w-screen justify-center'> */}
                    <FamilyTable name="Familiar"/>
                {/* </div> */}
            </div>
            
            </div>
                
            }
        </div>
    )
}

export default GrupoFamiliar