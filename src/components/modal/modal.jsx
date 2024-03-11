import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import { useState } from "react";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const CustomModal = ({ open, onClose, children, width = "md" }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        "& .MuiContainer-root": { outline: "none" },
      }}
    >
      <Container maxWidth={width} fullWidth>
        <Grid container justifyContent={"flex-end"}>
          <IconButton onClick={onClose} sx={{ p: 1 }}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Grid>
        <Card
          container
          direction={"column"}
          sx={{ p: 2, maxHeight: "calc( 100vh - 300px )", overflowY: "auto" }}
        >
          {children}
        </Card>
      </Container>
    </Modal>
  );
};

export default CustomModal;
