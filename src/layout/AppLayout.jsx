'use client'
import Container from "@mui/material/Container";
import Header from "components/header";
import Grid from "@mui/material/Grid";

const AppLayout = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        backgroundColor: "#F1F5F6",
        height:
          typeof window !== "undefined" ? window.innerHeight + "px" : "80vh",
      }}
      item
      xs
    >
      <Container maxWidth="lg">{/* <Header /> */}</Container>
      <Grid container justifyContent={"center"} direction={"column"} item xs>
        {children}
      </Grid>
    </Grid>
  );
};

export default AppLayout;
