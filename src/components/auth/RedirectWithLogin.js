import React from 'react'
import { Navigate } from 'react-router-dom'

const RedirectWithLogin = () =>{
    var token = window.localStorage.getItem('token')
    var tipo = window.localStorage.getItem('tipo')

    if(token)
    {
        if(tipo==='1')
        {
            return(
                 <Navigate to="/dashboard" replace={true}/> 
            )      
        }
        else if(tipo==='2')
        {
            return(
                <Navigate to="/cctvdashboard" replace={true}/> 
           ) 
        }
        else if(tipo==='3'){
            return(
                <Navigate to="/trsdashboard" replace={true}/> 
           ) 
        }
    }
}

export default RedirectWithLogin