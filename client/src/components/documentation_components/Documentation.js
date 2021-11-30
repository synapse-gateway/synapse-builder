import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../Title";
import markdown from "./markdown";

const Documentation = () => {
  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 5, display: "flex", flexDirection: "column" }}>
        <Title>Documentation</Title>
          <ReactMarkdown children={markdown} />
        </Paper>
      </Grid></>
  )
}

export default Documentation;