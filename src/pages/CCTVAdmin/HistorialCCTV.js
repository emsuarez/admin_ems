import React from 'react'
import { AdminAuthorized, Header, HistorialMovimientoTable, HistorialTable, ICONS, RedirectWithoutLogin } from '../../components'

const HistorialCCTV = () =>{


console.log(window.location.href)

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
                    <p className=' ml-1'>CCTV</p>
                    <ICONS.ChevronRightIconO className='h-3  ml-1'/>
                    <p className=' ml-1'>Historial entrega y recepción de Turno</p>
                </div>


                <div className='flex ml-11 mt-4'>
                    <h4 className='font-semibold'>Historial entrega y recepción de Turno</h4>
                    <ICONS.ChevronDoubleRightIconO className="h-3 mt-1.5 ml-1"/>
                </div>
                 
                 


            <div className=' pt-4 w-screen p-16 flex flex-col justify-center'>
                    <HistorialTable/>
            </div>
            
            </div>
                
            }
        </div>
    )
}

export default HistorialCCTV