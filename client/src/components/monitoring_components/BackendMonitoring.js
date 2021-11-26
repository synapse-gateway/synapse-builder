import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Logs from "./Logs";
import MultipleSelector from "./MultipleSelector";
import Dashboard from "./Dashboard";
import TableContainer from "@mui/material/TableContainer";
import { filterDataByDropdown } from "../../funcs/Monitoring";

const BackendMonitoring = ({ data, timeScaleProps }) => {
  const [resolverValue, setResolverValue] = useState(["all"]);
  const [subfieldValue, setSubfieldValue] = useState(["all"]);
  const rootQueries = ["Query", "Mutation", "Subscription"];

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
      <Dashboard
        data={filteredData}
        filter={{
          label: "Resolvers",
          options: resolverOptions,
          onClick: setResolverValue,
        }}
        subfilter={{
          label: "Subfields",
          options: subfieldOptions,
          onClick: setSubfieldValue,
        }}
        timeScaleProps={timeScaleProps}
      />
    </>
  );
};

export default BackendMonitoring;
