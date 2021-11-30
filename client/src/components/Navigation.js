import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
// import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, useLocation } from "react-router-dom";

const linkStyle = {
  color: "inherit",
  textDecoration: "none",
};

const paths = {
  home: "",
  datasources: "datasources",
  monitoring: "monitoring",
  manageusers: "manageusers",
  graphiql: "graphiql",
  documentation: "documentation",
};

export const SidebarMainList = ({ isAdmin }) => {
  const location = useLocation();

  return (
    <div>
      <Link style={linkStyle} to={`/${paths.home}`}>
        <ListItemButton selected={location.pathname === `/${paths.home}`}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link style={linkStyle} to={`/${paths.datasources}`}>
        <ListItemButton
          selected={location.pathname === `/${paths.datasources}`}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Data Sources" />
        </ListItemButton>
      </Link>
      {/* <Link style={linkStyle} to={`/${paths.monitoring}`}>
        <ListItemButton selected={location.pathname === `/${paths.monitoring}`}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Metrics & Logs" />
        </ListItemButton>
      </Link> */}
      {isAdmin ? (
        <Link style={linkStyle} to={`/${paths.manageusers}`}>
          <ListItemButton
            selected={location.pathname === `/${paths.manageusers}`}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </Link>
      ) : null}
    </div>
  );
};

export const SidebarSecondaryList = () => {
  return (
    <div>
      <ListSubheader inset>Additional</ListSubheader>
      <Link style={linkStyle} to={`/${paths.graphiql}`}>
        <ListItemButton selected={location.pathname === `/${paths.graphiql}`}>
          <ListItemIcon>{/* <AssignmentIcon /> REPLACE ICON */}</ListItemIcon>
          <ListItemText primary="GraphiQL" />
        </ListItemButton>
      </Link>
      <Link style={linkStyle} to={`/${paths.documentation}`}>
        <ListItemButton selected={location.pathname === `/${paths.documentation}`}>
          <ListItemIcon>{/* <AssignmentIcon /> REPLACE ICON */}</ListItemIcon>
          <ListItemText primary="Documentation" />
        </ListItemButton>
      </Link>
    </div>
  );
};
