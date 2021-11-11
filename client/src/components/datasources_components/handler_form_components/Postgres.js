import React from 'react'
import { useState } from 'react'

const Postgres = ({ sourceList, setSourceList }) => {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const handleCreateClick = (e) => {
    e.preventDefault()
    setSourceList([...sourceList,{name, url, handler: 'postgraphile'}])
    setName('');
    setUrl('')
  }
  return (
    <div>
      <div>
        <label htmlFor="postgres-name">NAME:</label>
        <input
          type="text"
          id="postgres-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="postgres-url">CONNECTION STRING:</label>
        <input
          type="text"
          id="postgres-url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button onClick={handleCreateClick}>Create</button>
    </div>
  )
}

export default Postgres
