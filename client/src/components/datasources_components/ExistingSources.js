import React from 'react';
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';

// Generate Source Data
function createData(id, name, type, status, active, created, actions) {
  return { id, name, type, status, active, created, actions }
}

// Fake Data
const rows = [
  createData(
    0,
    'Author Service',
    'OpenAPI',
    '✓',
    <input type="checkbox" />,
    '16 Mar, 2019',
    '✎ 🗑'
  ),
  createData(
    1,
    'Book Service',
    'GraphQL',
    '✓',
    <input type="checkbox" />,
    '16 Mar, 2019',
    '✎ 🗑'
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const ExistingSources = () => {
  return (
    <>
      <Title>Your connected data sources</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Service Name</TableCell>
            <TableCell>Connector Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Created date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.active}</TableCell>
              <TableCell>{row.created}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more...
      </Link> */}
    </>
  );
};

export default ExistingSources;