import React from 'react'
import { useEffect, useState } from 'react'
import apiClient from '../../lib/apiClient'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components'
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
  useEffect(async () => {
    let errors = await apiClient.getQueryErrorData(loggedInUser, 24)
    let errorDataPulled = errors.data.map((err) => {
      return {
        id: err._id,
        timeOfError: err.createdAt,
        ip: err.ip,
        errStrings: err.errs.map((e) => e.message).join(', '),
        sourceQuery: err.sourceQuery
      }
    })
    setErrorData(errorDataPulled)
    console.log(errorDataPulled, 'ERRORS BOY ===========')
  }, [])

  const columns = React.useMemo(
    () => [
      { accessor: 'timeOfError', Header: 'Datetime of Error', width: 200},
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
  return (
    <Styles>
      <Table columns={columns} data={errorData} />
    </Styles>
  )
}

export default ErrorTable
