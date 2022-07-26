import React,{useState} from "react";
import { ICONS } from "../constants";

const LeaveMovimiento = (props) =>{
    const {Leave,setLeave} = props
    const [ejecutivo,setEjecutivo] = useState()
    const [grupoFamiliar,setGrupoFamiliar] = useState()
    const [protector,setProtector] = useState()
    const [vehiculoProtector,setVehiculoProtector] = useState()
    const [lugarSalida,setLugarSalida] = useState()
    const [horaSalida,setHoraSalida] = useState()
    const [lugarLlegadaO,setLugarLlegadaO] = useState()
    const [lugarLlegada,setLugarLlegada] = useState()
    const [observacion,setObservacion] = useState()

    const handleCancel = () =>{
        setLeave(false)
    }

    const handleLeave=()=>{
        alert("[SUCCESS]. Salir!!")
        setLeave(false)
    }
    return(
        <div>
        
                <div className="flex flex-row items-end justify-center mt-20 w-full z-50">
                <div className="mt-10 h-fit pb-8 rounded-md bg-white border-2 shadow-lg py-10 z-50 w-fit px-8 absolute">
                    <div className="border-b-[1px] z-50  pb-4 -mt-4 flex justify-between">
                        <h3 className="font-bold text-xl">Evento:</h3>
                        <ICONS.XCircleIconS className="h-6 hover:cursor-pointer pr-4" onClick={()=>handleCancel()}/>
                    </div>


                {/* INPUT */}
                    <div className="items-center flex flex-col border-b-[1px] pb-6">
                       {/* Ejecutivo */}
                        <div className='mt-3'>
                            <p className='font-medium'>Ejecutivo</p>
                            <select name="Select" value={ejecutivo} onChange={(item)=>setEjecutivo(item.target.value)} className="border-2 w-96">
                                <option value="TR1">TR1</option>
                                <option value="TR2">TR2</option>
                            </select>
                           
                        </div>


                        {/* Grupo Familiar */}
                        <div className='mt-3'>
                                <p className='font-medium'>Grupo Familiar</p>
                            <select name="Select" value={grupoFamiliar} onChange={(item)=>setGrupoFamiliar(item.target.value)} className="border-2 w-96">
                                <option value="TR1">TR1</option>
                                <option value="TR2">TR2</option>
                            </select>
                        </div>


                        {/* Protector */}
                        <div className='mt-3'>
                                <p className='font-medium'>Protector</p>
                            <select name="Select" value={protector} onChange={(item)=>setProtector(item.target.value)} className="border-2 w-96">
                                <option value="TR1">K1</option>
                                <option value="TR2">K2</option>
                            </select>
                        </div>


                        {/* Vehiculo Protector */}
                        <div className='mt-3'>
                                <p className='font-medium'>Vehiculo Protector</p>
                            <select name="Select" value={vehiculoProtector} onChange={(item)=>setVehiculoProtector(item.target.value)} className="border-2 w-96">
                                <option value="TR1">UI01</option>
                                <option value="TR2">UI02</option>
                            </select>
                        </div>


                        {/* Lugar Salida */}
                        <div className='mt-3'>
                                <p className='font-medium'>Lugar Salida</p>
                            <select name="Select" value={lugarSalida} onChange={(item)=>setLugarSalida(item.target.value)} className="border-2 w-96">
                                <option value="TR1">Scala</option>
                                <option value="TR2">Necala</option>
                            </select>
                        </div>


                        {/* Hora Salida */}
                        <div className='mt-3'>
                                <p className='font-medium'>Hora Salida</p>
                            <select name="Select" value={horaSalida} onChange={(item)=>setHoraSalida(item.target.value)} className="border-2 w-96">
                                <option value="TR2">{new Date().toLocaleString()}</option>
                                <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-1))).toLocaleString()}</option>
                                <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-2))).toLocaleString()}</option>
                                <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-3))).toLocaleString()}</option>
                            </select>
                        </div>


                        {/* Lugar de Llegada (Opcional) */}
                        <div className='mt-3'>
                                <p className='font-medium'>Lugar de Llegada (Opcional)</p>
                            <select name="Select" value={lugarLlegadaO} onChange={(item)=>setLugarLlegadaO(item.target.value)} className="border-2 w-96">
                                <option value="TR1">Casa Saturno</option>
                                <option value="TR2">Lasa stan</option>
                            </select>
                        </div>


                        {/* Lugar de Llegada  */}
                        <div className='mt-3'>
                                <p className='font-medium'>Lugar de Llegada</p>
                            <select name="Select" value={lugarLlegada} onChange={(item)=>setLugarLlegada(item.target.value)} className="border-2 w-96">
                            <option value="TR2">{new Date().toLocaleString()}</option>
                                <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-1))).toLocaleString()}</option>
                                <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-2))).toLocaleString()}</option>
                                <option value="TR1">{(new Date(new Date().setDate(new Date().getDate()-3))).toLocaleString()}</option>
                            </select>
                        </div>

                       {/* Observación  */}
                        <div className='mt-1'>
                            <p className='font-medium'>Observación </p>
                            <input
                                className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'
                                onChange={(item)=>setObservacion(item.target.value)}
                        />
                        </div>

                    </div>


                    



                    <div className="flex justify-end pr-5 space-x-4 mt-4">
                        <h3 onClick={()=>handleLeave()} className="bg-blue-500 w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-blue-400 text-white active:bg-slate-50">Salir</h3>
                    </div>

                </div>
                </div>
            
        
</div>
    )
}

export default LeaveMovimiento