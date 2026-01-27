import { useState } from 'react';
import HomePage from './pages/home/HomePage';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorPage from './pages/error/ErrorPage';
import LoginPage from './pages/login/LoginPage';
import SignUp from './pages/signup/SignUp';
import LeftPanel from './pages/workspace/LeftSideBar/LeftPanel';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />  
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />}  />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/leftpanel' element={<LeftPanel />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
