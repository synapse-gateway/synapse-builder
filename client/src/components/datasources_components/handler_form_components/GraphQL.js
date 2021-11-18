import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const GraphQL = ({ sourceList, setSourceList, setOpen }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const createTimeStamp = () => {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var today = new Date();
    return today.toLocaleDateString("en-US", options);
  };

  const handleCreateClick = (e) => {
    e.preventDefault();
    setSourceList([
      ...sourceList,
      { name, url, handler: "graphql", created: createTimeStamp() },
    ]);
    setName("");
    setUrl("");
    setOpen(false);
  };

  return (
    <div>
      <div>
        <TextField
          fullWidth
          label='Source Name'
          color='primary'
          id='graphql-name'
          aria-describedby='graphql-name'
          name='graphql-name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Source Endpoint URL'
          color='primary'
          id='graphql-url'
          aria-describedby='graphql-url'
          name='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />
      </div>
      <Button variant='contained' onClick={handleCreateClick}>
        Create
      </Button>
    </div>
  );
};

export default GraphQL;
