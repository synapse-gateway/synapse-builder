import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import moment from "moment";
import Chart from "./Chart";
import TotalRequests from "./TotalRequests";
import Logs from "./Logs";
import testData from "./data";

const Monitoring = () => {
  let [timeScale, setTimeScale] = useState("hour");

  const currentTime = Math.round(new Date().getTime() / 1000);

  const timeRange = {
    hour: { unixStart: currentTime - 60 * 60, timeFormat: "HH:mm" },
    day: { unixStart: currentTime - 60 * 60 * 24, timeFormat: "HH:00" },
    week: {
      unixStart: currentTime - 60 * 60 * 24 * 7,
      timeFormat: "MMM D",
    },
    month: {
      unixStart: currentTime - 60 * 60 * 24 * 30,
      timeFormat: "MMM D",
    },
  };

  const handleToggle = (e, newTimeScale) => {
    setTimeScale(newTimeScale);
  };

  const filterDataByTimescale = (data, timeRange) => {
    return data.filter((dataArr) => dataArr.unixTime >= timeRange.unixStart);
  };

  const binDataByTimestamp = (data, timeRange) => {
    let binObj = {};

    data.forEach((arr) => {
      let timeBin = moment.unix(arr.unixTime).format(timeRange.timeFormat);
      if (binObj.hasOwnProperty(timeBin)) return binObj[timeBin].push(arr);
      binObj[timeBin] = [arr];
    });

    let chartData = Object.keys(binObj).map((key) => {
      return {
        unixTime: binObj[key][0].unixTime,
        latency: `
          ${(
            binObj[key].map((arr) => +arr.latency).reduce((a, b) => a + b) /
            binObj[key].length
          ).toFixed(3)}ms`,
        count: binObj[key].length,
      };
    });

    chartData.unshift({
      unixTime: timeRange.unixStart,
      latency: 0,
      count: 0,
    });

    return chartData.sort((a, b) => a.unixTime - b.unixTime);
    // .filter((dataArr) => dataArr.unix >= timeRange[timeScale].unixStart);
  };

  // let data = testData.sort((a, b) => a.unix - b.unix);
  let data = testData.slice(0, 10);
  console.log("raw data", data);
  let filteredData = filterDataByTimescale(data, timeRange[timeScale]);

  let chartData = binDataByTimestamp(filteredData, timeRange[timeScale]);
  let logData = filteredData.sort((a, b) => b.latency - a.latency).slice(0, 10);

  console.log("log data", logData);

  return (
    <>
      {/* Timescale Toggle Buttons */}
      <Grid item xs={12} md={9} lg={6}>
        <Grid container direction="row" wrap="nowrap">
          <Paper
            sx={{
              p: 2,
              py: 2,
              display: "inline",
              flexDirection: "column",
            }}
          >
            <ToggleButtonGroup
              value={timeScale}
              onChange={handleToggle}
              aria-label="time range filter"
              exclusive
            >
              {Object.keys(timeRange).map((range, idx) => {
                return (
                  <ToggleButton
                    key={idx}
                    value={range}
                    aria-label={`last ${range}`}
                    sx={{ width: 90 }}
                    color="primary"
                    disabled={timeScale === range}
                  >
                    {range}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Paper>
          <Paper
            sx={{
              p: 2,
              py: 2,
              mx: 2,
              display: "inline",
              flexDirection: "column",
            }}
          >
            <ToggleButtonGroup
              value={timeScale}
              onChange={handleToggle}
              aria-label="time range filter"
              exclusive
            >
              {Object.keys(timeRange).map((range, idx) => {
                return (
                  <ToggleButton
                    key={idx}
                    value={range}
                    aria-label={`last ${range}`}
                    sx={{ width: 90 }}
                    color="primary"
                    disabled={timeScale === range}
                  >
                    {range}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Paper>
        </Grid>
      </Grid>

      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Chart timeScale={timeScale} data={chartData} />
        </Paper>
      </Grid>

      {/* Recent TotalRequests */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <TotalRequests
            requests={data.length}
            since={moment
              .unix(data.sort((a, b) => a.unixTime - b.unixTime)[0].unixTime)
              .format("MMMM D, YYYY")}
          />
        </Paper>
      </Grid>

      {/* Recent Logs */}
      {logData.length ? (
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Logs data={logData} />
          </Paper>
        </Grid>
      ) : null}
    </>
  );
};

export default Monitoring;
