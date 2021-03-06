import React from "react";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import DragDrop from "./DragDrop";

const JSONSchema = ({ sourceList, setSourceList, setOpen }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [operations, setOperations] = useState([]);
  const [operationType, setOperationType] = useState("");
  const [operationField, setOperationField] = useState("");
  const [operationPath, setOperationPath] = useState("");
  const [operationMethod, setOperationMethod] = useState("");
  // const [operationResponseSchema, setOperationResponseSchema] = useState("");
  const [operationResponseSchemaFile, setOperationResponseSchemaFile] =
    useState(null);
  const fileTypes = ["json"];

  const [nameBtnDisabled, setNameBtnDisabled] = useState(true);
  const [urlBtnDisabled, setUrlBtnDisabled] = useState(true);
  const [fileBtnDisabled, setFileBtnDisabled] = useState(true);
  const [operationsBtn, setOperationsBtnDisabled] = useState({
    operationType: true,
    operationField: true,
    operationPath: true,
    operationMethod: true,
  });

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
      {
        name,
        url,
        operations,
        handler: "jsonSchema",
        created: createTimeStamp(),
      },
    ]);
    setName("");
    setUrl("");
    setOpen(false);
  };

  const handleAddOperationClick = async (e) => {
    e.preventDefault();

    const content = await operationResponseSchemaFile.text();
    setOperations([
      ...operations,
      {
        type: operationType,
        field: operationField,
        path: operationPath,
        method: operationMethod,
        responseSchemaContent: content,
      },
    ]);
    setOperationType("");
    setOperationField("");
    setOperationPath("");
    setOperationMethod("");
    // setOperationResponseSchema("");
    setOperationResponseSchemaFile(null);
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
          id='json-schema-name'
          aria-describedby='json-schema-name'
          name='json-schema-name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameBtnDisabled(!e.target.value.trim());
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={nameError ? "You must provide a Source name." : null}
        />

        <TextField
          fullWidth
          label='Source URL'
          color='primary'
          id='json-schema-url'
          aria-describedby='json-schema-url'
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
          Operation Information
        </Typography>

        <TextField
          fullWidth
          label='Operation Type'
          color='primary'
          id='json-schema-operation-type'
          aria-describedby='json-schema-operation-type'
          name='json-schema-operation-type'
          value={operationType}
          onChange={(e) => {
            setOperationType(e.target.value),
              setOperationsBtnDisabled((oldState) => ({
                ...oldState,
                operationType: false,
              }));
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={
            !operationType ? "You must provide an operation type." : null
          }
        />

        <TextField
          fullWidth
          label='Operation Field'
          color='primary'
          id='json-schema-operation-field'
          aria-describedby='json-schema-operation-field'
          name='json-schema-operation-field'
          value={operationField}
          onChange={(e) => {
            setOperationField(e.target.value),
              setOperationsBtnDisabled((oldState) => ({
                ...oldState,
                operationField: false,
              }));
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={
            !operationField ? "You must provide an operation field." : null
          }
        />

        <TextField
          fullWidth
          label='Operation Path'
          color='primary'
          id='json-schema-operation-path'
          aria-describedby='json-schema-operation-path'
          name='json-schema-operation-path'
          value={operationPath}
          onChange={(e) => {
            setOperationPath(e.target.value),
              setOperationsBtnDisabled((oldState) => ({
                ...oldState,
                operationPath: false,
              }));
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={
            !operationPath ? "You must provide an operation path." : null
          }
        />

        <TextField
          fullWidth
          label='Operation Method'
          color='primary'
          id='json-schema-operation-method'
          aria-describedby='json-schema-operation-method'
          name='json-schema-operation-method'
          value={operationMethod}
          onChange={(e) => {
            setOperationMethod(e.target.value),
              setOperationsBtnDisabled((oldState) => ({
                ...oldState,
                operationMethod: false,
              }));
          }}
          variant='outlined'
          sx={{ mb: 2 }}
          helperText={
            !operationMethod ? "You must provide an operation method." : null
          }
        />

        {/* <TextField
          fullWidth
          label='Operation Response Schema Path'
          color='primary'
          id='json-schema-operation-responseSchema'
          aria-describedby='json-schema-operation-responseSchema'
          name='json-schema-operation-responseSchema'
          value={operationResponseSchema}
          onChange={(e) => setOperationResponseSchema(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        /> */}

        <DragDrop
          setFile={setOperationResponseSchemaFile}
          fileTypes={fileTypes}
          setFileBtnDisabled={setFileBtnDisabled}
        />

        <Button
          sx={{ mb: 2, mt: 2 }}
          variant='contained'
          disabled={
            operationsBtn.operationType ||
            operationsBtn.operationField ||
            operationsBtn.operationPath ||
            operationsBtn.operationMethod
          }
          onClick={handleAddOperationClick}
        >
          Add Operation
        </Button>
      </div>

      <Button
        variant='contained'
        disabled={nameBtnDisabled || urlBtnDisabled || fileBtnDisabled}
        onClick={handleCreateClick}
        sx={{ mb: 2 }}
      >
        Create
      </Button>
    </div>
  );
};

export default JSONSchema;
