import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import apiClient from "../../lib/apiClient";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(UserName, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const handleUserEdit = (username) => {
  console.log(username);
};

const handleUserDelete = async (username, allUsers, setUsers) => {
  let responseData = await apiClient.deleteUser({ username: username });
  if (responseData.status === 204) {
    let updatedUsers = allUsers.filter((user) => user.username !== username);
    setUsers([...updatedUsers]);
  }
};

// const deleteConfirmation () => {

// }

export default function UserTable({ allUsers, setUsers, setPopup }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={6}
              align='center'
              sx={{ bgcolor: "#2976D2", color: "white" }}
            >
              {" "}
              <Typography
                component='h1'
                variant='h5'
                sx={{ fontWeight: "bold" }}
              >
                User List
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>User Name</StyledTableCell>
            <StyledTableCell align='center'>First Name</StyledTableCell>
            <StyledTableCell align='center'>Last Name</StyledTableCell>
            <StyledTableCell align='center'>Role</StyledTableCell>
            <StyledTableCell align='center'>Edit</StyledTableCell>
            <StyledTableCell align='center'>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((row) => (
            <StyledTableRow key={row.username}>
              <StyledTableCell component='th' scope='row'>
                {row.username}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.firstName}</StyledTableCell>
              <StyledTableCell align='center'>{row.lastName}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.admin ? "Sith Lord" : "Rebel Scum"}
              </StyledTableCell>
              <StyledTableCell align='center'>
                <EditIcon onClick={() => handleUserEdit(row.username)} />
              </StyledTableCell>
              <StyledTableCell align='center'>
                <DeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => setPopup({ show: true, user: row.username })}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
