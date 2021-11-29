import React from "react";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";

function NavBarLeft({
  Test,
  Drawer,
  MainList,
  SecondaryList,
  isAdmin,
  open,
  toggleDrawer,
  mainListItems,
  secondaryListItems,
}) {
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <MainList isAdmin={isAdmin} />
        {/* <List>{mainListItems}</List> */}
        <Divider />
        <SecondaryList />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
    </>
  );
}

export default NavBarLeft;
