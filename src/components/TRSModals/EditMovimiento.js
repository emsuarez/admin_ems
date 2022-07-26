import React, { useState } from 'react'

const EditMovimiento = (props) =>{
    const [ejecutivo,setEjecutivo] = useState()
    const [vehiculoEjecutivo,setVehiculoEjecutivo] = useState()
    const [protector,setProtector] = useState()
    const [vehiculoProtector,setVehiculoProtector] = useState()
    const [lugarSalida,setLugarSalida] = useState()
    const [horaSalida,setHoraSalida] = useState()

    const {edit,setEdit} = props

    const handleCancel=()=>{
        setEdit(false)
    }

    const handleEdit=()=>{
        setEdit(false)
    }


    return(
        <div className='bg-white shadow-lg h-[70vh] ml-44  py-18 w-[155vh] z-50 border-2 -mt-[60vh]'>
            <h1 className='font-bold text-3xl ml-24 mt-12'>Editor Evento:</h1>
            <div className='flex justify-around -ml-96'>
            <div className='space-y-4'>
                    {/* EJECUTIVO */}
                    <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>Ejecutivo : </p>
                            <select name="Select" value={ejecutivo} onChange={(item)=>setEjecutivo(item.target.value)} className="absolute border-[1px] rounded-md w-72 border-gray-400">
                                <option value="TR1">TR1</option>
                                <option value="TR2">TR3</option>
                            </select>
                    </div>

                    {/* VEHICULO EJECUTIVO */}
                    <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>Vehiculo Ejecutivo : </p>
                            <select name="Select" value={vehiculoEjecutivo} onChange={(item)=>setVehiculoEjecutivo(item.target.value)} className="absolute border-[1px] rounded-md w-72 border-gray-400">
                                <option value="TR1">UI101</option>
                                <option value="TR2">UI102</option>
                            </select>
                    </div>        


                     {/* PROTECTOR */}
                     <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>Protector : </p>
                            <select name="Select" value={protector} onChange={(item)=>setProtector(item.target.value)} className="absolute border-[1px] rounded-md w-72 border-gray-400">
                                <option value="TR1">K2</option>
                                <option value="TR2">K1</option>
                            </select>
                    </div>

                    {/* VEHICULO PROTECTOR */}
                     <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>Vehiculo Protector : </p>
                            <select name="Select" value={vehiculoProtector} onChange={(item)=>setVehiculoProtector(item.target.value)} className="absolute border-[1px] rounded-md w-72 border-gray-400">
                                <option value="TR1">UI102</option>
                                <option value="TR2">UI101</option>
                            </select>
                    </div>  

                    {/* LUGAR SALIDA */}
                     <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>Lugar Salida : </p>
                            <select name="Select" value={lugarSalida} onChange={(item)=>setLugarSalida(item.target.value)} className="absolute border-[1px] rounded-md w-72 border-gray-400">
                                <option value="TR1">Scala</option>
                                <option value="TR2">Demo</option>
                            </select>
                    </div> 
                     

                     {/* HORA SALIDA */}
                     <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>HORA Salida : </p>
                                <select name="Select" value={horaSalida} onChange={(item)=>setHoraSalida(item.target.value)} className="absolute border-[1px] rounded-md w-72 border-gray-400">
                                    <option value="TR2">{new Date().toLocaleString()}</option>
                                    <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-1))).toLocaleString()}</option>
                                    <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-2))).toLocaleString()}</option>
                                    <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-3))).toLocaleString()}</option>
                                </select>
                    </div>      


                    {/*Observecion */}
        <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>Observación : </p>
                            <textarea 
                            
                            className="absolute border-2 w-[60vh] rounded-md"/>
                    </div>
            </div>


            <div className='-ml-[50vh]'>
                 {/*Grupo Familiar */}
                 <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>Grupo Familiar : </p>
                            <select name="Select" value={lugarSalida} onChange={(item)=>setLugarSalida(item.target.value)} className="absolute border-[1px] rounded-md w-72 border-gray-400">
                                <option value="TR1">Scala</option>
                                <option value="TR2">Demo</option>
                            </select>
                    </div> 

                {/*Observecion Vehicule */}
                 <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>Observación vehiculo : </p>
                            <input className="absolute border-[1px] rounded-md w-72 border-gray-400"/>
                    </div>

                    {/* LUGAR DE Llegada */}
                    <div className='flex space-x-44 mt-24'>
                                <p className='font-medium'>Lugar de Llegada : </p>
                            <select name="Select" value={lugarSalida} onChange={(item)=>setLugarSalida(item.target.value)} className="absolute border-[1px] rounded-md w-72 border-gray-400">
                                <option value="TR1">Scala</option>
                                <option value="TR2">Demo</option>
                            </select>
                    </div> 


                    {/* HORA LlEGADA */}
                     <div className='mt-3 flex space-x-44'>
                                <p className='font-normal text-lg'>HORA Llegada : </p>
                                <select name="Select" value={horaSalida} onChange={(item)=>setHoraSalida(item.target.value)} className="absolute border-[1px] rounded-md w-72 border-gray-400">
                                    <option value="TR2">{new Date().toLocaleString()}</option>
                                    <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-1))).toLocaleString()}</option>
                                    <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-2))).toLocaleString()}</option>
                                    <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-3))).toLocaleString()}</option>
                                </select>
                    </div> 

            </div>


            </div>

            <div className='flex justify-center mt-16 space-x-4 pb-4'>
                <h3 onClick={()=>handleCancel()} className='bg-red-700 hover:cursor-pointer hover:bg-red-600 text-white text-lg font-semibold rounded-lg py-1 px-3'>Cancelar</h3>
                <h3 onClick={()=>handleEdit()} className='bg-blue-600 hover:cursor-pointer hover:bg-blue-500  text-white text-lg font-semibold rounded-lg py-1 px-3'>Actualizar</h3>
            </div>
        
        </div>
    )
}

export default EditMovimiento