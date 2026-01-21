import { useState } from 'react';
import HomePage from './pages/home/HomePage';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorPage from './pages/error/ErrorPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />}  />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
