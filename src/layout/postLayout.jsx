"use client";
import Container from "@mui/material/Container";
import PostHeader from "components/header/postHeader";
import Grid from "@mui/material/Grid";

const AppLayout = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        backgroundColor: "#F1F5F6",
        height:
          typeof window !== "undefined" ? window.innerHeight + "px" : "100vh",
      }}
      item
      xs
    >
      <PostHeader />
      <Grid
        container
        justifyContent={"flex-start"}
        direction={"column"}
        item
        xs
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default AppLayout;
