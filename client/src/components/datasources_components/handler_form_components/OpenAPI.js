import React from 'react'
import { useState } from 'react'

const OpenAPI = ({ sourceList, setSourceList }) => {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const handleCreateClick = (e) => {
    e.preventDefault()
    setSourceList([...sourceList,{name, url, handler: 'openapi'}])
    setName('');
    setUrl('')
  }
  return (
    <div>
      <div>
        <label htmlFor="openapi-name">NAME:</label>
        <input
          type="text"
          id="openapi-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="openapi-url">URL:</label>
        <input
          type="text"
          id="openapi-url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button onClick={handleCreateClick}>Create</button>
    </div>
  )
}

export default OpenAPI
