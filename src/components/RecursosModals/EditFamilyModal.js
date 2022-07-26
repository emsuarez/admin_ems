import React,{useState} from "react";
import { ICONS } from "../constants";
import { FamilyTable } from "../RecursosTable/index.js";

const EditFamilyModal = (props) =>{
    const {EditFamily,setEditFamily} = props
    const [nombre,setNombre] = useState()
    const [alias,setAlias] = useState()

    const handleCancel = () =>{
        setEditFamily(false)
    }

    const handleEditFamily=()=>{
        alert("[SUCCESS]. Done !!")
        setEditFamily(false)
    }

    return(
        <div className="justify-center flex flex-col ml-96 mt-28">
        
                <div className="flex flex-row items-end justify-start z-50">
                <div className="mt-10 h-fit w-fit pb-8 rounded-md bg-white border-2 shadow-lg py-10 z-50 absolute">
                    <div className="border-b-[1px] z-50  pb-4 -mt-4 flex justify-between">
                        <h3 className="font-bold pl-7 text-xl">Editar vinculo familiar</h3>
                        <ICONS.XCircleIconS className="h-6 hover:cursor-pointer pr-4" onClick={()=>handleCancel()}/>
                    </div>
                    {/* <p className="text-center text-lg -ml-3 py-2">Crea a un ejecutivo con su sobrenombre clave.</p> */}
                   

                <div className="pt-10">

                    <FamilyTable name="Nombre"/>
                </div>



                



                    <div className="flex justify-end pr-5 space-x-4 mt-4">
                        <h3 onClick={()=>handleEditFamily()} className="bg-blue-500 w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-blue-400 text-white active:bg-slate-50">Salir</h3>
                    </div>

                </div>
                </div>
            
        
</div>
    )
}

export default EditFamilyModal