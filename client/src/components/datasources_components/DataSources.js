import React, { useState } from 'react';
import apiClient from '../../lib/apiClient';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ExistingSources from './ExistingSources';
import HandlerList from './HandlerList';
import Title from '../Title';

// Handler Forms
import OpenAPI from './handler_form_components/OpenAPI';
import GraphQL from './handler_form_components/GraphQL';
import Postgres from './handler_form_components/Postgres';


const DataSources = () => {
  const [ sourceList, setSourceList ] = useState([]);
  const [ currentHandler, setCurrentHandler ] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    apiClient.createConfig(sourceList);
  };

  const handlerForms = {
    "openapi": <OpenAPI sourceList={sourceList} setSourceList={setSourceList} />,
    "graphql": <GraphQL sourceList={sourceList} setSourceList={setSourceList} />,
    "postgraphile": <Postgres sourceList={sourceList} setSourceList={setSourceList}/>, 
  }

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <ExistingSources />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <HandlerList setCurrentHandler={setCurrentHandler} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          {/* Temporary Source Form and Source List */}
          <Title>Data Source Form</Title>
          {handlerForms[currentHandler]}

          <div>
            <Title>Data Source List</Title>
            {sourceList.length > 0 ? sourceList.map((s) => {
              return <div key={s.name}>{s.name}</div>
            }) : null}
          </div>
          <button onClick={handleOnSubmit}>SUBMIT</button>
        </Paper>
      </Grid>

    </>
  )
};

export default DataSources;