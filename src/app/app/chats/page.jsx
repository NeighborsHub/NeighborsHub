"use client";
import Chat from "components/chat/chat";
import Grid from "@mui/material/Grid";

const Chats = () => {
  return (
    <Grid container direction={"column"} item xs>
      <Chat />
    </Grid>
  );
};

export default Chats;
