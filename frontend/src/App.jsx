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
import ComponentEditorPreview from "./pages/component-editor/ComponentEditorPreview.jsx";
import { ComponentEditorProvider } from "./context/ComponentEditorContext";
import { CustomComponentsProvider } from "./context/CustomComponentsContext";
import Dashboard from "./pages/dashboard/Dashboard.jsx";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  let location = useLocation();
  const baseUrl = import.meta.env.VITE_SITE_TYPE === "development" ? import.meta.env.VITE_BACKEND_LOCAL : import.meta.env.VITE_BACKEND_PROD;


  useEffect(() => {
    const checkMe = async () => {
      try {
        let res = await axios.get(`${baseUrl}checkme`, {
          withCredentials: true
        });

        if (res.data?.user) {
          setIsAuthenticated(true);
          setUser(res.data.user);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      }
    }

    checkMe();
  }, []);
  const hideNavbar = location.pathname.startsWith("/preview") || location.pathname.startsWith("/component-editor-preview");

  return (
    <CustomComponentsProvider>
      <>
        {!hideNavbar && (
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/preview" element={<PreviewCanvas />} />
          <Route
            path="/component-editor"
            element={
              <ComponentEditorProvider>
                <ComponentEditor />
              </ComponentEditorProvider>
            }
          />

          <Route
            path="/component-editor-preview"
            element={
              <ComponentEditorProvider>
                <ComponentEditorPreview />
              </ComponentEditorProvider>
            }
          />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <Toaster />
      </>
    </CustomComponentsProvider>
  )
}

export default App
