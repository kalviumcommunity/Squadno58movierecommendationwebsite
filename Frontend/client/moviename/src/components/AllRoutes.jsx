import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Form from './Form';

function AllRoutes() {
  return (
    <>
    <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<Form />} />
    </Routes>
    </>
    
  )
}

export default AllRoutes