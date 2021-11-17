import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import InputModal from "./InputModal";

// Generate Handler Data
function createData(id, name, description, value) {
  return { id, name, description, value };
}

const rows = [
  createData(0, "GraphQL", "Load remote GraphQL Schema", "graphql"),
  createData(1, "OpenAPI", "Load remote OpenAPI and Swagger", "openapi"),
  createData(2, "JSON Schema", "Load remote JSON Schema", "json-schema"),
  createData(3, "PostgreSQL", "Connect to your PostgreSQL DB", "postgraphile"),
  createData(4, "Mongoose", "Connect to your MongoDB", "mongoose"),
];

const HandlerList = ({ sourceList, setSourceList }) => {

  return (
    <>
      <Title>Connect a data source</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Connector name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align='right'>
                <InputModal
                  handlerName={row.name}
                  sourceList={sourceList}
                  setSourceList={setSourceList}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default HandlerList;
