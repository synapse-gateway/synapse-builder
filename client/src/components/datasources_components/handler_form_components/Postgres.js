import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const Postgres = ({ sourceList, setSourceList, setOpen }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [nameBtnDisabled, setNameBtnDisabled] = useState(true);
  const [connBtnDisabled, setConnBtnDisabled] = useState(true);

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
    setName("");
    setUrl("");
    setOpen(false);
  };

  const nameError = name === "";
  const connError = url === "";

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
          onChange={(e) => {
            setName(e.target.value);
            setNameBtnDisabled(!e.target.value.trim());
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={nameError ? "You must provide a Database name." : null}
        />

        <TextField
          fullWidth
          label='Database Connection String'
          color='primary'
          id='postgres-connection'
          aria-describedby='postgres-connection'
          name='url'
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setConnBtnDisabled(!e.target.value.trim());
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={
            connError ? "You must provide a Connection String." : null
          }
        />
      </div>
      <Button
        variant='contained'
        disabled={nameBtnDisabled || connBtnDisabled}
        onClick={handleCreateClick}
      >
        Create
      </Button>
    </div>
  );
};

export default Postgres;
