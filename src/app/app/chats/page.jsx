"use client";
import Chat from "components/chat/chat";
import Grid from "@mui/material/Grid";
import ResponsiveHeader from "components/header/responsiveHeader";

const Chats = () => {
  return (
    <Grid container direction={"column"} item xs>
      <ResponsiveHeader />
      <Grid container direction="column" item xs>
        <Chat />
      </Grid>
    </Grid>
  );
};

export default Chats;
