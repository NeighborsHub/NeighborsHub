import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const SignInSignUp = () => {
  const router = useRouter();

  const handlePushToRoute = (pathname) => {
    router.push(pathname);
  };
  return (
    <Grid sx={{ width: "303px" }} container justifyContent={"flex-end"}>
      <Button
        sx={{ color: "black!important", fontFamily: "Saira" }}
        onClick={() => handlePushToRoute("/signin")}
      >
        Sign In
      </Button>
      <Button
        sx={{
          color: "black!important",
          border: "1px solid black",
          fontFamily: "Saira",
        }}
        onClick={() => handlePushToRoute("/signup")}
      >
        Sign Up
      </Button>
    </Grid>
  );
};

export default SignInSignUp;
