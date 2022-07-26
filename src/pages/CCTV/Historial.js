import React from 'react'
import { CCTVAuthorized, Header, HistorialTable, RecepcionTurnoTable, RedirectWithoutLogin } from '../../components'

const Historial = () =>{
    return(
        <div>
             {/* {
                CCTVAuthorized()==-1?
                <div className='z-50 h-screen bg-white flex flex-col justify-center'>
                    <h1 className='font-bold text-3xl text-center'>No tiene permisos para acceder a esta página</h1>
                </div>
            : */}
            <div>
            <Header items="cctv"/>
            <RedirectWithoutLogin/>

            </div>
            <div className=' pt-4 w-screen p-16 flex flex-col justify-center'>
                    <HistorialTable/>
            </div>
            {/* } */}
        </div>
    )
}

export default Historial