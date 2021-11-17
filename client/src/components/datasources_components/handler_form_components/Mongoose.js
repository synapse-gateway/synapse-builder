import React from "react";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const Mongoose = ({ sourceList, setSourceList, setOpen }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [modelName, setModelName] = useState("");
  const [modelUrl, setModelUrl] = useState("");
  const [models, setModels] = useState([]);

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
      { name, url, models, handler: "mongoose", created: createTimeStamp() },
    ]);
    setName("");
    setUrl("");
    setOpen(false);
  };

  const handleAddModelClick = (e) => {
    e.preventDefault();
    setModels([
      ...models,
      { name: modelName, path: modelUrl }
    ]);
    setModelName("");
    setModelUrl("");
  }

  return (
    <div>
      <div>
        <TextField
          fullWidth
          label='Source Name'
          color='primary'
          id='mongoose-name'
          aria-describedby='mongoose-name'
          name='mongoose-name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Source URL'
          color='primary'
          id='mongoose-url'
          aria-describedby='mongoose-url'
          name='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />
      </div>

      <div>
        <Typography
          id='modal-modal-title'
          variant='h6'
          color='primary'
          component='h2'
          sx={{ mb: 2 }}
        >
          Model Information
        </Typography>

        <TextField
          fullWidth
          label='Model Name'
          color='primary'
          id='mongoose-model-name'
          aria-describedby='mongoose-model-name'
          name='mongoose-model-name'
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Model Endpoint URL'
          color='primary'
          id='mongoose-url'
          aria-describedby='mongoose-url'
          name='url'
          value={modelUrl}
          onChange={(e) => setModelUrl(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <Button variant='contained' onClick={handleAddModelClick}>
          Add Model
        </Button>
      </div>

      <Button variant='contained' onClick={handleCreateClick}>
        Create
      </Button>
    </div>
  );
};

export default Mongoose;
