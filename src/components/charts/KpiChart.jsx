import React from 'react';
//import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
//import { useParams } from 'react-router-dom';


const KpiChart = ({ data }) => {
  const percentage = data[0]?.value || 0;
  const COLORS = ['#FF0000', 'transparent'];

  return (
    <div style={{
      position: 'relative',
      background: '#FBFBFB',
      borderRadius: '10px',
      width: '100%',
      height: '100%',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '65%',
        height: '65%',
        backgroundColor: '#FFF',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
      }}>
        <p style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 0 }}>
          {percentage}%
        </p>
        <p style={{ fontSize: 16, color: '#74798C', fontWeight: '600', marginTop: 0,  maxWidth: 80 }}>
          de votre objectif
        </p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            startAngle={200}
            endAngle={-135}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="80%"
            dataKey="value"
            cornerRadius={10}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(KpiChart);