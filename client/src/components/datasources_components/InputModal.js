import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import GraphQL from "./handler_form_components/GraphQL";
import OpenAPI from "./handler_form_components/OpenAPI";
import Postgres from "./handler_form_components/Postgres";
import Mongoose from "./handler_form_components/Mongoose";
import JSONSchema from "./handler_form_components/JSONSchema";
import ToolTip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "100%",

  bgcolor: "background.paper",
  border: "5px solid #0A0188",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  content: {
    overflow: "scroll",
  },
};

const selectMeshHandler = (handlerName, sourceList, setSourceList, setOpen) => {
  switch (handlerName) {
    case "GraphQL":
      return (
        <GraphQL
          sourceList={sourceList}
          setSourceList={setSourceList}
          setOpen={setOpen}
        />
      );
    case "OpenAPI":
      return (
        <OpenAPI
          sourceList={sourceList}
          setSourceList={setSourceList}
          setOpen={setOpen}
        />
      );
    case "PostgreSQL":
      return (
        <Postgres
          sourceList={sourceList}
          setSourceList={setSourceList}
          setOpen={setOpen}
        />
      );
    case "Mongoose":
      return (
        <Mongoose
          sourceList={sourceList}
          setSourceList={setSourceList}
          setOpen={setOpen}
        />
      );
    case "JSON Schema":
      return (
        <JSONSchema
          sourceList={sourceList}
          setSourceList={setSourceList}
          setOpen={setOpen}
        />
      );
    default:
      return "No Handler Selected";
  }
};

export default function BasicModal({ handlerName, sourceList, setSourceList }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ToolTip
        disableFocusListener
        disableTouchListener
        title='Once clicked you will be prompted to input some information about your data source.'
      >
        <Button
          onClick={handleOpen}
          variant='contained'
          // sx={{ backgroundColor: "#FFBD3A", color: "#0A0188" }}
        >
          Add
        </Button>
      </ToolTip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            color='primary'
            component='h2'
            sx={{ mb: 2 }}
          >
            Source Information
          </Typography>
          {selectMeshHandler(handlerName, sourceList, setSourceList, setOpen)}
        </Box>
      </Modal>
    </div>
  );
}
