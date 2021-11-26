import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Logs from "./Logs";
import MultipleSelector from "./MultipleSelector";
import TableContainer from "@mui/material/TableContainer";

const Dashboard = ({ data, filter, subfilter, timeScaleProps }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <MultipleSelector filterProps={filter} />
        </Paper>
      </Grid>

      {subfilter ? (
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <MultipleSelector filterProps={subfilter} />
          </Paper>
        </Grid>
      ) : null}

      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Chart data={data} timeScaleProps={timeScaleProps} />
        </Paper>
      </Grid>

      {data.length ? (
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <TableContainer>
              <Logs data={data.slice(0, 10)} />
            </TableContainer>
          </Paper>
        </Grid>
      ) : null}
    </>
  );
};

export default Dashboard;
