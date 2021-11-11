import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title';

// Generate Graph Data
function createData(time, amount) {
  return { time, amount };
}

// const values = [
//   [1636653152.106, "5.573"],
//   [1636653167.106, "5.929"],
//   [1636653182.106, "6.5840000000000005"],
//   [1636653197.106, "6.5840000000000005"],
//   [1636653212.106, "6.5840000000000005"],
//   [1636653227.106, "6.5840000000000005"],
//   [1636653242.106, "6.5840000000000005"],
//   [1636653257.106, "6.5840000000000005"],
//   [1636653272.106, "6.5840000000000005"],
//   [1636653287.106, "6.5840000000000005"]
// ]

// let time = new Date(1636653212.106 * 1000);

const data = [
  // createData(time, 5.573),
  createData('03:00', 5.929),
  createData('06:00', 6.5840000000000005),
  createData('09:00', 6.5840000000000005),
  createData('12:00', 6.5840000000000005),
  createData('15:00', 6.5840000000000005),
  createData('18:00', 6.5840000000000005),
  createData('21:00', 6.5840000000000005),
  createData('24:00', undefined),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Requests
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}