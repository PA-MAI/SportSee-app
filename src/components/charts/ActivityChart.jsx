import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { fetchUserActivity } from '../../utils/api'; 
import { transformActivityData } from '../../utils/transformers';

function Activity() {
  const { userId } = useParams();
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const raw = await fetchUserActivity(userId);
        const transformed = transformActivityData(raw);
        setActivityData(transformed);
      } catch (error) {
        console.error("Erreur lors du chargement de l'activité :", error);
      }
    };
    loadData();
  }, [userId]);

  return (
    <>
    <div className='chart__title1' style={{
      position: 'relative',
      top: 40,
      left: 50,
      zIndex: 10,
      color: 'Black',
      fontSize: 16,
      fontWeight: 600,
      opacity: 0.8
    }}>
    Activité quotidienne
    </div>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={activityData}
        margin={{ top: 80, right: 30, left: 50, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis yAxisId="left" orientation="left" hide={true}/>
        <YAxis yAxisId="right" orientation="right" domain={['dataMin - 1', 'dataMax + 1']}/>
        <Tooltip />
        <Legend width={360} hide={true} wrapperStyle={{ top: 5, right: 20, backgroundColor: '#FBFBFB', borderRadius: 3, lineHeight: '40px' } }/>
        <Bar
          yAxisId="right"
          dataKey="kilogram"
          fill="#282D30"
          name="kg"
          barSize={8}
          radius={[3, 3, 0, 0]}
          activeBar={<Rectangle fill="#282D30" stroke="#282D30" />}
        />
        <Bar
          yAxisId="left"
          dataKey="calories"
          fill="#E60000"
          name="kCal"
          barSize={8}
          radius={[3, 3, 0, 0]}
          activeBar={<Rectangle fill="#E60000" stroke="#E60000" />}
        />
      </BarChart>
    </ResponsiveContainer>
</>
  );
}

export default React.memo(Activity);