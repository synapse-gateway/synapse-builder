import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const Postgres = ({ sourceList, setSourceList, setOpen }) => {
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
      { name, url, handler: "postgraphile", created: createTimeStamp() },
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
          label='Database Name'
          color='primary'
          id='postgres-name'
          aria-describedby='postgres-name'
          name='postgres-name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Database Connection String'
          color='primary'
          id='postgres-connection'
          aria-describedby='postgres-connection'
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

export default Postgres;
