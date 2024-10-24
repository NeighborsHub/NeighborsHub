import Container from "@mui/material/Container";
import Header from "components/header/Header";
import Grid from "@mui/material/Grid";

const HeaderFooter = ({ children }) => {
  return (
    <Grid sx={{ backgroundColor: "#F1F5F6", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Header />
        {children}
      </Container>
    </Grid>
  );
};

export default HeaderFooter;
