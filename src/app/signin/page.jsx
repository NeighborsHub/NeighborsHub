import SigninComponent from "components/signin";
import Grid from "@mui/material/Grid";

const Signin = () => {
  return (
    <Grid
      sx={{ height: "calc( 100vh - 120px )", flexDirection: "column" }}
      container
    >
      <SigninComponent />
    </Grid>
  );
};

export default Signin;
