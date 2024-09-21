import SignupComponent from "components/signup";
import Grid from "@mui/material/Grid";

const Signup = () => {
  return (
    <Grid
      sx={{
        height:
          typeof window !== "undefined"
            ? window.innerHeight - 1 + "px"
            : "100vh",
        flexDirection: "column",
      }}
      container
    >
      <SignupComponent />
    </Grid>
  );
};
export default Signup;
