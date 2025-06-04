//import { useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/svg/logo.svg'
import LogoSportSee from '../assets/svg/logoSportSee.svg'
import '../styles/css/header.css'

function Header() {

  return (

        <header className="header" >
            <a className="header__logo" href="http://localhost:5173">
                <img src={Logo} className="logo" alt="SportSee logo" />
                <img src={LogoSportSee} className="SportSee logo" alt="logo SportSee" />
            </a>
            <nav className="header__nav">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p>
                    Accueil
                  </p>
                </Link>
                <p>
                Profil
                </p>
                <p>
                Réglage
                </p>
                <p>
                Communauté
                </p>
            </nav>
        </header>
    )
}

export default Header