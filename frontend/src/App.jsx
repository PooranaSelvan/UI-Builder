import { useState } from 'react';
import HomePage from './pages/home/HomePage';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from './pages/error/ErrorPage';
import LoginPage from './pages/login/LoginPage';
import SignUp from './pages/signup/SignUp';
import Workspace from './pages/workspace/Workspace';
import ComponentEditor from './pages/component-editor/ComponentEditor';
import { Toaster } from 'react-hot-toast';
import PreviewCanvas from './pages/workspace/preview/PreviewCanvas';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/preview" element={<PreviewCanvas />} />
          <Route path='/component-editor' element={<ComponentEditor />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
