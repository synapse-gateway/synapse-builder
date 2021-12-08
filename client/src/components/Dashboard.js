import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ErrorTableTwo from "./monitoring_components/ErrorTableTwo";
import { SidebarMainList } from "./Navigation";
import Monitoring from "./monitoring_components/Monitoring";
import DataSources from "./datasources_components/DataSources";
import SignUp from "./authentication_components/Signup";
import SignIn from "./authentication_components/Signin";
import NavBarLeft from "./navbar-left/NavBarLeft";
import MenuButton from "./navbar-left/MenuButton";
import ManageUsers from "./authentication_components/ManageUsers";
import Documentation from "./documentation_components/Documentation";
import { Navigate } from "react-router-dom";
import theme from "../components/theme";
import Logo from "../images/synapselogosmall.svg";
import { autocompleteClasses } from "@mui/material";

const imageStyle = {
  height: "70px",
  paddingTop: "12px",
  // alignSelf: "center",
};

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [isRoot, setIsRoot] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleLoggedIn = (e) => {
    e.preventDefault();
    if (loggedInUser) {
      setLoggedInUser(null);
      setIsAdmin(false);
      setIsRoot(false);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position='absolute' open={!!loggedInUser && open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              alignItems: "center",
            }}
          >
            {loggedInUser ? (
              <MenuButton toggleDrawer={toggleDrawer} open={open} />
            ) : null}
            <img src={Logo} style={imageStyle} />
            {/* GUI Title */}
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1, pl: 2 }}
            >
              Synapse Gateway Manager
            </Typography>

            {/* Notifications */}
            <IconButton color='inherit' onClick={toggleLoggedIn}>
              {loggedInUser ? (
                <Typography>
                  Hi {username} {isRoot ? "(Root User)" : ""} | Logout
                </Typography>
              ) : (
                ""
              )}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Nav Bar */}
        {loggedInUser ? (
          <NavBarLeft
            Test={SidebarMainList}
            Drawer={Drawer}
            MainList={SidebarMainList}
            isAdmin={isAdmin}
            open={open}
            toggleDrawer={toggleDrawer}
          />
        ) : null}

        {/* Main Content Area */}
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Features */}
              <Routes>
                <Route
                  path='/'
                  element={<Monitoring loggedInUser={loggedInUser} />}
                />
                <Route
                  path='/datasources'
                  element={<DataSources loggedInUser={loggedInUser} />}
                />
                <Route
                  path='/manageusers'
                  element={
                    <ManageUsers
                      setLoggedInUser={setLoggedInUser}
                      loggedInUser={loggedInUser}
                      isAdmin={isAdmin}
                      username={username}
                    />
                  }
                />
                <Route
                  path='/createuser'
                  element={
                    <SignUp
                      setLoggedInUser={setLoggedInUser}
                      loggedInUser={loggedInUser}
                      isAdmin={isAdmin}
                    />
                  }
                />
                <Route
                  path='/signin'
                  element={
                    <SignIn
                      setUsername={setUsername}
                      setIsAdmin={setIsAdmin}
                      setLoggedInUser={setLoggedInUser}
                      loggedInUser={loggedInUser}
                      setIsRoot={setIsRoot}
                    />
                  }
                />
                <Route path='/documentation' element={<Documentation />} />
                <Route
                  path='/errors'
                  element={<ErrorTableTwo loggedInUser={loggedInUser} />}
                />
                <Route path='*' element={<Navigate to='/signin' />} />
              </Routes>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
