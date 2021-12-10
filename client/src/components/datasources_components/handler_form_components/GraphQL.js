import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const GraphQL = ({ sourceList, setSourceList, setOpen }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [URLbtnDisabled, setURLBtnDisabled] = useState(true);

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

  const nameError = name === "";
  const sourceError = url === "";

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
          onChange={(e) => {
            setName(e.target.value);
            setBtnDisabled(!e.target.value.trim());
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={nameError ? "You must provide a handler name." : null}
        />

        <TextField
          fullWidth
          label='Source Endpoint URL'
          color='primary'
          id='graphql-url'
          aria-describedby='graphql-url'
          name='url'
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setURLBtnDisabled(!e.target.value.trim());
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={sourceError ? "You must provide a Source URL." : null}
        />
      </div>
      <Button
        variant='contained'
        disabled={btnDisabled || URLbtnDisabled}
        onClick={handleCreateClick}
      >
        Create
      </Button>
    </div>
  );
};

export default GraphQL;
