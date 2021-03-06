import React from "react";
// import Link from '@mui/material/Link';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import apiClient from "../../lib/apiClient";
import { useState } from "react";
import { Alert } from "@mui/material";
import { CircularProgress } from "@mui/material";
import ToolTip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";

const DeleteSourceButton = ({
  sourcelist,
  sourcename,
  setSourceList,
  handleAlert,
}) => {
  const handleSourceDelete = () => {
    let filteredSourceList = sourcelist.filter((source) => {
      return source.name !== sourcename;
    });
    setSourceList([...filteredSourceList]);
  };
  return (
    <>
      <ToolTip
        disableFocusListener
        disableTouchListener
        title='Delete a source'
      >
        <DeleteIcon
          sx={{ cursor: "pointer", color: "#E4017D" }}
          sourceList={sourcelist}
          sourceName={sourcename}
          onClick={handleSourceDelete}
        />
      </ToolTip>
    </>
  );
};

const ConnectedSources = ({ loggedInUser, sourceList, setSourceList }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [creatingSynapse, setCreatingSynapse] = useState(null);

  const sources = sourceList;

  const handleAlertTimeout = (messageType) => {
    messageType === "success"
      ? setTimeout(() => {
          setSuccessMessage(null);
        }, 3500)
      : setTimeout(() => {
          setErrorMessage(null);
        }, 3500);
  };

  const handleSubmit = async () => {
    setCreatingSynapse("Creating your Synapse.... This may take some time...");
    let response = await apiClient.createConfig(loggedInUser, sources);
    if (response === 200) {
      setCreatingSynapse(null);
      setSuccessMessage("Synapse-mesh has been successfully created!");
      handleAlertTimeout("success");
    } else {
      setCreatingSynapse(null);
      setErrorMessage("Failed to create your Synapse-mesh");
      handleAlertTimeout();
    }
  };
  return (
    <>
      {" "}
      {successMessage ? (
        <Alert
          sx={{ mb: 2 }}
          onClose={() => {
            setSuccessMessage(null);
          }}
          severity='success'
          variant='filled'
        >
          {successMessage}
        </Alert>
      ) : (
        <></>
      )}
      {errorMessage ? (
        <Alert
          sx={{ mb: 2 }}
          severity='error'
          variant='filled'
          onClose={() => {
            setErrorMessage(null);
          }}
        >
          {errorMessage}
        </Alert>
      ) : (
        <></>
      )}
      {creatingSynapse ? (
        <Alert
          sx={{ mb: 2 }}
          severity='secondary'
          variant='filled'
          onClose={() => {
            setCreatingSynapse(null);
          }}
        >
          {creatingSynapse}
          <CircularProgress size={15} />
        </Alert>
      ) : (
        <></>
      )}
      <Title>Your connected data sources</Title>
      <Table size='small' sx={{ mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Source Name</TableCell>
            <TableCell>Connector Type</TableCell>
            <TableCell align='center'>Status</TableCell>
            <TableCell>Created date</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sourceList.map((source) => (
            <TableRow key={source.id}>
              <TableCell>{source.name}</TableCell>
              <TableCell>{source.handler}</TableCell>
              <TableCell align='center'>
                <CheckIcon sx={{ color: "#0A0188" }} />
              </TableCell>
              <TableCell>{source.created}</TableCell>
              <TableCell align='center'>
                <DeleteSourceButton
                  sourcelist={sourceList}
                  setSourceList={setSourceList}
                  sourcename={source.name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToolTip
        disableFocusListener
        disableTouchListener
        title='Configures and build your GraphQL Gateway'
      >
        <Button
          sx={{
            width: "40%",
            margin: "auto",
            // backgroundColor: "#FFBD3A",
            // color: "#0A0188",
          }}
          variant='contained'
          onClick={handleSubmit}
        >
          Create Your Synapse
        </Button>
      </ToolTip>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more...
      </Link> */}
    </>
  );
};

export default ConnectedSources;
