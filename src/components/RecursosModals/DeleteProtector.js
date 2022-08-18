// import React from "react";
// import { connect } from "react-redux";
// import { DeleteProtectorRecord } from "../../store/actions";
// import { ICONS } from "../constants";

// const DeleteProtector = (props) =>{
//     const {Delete,setDelete} = props
//     const handleCancel = () =>{
//         setDelete(false)
//     }

//     const handleDelete=()=>{
//         const obj={
//             id:props.userID
//         }
//         props.DeleteProtectorRecord(obj)
//         setDelete(false)
//     }

//     return(
//         <div>

//                 <div className="flex flex-row items-end justify-center -mt-10 w-full z-50">
//                 <div className="mt-10 h-fit pb-8 rounded-md bg-white border-2 shadow-lg py-10 z-50 w-fit px-4 absolute">

//                 <div className="border-b-[1px] z-50  pb-4 -mt-4 flex justify-between">
//                         <ICONS.ExclamationIconS className="h-6 hover:cursor-pointer pl-4 text-orange-600 "/>
//                         <h3 className="font-bold text-left text-xl">Eliminar Protector</h3>
//                         <ICONS.XCircleIconS className="h-6 hover:cursor-pointer pr-4" onClick={()=>handleCancel()}/>
//                 </div>
//                     <p className="text-center text-lg -ml-3 py-2 w-[50vh]">
//                     Estas por de eliminar a un protector .</p>

//                     <div className="flex justify-end space-x-4 mt-4">
//                         <h3 onClick={()=>handleCancel()} className="w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
//                             hover:bg-green-700 active:bg-slate-50 bg-green-900 text-white">Cancelar</h3>
//                         <h3 onClick={()=>handleDelete()} className="bg-orange-600 w-20 py-1 rounded-md text-center font-semibold hover:cursor-pointer
//                             hover:bg-orange-500 text-white active:bg-slate-50">Eliminor</h3>
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
// export default connect(mapStateToProps,{DeleteProtectorRecord})(DeleteProtector)
