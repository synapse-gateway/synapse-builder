import React from "react";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import {
  AreaChart,
  Legend,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Title from "../Title";

export default function Chart({ timeFormat, data, currentTime }) {
  const theme = useTheme();

  const ticks = (() => {
    let tickArr = [...new Set(data.map((data) => data.unixTime))].slice(1);
    if (tickArr.length > 10) {
      tickArr = tickArr.filter((_, idx) => idx % 2 === 1);
    }
    return tickArr;
  })();

  return (
    <>
      <Title>{`Requests & Latency`}</Title>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="4" />
          <XAxis
            dataKey="unixTime"
            tickFormatter={(timeStr) => moment.unix(timeStr).format(timeFormat)}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            scale="time"
            type="number"
            domain={[(dataMin) => data[0].unixTime, (dataMax) => currentTime]}
            interval="preserveStart"
            ticks={ticks}
            minTickGap={75}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 15 }}
            tickFormatter={(tickVal) => `${tickVal} ms`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 15 }}
            tickFormatter={(tickVal) => `${tickVal}reqs`}
          />
          <Tooltip
            labelFormatter={(timeStr) =>
              moment.unix(timeStr).format(timeFormat)
            }
            formatter={(value, name) => {
              if (name === "Average Latency") {
                return [`${value.toFixed(0)}ms`, name];
              } else return [`${value}`, name];
            }}
          />
          <Legend />
          <Area
            yAxisId="left"
            isAnimationActive={false}
            type="monotone"
            dataKey="latency"
            stroke="#a83260" //{theme.palette.primary.main}
            fillOpacity={0.5}
            strokeWidth={3}
            dot={false}
            name="Average Latency"
            activeDot={{ r: 5 }}
            fill="#a83260"
          />
          <Area
            yAxisId="right"
            isAnimationActive={false}
            type="monotone"
            dataKey="count"
            strokeWidth={3}
            fillOpacity={0}
            dot={false}
            name="Request Count"
            stroke={theme.palette.primary.main}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
