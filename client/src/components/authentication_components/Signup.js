import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiClient from "../../lib/apiClient";
import { Navigate } from "react-router-dom";
import { Alert } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href='https://mui.com/'>
        Synapse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp({
  setLoggedInUser,
  loggedInUser,
  isAdmin,
  closeModal,
  setUsers,
  allUsers,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [makeAdmin, setMakeAdmin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const userObj = {
      username: data.get("username"),
      password: data.get("password"),
      firstName: firstName,
      lastName: data.get("lastName"),
      admin: makeAdmin ? "true" : "false",
    };

    let responseData = await apiClient.signupUser(userObj);
    if (responseData.error) {
      setErrorMessage(responseData.error);
    } else {
      setErrorMessage(null);
      clearForm();
      setSuccessMessage(`Successfully created user ${username}`);
      setUsers([...allUsers, responseData]);
      setTimeout(() => {
        closeModal(false);
      }, 1500);
    }
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setMakeAdmin(false);
  };

  if (!loggedInUser && !isAdmin) {
    return <Navigate to='/' />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          {errorMessage ? (
            <Alert severity='error' variant='filled'>
              {errorMessage}
            </Alert>
          ) : (
            <></>
          )}
          {successMessage ? (
            <Alert severity='success' variant='filled'>
              {successMessage}
            </Alert>
          ) : (
            <></>
          )}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Create a User
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id='username'
                    label='Username'
                    name='username'
                    autoComplete='username'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={makeAdmin}
                        checked={makeAdmin}
                        onChange={() => setMakeAdmin(!makeAdmin)}
                        color='primary'
                      />
                    }
                    label='Make user an admin'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {/* <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
  }
}
