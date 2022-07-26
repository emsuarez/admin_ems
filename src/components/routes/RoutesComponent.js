import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import App from '../../App';
import { Login, LoginOption } from '../../pages';

  
const RoutesComponent = () =>{
    return(
        <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route index element={<LoginOption/>} />
        <Route path="/login" element={<Login/>}>
          <Route path=":test" element={<Login />} />
          <Route path="/yo" element={<LoginOption />} />
          <Route index element={<LoginOption />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
    )
}

export default RoutesComponent