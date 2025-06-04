import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/css/profils.css'

import {
      fetchUserMainData,
      fetchUserActivity,
      fetchUserAverageSessions,
      fetchUserPerformance,
} from '../../utils/api'
import {
      transformActivityData,
      transformKpiData,
      transformAverageSessions,
      transformPerformanceData,
} from '../../utils/transformers'

import VertivalNav from '../../components/VerticalNav'
import ActivityChart from '../../components/charts/ActivityChart'
import LineChartComponent from '../../components/charts/LineChart'
import RadarChart from '../../components/charts/RadarChart'
import Kpi from '../../components/charts/KpiChart'

import Calories from '../../assets/svg/calories-icon.svg'
import Proteines from '../../assets/svg/protein-icon.svg'
import Glucides from '../../assets/svg/carbs-icon.svg'
import Lipides from '../../assets/svg/fat-icon.svg'

import KeyDataCard from '../../components/KeyDataCard'

function App() {
      const { userId } = useParams()
      const [user, setUser] = useState(null)
      const [activityData, setActivityData] = useState([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [kpiData, setKpiData] = useState([])
      const [averageSessions, setAverageSessions] = useState([])
      const [performanceData, setPerformanceData] = useState([])

      useEffect(() => {
            // Fonction asynchrone pour charger toutes les données nécessaires à l'affichage du profil utilisateur
            const loadData = async () => {
                  try {
                        // Récupération des données principales de l'utilisateur (informations personnelles + keyData)
                        const userData = await fetchUserMainData(userId)

                        // Récupération des données d'activité quotidienne (BarChart)
                        const rawActivity = await fetchUserActivity(userId)

                        // Récupération des sessions moyennes (LineChart)
                        const rawAverageSessions =
                              await fetchUserAverageSessions(userId)

                        // Récupération des performances de l'utilisateur (RadarChart)
                        const rawPerformance = await fetchUserPerformance(
                              userId
                        )

                        // Stockage des données utilisateur dans le state
                        setUser(userData)

                        // Transformation et stockage des données d'activité pour le BarChart
                        setActivityData(transformActivityData(rawActivity))

                        // Transformation et stockage des données pour l'indicateur KPI (Score)
                        setKpiData(transformKpiData(userData))

                        // Transformation et stockage des données des sessions moyennes pour le LineChart
                        setAverageSessions(
                              transformAverageSessions(rawAverageSessions)
                        )

                        // Transformation et stockage des données de performance pour le RadarChart
                        setPerformanceData(
                              transformPerformanceData(rawPerformance)
                        )
                  } catch (err) {
                        // Gestion d'une éventuelle erreur lors du chargement des données
                        setError(
                              'Impossible de charger les données utilisateur.'
                        )
                        console.error(err)
                  } finally {
                        // Fin du chargement (succès ou erreur)
                        setLoading(false)
                  }
            }

            // Appel de la fonction de chargement au montage du composant ou au changement de l'ID utilisateur
            loadData()
      }, [userId])

      // Gestion de l'état de chargement (affichage d'un message)
      if (loading) {
            return <div>Chargement...</div>
      }

      // Gestion de l'état d'erreur (affichage d'un message d'erreur)
      if (error) {
            return <div>Erreur: {error}</div>
      }

      return (
            <div className="page__profil">
                  <VertivalNav />
                  <div className="page__accueil">
                        <div className="profil">
                              <div className="title">
                                    {console.log('user:', user)}{' '}
                                    {/* Log de l'objet user */}
                                    <h1>
                                          Bonjour{' '}
                                          <span className="title__red">
                                                {user && user.userInfos
                                                      ? user.userInfos.firstName
                                                      : 'Chargement...'}
                                          </span>
                                    </h1>
                                    <p>
                                          Félicitations ! Vous avez explosé vos
                                          objectifs hier.
                                    </p>
                              </div>
                              <div className="charts">
                                    <div className="chart__activity">
                                          <ActivityChart data={activityData} />
                                          {/* api1 */}
                                    </div>
                                    <div className="charts__other">
                                          <span className="charts__other--objectifs">
                                                <LineChartComponent
                                                      data={averageSessions}
                                                />
                                          </span>
                                          {/* api2 */}
                                          <span className="charts__other--radar">
                                                <RadarChart
                                                      data={performanceData}
                                                />
                                          </span>
                                          {/* api3 */}
                                          <span className="charts__other--kpi">
                                                <Kpi data={kpiData} />
                                          </span>
                                          {/* api4 */}
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
      )
}

export default App
