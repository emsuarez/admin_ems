import React from "react";
import { connect } from "react-redux";
import { DeleteLugaresRecord } from "../../store/actions";
import { ICONS } from "../constants";

const DeleteLugar = (props) =>{
    const {Delete,setDelete} = props
    const handleCancel = () =>{
        setDelete(false)
    }

    const handleDelete=()=>{
        const obj={
            id:props.userID
        }
        props.DeleteLugaresRecord(obj)
        setDelete(false)
    }

    return(
        <div>
        
                <div className="flex flex-row items-end justify-center -mt-10 w-full z-50">
                <div className="mt-10 h-fit pb-8 rounded-md bg-white border-2 shadow-lg py-10 z-50 w-fit px-20  absolute">
                    <div className="border-b-[1px] z-50  pb-4 -mt-4 flex justify-around">
                        <ICONS.ExclamationIconS className="h-6 hover:cursor-pointer text-orange-600 -ml-5 "/>
                        <h3 className="font-bold text-left ml-14 text-xl">Eliminar Lugar</h3>
                        <ICONS.XCircleIconS className="h-6 hover:cursor-pointer ml-20" onClick={()=>handleCancel()}/>
                    </div>
                    <p className="text-center text-lg -ml-3 py-2 px-5 ">
                    Esta por eliminar un lugar.</p>

                    


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

const mapStateToProps = (props) =>{
    return{
        ejecutivo:props.recursos.ejecutivo
}
}
export default connect(mapStateToProps,{DeleteLugaresRecord})(DeleteLugar)