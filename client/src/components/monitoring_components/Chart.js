import * as React from "react";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "../Title";
import apiClient from "../../lib/apiClient";

export default function Chart() {
  // const [data, setData] = useState([])
  // useEffect(() => {
  //   apiClient.getTimeData().then((resData) => {
  //     function createData(time, amount) {
  //       return { time, amount };
  //     }

  //     console.log(resData.data)

  //     setData(resData.data["Query.getAuthors"].map((pair) => {
  //       return createData(pair[0], pair[1])
  //     }))
  //   })
  // }, [])
  const theme = useTheme();

  function createData(time, amount) {
    return { time, amount };
  }

  const baseTime = 1636672182;

  let rawData = [
    { unix: 1636672195, latency: "1.929", count: "1" },
    { unix: 1636672196, latency: "6.584", count: "1" },
    { unix: 1636672882, latency: "6.584", count: "1" },
    { unix: 1636672902, latency: "6.584", count: "1" },
    { unix: 1636672987, latency: "3.584", count: "1" },
  ];

  return (
    <>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={rawData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="unix"
            tickFormatter={(timeStr) => moment.unix(timeStr).format("HH:mm")}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            scale="time"
            type="number"
            domain={["dataMin - 60", "dataMax"]}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Requests
            </Label>
          </YAxis>
          <Tooltip
            labelFormatter={(timeStr) => moment.unix(timeStr).format("HH:mm")}
            formatter={(value) => `${value} ms`}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="latency"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
