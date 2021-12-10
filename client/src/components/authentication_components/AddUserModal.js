import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Signup from "./Signup";
import { Tooltip } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "5px solid #0A0188",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function AddUserModal({
  setLoggedInUser,
  loggedInUser,
  isAdmin,
  setUsers,
  users,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip
        disableFocusListener
        disableTouchListener
        title='Create a new user'
      >
        <Button
          sx={{ mt: 3, mb: 3, backgroundColor: "#FFBD3A", color: "#0A0188" }}
          onClick={handleOpen}
          variant='contained'
        >
          Add User
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id='modal-modal-title'
              variant='h6'
              color='primary'
              component='h2'
              sx={{ mb: 2 }}
            >
              Add User
            </Typography>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Box>

          <Signup
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
            isAdmin={isAdmin}
            closeModal={setOpen}
            setUsers={setUsers}
            allUsers={users}
          />
        </Box>
      </Modal>
    </div>
  );
}
