import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import './styles/css/index.css'
import Header from './components/Header'
import App from './pages/Profils'
import Accueil from './pages/Accueil';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes> 
        <Route path="/" element={<Accueil />} /> {/* Route par défaut */}
        <Route path="/user/:userId" element={<App />} /> {/* Route dynamique pour afficher le profil */}
      </Routes>
    </BrowserRouter>
 </StrictMode>,
)

