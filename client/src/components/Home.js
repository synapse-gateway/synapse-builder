import React from 'react'
import { Navigate } from 'react-router-dom'

function Home({loggedInUser}) {
  if (loggedInUser) {
    return (
      <div>
        Please click on datasource to set up your mesh. Once your mesh is up and running you will be able to monitor queries and mutations to it in the monitoring tab.
      </div>
    )
  } else {
    return <Navigate to="/signin" />
  }
  
}

export default Home
