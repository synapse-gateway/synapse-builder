import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import moment from "moment";
import ScaleToggler from "./ScaleToggler";
import Chart from "./Chart";
import Logs from "./Logs";
import FrontendDash from "./FrontendDash";
import BackendDash from "./BackendDash";
import apiClient from "../../lib/apiClient";
import { Navigate } from "react-router-dom";
import MultipleSelector from "./MultipleSelector";
import Title from "../Title";
import * as time from "../../constants/Monitoring";
import { filterDataByTimescale } from "../../funcs/Monitoring";

const Dashboard = ({ currentView, token }) => {
  const [timeScale, setTimeScale] = useState("hour");
  // const [filterValue, setFilterValue] = useState("all");
  const [data, setData] = useState([{ name: null, rootFields: null }]);
  // const rootFieldOptions = ["all"]; // refactor me
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
      .getTimeData(token, currentView, timeRangeProps.month.unixStart)
      .then((resData) => {
        setData(resData.data);
      });
  }, [currentView]);

  useEffect(() => {
    getAPIData();
    const interval = setInterval(() => {
      console.log("updating data...");
      getAPIData();
    }, time.REFRESH_RATE_IN_MINUTES * 1000 * 60);
    return () => clearInterval(interval);
  }, [getAPIData, currentView]);

  // const binDataByTimestamp = (data, timeRange) => {
  //   let bin = {};

  //   for (
  //     let idx = timeRange.unixStart;
  //     idx <= currentTime;
  //     idx += timeRange.divisionInterval
  //   ) {
  //     data.push({
  //       unixTime: moment(
  //         moment.unix(idx).format(timeRange.timeConversion)
  //       ).unix(),
  //       latency: 0,
  //       count: 0,
  //       fake: true,
  //     });
  //   }

  //   data.forEach((datapoint) => {
  //     let timeBin = moment
  //       .unix(datapoint.unixTime)
  //       .format(timeRange.timeFormat);
  //     if (bin.hasOwnProperty(timeBin)) return bin[timeBin].push(datapoint);
  //     bin[timeBin] = [datapoint];
  //   });

  //   let chartData = Object.keys(bin).map((key) => {
  //     return {
  //       unixTime: moment(
  //         moment.unix(bin[key][0].unixTime).format(timeRange.timeConversion)
  //       ).unix(),
  //       latency: +(
  //         bin[key].map((arr) => +arr.latency).reduce((a, b) => a + b) /
  //         bin[key].length
  //       ).toFixed(3),
  //       count: bin[key].filter((datapoint) => !datapoint.hasOwnProperty("fake"))
  //         .length,
  //     };
  //   });

  //   return chartData.sort((a, b) => a.unixTime - b.unixTime);
  // };

  // const getFilterOptions = (data) => {
  //   rootFieldOptions.push(
  //     ...new Set(data.map((datapoint) => datapoint.rootFields).flat())
  //   );
  // };

  // getFilterOptions(data);

  // let dataFilteredByTimeScale = filterDataByTimescale(
  //   data,
  //   timeRangeProps[timeScale]
  // );
  // = filterDataByTimescale(
  //   filterDataByDropdown(data, filterValue),
  //   timeRange[timeScale]
  // );

  // let chartData = binDataByTimestamp(filteredData, timeRange[timeScale]);
  // let logData = filteredData
  //   .sort((a, b) => b.latency - a.latency)
  //   .filter((datapoint) => !datapoint.fake)
  //   .slice(0, 10);

  const filterDataByTimescale = (data, timeRange) => {
    return data.filter((arr) => arr.unixTime >= timeRange.unixStart);
  };

  const dataFilteredByTimescale = filterDataByTimescale(
    data,
    timeRangeProps[timeScale]
  );

  console.log("data", data);

  const handleRangeToggle = (e, newTimeScale) => {
    setTimeScale(newTimeScale);
  };

  return (
    <>
      {" "}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <ScaleToggler
            groupName={"Time scale toggle"}
            selection={timeScale}
            onChange={handleRangeToggle}
            options={Object.keys(timeRangeProps)}
          />
        </Paper>
      </Grid>
      {currentView === "frontend" ? (
        <FrontendDash
          data={dataFilteredByTimescale}
          timeScaleProps={timeRangeProps[timeScale]}
          // handleRangeToggle={handleRangeToggle}
          // currentRange={timeScale}
        />
      ) : (
        <BackendDash
          data={dataFilteredByTimescale}
          timeScaleProps={timeRangeProps[timeScale]}
          // handleRangeToggle={handleRangeToggle}
          // currentRange={timeScale}
        />
      )}
      {/* <Title>Hello {currentView}</Title> */}
      {/* <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <ScaleToggler
            groupName={"Time scale toggle"}
            selection={timeScale}
            onChange={handleRangeToggle}
            options={Object.keys(timeRange)}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <MultipleSelector
            value={filterValue}
            setFilterValue={setFilterValue}
            options={rootFieldOptions}
          />
        </Paper>
      </Grid> */}
    </>
  );
};

export default Dashboard;
