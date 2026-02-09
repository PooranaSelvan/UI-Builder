import { useState } from 'react';
import HomePage from './pages/home/HomePage';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from "react-router-dom";
import ErrorPage from './pages/error/ErrorPage';
import LoginPage from './pages/login/LoginPage';
import SignUp from './pages/signup/SignUp';
import Workspace from './pages/workspace/Workspace';
import ComponentEditor from './pages/component-editor/ComponentEditor';
import { Toaster } from 'react-hot-toast';
import PreviewCanvas from './pages/workspace/preview/PreviewCanvas';
import { useEffect } from 'react';
import axios from "axios";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  let location = useLocation();

  useEffect(() => {
    const checkMe = async () => {
      try {
        let res = await axios.get("http://localhost:5000/checkme", {
          withCredentials: true
        });

        setIsAuthenticated(true);
        setUser(res.data.user);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      }
    }

    checkMe();
  }, []);

  return (
    <>
      {!location.pathname.startsWith("/preview") && <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
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
    </>
  )
}

export default App
