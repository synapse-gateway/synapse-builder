import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import { useState, useEffect } from "react";
import Title from "../Title";
import { Navigate } from "react-router-dom";
import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import apiClient from "../../lib/apiClient";
import { Alert } from "@mui/material";

import DeleteConfirmationModal from "./DeleteConfirmatonModal";

const ManageUsers = ({ loggedInUser, isAdmin, username }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    user: null,
  });
  useEffect(() => {
    if (loggedInUser && isAdmin) {
      apiClient.getAllUsers().then((response) => setUsers(response.filter(u => u.root !== true && u.username !== username)));
    }
  }, []);

  const handleDeleteUser = async () => {
    let responseData = await apiClient.deleteUser({ username: popup.user });
    if (responseData.status === 204) {
      let updatedUsers = users.filter((user) => user.username !== popup.user);
      setUsers([...updatedUsers]);
      setPopup({
        show: false,
        user: null,
      });
      setSuccessMessage("Successfully deleted user!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3500);
    }
  };

  

  if (!loggedInUser && !isAdmin) {
    return <Navigate to="/signin" />;
  }
  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 3,
          py: 3,
        }}
      >
        <Title component="h1" variant="h5">
          Manage Users
        </Title>
        <AddUserModal
          loggedInUser={loggedInUser}
          isAdmin={isAdmin}
          setUsers={setUsers}
          users={users}
        />
        {popup.show && (
          <DeleteConfirmationModal
            popup={popup}
            setPopup={setPopup}
            deleteUser={handleDeleteUser}
          />
        )}
        {successMessage ? (
          <Alert
            onClose={() => {
              setSuccessMessage(null);
            }}
            severity="success"
            variant="filled"
          >
            {successMessage}
          </Alert>
        ) : (
          <></>
        )}
        <UserTable allUsers={users} setUsers={setUsers} setPopup={setPopup} />
      </Paper>
    </Grid>
  );
}

export default ManageUsers;
