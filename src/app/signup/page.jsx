import SignupComponent from "components/signup";
import Grid from "@mui/material/Grid";

const Signup = () => {
  return (
    <Grid
      sx={{ height: "calc( 100vh - 120px )", flexDirection: "column" }}
      container
    >
      <SignupComponent />
    </Grid>
  );
};
export default Signup;
