import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Badge from '@mui/material/Badge';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  mainListItems,
  secondaryListItems,
  mainListItemsAdmin,
} from "./Navigation";
import Monitoring from "./monitoring_components/Monitoring";
import DataSources from "./datasources_components/DataSources";
import Home from "./Home";
import SignUp from "./authentication_components/Signup";
import SignIn from "./authentication_components/Signin";
import NavBarLeft from "./navbar-left/NavBarLeft";
import MenuButton from "./navbar-left/MenuButton";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Team 5 - GraphQL-is-Okay
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 240;

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
  console.log(isAdmin);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleLoggedIn = (e) => {
    e.preventDefault();
    if (loggedInUser) {
      setLoggedInUser(null);
      setIsAdmin(false);
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={!!loggedInUser && open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            {loggedInUser ? (
              <MenuButton toggleDrawer={toggleDrawer} open={open} />
            ) : null}
            {/* GUI Title */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              SYNAPSE
            </Typography>
            {/* Notifications */}
            <IconButton color="inherit" onClick={toggleLoggedIn}>
              {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
              {loggedInUser ? "Logout" : ""}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Nav Bar */}

        {loggedInUser ? (
          <NavBarLeft
            Drawer={Drawer}
            open={open}
            mainListItems={isAdmin ? mainListItemsAdmin : mainListItems}
            secondaryListItems={secondaryListItems}
            toggleDrawer={toggleDrawer}
          />
        ) : null}
        {/* Main Content Area */}
        <Box
          component="main"
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Features */}
              <Routes>
                <Route
                  path="/"
                  element={<Home loggedInUser={loggedInUser} />}
                />
                <Route
                  path="/monitoring"
                  element={<Monitoring loggedInUser={loggedInUser} />}
                />
                <Route
                  path="/datasources"
                  element={<DataSources loggedInUser={loggedInUser} />}
                />

                <Route
                  path="/createuser"
                  element={
                    <SignUp
                      setLoggedInUser={setLoggedInUser}
                      loggedInUser={loggedInUser}
                      isAdmin={isAdmin}
                    />
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <SignIn
                      setIsAdmin={setIsAdmin}
                      setLoggedInUser={setLoggedInUser}
                      loggedInUser={loggedInUser}
                    />
                  }
                />
                {/* <Route path="/" element={} /> */}

                {/* <Route path="/permissions" element={<Permissions />} /> */}
                {/* <Route path="/graphiql" element={<GraphiQL />} /> */}
              </Routes>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
