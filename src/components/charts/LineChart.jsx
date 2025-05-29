import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer, Rectangle
} from 'recharts';
import { useParams } from 'react-router-dom';
import { fetchUserAverageSessions } from '../../utils/api';
import { transformAverageSessions } from '../../utils/transformers';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "white",
        color: "#000",
        padding: "5px 10px",
        fontSize: "12px",
      }}>
        {`${payload[0].value} min`}
      </div>
    );
  }
  return null;
};

// const CustomCursor = ({ points, width, height }) => {
//   const { x } = points[0];
//   return (
//     <Rectangle
//       x={x}
//       y={0}
//       width={width - x}
//       height={height}
//       fill="rgba(0, 0, 0, 0.1)"
//     />
//   );
// };

function SessionLineChart()  {
  const { userId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const load = async () => {
      const raw = await fetchUserAverageSessions(userId);
      const base = transformAverageSessions(raw);

      // Structure avec 2 dataKey
      const enriched = base.map((d, i) => ({
        ...d,
        sessionLengthWhite: i >= hoverIndex ? d.sessionLength : null,
      }));

      setSessions(enriched);
    };
    load();
  }, [userId, hoverIndex]);
  const percentageLeft = hoverIndex !== null
  ? (hoverIndex / (sessions.length - 1)) * 100
  : null;

  return (
    <div style={{
      backgroundColor: "#FF0000",
      borderRadius: "5px",
      padding: "0px",
      width: "100%",
      height: "100%",
      position: "relative"
    }}>
      {/* Overlay foncé à droite */}
      {hoverIndex !== null && (
        <div style={{
          position: "absolute",
          top: 0,
          left: `${percentageLeft}%`,
          width: `${100 - percentageLeft}%`,
          height: "100%",
          background: "rgba(0, 0, 0, 0.1)",
          pointerEvents: "none",
          zIndex: 2
        }} />
      )}
    <div className='chart__title2' style={{
        position: 'absolute',
      width: "70%",
      height: "50px",
      top: 20,
      left: 40,
      zIndex: 10,
      color: 'white',
      fontSize: 15,
      fontWeight: 600,
      opacity: 0.8
    }}>
    Durée moyenne des sessions
    </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sessions}
          margin={{ top: 80, right: 20, bottom: 20, left: 20 }}
          onMouseMove={(e) => {
            if (e && e.activeTooltipIndex !== undefined) {
              setHoverIndex(e.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <XAxis
            dataKey="day"
            stroke="#FFF"
            axisLine={false}
            tickLine={false}
            tick={{ opacity: 0.7, fontSize: 12 }}
            padding={{ left: 0, right: 0 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            //cursor={<CustomCursor />}
          />

          {/* Ligne grise complète */}
          <Line
            
            type="monotone"
            dataKey="sessionLength"
            stroke="#B0B0B0"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />

          {/* Ligne blanche superposée à droite du curseur */}
          {hoverIndex !== null && (
            <Line
              type="monotone"
              dataKey="sessionLengthWhite"
              stroke="#FFF"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* Dot blanc uniquement au hover */}
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="transparent"
            dot={false}
            activeDot={{
              r: 4,
              stroke: "#FFF",
              strokeWidth: 2,
              fill: "#FFF"
            }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionLineChart;