//import { useState } from 'react'
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
                <p>
                Accueil
                </p>
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