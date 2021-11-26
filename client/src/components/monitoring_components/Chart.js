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
import { binDataByTimestamp } from "../../funcs/Monitoring";

export default function Chart({ timeScaleProps, data }) {
  const theme = useTheme();

  const chartData = binDataByTimestamp(data, timeScaleProps);

  const ticks = ((data) => {
    let tickArr = data
      .filter((datum) => datum.tick)
      .map((datum) => datum.unixTime)
      .slice();
    if (tickArr.length > 10) {
      tickArr = tickArr.filter((_, idx) => idx % 2 === 1);
    }
    return tickArr;
  })(chartData);

  return (
    <>
      <Title>{`Requests & Latency`}</Title>
      <ResponsiveContainer height={400} debounce={1}>
        <AreaChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <Legend />
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis
            dataKey="unixTime"
            tickFormatter={(timeStr) =>
              moment.unix(timeStr).format(timeScaleProps.timeFormat)
            }
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            scale="time"
            type="number"
            domain={[
              (dataMin) => chartData[0].unixTime,
              (dataMax) => chartData[chartData.length - 1].unixTime,
            ]}
            interval="preserveStart"
            ticks={ticks}
            minTickGap={50}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 15 }}
            tickFormatter={(tickVal) => `${tickVal}ms`}
            allowDecimals={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 15 }}
            tickFormatter={(tickVal) => `${tickVal}reqs`}
            allowDecimals={false}
          />
          <Tooltip
            labelFormatter={(timeStr) =>
              moment.unix(timeStr).format(timeScaleProps.timeFormat)
            }
            formatter={(value, name) => {
              if (name === "Average Latency") {
                return [`${value.toFixed(0)} ms`, name];
              } else return [`${value}`, name];
            }}
          />
          <Area
            yAxisId="left"
            isAnimationActive={true}
            type="monotone"
            dataKey="latency"
            stroke="#a83260" //{theme.palette.primary.main}
            fillOpacity={0.5}
            strokeWidth={3}
            dot={false}
            name="Average Latency"
            activeDot={{ r: 5 }}
            fill="#a83260"
            animationEasing="ease"
          />
          <Area
            yAxisId="right"
            isAnimationActive={true}
            type="monotone"
            dataKey="count"
            strokeWidth={3}
            fillOpacity={0}
            dot={false}
            name="Request Count"
            stroke={theme.palette.primary.main}
            animationEasing="ease"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
