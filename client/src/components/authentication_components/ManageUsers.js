import { Container } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Title from "../Title";
import { Navigate } from "react-router-dom";
import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import apiClient from "../../lib/apiClient";

const ManageUsers = ({ loggedInUser, isAdmin }) => {
  const [users, setUsers] = useState([]);

  if (!loggedInUser && !isAdmin) {
    return <Navigate to='/' />;
  } else {
    useEffect(() => {
      apiClient.getAllUsers().then((response) => setUsers(response));
      // console.log(allUsers);
      // setUsers(allUsers);
    }, []);

    return (
      <Container component='main'>
        <Title component='h1' variant='h5'>
          Manage Users
        </Title>
        <AddUserModal
          loggedInUser={loggedInUser}
          isAdmin={isAdmin}
          setUsers={setUsers}
          users={users}
        />
        <UserTable allUsers={users} setUsers={setUsers} />
      </Container>
    );
  }
};

export default ManageUsers;
