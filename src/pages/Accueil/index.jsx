import React from 'react';
import { Link } from 'react-router-dom';
import VertivalNav from '../../components/VerticalNav';
function Accueil() {
    return (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',}}>
        <VertivalNav />
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width:'100%',
            height: '100%',
            gap: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius:'5px',
            margin: '30px',
            padding:'30px'
             }}>
          
            <h1 style={{ fontSize: '2rem', marginBottom: '40px' }}>Bienvenue sur SportSee, choisissez un profil</h1>
            <Link to="/user/12">
                <button style={{ cursor: 'pointer', padding: '10px 20px', fontSize: '16px' , borderRadius:'50%' }}>Karl</button>
            </Link>
            <Link to="/user/18">
                <button style={{ cursor: 'pointer',  padding: '10px 20px', fontSize: '16px' , borderRadius:'50%'}}>Cécilia</button>
            </Link>
        </div>
    </div>
  );
}

export default Accueil;