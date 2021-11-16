import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import moment from "moment";
import ScaleToggler from "./ScaleToggler";
import Dropdown from "./Dropdown";
import Chart from "./Chart";
import Logs from "./Logs";
import apiClient from "../../lib/apiClient";
import { Navigate } from "react-router-dom";

const REFRESH_RATE_IN_MINUTES = 5;

const TIME_CONSTANTS_IN_SECONDS = {
  hour: 60 * 60,
  day: 60 * 60 * 24,
  week: 60 * 60 * 24 * 7,
  month: 60 * 60 * 24 * 30,
};

const Monitoring = ({ loggedInUser }) => {
  const [timeScale, setTimeScale] = useState("hour");
  const [filterValue, setFilterValue] = useState("all");
  const [data, setData] = useState([]);
  const rootFieldOptions = ["all"];

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
    }, REFRESH_RATE_IN_MINUTES * 1000 * 60);
    return () => clearInterval(interval);
  }, [getAPIData]);

  const currentTime = Math.round(new Date().getTime() / 1000);

  const timeRange = {
    hour: {
      unixStart: currentTime - TIME_CONSTANTS_IN_SECONDS.hour,
      timeFormat: "HH:mm",
      timeConversion: "MMM DD YYYY HH:mm",
      divisionInterval: TIME_CONSTANTS_IN_SECONDS.hour / 12,
    },
    day: {
      unixStart: currentTime - TIME_CONSTANTS_IN_SECONDS.day,
      timeFormat: "HH:00",
      timeConversion: "MMM DD YYYY HH:00",
      divisionInterval: TIME_CONSTANTS_IN_SECONDS.day / 24,
    },
    week: {
      unixStart: currentTime - TIME_CONSTANTS_IN_SECONDS.week,
      timeFormat: "MMM D",
      timeConversion: "MMM DD YYYY",
      divisionInterval: TIME_CONSTANTS_IN_SECONDS.week / 7,
    },
    month: {
      unixStart: currentTime - TIME_CONSTANTS_IN_SECONDS.month,
      timeFormat: "MMM D",
      timeConversion: "MMM DD YYYY",
      divisionInterval: TIME_CONSTANTS_IN_SECONDS.month / 30,
    },
  };

  const filterDataByTimescale = (data, timeRange) => {
    return data.filter((arr) => arr.unixTime >= timeRange.unixStart);
  };

  const filterDataByDropdown = (data, filterVal) => {
    return data.filter(
      (arr) => filterVal === "all" || arr.rootFields.includes(filterVal)
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

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  const handleToggle = (e, newTimeScale) => {
    setTimeScale(newTimeScale);
  };

  if (loggedInUser) {
    return (
      <>
        <Grid item xs={12} md={9} lg={6}>
          <Grid container direction="row" wrap="nowrap">
            <Paper
              sx={{
                p: 3,
                py: 3,
                display: "inline",
                flexDirection: "column",
              }}
            >
              <ScaleToggler
                selection={timeScale}
                onChange={handleToggle}
                timeRange={timeRange}
              />
            </Paper>

            <Paper
              sx={{
                p: 3,
                py: 2,
                mx: 2,
                minWidth: 300,
                display: "inline",
                flexDirection: "column",
              }}
            >
              <Dropdown
                value={filterValue}
                onChange={handleFilter}
                options={rootFieldOptions}
              />
            </Paper>
          </Grid>
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
