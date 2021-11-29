import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as time from "../../constants/Monitoring";
import apiClient from "../../lib/apiClient";
import { binDataByTimestamp } from "../../funcs/Monitoring";
import Title from "../Title";
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

export default function CombinedChart({ token }) {
  const theme = useTheme();
  const [frontendData, setFrontendData] = useState([]);
  const [backendData, setBackendData] = useState([]);

  const currentTime = Math.round(new Date().getTime() / 1000);

  const timeRangeProps = {
    hour: {
      ...time.FORMATS.hour,
      unixStart: currentTime - time.IN_SECONDS.hour,
      divisionInterval: time.IN_SECONDS.hour / 12,
    },
    day: {
      ...time.FORMATS.day,
      unixStart: currentTime - time.IN_SECONDS.day,
      divisionInterval: time.IN_SECONDS.day / 24,
    },
    week: {
      ...time.FORMATS.week,
      unixStart: currentTime - time.IN_SECONDS.week,
      divisionInterval: time.IN_SECONDS.week / 7,
    },
    month: {
      ...time.FORMATS.month,
      unixStart: currentTime - time.IN_SECONDS.month,
      divisionInterval: time.IN_SECONDS.month / 30,
    },
  };

  const getAPIData = useCallback(() => {
    apiClient
      .getTimeData(token, "frontend", timeRangeProps.week.unixStart)
      .then((resData) => {
        setFrontendData(resData.data);
      });

    apiClient
      .getTimeData(token, "backend", timeRangeProps.week.unixStart)
      .then((resData) => {
        setBackendData(resData.data);
      });
  }, []);

  useEffect(() => {
    getAPIData();
    const interval = setInterval(() => {
      console.log("updating data...");
      getAPIData();
    }, time.REFRESH_RATE_IN_MINUTES * 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const frontendChartData = binDataByTimestamp(
    frontendData,
    timeRangeProps.week
  );

  const backendChartData = binDataByTimestamp(backendData, timeRangeProps.week);

  const chartData = frontendChartData.map((datum) => {
    return {
      unixTime: datum.unixTime,
      frontendLatency: datum.latency,
      frontendCount: datum.count,
    };
  });

  backendChartData.forEach((datum, idx) => {
    chartData[idx] = {
      ...chartData[idx],
      backendLatency: datum.latency,
      backendCount: datum.count,
    };
  });

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
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Title>{`Requests & Latency (Past 7 Days)`}</Title>
          <ResponsiveContainer height={600} debounce={1}>
            <AreaChart
              data={chartData}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <defs>
                <linearGradient id="backendLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a83260" stopOpacity={1} />
                  <stop offset="95%" stopColor="#a83260" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="frontendLatency"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={1}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Legend align="right" verticalAlign="middle" layout="vertical" />
              <CartesianGrid strokeDasharray="4" />
              <XAxis
                dataKey="unixTime"
                tickFormatter={(timeStr) =>
                  moment.unix(timeStr).format(timeRangeProps.week.timeFormat)
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
                  moment.unix(timeStr).format(timeRangeProps.week.timeFormat)
                }
                formatter={(value, name) => {
                  if (name.includes("Average Latency")) {
                    return [`${value.toFixed(0)} ms`, name];
                  } else return [`${value}`, name];
                }}
              />
              <Area
                yAxisId="left"
                isAnimationActive={true}
                type="monotone"
                dataKey="backendLatency"
                stroke="#a83260" //{theme.palette.primary.main}
                fillOpacity={0.5}
                strokeWidth={0}
                dot={false}
                name="Average Latency (Backend)"
                activeDot={{ r: 5 }}
                // fill="#a83260"
                fill="url(#backendLatency)"
                animationEasing="ease"
              />
              <Area
                yAxisId="left"
                isAnimationActive={true}
                type="monotone"
                dataKey="frontendLatency"
                // stroke={theme.palette.primary.secondary}
                fillOpacity={0.5}
                strokeWidth={0}
                dot={false}
                name="Average Latency (Frontend)"
                activeDot={{ r: 5 }}
                // fill={theme.palette.primary.main}
                fill="url(#frontendLatency)"
                animationEasing="ease"
              />
              <Area
                yAxisId="right"
                isAnimationActive={true}
                type="monotone"
                dataKey="backendCount"
                strokeWidth={3}
                fillOpacity={0}
                dot={false}
                name="Request Count (Backend)"
                stroke={theme.palette.secondary.main}
                animationEasing="ease"
              />
              <Area
                yAxisId="right"
                isAnimationActive={true}
                type="monotone"
                dataKey="frontendCount"
                strokeWidth={3}
                fillOpacity={0}
                dot={false}
                name="Request Count (Frontend)"
                stroke={theme.palette.primary.main}
                animationEasing="ease"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </>
  );
}
