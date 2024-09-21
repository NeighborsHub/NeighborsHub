import SigninComponent from "components/signin";
import Grid from "@mui/material/Grid";

const Signin = () => {
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
      <SigninComponent />
    </Grid>
  );
};

export default Signin;
