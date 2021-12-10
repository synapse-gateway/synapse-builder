import React from "react";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import DragDrop from "./DragDrop";

const Mongoose = ({ sourceList, setSourceList, setOpen }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [modelName, setModelName] = useState("");
  const [models, setModels] = useState([]);
  const [modelFile, setModelFile] = useState(null);
  const fileTypes = ["javascript"];
  const [nameBtnDisabled, setNameBtnDisabled] = useState(true);
  const [urlBtnDisabled, setUrlBtnDisabled] = useState(true);
  const [modelBtnDisabled, setModelBtnDisabled] = useState(true);
  const [fileBtnDisabled, setFileBtnDisabled] = useState(true);

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

  const handleAddModelClick = async (e) => {
    e.preventDefault();
    const modelContent = await modelFile.text();
    setModels([...models, { name: modelName, content: modelContent }]);
    setModelName("");
    setModelFile(null);
  };
  const nameError = name === "";
  const sourceError = url === "";
  const modelError = modelName === "";

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
          label='Source URL'
          color='primary'
          id='mongoose-url'
          aria-describedby='mongoose-url'
          name='url'
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setUrlBtnDisabled(!e.target.value.trim());
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={sourceError ? "You must provide a Source URL." : null}
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
          onChange={(e) => {
            setModelName(e.target.value);
            setModelBtnDisabled(!e.target.value.trim());
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={modelError ? "You must provide a Model name." : null}
        />

        {/* <TextField
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
        /> */}

        <DragDrop
          setFile={setModelFile}
          setFileBtnDisabled={setFileBtnDisabled}
          fileTypes={fileTypes}
        />

        <Button
          sx={{ mb: 2, mt: 2 }}
          variant='contained'
          disabled={modelBtnDisabled}
          onClick={handleAddModelClick}
        >
          Add Model
        </Button>
      </div>

      <Button
        variant='contained'
        disabled={
          nameBtnDisabled ||
          urlBtnDisabled ||
          modelBtnDisabled ||
          fileBtnDisabled
        }
        onClick={handleCreateClick}
        sx={{ mb: 2 }}
      >
        Create
      </Button>
    </div>
  );
};

export default Mongoose;
