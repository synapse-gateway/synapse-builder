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
import TableContainer from "@mui/material/TableContainer";
import Title from "../Title";
import * as time from "../../constants/Monitoring";
import { filterDataByDropdown } from "../../funcs/Monitoring";

const FrontendDash = ({
  data,
  timeScaleProps,
  // handleRangeToggle,
  // currentRange,
}) => {
  const [filterValue, setFilterValue] = useState("all");

  // const filterDataByTimescale = (data, timeRange) => {
  //   return data.filter((datum) => datum.unixTime >= timeRange.unixStart);
  // };

  // const filterDataByDropdown = (data, dataField, dropdownSelections) => {
  //   return data.filter(
  //     (arr) =>
  //       dropdownSelections.includes("all") ||
  //       arr[dataField].some((e) => dropdownSelections.includes(e))
  //   );
  // };

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

  const filterOptions = ((rawData) => {
    let options = ["all"];

    if (rawData.length === 0 || !rawData[0].hasOwnProperty("rootFields"))
      return options;

    options.push(
      ...new Set(rawData.map((datapoint) => datapoint.rootFields).flat())
    );

    return options;
  })(data);

  // let filterOptions = getFilterOptions(data);

  console.log("filterOptions", filterOptions);

  const filteredData = filterDataByDropdown(data, "rootFields", filterValue);

  // let chartData = binDataByTimestamp(filteredData, timeRange[timeScale]);
  // let logData = filteredData
  //   .sort((a, b) => b.latency - a.latency)
  //   .filter((datapoint) => !datapoint.fake)
  //   .slice(0, 10);

  // console.log("dataFilteredByDropdown", dataFilteredByDropdown);
  // console.log("dataFilteredByTimescale", dataFilteredByDropdown);
  console.log("filteredData", filteredData);

  // console.log("timeScale", timeRangeProps[currentRange]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <MultipleSelector
            labelName="Root Queries"
            options={filterOptions}
            setFilterValue={setFilterValue}
          />
        </Paper>
      </Grid>

      {/* <Grid item xs={12}>
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
      </Grid> */}

      {filteredData.length ? (
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <TableContainer>
              <Logs data={filteredData.slice(0, 10)} />
            </TableContainer>
          </Paper>
        </Grid>
      ) : null}

      {/* {logData.filter((log) => log.count !== 0).length ? (
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Logs data={logData} />
          </Paper>
        </Grid>
      ) : null} */}
    </>
  );
};

export default FrontendDash;
