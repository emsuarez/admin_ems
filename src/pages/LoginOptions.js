import React from 'react'

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

const LoginOption = () =>{
    return(
        <div className='bg-white'>

            <div className='justify-center items-center space-y-3 flex flex-col h-screen'>
                <Link to='/login' className='bg-blue-600  text-white text-2xl w-64 p-3  text-center rounded-full 
                    hover:bg-blue-500 hover:cursor-pointer font-semibold'>ADMINISTRADOR</Link>

                <Link to='/login' className='bg-blue-600  text-white text-2xl w-64 p-3 text-center rounded-full 
                    hover:bg-blue-500 hover:cursor-pointer font-semibold'>CCTV</Link>

                <Link to='/login' className='bg-blue-600  text-white text-2xl w-64 p-3 text-center rounded-full 
                    hover:bg-blue-500 hover:cursor-pointer font-semibold'>TRS</Link>
            </div>

        </div>
    )
}

export default LoginOption