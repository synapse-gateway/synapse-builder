import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Chart from "./Chart";
import Dropdown from "./Dropdown";
import ScaleToggler from "./ScaleToggler";
import Logs from "./Logs";
import testData from "./data";

const TIME_CONSTANTS_IN_SECONDS = {
  hour: 60 * 60,
  day: 60 * 60 * 24,
  week: 60 * 60 * 24 * 7,
  month: 60 * 60 * 24 * 30,
};

const currentTime = Math.round(new Date().getTime() / 1000);

const timeRange = {
  hour: {
    unixStart: currentTime - TIME_CONSTANTS_IN_SECONDS.hour,
    timeFormat: "HH:mm",
    timeConversion: "MMM DD YYYY HH:mm",
    divisionInterval: TIME_CONSTANTS_IN_SECONDS.hour / 6,
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
const Monitoring = () => {
  let [timeScale, setTimeScale] = useState("hour");
  let [filterValue, setFilterValue] = useState("all");
  const rootFieldOptions = ["all"];

  const handleToggle = (e, newTimeScale) => {
    setTimeScale(newTimeScale);
  };

  const filterDataByTimescale = (data, timeRange) => {
    return data.filter((dataArr) => dataArr.unixTime >= timeRange.unixStart);
  };

  const filterDataByDropdown = (data, filterVal) => {
    return data.filter(
      (dataArr) => filterVal === "all" || dataArr.rootField.includes(filterVal)
    );
  };

  const binDataByTimestamp = (data, timeRange) => {
    let binObj = {};

    for (
      let idx = timeRange.unixStart;
      idx < currentTime;
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

    data.forEach((arr) => {
      let timeBin = moment.unix(arr.unixTime).format(timeRange.timeFormat);
      if (binObj.hasOwnProperty(timeBin)) return binObj[timeBin].push(arr);
      binObj[timeBin] = [arr];
    });

    let chartData = Object.keys(binObj).map((key) => {
      return {
        unixTime: moment(
          moment.unix(binObj[key][0].unixTime).format(timeRange.timeConversion)
        ).unix(),
        latency: +(
          binObj[key].map((arr) => +arr.latency).reduce((a, b) => a + b) /
          binObj[key].length
        ).toFixed(3),
        count: binObj[key].filter(
          (datapoint) => !datapoint.hasOwnProperty("fake")
        ).length,
      };
    });

    return chartData.sort((a, b) => a.unixTime - b.unixTime);
  };

  const getFilterOptions = (data) => {
    rootFieldOptions.push(
      ...new Set(filteredData.map((datapoint) => datapoint.rootField).flat())
    );
  };

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  let data = testData; //<---don't forget to change me

  let filteredData = filterDataByTimescale(
    filterDataByDropdown(data, filterValue),
    timeRange[timeScale]
  );

  getFilterOptions(filteredData);

  let chartData = binDataByTimestamp(filteredData, timeRange[timeScale]);
  let logData = filteredData.sort((a, b) => b.latency - a.latency).slice(0, 10);

  // console.log("finessed data", chartData);
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
      {/* 
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
      </Grid> */}

      {logData.filter((log) => log.count !== 0).length ? (
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
