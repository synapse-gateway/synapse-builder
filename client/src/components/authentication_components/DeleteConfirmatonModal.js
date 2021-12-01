import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "5px solid #1976d2",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function DeleteConfirmationModal({
  popup,
  setPopup,
  deleteUser,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setPopup({ show: false, user: null });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {" "}
          <Typography
            id="modal-modal-title"
            variant="h6"
            color="primary"
            component="h2"
            sx={{ mb: 2 }}
          >
            Are you sure you want to delete {popup.user}?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button color="success" onClick={deleteUser} variant="contained">
              Yes
            </Button>
            <Button color="error" onClick={handleClose} variant="contained">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
