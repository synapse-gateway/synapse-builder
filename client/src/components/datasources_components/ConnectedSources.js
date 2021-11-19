import React from "react";
// import Link from '@mui/material/Link';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import { Button } from "@mui/material";
import apiClient from "../../lib/apiClient";

// // Generate Source Data
// function createData(id, name, type, status, active, created, actions) {
//   return { id, name, type, status, active, created, actions };
// }

// // Fake Data
// const rows = [
//   createData(
//     0,
//     "Author Service",
//     "OpenAPI",
//     "✓",
//     <input type='checkbox' />,
//     "16 Mar, 2019",
//     "✎ 🗑"
//   ),
//   createData(
//     1,
//     "Book Service",
//     "GraphQL",
//     "✓",
//     <input type='checkbox' />,
//     "16 Mar, 2019",
//     "✎ 🗑"
//   ),
// ];

// const SubmitSourceButton = ({handleSubmitButton, sourceList})=>{
//   return <Button sx={{ width: "40%", mt: 2 }} variant='contained' onClick={handleSubmitSources}>
//         Create Your Synapse
//       </Button>
// }

// const handleSubmitSources = (sources)=>{
//   apiClient.createConfig(sources);
//   console.log('sources submitted!')
// }

// function preventDefault(event) {
//   event.preventDefault();
// }
const DeleteSourceButton = ({ sourceList, sourceName, setSourceList }) => {
  const handleSourceDelete = () => {
    let filteredSourceList = sourceList.filter((source) => {
      return source.name !== sourceName;
    });
    setSourceList([...filteredSourceList]);
  };
  return (
    <Button
      sourceList={sourceList}
      sourceName={sourceName}
      onClick={handleSourceDelete}
    >
      🗑
    </Button>
  );
};

const ConnectedSources = ({ loggedInUser, sourceList, setSourceList }) => {
  const sources = sourceList;
  const handleSubmit = () => {
    apiClient.createConfig(loggedInUser, sources);
    console.log("Sources submitted!");
  };
  return (
    <>
      <Title>Your connected data sources</Title>
      <Table size='small'>
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
              <TableCell align='center'>✓</TableCell>
              <TableCell>{source.created}</TableCell>
              <TableCell align='center'>
                <DeleteSourceButton
                  sourceList={sourceList}
                  sourceName={source.name}
                  setSourceList={setSourceList}
                  align='center'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        sx={{ width: "40%", mt: 2 }}
        variant='contained'
        onClick={handleSubmit}
      >
        Create Your Synapse
      </Button>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more...
      </Link> */}
    </>
  );
};

export default ConnectedSources;
