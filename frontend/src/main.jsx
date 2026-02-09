import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ComponentProvider } from './context/ComponentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComponentProvider>
      <App />
    </ComponentProvider>
  </StrictMode>,
)
