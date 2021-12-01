import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ScaleToggler from "./ScaleToggler";
import FrontendMonitoring from "./FrontendMonitoring";
import BackendMonitoring from "./BackendMonitoring";
import apiClient from "../../lib/apiClient";
import * as time from "../../constants/Monitoring";

const DataView = ({ currentView, token }) => {
  const [timeScale, setTimeScale] = useState("hour");
  const [data, setData] = useState([{ name: null, rootFields: null }]);
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

  const filterDataByTimescale = (data, timeRange) => {
    return data.filter((arr) => arr.unixTime >= timeRange.unixStart);
  };

  const dataFilteredByTimescale = filterDataByTimescale(
    data,
    timeRangeProps[timeScale]
  );

  const handleRangeToggle = (e, newTimeScale) => {
    setTimeScale(newTimeScale);
  };

  return (
    <>
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
      {currentView === "Client Requests" ? (
        <FrontendMonitoring
          data={dataFilteredByTimescale}
          timeScaleProps={timeRangeProps[timeScale]}
        />
      ) : (
        <BackendMonitoring
          data={dataFilteredByTimescale}
          timeScaleProps={timeRangeProps[timeScale]}
        />
      )}
    </>
  );
};

export default DataView;
