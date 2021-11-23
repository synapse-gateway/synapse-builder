import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import moment from "moment";
import ScaleToggler from "./ScaleToggler";
import Chart from "./Chart";
import Logs from "./Logs";
import apiClient from "../../lib/apiClient";
import { Navigate } from "react-router-dom";
import MultipleSelector from "./MultipleSelector";
import Title from "../Title";
import * as time from "../../constants/Monitoring";

const FrontendDashboard = ({ loggedInUser }) => {
  const [timeScale, setTimeScale] = useState("hour");
  const [currentView, setCurrentView] = useState("frontend");
  const [filterValue, setFilterValue] = useState("all");
  const [data, setData] = useState([]);
  const rootFieldOptions = ["all"];
  const viewOptions = ["frontend", "backend"];

  const getAPIData = useCallback(() => {
    apiClient
      .getTimeData(loggedInUser, timeRange["month"].unixStart)
      .then((resData) => {
        setData(resData.data);
      });
  }, []);

  useEffect(() => {
    getAPIData();
    const interval = setInterval(() => {
      console.log("updating data...");
      getAPIData();
    }, time.REFRESH_RATE_IN_MINUTES * 1000 * 60);
    return () => clearInterval(interval);
  }, [getAPIData]);

  const currentTime = Math.round(new Date().getTime() / 1000);

  const timeRange = {
    hour: {
      unixStart: currentTime - time.IN_SECONDS.hour,
      timeFormat: "HH:mm",
      timeConversion: "MMM DD YYYY HH:mm",
      divisionInterval: time.IN_SECONDS.hour / 12,
    },
    day: {
      unixStart: currentTime - time.IN_SECONDS.day,
      timeFormat: "HH:00",
      timeConversion: "MMM DD YYYY HH:00",
      divisionInterval: time.IN_SECONDS.day / 24,
    },
    week: {
      unixStart: currentTime - time.IN_SECONDS.week,
      timeFormat: "MMM D",
      timeConversion: "MMM DD YYYY",
      divisionInterval: time.IN_SECONDS.week / 7,
    },
    month: {
      unixStart: currentTime - time.IN_SECONDS.month,
      timeFormat: "MMM D",
      timeConversion: "MMM DD YYYY",
      divisionInterval: time.IN_SECONDS.month / 30,
    },
  };

  const filterDataByTimescale = (data, timeRange) => {
    return data.filter((arr) => arr.unixTime >= timeRange.unixStart);
  };

  const filterDataByDropdown = (data, selected) => {
    return data.filter(
      (arr) =>
        selected.includes("all") ||
        arr.rootFields.some((e) => selected.includes(e))
    );
  };

  const binDataByTimestamp = (data, timeRange) => {
    let bin = {};

    for (
      let idx = timeRange.unixStart;
      idx <= currentTime;
      idx += timeRange.divisionInterval
    ) {
      data.push({
        unixTime: moment(
          moment.unix(idx).format(timeRange.timeConversion)
        ).unix(),
        latency: 0,
        count: 0,
        fake: true,
      });
    }

    data.forEach((datapoint) => {
      let timeBin = moment
        .unix(datapoint.unixTime)
        .format(timeRange.timeFormat);
      if (bin.hasOwnProperty(timeBin)) return bin[timeBin].push(datapoint);
      bin[timeBin] = [datapoint];
    });

    let chartData = Object.keys(bin).map((key) => {
      return {
        unixTime: moment(
          moment.unix(bin[key][0].unixTime).format(timeRange.timeConversion)
        ).unix(),
        latency: +(
          bin[key].map((arr) => +arr.latency).reduce((a, b) => a + b) /
          bin[key].length
        ).toFixed(3),
        count: bin[key].filter((datapoint) => !datapoint.hasOwnProperty("fake"))
          .length,
      };
    });

    return chartData.sort((a, b) => a.unixTime - b.unixTime);
  };

  const getFilterOptions = (data) => {
    rootFieldOptions.push(
      ...new Set(data.map((datapoint) => datapoint.rootFields).flat())
    );
  };

  getFilterOptions(data);

  let filteredData = filterDataByTimescale(
    filterDataByDropdown(data, filterValue),
    timeRange[timeScale]
  );

  let chartData = binDataByTimestamp(filteredData, timeRange[timeScale]);
  let logData = filteredData
    .sort((a, b) => b.latency - a.latency)
    .filter((datapoint) => !datapoint.fake)
    .slice(0, 10);

  const handleViewToggle = (e, newView) => {
    setCurrentView(newView);
  };

  const handleRangeToggle = (e, newTimeScale) => {
    setTimeScale(newTimeScale);
  };

  if (loggedInUser) {
    return (
      <>
        <Title>
          Hello {currentView} {currentTime}
        </Title>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              py: 3,
            }}
          >
            <ScaleToggler
              groupName={"View toggle"}
              selection={currentView}
              onChange={handleViewToggle}
              options={viewOptions}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} wrap="wrap">
          <Paper sx={{ p: 3 }}>
            <ScaleToggler
              groupName={"Time scale toggle"}
              selection={timeScale}
              onChange={handleRangeToggle}
              options={Object.keys(timeRange)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} wrap="wrap">
          <Paper sx={{ p: 3 }}>
            <MultipleSelector
              value={filterValue}
              setFilterValue={setFilterValue}
              options={rootFieldOptions}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}
          >
            <Chart
              data={chartData}
              timeFormat={timeRange[timeScale].timeFormat}
              currentTime={currentTime}
            />
          </Paper>
        </Grid>

        {logData.filter((log) => log.count !== 0).length ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Logs data={logData} />
            </Paper>
          </Grid>
        ) : null}
      </>
    );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default Monitoring;
