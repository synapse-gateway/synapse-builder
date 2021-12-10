import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import DragDrop from "./DragDrop";

const OpenAPI = ({ sourceList, setSourceList, setOpen }) => {
  const [name, setName] = useState("");
  // const [url, setUrl] = useState("");
  const [schemaFile, setSchemaFile] = useState(null);
  const [schemaContent, setSchemaContent] = useState("");
  const [schemaFileType, setSchemaFileType] = useState("");
  const fileTypes = ["x-yaml", "json"];
  const [nameBtnDisabled, setNameBtnDisabled] = useState(true);
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

  const handleCreateClick = async (e) => {
    e.preventDefault();
    const schemaFileContent = await schemaFile.text();
    const schemaFileType = schemaFile.type.includes("json") ? "json" : "yaml";
    setSourceList([
      ...sourceList,
      {
        name,
        schemaFileType,
        schemaFileContent,
        handler: "openapi",
        created: createTimeStamp(),
      },
    ]);
    setName("");
    // setUrl("");
    // setSchemaContent("");
    // setSchemaFileType("");
    setSchemaFile(null);
    setOpen(false);
  };

  // const handleAddSchemaClick = async (e) => {
  //   e.preventDefault();
  //   const content = await schemaFile.text();
  //   const type = schemaFile.type.includes("json") ? "json" : "yaml";
  //   setSchemaContent(content);
  //   setSchemaFileType(type);
  //   setSchemaFile(null);
  // };

  const nameError = name === "";

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
          onChange={(e) => {
            setName(e.target.value);
            setNameBtnDisabled(!e.target.value.trim());
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={nameError ? "You must provide a Source name." : null}
        />

        <DragDrop
          setFileBtnDisabled={setFileBtnDisabled}
          setFile={setSchemaFile}
          fileTypes={fileTypes}
        />

        {/* <TextField
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
        /> */}
        {/* <Button sx={{ mb: 2, mt: 2 }} variant='contained' onClick={handleAddSchemaClick}>
          Add Schema
        </Button> */}
      </div>

      <Button
        sx={{ mt: 2 }}
        disabled={nameBtnDisabled || fileBtnDisabled}
        variant='contained'
        onClick={handleCreateClick}
      >
        Create
      </Button>
    </div>
  );
};

export default OpenAPI;
