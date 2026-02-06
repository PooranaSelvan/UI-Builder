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
import RightSideBar from './pages/workspace/RightSideBar/RightSideBar';
import ComponentEditor from './pages/component-editor/ComponentEditor';
import { Toaster } from 'react-hot-toast';

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
          <Route path="/workspace" element={<Workspace />}>
            <Route path="leftpanel" element={<LeftPanel />} />
            <Route path="temp" element={<Canvas />} />
          </Route>
          <Route path='/component-editor' element={<ComponentEditor />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
