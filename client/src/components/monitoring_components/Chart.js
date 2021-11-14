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
import testData from "./data-old";

export default function Chart({ timeScale, data }) {
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
  console.log("data", data);

  const currentTime = Math.round(new Date().getTime() / 1000);
  const oneHourAgo = currentTime - 60 * 60;
  const oneDayAgo = currentTime - 60 * 60 * 24;
  const oneWeekAgo = currentTime - 60 * 60 * 24 * 7;
  const oneMonthAgo = currentTime - 60 * 60 * 24 * 30;

  // const timeScale = "month";
  // console.log("current selection:", timeScale);

  const timeRange = {
    hour: { unixStart: oneHourAgo, timeFormat: "HH:mm" },
    day: { unixStart: oneDayAgo, timeFormat: "HH:00" },
    week: { unixStart: oneWeekAgo, timeFormat: "MMM D" },
    month: { unixStart: oneMonthAgo, timeFormat: "MMM D" },
  };

  // console.log("unixStart", timeRange[timeScale].unixStart);

  // console.log("current time", currentTime);
  // console.log("one hour ago", oneHourAgo);
  // console.log("one day ago", oneDayAgo);
  // console.log("one week ago", oneWeekAgo);
  // console.log("one month ago", oneMonthAgo);

  // data has to be properly ordered
  // let rawData = [
  //   { unix: 1636672195, latency: "1.929" },
  //   { unix: 1636672195, latency: "10.929" },
  //   { unix: 1636672196, latency: "6.584" },
  //   { unix: 1636672882, latency: "6.584" },
  //   { unix: 1636672902, latency: "6.584" },
  //   { unix: 1636672987, latency: "3.584" },
  // ];

  // const binDataByTimestamp = (data, timeFormat) => {
  //   let binObj = {};

  //   data.forEach((arr) => {
  //     let timeBin = moment.unix(arr.unix).format(timeFormat);
  //     if (binObj.hasOwnProperty(timeBin)) return binObj[timeBin].push(arr);
  //     binObj[timeBin] = [arr];
  //   });

  //   let chartData = Object.keys(binObj).map((key) => {
  //     return {
  //       unix: binObj[key][0].unix,
  //       latency: `
  //         ${(
  //           binObj[key].map((arr) => +arr.latency).reduce((a, b) => a + b) /
  //           binObj[key].length
  //         ).toFixed(3)}ms`,
  //       count: binObj[key].length,
  //     };
  //   });

  //   chartData.unshift({
  //     unix: timeRange[timeScale].unixStart,
  //     latency: 0,
  //     count: 0,
  //   });

  //   return chartData
  //     .sort((a, b) => a.unix - b.unix)
  //     .filter((dataArr) => dataArr.unix >= timeRange[timeScale].unixStart);
  // };

  // let chartData = binDataByTimestamp(testData, timeRange[timeScale].timeFormat);

  return (
    <>
      {/* <ButtonGroup>
        <Button>Hour</Button>
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup> */}
      <Title>{`Requests & Latency`}</Title>
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
            dataKey="unixTime"
            tickFormatter={(timeStr) =>
              moment.unix(timeStr).format(timeRange[timeScale].timeFormat)
            }
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            scale="time"
            type="number"
            domain={[(dataMin) => data[0].unixTime, (dataMax) => currentTime]}
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
            labelFormatter={(timeStr) =>
              moment.unix(timeStr).format(timeRange[timeScale].timeFormat)
            }
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="latency"
            stroke={theme.palette.primary.main}
            dot={true}
            activeDot={{ r: 10 }}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="count"
            stroke={theme.palette.primary.light}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
