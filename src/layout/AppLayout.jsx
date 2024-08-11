import Container from "@mui/material/Container";
import Header from "components/header";
import Grid from "@mui/material/Grid";

const AppLayout = ({ children }) => {
  return (
    <Grid sx={{ backgroundColor: "#F1F5F6", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* <Header /> */}
      </Container>
      <Grid container justifyContent={"center"}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AppLayout;
