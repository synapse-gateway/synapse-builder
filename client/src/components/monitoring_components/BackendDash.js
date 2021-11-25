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
import TableContainer from "@mui/material/TableContainer";
import Title from "../Title";
import * as time from "../../constants/Monitoring";
import { getContrastRatio } from "@mui/system";
import { filterDataByDropdown } from "../../funcs/Monitoring";

const BackendDash = ({
  data,
  timeScaleProps,
  // handleRangeToggle,
  // currentRange,
}) => {
  const [filterValue, setFilterValue] = useState("all");
  const [resolverValue, setResolverValue] = useState(["all"]);
  const [subfieldValue, setSubfieldValue] = useState(["all"]);
  const rootQueries = ["Query", "Mutation", "Subscription"];

  // const filterDataByTimescale = (data, timeRange) => {
  //   return data.filter((arr) => arr.unixTime >= timeRange.unixStart);
  // };

  // const filterDataByDropdown = (data, selected) => {
  //   return data.filter(
  //     (arr) =>
  //       selected.includes("all") ||
  //       arr.rootFields.some((e) => selected.includes(e))
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
  
  */

  //  let filteredData = filterDataByDropdown(data, "name", filterValue)
  //  filterDataByTimescale(

  //    timeRangeProps[timeScale]
  //  );

  // let chartData = binDataByTimestamp(filteredData, timeRange[timeScale]);
  // let logData = filteredData
  //   .sort((a, b) => b.latency - a.latency)
  //   .filter((datapoint) => !datapoint.fake)
  //   .slice(0, 10);

  const filterOptions = (rawData, fieldToFilter, selectionArr = []) => {
    const options = ["all"];

    options.push(
      ...new Set(
        rawData
          .filter((datum) => {
            if (rootQueries.includes(datum.resolver)) return false;

            if (selectionArr.length > 0) {
              if (selectionArr.includes("all")) return true;
              return selectionArr.includes(datum.resolver);
            }

            return true;
          })
          .map((datum) => datum[fieldToFilter])
          .flat()
      )
    );
    return options;
  };

  // IIFE to reshape datapoints
  ((rawData) => {
    let callback;
    if (rawData.length === 0) return;
    if (!rawData[0].hasOwnProperty("name")) {
      callback = (datum) => {
        datum.resolver = "";
        datum.field = "";
      };
    } else {
      callback = (datum) => {
        [datum.resolver, datum.field] = datum.name.split(".");
      };
    }

    rawData.forEach(callback);
  })(data);

  const resolverOptions = filterOptions(data, "resolver");
  const subfieldOptions = filterOptions(data, "field", resolverValue);

  let filteredData = filterDataByDropdown(
    filterDataByDropdown(data, "resolver", resolverValue),
    "field",
    subfieldValue
  ).filter((datum) => !rootQueries.includes(datum.resolver));

  return (
    <>
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
      {/*  */}
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
      {filteredData.length ? (
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <TableContainer>
              <Logs data={filteredData.slice(0, 10)} />
            </TableContainer>
          </Paper>
        </Grid>
      ) : null}
    </>
  );
};

export default BackendDash;
