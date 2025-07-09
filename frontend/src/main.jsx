import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ModalProvider } from './store/ModalContext.jsx'
import { AdminContextProvider } from './store/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminContextProvider>
    <ModalProvider>
        <App />
      </ModalProvider>
    </AdminContextProvider>
    
  </StrictMode>,
)
