import SignupComponent from "components/signup";
import Grid from "@mui/material/Grid";

const Signup = () => {
  return (
    <Grid
      sx={{ height: "calc( 100vh - 200px )" }}
      container
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SignupComponent />
    </Grid>
  );
};
export default Signup;
