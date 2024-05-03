import { useEffect, useState } from 'react';
import './App.css';
import AllRoutes from './components/AllRoutes';
import UpdateForm from './components/UpdateForm';
import RegistrationForm from './components/RegistrationForm';
import { Route ,Routes} from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout'

const App = () => {
  return (
    <>
      <AllRoutes/>
      <Routes>
      <Route path="/RegistrationForm" element= {<RegistrationForm/>} ></Route>
      <Route path="/login" element= {<Login/>} ></Route>
      <Route path="/logout" element= {<Logout/>} ></Route>
      </Routes>
      

    </>
  );
};

export default App;