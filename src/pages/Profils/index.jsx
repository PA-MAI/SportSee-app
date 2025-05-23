import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/css/profils.css';

import Calories from '../../assets/svg/calories-icon.svg';
import Proteines from '../../assets/svg/protein-icon.svg';
import Glucides from '../../assets/svg/carbs-icon.svg';
import Lipides from '../../assets/svg/fat-icon.svg';

import VertivalNav from '../../components/VerticalNav';
import Activity from '../../components/charts/Activity';

function App() {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:3000/user/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur de chargement des données');
        }
        return response.json();
      })
      .then(response => {
        console.log("Données utilisateur récupérées:", response.data);  
        setUser(response.data);  
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [userId]);

  // Gestion du chargement et des erreurs
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }


  return (
    <div className='page__profil'>
      <VertivalNav />
      <div className="profil">
        <div className="title">
          {console.log('user:', user)}  {/* Log de l'objet user */}
          <h1>Bonjour {user && user.userInfos ? user.userInfos.firstName : 'Chargement...'}</h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier.</p>
        </div>
        <div className='charts'>
          <div className="chart__activity">
            <Activity />
            {/* api1 */}
          </div>
          <div className="charts__other">
            <span className="charts__other--objectifs"></span>{/* api2 */}
            <span className="charts__other--radar"></span>{/* api3 */}
            <span className="charts__other--kpi"></span>{/* api4 */}
          </div>
        </div>
      </div>
      <div className="result">
        <div className="result__article">
          <img src={Calories} className="calories-icon" alt="icone calories" />
          <span>Calories</span>
        </div>
        <div className="result__article">
          <img src={Proteines} className="protein-icon" alt="icone proteines" />
          <span>Proteines</span>
        </div>
        <div className="result__article">
          <img src={Glucides} className="glucines-icon" alt="icone glucines" />
          <span>Glucides</span>
        </div>
        <div className="result__article">
          <img src={Lipides} className="lipides-icon" alt="icone lipides" />
          <span>Lipides</span>
        </div>
      </div>
    </div>
  );
}

export default App;