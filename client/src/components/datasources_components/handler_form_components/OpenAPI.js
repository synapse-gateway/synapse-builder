import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const OpenAPI = ({ sourceList, setSourceList, setOpen }) => {
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
      { name, url, handler: "openapi", created: createTimeStamp() },
    ]);
    setOpen(false);
    setName("");
    setUrl("");
  };
  return (
    <div>
      <div>
        <TextField
          fullWidth
          label='Source Name'
          color='primary'
          id='openapi-name'
          aria-describedby='openapi-name'
          name='openapi-name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Source URL'
          color='primary'
          id='openapi-url'
          aria-describedby='openapi-url'
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

export default OpenAPI;
