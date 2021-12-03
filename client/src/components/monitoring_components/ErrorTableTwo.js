import React from 'react'
import { useEffect, useState } from 'react'
import apiClient from '../../lib/apiClient'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import Box from '@mui/material/Box';
import { Navigate } from "react-router-dom";
import { Grid, Paper, Typography, Tooltip } from '@mui/material'
import Title from '../Title'
import {
  useTable,
  useResizeColumns,
  useGridLayout
} from 'react-table'


const Styles = styled.div`
  padding: 1rem;
  ${'' /* These styles are suggested for the table fill all available space in its containing element */}
  display: block;
  ${'' /* These styles are required for a horizontaly scrollable table overflow */}
  overflow: auto;
  .table {
    border: 1px solid black;
    background-color: black;
    grid-gap: 1px;
    .cell,
    .header {
      padding: 0.5rem;
      background-color: white;
      .resizer {
        right: 0;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;
  
        &.isResizing {
          background: red;
        }
      }
    }
  }
`

function Table({ columns, data }) {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data
    },
    useResizeColumns,
    useGridLayout,
  )

  return (
    <div {...getTableProps()} className="table">
      {headerGroups.map(headerGroup => (
        headerGroup.headers.map(column => (
          <div key={column.id} {...column.getHeaderProps()} className="cell header">
            {column.render('Header')}
            {column.canResize && (
              <div
                {...column.getResizerProps()}
                className={`resizer ${
                  column.isResizing ? 'isResizing' : ''
                  }`}
              />
            )}
          </div>
        ))
      ))}
      {rows.map(row =>
        prepareRow(row) || (
          row.cells.map(cell => (
            <div {...cell.getCellProps()} className="cell">
              {cell.render('Cell')}
            </div>
          ))
        )
      )}
    </div>
  )
}

const ErrorTable = ({loggedInUser}) => {
  const [errorData, setErrorData] = useState([])
  const [hours, setHours] = useState(24)
  useEffect(async () => {
    let errors = await apiClient.getQueryErrorData(loggedInUser, 24)
    let errorDataPulled = errors.data.map((err) => {
      return {
        id: err._id,
        timeOfError: `${new Date(err.createdAt).toDateString()} ${new Date(err.createdAt).toLocaleTimeString()}`,
        ip: err.ip,
        errStrings: err.errs.map((e) => e.message).join(', '),
        sourceQuery: err.sourceQuery
      }
    })
    setErrorData(errorDataPulled)
  }, [])

  const filterByHours = async (e) => {
    e.preventDefault()
    let filteredErrors = await apiClient.getQueryErrorData(loggedInUser, hours)
    let filteredErrorsPulled = filteredErrors.data.map((err) => {
      return {
        id: err._id,
        timeOfError: `${new Date(err.createdAt).toDateString()} ${new Date(err.createdAt).toLocaleTimeString()}`,
        ip: err.ip,
        errStrings: err.errs.map((e) => e.message).join(', '),
        sourceQuery: err.sourceQuery
      }
    })
    setErrorData(filteredErrorsPulled)
  }

  const columns = React.useMemo(
    () => [
      { accessor: 'timeOfError', Header: 'Datetime of Error', width: 250},
      { accessor: 'ip', Header: 'Origin', width: 150 },
      { accessor: 'errStrings', Header: 'List Of Errors' },
      { accessor: 'sourceQuery', Header: 'Original Query' }
    ],
    []
  )

  
  // const columns = [
  //   { field: 'timeOfError', headerName: 'Datetime of Error', width: 200},
  //   { field: 'ip', headerName: 'Origin', width: 150 },
  //   { field: 'errStrings', headerName: 'List Of Errors', width: 600 },
  //   { field: 'sourceQuery', headerName: 'Original Query', width: 400 }
  // ]
  if (loggedInUser) {
    return (
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 3,
            py: 3,
          }}
        >
          <Title>Error Data</Title>
          <Typography component="h4" variant="h9" color="black" gutterBottom>
            You can adjust the column size by moving the blue sliders on the table.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', margin: '20px' }}>
            <Styles>
              <Table columns={columns} data={errorData} />
            </Styles>
            <Title>Filter your error data by hour range:</Title>
            <Typography component="h4" variant="h9" color="black" gutterBottom>
              Type in the amount of hours back you would like to see error data from and press submit. The default is 24 hours.
            </Typography>
            <Box
              component="form"
              sx={{
                p: 1,
                py: 1,
                margin: 'auto'
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl>
                <FilledInput fullWidth={false} name={'hours'} margin='dense' value={hours} onChange={(e) => setHours(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} endAdornment={<InputAdornment position='end'>hours ago</InputAdornment>}/>
                {/* <FormHelperText id="hours-since-helper-text"> </FormHelperText> */}
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                margin: 'auto'
              }}
            > 
              <Tooltip disableFocusListener disableTouchListener title="Filter error data to include data in specified time range">
                <Button variant='contained' onClick={filterByHours}>Submit</Button>
              </Tooltip>
            </Box>
          </Box>
        </Paper>
      </Grid>
    )
  } else {
    return <Navigate to="/signin" />
  }
  
}

export default ErrorTable
