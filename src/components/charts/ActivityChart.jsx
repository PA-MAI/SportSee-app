import React from 'react';
import {
  BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function ActivityChart({ data }) {
  // Tooltip personnalisé pour l'affichage de la fenetre de resultat
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#E60000',
          color: '#FFFFFF',
          padding: '10px',
          fontSize: '10px',
          lineHeight: '1.5',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
        }}>
          <p>{`${payload[0].value} kg`}</p>
          <p>{`${payload[1].value} kCal`}</p>
        </div>
      );
    }
    return null;
  };
  // Legend personnalisée 
  const CustomLegend = ({ payload }) => (
    <ul style={{ display: 'flex', listStyle: 'none', paddingLeft: 20, marginTop: 10, marginLeft:50, marginRight:10 }}>
      {payload.map((entry, index) => {
        const label = entry.dataKey === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)';
        return (
          <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
            <span style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              borderRadius: '50%',
              marginRight: 10,
            }}></span>
            {label}
          </li>
        );
      })}
    </ul>
  );
  const formatXAxis = (tickItem, i) => {
		return i + 1
	}
  return (
    <>
      <div
        className='chart__title1'
        style={{
          position: 'relative',
          top: 40,
          left: 50,
          zIndex: 10,
          color: 'Black',
          fontSize: 16,
          fontWeight: 600,
          opacity: 0.8,
        }}
      >
        Activité quotidienne
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}
          height={"40%"} 
          width={"100%"}
          margin={{ top: 80, right: 50, left: 50, bottom: 10 }}
          padding={{ right: 0, left: 50 }}
          barGap={8}
          barCategoryGap="20%"
        
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" tickMargin={25} tick={{ fill: '#9B9EAC', fontSize: 14, dy: 10 }} tickLine={false} padding={{ left: 0, right: 0 }} tickFormatter={formatXAxis} />
          <YAxis yAxisId="left" orientation="left" hide={true} tickLine={false}  tickCount={6}/>
          <YAxis yAxisId="right" orientation="right" domain={['dataMin -1', 'dataMax ']} tickCount={3} axisLine={false} tickLine={false} tickMargin={30}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />}
            width={360}
            wrapperStyle={{
              fontFamily: 'roboto',
              fontSize: '14px',
              fontWeight: 500,
              color: '#74798C',
              top: 0,
              right: 20,
              backgroundColor: '#FBFBFB',
              borderRadius: 3,
              lineHeight: '40px',
            }}
          />
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
            activeBar={<Rectangle fill="#E60000" stroke="#E60000"  />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default React.memo(ActivityChart);