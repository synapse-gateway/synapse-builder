import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

const linkStyle = {
  color: 'inherit',
  textDecoration: 'none',
};

export const mainListItemsAdmin = (
  <div>
    <Link style={linkStyle} to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <Link style={linkStyle} to="/datasources">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Data Sources" />
      </ListItem>
    </Link>

    <Link style={linkStyle} to="/monitoring">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Metrics & Logs" />
      </ListItem>
    </Link>

    <Link style={linkStyle} to="/createuser">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Create Users" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Additional</ListSubheader>
    <Link style={linkStyle} to="/graphiql">
      <ListItem button>
        <ListItemIcon>
          {/* <AssignmentIcon /> REPLACE ICON */}
        </ListItemIcon>
        <ListItemText primary="GraphiQL" />
      </ListItem>
    </Link>
  </div>
);

export const mainListItems = (
  <div>
    <Link style={linkStyle} to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <Link style={linkStyle} to="/datasources">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Data Sources" />
      </ListItem>
    </Link>

    <Link style={linkStyle} to="/monitoring">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Metrics & Logs" />
      </ListItem>
    </Link>
  </div>
);