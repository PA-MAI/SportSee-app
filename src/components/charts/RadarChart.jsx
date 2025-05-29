import React, { useEffect, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { useParams } from 'react-router-dom';
import { fetchUserPerformance } from '../../utils/api';

function SessionRadarChart() {
  const { userId } = useParams();
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserPerformance(userId);
        setPerformanceData(data);
      } catch (error) {
        console.error("Erreur lors du chargement des performances :", error);
      }
    };
    loadData();
  }, [userId]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "#FFF", fontSize: 12 }} />
        <PolarRadiusAxis tick={false} axisLine={false} />
        <Radar
          name="Performance"
          dataKey="A"
          stroke="#FFF"
          fill="#FF0101"
          fillOpacity={0.7}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default React.memo(SessionRadarChart);
