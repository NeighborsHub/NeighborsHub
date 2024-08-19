"use client";
import Container from "@mui/material/Container";
import Header from "components/header";
import Grid from "@mui/material/Grid";

const AppLayout = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        backgroundColor: "white",
        height:
          typeof window !== "undefined"
            ? window.innerHeight - 1 + "px"
            : "100vh",
      }}
      item
      xs
    >
      <Header />
      <Grid container justifyContent={"center"} direction={"column"} item xs>
        {children}
      </Grid>
    </Grid>
  );
};

export default AppLayout;
