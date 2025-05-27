import axios from "axios";
import {
  //transformActivityData,
  //transformAverageSessions,
  transformPerformanceData
} from "../utils/transformers";
/**
 * Helper to safely fetch data with a fallback to mock data
 * @param {Function} apiCall - async function performing the API call
 * @param {Function} mockCall - async function fetching mock data
 * @returns {Promise<any>}
 */
const fetchWithFallback = async (apiCall, mockCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.warn("API unreachable, using mock data:", error.message);
    return await mockCall();
  }
};

// -------------------------
//  MOCK DATA IMPORT
// -------------------------
const loadMockData = async () => {
  const mock = await import("../../public/__mock__/store.js");
  return mock;
};

// -------------------------
//  FETCH FUNCTIONS
// -------------------------
//fetch des données user
export const fetchUserMainData = async (userId) => {
  const data = await fetchWithFallback(
    () => axios.get(`http://localhost:3000/user/${userId}`),
    async () => {
      const { USER_MAIN_DATA } = await loadMockData();
      return USER_MAIN_DATA.find((u) => u.id === parseInt(userId));
    }
  );

  // Standardisation : on retourne l'objet "brut"
  return data.data ? data.data : data;
};
//fetch des données d'activité pour BarChart
export const fetchUserActivity = async (userId) => {
  const data = await fetchWithFallback(
    () => axios.get(`http://localhost:3000/user/${userId}/activity`),
    async () => {
      const { USER_ACTIVITY } = await loadMockData();
      return USER_ACTIVITY.find((a) => a.userId === parseInt(userId));
    }
  );

  return data.data ? data.data : data;
};
//fetch des données de session pour les Objectifs LineChart 
export const fetchUserAverageSessions = async (userId) => {
  const data = await fetchWithFallback(
    () => axios.get(`http://localhost:3000/user/${userId}/average-sessions`),
    async () => {
      const { USER_AVERAGE_SESSIONS } = await loadMockData();
      return USER_AVERAGE_SESSIONS.find((s) => s.userId === parseInt(userId));
    }
  );
  return data.data ? data.data : data;
};

//fetch des données pour Recharts RadarChart
export const fetchUserPerformance = async (userId) => {
  const raw = await fetchWithFallback(
    () => axios.get(`http://localhost:3000/userPerformance?userId=${userId}`),
    async () => {
      const { USER_PERFORMANCE } = await loadMockData();
      return USER_PERFORMANCE.find((p) => p.userId === parseInt(userId));
    }
  );
  return transformPerformanceData(raw[0] || raw);
};

