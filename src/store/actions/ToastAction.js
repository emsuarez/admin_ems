import {types} from '../actionTypes'

export const setToast = (status, message) => dispatch =>{
    console.log(status, message)
    try{
        dispatch({
            type:types.SHOW_TOAST,payload:{
                status,
                message,
            }
        })
    }
    catch(error)
    {
        // console.log('error',error)
    }
}

export const clearToast = () => dispatch=>{
    dispatch({type:types.HIDE_TOAST})
}