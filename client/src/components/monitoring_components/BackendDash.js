import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import moment, { version } from "moment";
import ScaleToggler from "./ScaleToggler";
import Chart from "./Chart";
import Logs from "./Logs";
import apiClient from "../../lib/apiClient";
import { Navigate } from "react-router-dom";
import MultipleSelector from "./MultipleSelector";
import Title from "../Title";
import * as time from "../../constants/Monitoring";
import { getContrastRatio } from "@mui/system";

const BackendDash = ({
  data,
  timeRangeProps,
  handleRangeToggle,
  currentRange,
}) => {
  const [filterValue, setFilterValue] = useState("all");
  const [resolverValue, setResolverValue] = useState(["all"]);
  const [subfieldValue, setSubfieldValue] = useState(["all"]);
  const rootQueryTypes = ["Query", "Mutation", "Subscription"];

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

  /*

  const getRootFilterOptions = (data) => {
    let options = ["all"];

    options.push(
      ...new Set(data.map((datapoint) => datapoint.rootFields).flat())
    );

    return options;
  };

  let filterOptions = getFilterOptions(data);

  console.log("filterOptions", filterOptions);

  let filteredData = filterDataByTimescale(
    filterDataByDropdown(data, filterValue),
    timeRangeProps[timeScale]
  );

  */

  // let chartData = binDataByTimestamp(filteredData, timeRange[timeScale]);
  // let logData = filteredData
  //   .sort((a, b) => b.latency - a.latency)
  //   .filter((datapoint) => !datapoint.fake)
  //   .slice(0, 10);

  const filterOptions = (rawData, selectionArr) => {
    const options = ["all"];
    if (rawData[0].name === undefined) return options;

    options.push(
      ...new Set(
        rawData
          .filter((v) => {
            if (selectionArr) {
              if (selectionArr.includes("all")) return true;
              return selectionArr.includes(v.name.split(".")[0]);
            } else {
              return !["Query", "Mutation", "Subscription"].includes(
                v.name.split(".")[0]
              );
            }
          })
          .map((v) => (selectionArr ? v.name : v.name.split(".")[0]))
          .flat()
      )
    );
    return options;
  };

  const resolverOptions = filterOptions(data);
  const subfieldOptions = filterOptions(data, resolverValue);

  return (
    <>
      {/* <Title>Hello Frontend</Title> */}

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <ScaleToggler
            groupName={"Time scale toggle"}
            selection={currentRange}
            onChange={handleRangeToggle}
            options={Object.keys(timeRangeProps)}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <MultipleSelector
            labelName="Resolvers"
            options={resolverOptions}
            setFilterValue={setResolverValue}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <MultipleSelector
            labelName="Subfields"
            options={subfieldOptions}
            value={subfieldValue}
            setFilterValue={setSubfieldValue}
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

      {/* {logData.filter((log) => log.count !== 0).length ? (
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Logs data={logData} />
          </Paper>
        </Grid>
      ) : null} */}
      {/* {!data ? <Title>Loading...</Title> : null} */}
    </>
  );
};

export default BackendDash;
