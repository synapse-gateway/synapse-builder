import React from "react";
import { useEffect, useState } from "react";
import apiClient from "../../lib/apiClient";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Navigate } from "react-router-dom";

const ErrorTable = ({ loggedInUser }) => {
  const [errorData, setErrorData] = useState([]);
  useEffect(async () => {
    let errors = await apiClient.getQueryErrorData(loggedInUser, 24);
    let errorDataPulled = errors.data.map((err) => {
      return {
        id: err._id,
        timeOfError: err.createdAt,
        ip: err.ip,
        errStrings: err.errs.map((e) => e.message).join(", "),
        sourceQuery: err.sourceQuery,
      };
    });
    setErrorData(errorDataPulled);
  }, []);
  const columns = [
    { field: "timeOfError", headerName: "Datetime of Error", width: 200 },
    { field: "ip", headerName: "Origin", width: 150 },
    { field: "errStrings", headerName: "List Of Errors", width: 600 },
    { field: "sourceQuery", headerName: "Original Query", width: 400 },
  ];
  if (loggedInUser) {
    return (
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={errorData} columns={columns} />
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default ErrorTable;
