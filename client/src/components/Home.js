import React, { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import CombinedChart from "./monitoring_components/CombinedChart";
// import DataView from "./monitoring_components/DataView";
import Title from "./Title";

function Home({ loggedInUser }) {
  if (loggedInUser) {
    return (
      <>
        <CombinedChart token={loggedInUser} />
        {/* <Title>Frontend Metrics (Past Week)</Title>
        <DataView
          currentView={"frontend"}
          token={loggedInUser}
          timeRange={"week"}
          interactive={false}
        />
        <br />
        <br />
        <Title>Backend Metrics (Past Week)</Title>
        <DataView
          currentView={"backend"}
          token={loggedInUser}
          timeRange={"week"}
          interactive={false}
        /> */}
      </>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

export default Home;
