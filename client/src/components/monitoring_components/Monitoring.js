import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ScaleToggler from "./ScaleToggler";
import DataView from "./DataView";
import { Navigate } from "react-router-dom";

const Monitoring = ({ loggedInUser }) => {
  const [currentView, setCurrentView] = useState("frontend");

  const handleViewToggle = (e, newView) => {
    setCurrentView(newView);
  };

  if (loggedInUser) {
    return (
      <>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              py: 3,
            }}
          >
            <ScaleToggler
              groupName={"View toggle"}
              selection={currentView}
              onChange={handleViewToggle}
              options={["frontend", "backend"]}
            />
          </Paper>
        </Grid>

        <DataView currentView={currentView} token={loggedInUser} />
      </>
    );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default Monitoring;
