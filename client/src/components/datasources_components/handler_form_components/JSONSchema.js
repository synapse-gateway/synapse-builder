import React from "react";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const JSONSchema = ({ sourceList, setSourceList, setOpen }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [operations, setOperations] = useState([]);
  const [operationType, setOperationType] = useState("");
  const [operationField, setOperationField] = useState("");
  const [operationPath, setOperationPath] = useState("");
  const [operationMethod, setOperationMethod] = useState("");
  const [operationResponseSchema, setOperationResponseSchema] = useState("");

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
      { name, url, operations, handler: "jsonSchema", created: createTimeStamp() },
    ]);
    setName("");
    setUrl("");
    setOpen(false);
  };

  const handleAddOperationClick = (e) => {
    e.preventDefault();
    setOperations([
      ...operations,
      { type: operationType, field: operationField, path: operationPath, method: operationMethod, responseSchema: operationResponseSchema }
    ]);
    setOperationType("");
    setOperationField("");
    setOperationPath("");
    setOperationMethod("");
    setOperationResponseSchema("");
  }

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
          onChange={(e) => setName(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Source URL'
          color='primary'
          id='json-schema-url'
          aria-describedby='json-schema-url'
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
          onChange={(e) => setOperationType(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Operation Field'
          color='primary'
          id='json-schema-operation-field'
          aria-describedby='json-schema-operation-field'
          name='json-schema-operation-field'
          value={operationField}
          onChange={(e) => setOperationField(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Operation Path'
          color='primary'
          id='json-schema-operation-path'
          aria-describedby='json-schema-operation-path'
          name='json-schema-operation-path'
          value={operationPath}
          onChange={(e) => setOperationPath(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Operation Method'
          color='primary'
          id='json-schema-operation-method'
          aria-describedby='json-schema-operation-method'
          name='json-schema-operation-method'
          value={operationMethod}
          onChange={(e) => setOperationMethod(e.target.value)}
          variant='outlined'
          sx={{ mb: 2 }}
        />

        <TextField
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
        />

        <Button variant='contained' onClick={handleAddOperationClick}>
          Add Operation
        </Button>
      </div>

      <Button variant='contained' onClick={handleCreateClick}>
        Create
      </Button>
    </div>
  );
};

export default JSONSchema;
