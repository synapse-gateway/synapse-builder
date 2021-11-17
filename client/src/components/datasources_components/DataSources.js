import React, { useState } from "react";
// import apiClient from "../../lib/apiClient";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import ExistingSources from "./ExistingSources";
import HandlerList from "./HandlerList";
// import Title from "../Title";
import ConnectedSources from "./ConnectedSources";
import { Navigate } from "react-router-dom"

// Handler Forms
// import OpenAPI from "./handler_form_components/OpenAPI";
// import GraphQL from "./handler_form_components/GraphQL";
// import Postgres from "./handler_form_components/Postgres";

const DataSources = ({loggedInUser}) => {
  const [sourceList, setSourceList] = useState([]);
  // const [currentHandler, setCurrentHandler] = useState("");

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   apiClient.createConfig(sourceList);
  // };

  // const handlerForms = {
  //   openapi: <OpenAPI sourceList={sourceList} setSourceList={setSourceList} />,
  //   graphql: <GraphQL sourceList={sourceList} setSourceList={setSourceList} />,
  //   postgraphile: (
  //     <Postgres sourceList={sourceList} setSourceList={setSourceList} />
  //   ),
  // };

  if (loggedInUser) {
    return (
      <>
        <Grid item xs={12}>
          {sourceList.length > 0 ? (
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <ConnectedSources loggedInUser={loggedInUser} sourceList={sourceList} />
            </Paper>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <HandlerList
              sourceList={sourceList}
              setSourceList={setSourceList}
            />
          </Paper>
        </Grid>
      </>
    );
  } else {
    return <Navigate to="/signin" />
  }
  
};

export default DataSources;