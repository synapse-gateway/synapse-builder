import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ErrorIcon from "@mui/icons-material/Error";
import GraphIcon from "@mui/icons-material/AccountTree";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DocumentationIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
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
  graphiql: "apollo",
  documentation: "documentation",
  errors: "errors",
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
      {/* <Link style={linkStyle} to={`/${paths.datasources}`}>
        <ListItemButton
          selected={location.pathname === `/${paths.datasources}`}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Data Sources" />
        </ListItemButton>
      </Link> */}
      <Link style={linkStyle} to={`/${paths.errors}`}>
        <ListItemButton selected={location.pathname === `/${paths.errors}`}>
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText primary="Errors" />
        </ListItemButton>
      </Link>
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
      {/* <a style={linkStyle} href={`http://localhost:6868`} target="_blank">
        <ListItemButton selected={location.pathname === `/${paths.graphiql}`}>
          <ListItemIcon>
            <GraphIcon />
          </ListItemIcon>
          <ListItemText primary="GraphQL Playground" />
        </ListItemButton>
      </a> */}
      <a style={linkStyle} href={`/${paths.graphiql}`} target="_blank">
        <ListItemButton selected={location.pathname === `/${paths.graphiql}`}>
          <ListItemIcon>
            <GraphIcon />
          </ListItemIcon>
          <ListItemText primary="GraphQL Playground" />
        </ListItemButton>
      </a>
      <Link style={linkStyle} to={`/${paths.documentation}`}>
        <ListItemButton
          selected={location.pathname === `/${paths.documentation}`}
        >
          <ListItemIcon>
            <DocumentationIcon />
          </ListItemIcon>
          <ListItemText primary="Documentation" />
        </ListItemButton>
      </Link>
    </div>
  );
};
