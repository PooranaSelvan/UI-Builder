import { useState } from 'react';
import HomePage from './pages/home/HomePage';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from './pages/error/ErrorPage';
import LoginPage from './pages/login/LoginPage';
import SignUp from './pages/signup/SignUp';
import LeftPanel from './pages/workspace/LeftSideBar/LeftPanel';
import Canvas from './pages/workspace/Canvas/Canvas';
import Workspace from './pages/workspace/Workspace';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/workspace" element={<Workspace />}>
            <Route path="leftpanel" element={<LeftPanel />} />
            <Route path="temp" element={<Canvas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
