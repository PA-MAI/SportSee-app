
/**
 * Transforme les données de performance pour Recharts RadarChart
 */
export const transformPerformanceData = (data) => {
    const kindMap = data.kind;
    return data.data.map(item => ({
      value: item.value,
      kind: kindMap[item.kind]
    }));
  };
  
  /**
   * Transforme l'activité quotidienne pour BarChart
   */
  export const transformActivityData = (data) => {
    const activityData = data.data || data; // supporte les deux formats possibles
  
    console.log("✅ Données reçues pour transformation :", activityData);
  
    if (!activityData || !Array.isArray(activityData.sessions)) {
      console.error(" Les données d'activité sont invalides :", activityData);
      return [];
    }
  
    return activityData.sessions.map((item, index) => ({
      day: index + 1,
      kilogram: item.kilogram,
      calories: item.calories
    }));
  };
  /**
   * Transforme les sessions moyennes pour les Objectifs LineChart 
   */
  export const transformAverageSessions = (data) => {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    return data.sessions.map((item) => ({
      day: days[item.day - 1],
      sessionLength: item.sessionLength
    }));
  };