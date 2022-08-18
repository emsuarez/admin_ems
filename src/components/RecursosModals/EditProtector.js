// import React,{useState} from "react";
// import { connect } from "react-redux";
// import { UpdateProtectorRecord } from "../../store/actions";
// import { ICONS } from "../constants";

// const EditProtector = (props) =>{
//     const {Edit,setEdit} = props
//     const [nombre,setNombre] = useState(props.nombres)
//     const [alias,setAlias] = useState(props.alias)

//     const handleCancel = () =>{
//         setEdit(false)
//     }

//     const handleEdit=()=>{
//         const obj={
//             id:props.userID,
//             nombres:nombre,
//             alias
//         }
//         props.UpdateProtectorRecord(obj)
//         setEdit(false)
//     }

//     return(
//         <div>
        
//                 <div className="flex flex-row items-end justify-center -mt-10 w-full z-50">
//                 <div className="mt-10 h-fit pb-8 rounded-md bg-white border-2 shadow-lg py-10 z-50 w-fit px-4 absolute">
//                     <div className="border-b-[1px] z-50  pb-4 -mt-4 flex justify-between">
//                         <h3 className="font-bold pl-7 text-xl">Editar Protector</h3>
//                         <ICONS.XCircleIconS className="h-6 hover:cursor-pointer pr-4" onClick={()=>handleCancel()}/>
//                     </div>

//                 <p className="mt-2 pb-2">Edita los datos protector verificando que el alias se unico.</p>



//                 {/* INPUT */}
//                     <div className="items-center flex flex-col border-b-[1px] pb-6">
//                        {/* Nombre */}
//                         <div className='mt-2'>
//                             <p className='font-medium'>Nombre:</p>
//                             <input
//                                 className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'
//                                 value={nombre}
//                                 onChange={(item)=>setNombre(item.target.value)}
//                         />
//                         </div>


//                         {/* Alias */}
//                         <div className='mt-2'>
//                             <div className="flex justify-between">
//                                 <p className='font-medium'>Alias*:</p>
//                                 <p className="font-medium text-red-600 hover:cursor-pointer">verificar</p>
//                             </div>
//                             <input
//                                 className='border-[1px] border-neutral-300 pl-2 rounded-md py-1 w-96 focus:border-blue-500 outline-none'
//                                 value={alias}
//                                 onChange={(item)=>setAlias(item.target.value)}
//                         />
//                         </div>
//                     </div>



//                     <div className="flex justify-end pr-5 space-x-4 mt-4">
//                         <h3 onClick={()=>handleCancel()} className="w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
//                             hover:bg-green-700 active:bg-slate-50 bg-green-900 text-white">Cancelar</h3>
//                         <h3 onClick={()=>handleEdit()} className="bg-blue-500 w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
//                             hover:bg-blue-400 text-white active:bg-slate-50">Actualizar</h3>
//                     </div>

//                 </div>
//                 </div>
            
        
// </div>
//     )
// }

// const mapStateToProps = (props) =>{
//     return{
//         ejecutivo:props.recursos.ejecutivo
// }
// }
// export default connect(mapStateToProps,{UpdateProtectorRecord})(EditProtector)