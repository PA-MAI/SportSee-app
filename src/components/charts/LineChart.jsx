import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';

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

const LineChartComponent = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const percentageLeft =
    hoverIndex !== null ? (hoverIndex / (data.length - 1)) * 100 : null;

  return (
    <div style={{
      backgroundColor: "#FF0000",
      borderRadius: "5px",
      padding: "0px",
      width: "100%",
      height: "100%",
      position: "relative"
    }}>
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
          data={data}
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
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFF"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
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

export default React.memo(LineChartComponent);