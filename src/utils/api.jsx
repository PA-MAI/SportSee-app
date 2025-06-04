import axios from 'axios'

/**

 *  Fonction utilitaire pour effectuer un appel API avec un mécanisme de secours (fallback)
 * @param {Function} apiCall - Fonction asynchrone représentant l'appel à l'API réelle (via axios)
 * @param {Function} mockCall - Fonction de secours à exécuter si l'appel API échoue (données mockées)
 * @returns {Promise<any>} Les données obtenues soit depuis l'API, soit depuis les mocks
 */
const fetchWithFallback = async (apiCall, mockCall) => {
      try {
            // Tentative d'appel à l'API réelle
            const response = await apiCall()
            return response.data // Si succès, on retourne les données de l'API
      } catch (error) {
            // En cas d'erreur (ex: API hors-ligne), on affiche un avertissement et on passe aux données mockées
            console.warn('API unreachable, using mock data:', error.message)
            return await mockCall() // Données de secours utilisées (mode développement)
      }
}

// -------------------------
//  MOCK DATA IMPORT
// -------------------------
/**
 * Fonction de chargement des données mockées (fallback local)
 * Cette fonction importe dynamiquement les données simulées depuis un fichier local,
 * situé dans le dossier `public/__mock__/store.js`.
 * Cela permet de tester l'application localement sans dépendre de l'API.
 * @returns {Promise<Object>} - Objet contenant toutes les données mockées
 */
const loadMockData = async () => {
      const mock = await import('../../public/__mock__/store.js')
      return mock
}

// -------------------------
//  FETCH FUNCTIONS
// -------------------------
//fetch des données user
export const fetchUserMainData = async (userId) => {
      const data = await fetchWithFallback(
            () => axios.get(`http://localhost:3000/user/${userId}`),
            async () => {
                  const { USER_MAIN_DATA } = await loadMockData()
                  return USER_MAIN_DATA.find((u) => u.id === parseInt(userId))
            }
      )

      // Standardisation : on retourne l'objet "brut"
      return data.data ? data.data : data
}
//fetch des données d'activité pour BarChart
export const fetchUserActivity = async (userId) => {
      const data = await fetchWithFallback(
            () => axios.get(`http://localhost:3000/user/${userId}/activity`),
            async () => {
                  const { USER_ACTIVITY } = await loadMockData()
                  return USER_ACTIVITY.find(
                        (a) => a.userId === parseInt(userId)
                  )
            }
      )

      return data.data ? data.data : data
}
//fetch des données de session pour les Objectifs LineChart
export const fetchUserAverageSessions = async (userId) => {
      const data = await fetchWithFallback(
            () =>
                  axios.get(
                        `http://localhost:3000/user/${userId}/average-sessions`
                  ),
            async () => {
                  const { USER_AVERAGE_SESSIONS } = await loadMockData()
                  return USER_AVERAGE_SESSIONS.find(
                        (s) => s.userId === parseInt(userId)
                  )
            }
      )
      return data.data ? data.data : data
}

//fetch des données pour Recharts RadarChart
export const fetchUserPerformance = async (userId) => {
      const raw = await fetchWithFallback(
            () => axios.get(`http://localhost:3000/user/${userId}/performance`),
            async () => {
                  const { USER_PERFORMANCE } = await loadMockData()
                  return USER_PERFORMANCE.find(
                        (p) => p.userId === parseInt(userId)
                  )
            }
      )

      return raw.data ? raw.data : raw
}
