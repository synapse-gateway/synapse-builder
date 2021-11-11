import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';

// Generate Log Data
function createData(id, date, name, origin, stuff, stuff2) {
  return { id, date, name, origin, stuff, stuff2 };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Book Service',
    '0.0.0.0',
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Book Service',
    '0.0.0.0',
  ),
  createData(
    2, 
    '16 Mar, 2019', 
    'Book Service',
    '0.0.0.0',
    ),
  createData(
    3,
    '16 Mar, 2019',
    'Book Service',
    '0.0.0.0',
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Book Service',
    '0.0.0.0',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Logs</Title>
      {/* TESTING iframe with Grafana */}
      {/* <iframe src="http://localhost:3000/d-solo/2Sps1Nc7z/test-dashboard?orgId=1&from=1636563389873&to=1636584989873&panelId=2" width="450" height="200" frameborder="0"></iframe> */}

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Service Name</TableCell>
            <TableCell>Request Origin</TableCell>
            <TableCell>More Stuff</TableCell>
            <TableCell align="right">More Stuff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.origin}</TableCell>
              <TableCell>{"STUFF"}</TableCell>
              <TableCell align="right">{"STUFF"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more...
      </Link>
    </React.Fragment>
  );
}
