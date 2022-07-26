import React from 'react'
import { Navigate } from 'react-router-dom'

const RedirectWithoutLogin = () =>{
    var token = window.localStorage.getItem('token')
    var tipo = window.localStorage.getItem('tipo')
    if(token==null || tipo==null)
    {
            return(
                <Navigate to="/" replace={true}/> 
           ) 
        
    }
}

export default RedirectWithoutLogin