import React from "react";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Title from "../Title";

export default function Chart({ timeFormat, data, currentTime }) {
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
        <LineChart
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
              moment.unix(timeStr).format(timeFormat)
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
