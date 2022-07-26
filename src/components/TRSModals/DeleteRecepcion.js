import React from "react";
import { ICONS } from "../constants";

const DeleteRecepcion = (props) =>{
    const {Delete,setDelete} = props
    const handleCancel = () =>{
        setDelete(false)
    }

    const handleDelete=()=>{
        alert("[SUCCESS]. Deleted!!")
        setDelete(false)
    }

    return(
        <div>
        
                <div className="flex flex-row items-end justify-center -mt-56 w-full z-50">
                <div className="mt-10 h-fit pb-8 rounded-md bg-white border-2 shadow-2xl py-10 z-50 lg:w-1/3 absolute">
                    <div className="border-b-[1px] z-50  pb-4 -mt-4 flex justify-between">
                        <ICONS.ExclamationIconS className="h-6 hover:cursor-pointer pl-4 text-orange-600 "/>
                        <h3 className="font-bold pl-7 text-xl">Eliminar Acta de Entrega y Recepción</h3>
                        <ICONS.XCircleIconS className="h-6 hover:cursor-pointer pr-4" onClick={()=>handleCancel()}/>
                    </div>
                    <p className=" text-justify text-lg -ml-3 py-2 px-7">
                    Al eliminar una Acta, sera de forma definitiva y sin
posibilidad de recuperación.</p>

                      


                    <div className="flex justify-end pr-5 space-x-4 mt-4">
                        <h3 onClick={()=>handleCancel()} className="w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-green-700 active:bg-slate-50 bg-green-900 text-white">Cancelar</h3>
                        <h3 onClick={()=>handleDelete()} className="bg-orange-600 w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-orange-500 text-white active:bg-slate-50">Eliminor</h3>
                    </div>

                </div>
                </div>
            
        
</div>
    )
}

export default DeleteRecepcion