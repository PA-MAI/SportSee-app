import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import './styles/css/index.css'
import Header from './components/Header'
import App from './pages/Profils'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
        <Routes> 
        <Route path="/user/:userId" element={<App />} /> {/* Route dynamique pour afficher le profil */}
        {/* Autres routes ici  */}
      </Routes>
    </BrowserRouter>
 </StrictMode>,
)

