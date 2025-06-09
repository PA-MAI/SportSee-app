import axios from 'axios'
import { checkBackendStatus, getIsBackendAvailable } from "./status";

/**
 *  Fonction utilitaire pour effectuer un appel API avec un mécanisme de secours (fallback)
 *  Elle vérifie d'abord la disponibilité du backend pour éviter les appels inutiles.
 * @param {Function} apiCall - Fonction asynchrone représentant l'appel à l'API réelle (via axios)
 * @param {Function} mockCall - Fonction de secours à exécuter si l'appel API échoue (données mockées)
 * @returns {Promise<any>} Les données obtenues soit depuis l'API, soit depuis les mocks
 */
const fetchWithFallback = async (apiCall, mockCall) => {
      if (!getIsBackendAvailable()) {
        // Si déjà connu comme indispo, évite de tenter un appel API
        console.warn("Backend OFF → on passe direct au mock.");
        return await mockCall();
      }
    
      try {
        const response = await apiCall();
        return response.data;
      } catch {
        console.warn("Erreur API → fallback mock.");
        // Backend probablement down → on met à jour le statut + on surveille
        await checkBackendStatus(); // → met isBackendAvailable à false + lance surveillance
        return await mockCall();
      }
    };

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
      const module = await import('../../public/__mock__/store.js');
      return module.default; // export default
};

// -------------------------
//  FETCH FUNCTIONS
// -------------------------

// Fonction utilitaire de standardisation
export const cleanAPIData = (response) => {
      // Si response existe et a un champ "data", on retourne response.data, sinon on retourne la valeur brute
      return response && response.data ? response.data : response;
};

// Fetch des données utilisateur
export const fetchUserMainData = async (userId) => {
      const data = await fetchWithFallback(
            () => axios.get(`http://localhost:3000/user/${userId}`),
            async () => {
                  const { USER_MAIN_DATA } = await loadMockData()
                  console.log("✅ USER_MAIN_DATA mock chargé :", USER_MAIN_DATA);
                  return USER_MAIN_DATA.find((u) => u.id === parseInt(userId))
            }
      )

      return cleanAPIData(data);
}

// Fetch pour BarChart
export const fetchUserActivity = async (userId) => {
      const data = await fetchWithFallback(
            () => axios.get(`http://localhost:3000/user/${userId}/activity`),
            async () => {
                  const { USER_ACTIVITY } = await loadMockData()
                  return USER_ACTIVITY.find((a) => a.userId === parseInt(userId))
            }
      )

      return cleanAPIData(data);
}

// Fetch pour LineChart (sessions moyennes)
export const fetchUserAverageSessions = async (userId) => {
      const data = await fetchWithFallback(
            () => axios.get(`http://localhost:3000/user/${userId}/average-sessions`),
            async () => {
                  const { USER_AVERAGE_SESSIONS } = await loadMockData()
                  return USER_AVERAGE_SESSIONS.find((s) => s.userId === parseInt(userId))
            }
      )

      return cleanAPIData(data);
}

// Fetch pour RadarChart (performance utilisateur)
export const fetchUserPerformance = async (userId) => {
      const raw = await fetchWithFallback(
            () => axios.get(`http://localhost:3000/user/${userId}/performance`),
            async () => {
                  const { USER_PERFORMANCE } = await loadMockData();
                  const result = USER_PERFORMANCE.find(p => p.userId === parseInt(userId));
                  return { data: result };
            }
      )

      return cleanAPIData(raw);
}