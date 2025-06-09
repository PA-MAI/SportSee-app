/**
 * Transforme les données de performance pour Recharts RadarChart
 */
export const transformPerformanceData = (data) => {
      if (!data || !data.kind || !Array.isArray(data.data)) {
        console.error('Performance data malformée :', data);
        return [];
      }
    
      const translations = {
        cardio: 'Cardio',
        energy: 'Énergie',
        endurance: 'Endurance',
        strength: 'Force',
        speed: 'Vitesse',
        intensity: 'Intensité',
      };
    
      const kindMap = data.kind;
    
      return data.data
        .map((item) => ({
          subject: translations[kindMap[item.kind]],
          A: item.value,
        }))
        .reverse();
    };
      




/**
 * Transforme l'activité quotidienne pour BarChart
 */
export const transformActivityData = (data) => {
      const activityData = data.data || data // supporte les deux formats possibles

      console.log('✅ Données reçues pour transformation :', activityData)

      if (!activityData || !Array.isArray(activityData.sessions)) {
            console.error(
                  " Les données d'activité sont invalides :",
                  activityData
            )
            return []
      }

      return activityData.sessions.map((item, index) => ({
            day: index + 1,
            kilogram: item.kilogram,
            calories: item.calories,
      }))
}
/**
 * Transforme les sessions moyennes pour les Objectifs LineChart
 */
export const transformAverageSessions = (data) => {
      const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
      return data.sessions.map((item) => ({
            day: days[item.day - 1],
            sessionLength: item.sessionLength,
      }))
}

/**
 * Transforme les données KPI pour le PieChart
 * @param {Object} data - Données brutes utilisateur (depuis API)
 * @returns {Object[]} Données formatées pour Recharts
 */
export const transformKpiData = (data) => {
      const rawScore = data.todayScore ?? data.score
      const score = rawScore || 0
      const percentage = score * 100

      return [
            { name: 'Score', value: percentage },
            { name: 'Reste', value: 100 - percentage },
      ]
}
