import React,{useState} from "react";
import { ICONS } from "../constants";

const CreateFamily = (props) =>{
    const {Create,setCreate} = props
    const [nombre,setNombre] = useState()
    const [alias,setAlias] = useState()

    const handleCancel = () =>{
        setCreate(false)
    }

    const handleCreate=()=>{
        alert("[SUCCESS]. Created!!")
        setCreate(false)
    }

    return(
        <div>
        
                <div className="flex flex-row items-end justify-center -mt-10 w-full z-50">
                <div className="mt-10 h-fit pb-8 rounded-md bg-white border-2 shadow-lg py-10 z-50 w-fit px-12 absolute">
                    <div className="border-b-[1px] z-50  pb-4 -mt-4 flex justify-between">
                        <h3 className="font-bold text-xl">Crear familiar de Ejecutivo</h3>
                        <ICONS.XCircleIconS className="h-6 hover:cursor-pointer pr-4" onClick={()=>handleCancel()}/>
                    </div>


                {/* INPUT */}
                    <div className="items-center flex flex-col border-b-[1px] pb-6">
                       {/* Nombre */}
                        <div className='mt-1'>
                            <p className='font-medium'>Nombre:</p>
                            <input
                                className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'
                                onChange={(item)=>setNombre(item.target.value)}
                        />
                        </div>


                        {/* Alias */}
                        <div className='mt-1'>
                            <div className="flex justify-between">
                                <p className='font-medium'>Alias*:</p>
                                <p className="font-medium text-red-600 hover:cursor-pointer">verificar</p>
                            </div>
                            <input
                                className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'
                                onChange={(item)=>setAlias(item.target.value)}
                        />
                        </div>
                    </div>



                    <div className="flex justify-end space-x-4 mt-4">
                        <h3 onClick={()=>handleCancel()} className="w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-green-700 active:bg-slate-50 bg-green-900 text-white">Cancelar</h3>
                        <h3 onClick={()=>handleCreate()} className="bg-blue-500 w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-blue-400 text-white active:bg-slate-50">Crea</h3>
                    </div>

                </div>
                </div>
            
        
</div>
    )
}

export default CreateFamily