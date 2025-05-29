import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/css/profils.css';
import { fetchUserMainData } from '../../utils/api';


import Calories from '../../assets/svg/calories-icon.svg';
import Proteines from '../../assets/svg/protein-icon.svg';
import Glucides from '../../assets/svg/carbs-icon.svg';
import Lipides from '../../assets/svg/fat-icon.svg';

import VertivalNav from '../../components/VerticalNav';
import Activity from '../../components/charts/ActivityChart';
import SessionLineChart from '../../components/charts/LineChart';
import Radar from '../../components/charts/RadarChart';
import Kpi from '../../components/charts/KpiChart';

import KeyDataCard from '../../components/KeyDataCard';

function App() {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserMainData(userId);
        console.log("Données utilisateur récupérées:", data);
        setUser(data);
      } catch (err) {
        setError('Impossible de charger les données utilisateur.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
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
      <div className='page__accueil'>
        <div className="profil">
          <div className="title">
            {console.log('user:', user)}  {/* Log de l'objet user */}
            <h1>Bonjour <span className= "title__red">{user && user.userInfos ? user.userInfos.firstName : 'Chargement...'}</span></h1>
            <p>Félicitations ! Vous avez explosé vos objectifs hier.</p>
          </div>
          <div className='charts'>
            <div className="chart__activity">
              <Activity />
              {/* api1 */}
            </div>
            <div className="charts__other">
              <span className="charts__other--objectifs"><SessionLineChart /></span>{/* api2 */}
              <span className="charts__other--radar"><Radar /></span>{/* api3 */}
              <span className="charts__other--kpi"><Kpi /></span>{/* api4 */}
            </div>
          </div>
        </div>
        <div className="result">
          <KeyDataCard
            icon={Calories}
            alt="icone calories"
            value={user.keyData.calorieCount}
            unit="kCal"
            label="Calories"
            className="calories-icon"
          />
          <KeyDataCard
            icon={Proteines}
            alt="icone protéines"
            value={user.keyData.proteinCount}
            unit="g"
            label="Protéines"
            className="protein-icon"
          />
          <KeyDataCard
            icon={Glucides}
            alt="icone glucides"
            value={user.keyData.carbohydrateCount}
            unit="g"
            label="Glucides"
            className="glucines-icon"
          />
          <KeyDataCard
            icon={Lipides}
            alt="icone lipides"
            value={user.keyData.lipidCount}
            unit="g"
            label="Lipides"
            className="lipides-icon"
          />
        </div>
      </div>
 
    </div>
  );
}

export default App;