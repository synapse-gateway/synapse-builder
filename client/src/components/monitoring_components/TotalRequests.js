import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function TotalRequests({ requests, since }) {
  return (
    <React.Fragment>
      <Title>Total Requests</Title>
      <Typography component="p" variant="h4">
        {requests.toLocaleString()}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {since}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Details (**TODO**)
        </Link>
      </div>
    </React.Fragment>
  );
}
