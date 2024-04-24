import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Form from './Form';
import UpdateForm from './UpdateForm';

function AllRoutes() {
  return (
    <>
    <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<Form />} />
          <Route path="/update_data/:id" element={<UpdateForm />} />
          
    </Routes>
    </>
    
  )
}

export default AllRoutes