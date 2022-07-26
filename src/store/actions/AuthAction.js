import { types } from '../actionTypes'
import { httpRequest } from '../../config'
import qs from 'qs'
import { setToast } from './ToastAction'
import ProgressBar from "@badrap/bar-of-progress";


export const UserLogin = (data) => async dispatch => {
    var response
    const progress =new ProgressBar({
        size:4,
        color:'blue'
    })

    try {
        
        dispatch({type:types.LOGIN_START})
        progress.start()
        response = await httpRequest.post('/login/', data,{
            headers: { "content-type": 'multipart/form-data' }
        })
        const result = response.data
        console.log(result.userData)

        if(result.message === 'Bienvenido a Emsecor'){
            //console.log(result)
             window.localStorage.setItem('token',result.userData.token)
             window.localStorage.setItem('userid',  result.userData.user_id)
             window.localStorage.setItem('tipo',  3)
                console.log("test ",window.localStorage.getItem('token'))
            dispatch(setToast('success', result.message))
            progress.finish()
            dispatch({type:types.LOGIN_SUCCESS, payload:result})
        }
        else if(result.message){
            progress.finish()
            console.log(result.message);
            dispatch({type:types.LOGIN_FAILED})
            dispatch(setToast('error',result.message))
			
        }
        
        
    } catch (error) {
        //console.log("UserLogin error");
        response = await httpRequest.post('/login/', data,{
            headers: { "content-type": 'multipart/form-data' }
        }).catch((err)=>{
            console.log(err.request.response)
            dispatch(setToast('error',err.request.response))
        })
        progress.finish()
        dispatch({type:types.LOGIN_FAILED})
    }
   
}






// REGISTER
export const UserRegister = (data) => async dispatch => {
    var response
    console.log("POL",data)
    const progress =new ProgressBar({
        size:4,
        color:'blue'
    })

    try {
        
        dispatch({type:types.REGISTER_START})
        progress.start()
         response = await httpRequest.post('/register/', data,{
            headers: { "content-type": 'multipart/form-data' }
        })
        const result = response.data
        console.log(result)

        // if(result.message === 'Bienvenido a Emsecor'){
          
            
        //   // console.log(result)
          
        //      window.localStorage.setItem('token',result.userData.token)
        //      window.localStorage.setItem('userid',  result.userData.user_id)
        //      window.localStorage.setItem('tipo',  result.userData.tipo)
        //         console.log("test ",window.localStorage.getItem('token'))
            dispatch(setToast('success', result.message))
            progress.finish()
            dispatch({type:types.REGISTER_SUCCESS, payload:result})
			
            
        // }
        // else if(result.message){
            progress.finish()
            dispatch({type:types.REGISTER_FAILED})
            dispatch(setToast('error',result.message))
			
        // }
        
        
    } catch (error) {
        response = await httpRequest.post('/register/', data,{
            headers: { "content-type": 'multipart/form-data' }
        }).catch((err)=>{
            console.log(err.request.response)
            dispatch(setToast('error',err.request.response))
        })
        progress.finish()
        dispatch({type:types.LOGIN_FAILED})
    }
   
}