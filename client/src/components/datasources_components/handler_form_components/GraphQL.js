import React from 'react'
import { useState } from 'react'

const GraphQL = ({ sourceList, setSourceList }) => {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const handleCreateClick = (e) => {
    e.preventDefault();
    setSourceList([...sourceList, {name, url, handler: 'graphql'}]);
    setName('');
    setUrl('');
  }

  return (
    <div>
      <div>
        <label htmlFor="graphql-name">NAME:</label>
        <input
          type="text"
          id="graphql-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="graphql-url">ENDPOINT URL:</label>
        <input
          type="text"
          id="graphql-url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button onClick={handleCreateClick}>Create</button>
    </div>
  )
}

export default GraphQL;