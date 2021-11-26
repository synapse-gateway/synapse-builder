import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Logs from "./Logs";
import MultipleSelector from "./MultipleSelector";
import Dashboard from "./Dashboard";
import TableContainer from "@mui/material/TableContainer";
import { filterDataByDropdown } from "../../funcs/Monitoring";

const FrontendMonitoring = ({ data, timeScaleProps }) => {
  const [filterValue, setFilterValue] = useState("all");

  const filterOptions = ((rawData) => {
    let options = ["all"];

    if (rawData.length === 0 || !rawData[0].hasOwnProperty("rootFields"))
      return options;

    options.push(
      ...new Set(rawData.map((datapoint) => datapoint.rootFields).flat())
    );

    return options;
  })(data);

  const filteredData = filterDataByDropdown(data, "rootFields", filterValue);

  return (
    <>
      <Dashboard
        data={filteredData}
        filter={{
          label: "Root Queries",
          options: filterOptions,
          onClick: setFilterValue,
        }}
        timeScaleProps={timeScaleProps}
      />
    </>
  );
};

export default FrontendMonitoring;
