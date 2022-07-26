import React,{useEffect, useState} from "react";
import { connect } from "react-redux";
import { UpdateVehicleEjecutivoRecord } from "../../store/actions";
import { ICONS } from "../constants";

const EditVehicle = (props) =>{
    const {Edit,setEdit} = props
    const [nombre,setNombre] = useState(props.nombre)
    const [alias,setAlias] = useState(props.alias)
    const [placas,setPlacas] = useState(props.placas)
    const [tipo,setTipo] = useState(props.tipo)
    const [ejecutivoData,setEjecutivoData] = useState()
    const [ejecutivoID,setEjecutivoID] = useState(props.ejecutivoID)


    const handleGetEjecutivos=async()=>{
        ejecutivoData = await fetch('https://cloudbitakor.com/api/1.0/ejecutivo/', { 
          method: 'get', 
          headers: new Headers({
            "Authorization":"Token "+window.localStorage.getItem('token')
          })
        }).then(response => response.json())
        .then(data => setEjecutivoData(data));
      }
      useEffect(()=>{
        handleGetEjecutivos();
      },[ejecutivoData])



    const handleCancel = () =>{
        setEdit(false)
    }

    const handleEdit=()=>{
        alert("[SUCCESS]. Edited!!")
        setEdit(false)
    }

    return(
        <div>
        
                <div className="flex flex-row items-end justify-center mt-20 w-full z-50">
                <div className="mt-10 h-fit pb-8 rounded-md bg-white border-2 shadow-lg py-10 z-50 w-fit px-8 absolute">
                    <div className="border-b-[1px] z-50  pb-4 -mt-4 flex justify-between">
                        <h3 className="font-bold text-xl">Editar un Vehiculo</h3>
                        <ICONS.XCircleIconS className="h-6 hover:cursor-pointer pr-4" onClick={()=>handleCancel()}/>
                    </div>


                <p className="mt-2 pb-2">Aqui puedes editar los datos del vehiculo asociado a un Ejecutivo.</p>

                {/* INPUT */}
                    <div className="items-center flex flex-col border-b-[1px] pb-6">
                       {/* Nombre del vehiculo: */}
                        <div className='mt-3'>
                            <p className='font-medium'>Nombre del vehiculo:</p>
                            <input
                                className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'
                                value={nombre}
                                onChange={(item)=>setNombre(item.target.value)}
                        />
                        </div>


                        {/* Placas (optional) */}
                        <div className='mt-3'>
                                <p className='font-medium'>Placas (optional):</p>
                            <input
                                className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'
                                value={placas}
                                onChange={(item)=>setPlacas(item.target.value)}
                        />
                        </div>


                        {/* Alias */}
                        <div className='mt-3'>
                                <p className='font-medium'>Alias *:</p>
                            <input
                                className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'
                                value={alias}
                                onChange={(item)=>setAlias(item.target.value)}
                        />
                        </div>


                        {/* Tipo: */}
                        <div className='mt-3'>
                                <p className='font-medium'>Tipo::</p>
                            <input
                                className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'
                                value={tipo}
                                onChange={(item)=>setTipo(item.target.value)}
                        />
                        </div>


                        {/* PROPIETARIO */}
                        <div className='mt-3'>
                                <p className='font-medium'>PROPIETARIO*:</p>
                                <select
                                value={ejecutivoID}
                                onChange={ (item)=>setEjecutivoID(item.target.value)}
                                className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'>
                                    {
                                        ejecutivoData&&ejecutivoData.map((item,index)=>{
                                            return(
                                                <option value={item.id}>{item.nombres}</option>
                                            )
                                        })
                                    }
                                </select>
                        </div>

                    </div>



                    <div className="flex justify-end pr-5 space-x-4 mt-4">
                        <h3 onClick={()=>handleCancel()} className="w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-green-700 active:bg-slate-50 bg-green-900 text-white">Cancelar</h3>
                        <h3 onClick={()=>handleEdit()} className="bg-blue-500 w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
                            hover:bg-blue-400 text-white active:bg-slate-50">Actualizar</h3>
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
export default connect(mapStateToProps,{UpdateVehicleEjecutivoRecord})(EditVehicle)