import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// export default class Example extends PureComponent {
//     static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';
// }
function Activity() {
    const data = [
        {
          name: '1',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: '2',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: '3',
          uv: 2000,
          pv: 2800,
          amt: 2290,
        },
        {
          name: '4',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: '5',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: '6',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: '7',
          uv: 3490,
          pv: 4300,
          amt: 2100,
      },
      {
        name: '8',
        uv: 2490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: '9',
        uv: 3490,
        pv: 3300,
        amt: 2100,
      },
      {
        name: '10',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
      ];


    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" fill="black" barSize={10} activeBar={<Rectangle fill="black" stroke="black" />} />
          <Bar dataKey="pv" fill="red" barSize={10} activeBar={<Rectangle fill="red" stroke="red" />} />
        </BarChart>
      </ResponsiveContainer>
    );
}
export default React.memo(Activity);
