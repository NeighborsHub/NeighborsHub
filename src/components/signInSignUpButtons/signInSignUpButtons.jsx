import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/navigation";

import Grid from "@mui/material/Grid";

const SignInSignUpButtons = ({ initialValue = 0 }) => {
  const [value, setValue] = React.useState(initialValue);
  const router = useRouter();
  const handleChange = (_, value) => {
    router.push(value === 0 ? "/signin" : "/signup");
  };
  return (
    <Grid container justifyContent={"center"}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          width: "210px",
          backgroundColor: "#F0F0F2",
          borderRadius: "10px!important",

          p: 0.5,
          height: "40px",
        }}
      >
        <BottomNavigationAction
          label="Sign In"
          sx={{
            fontWeight: "bold",
            color: "black!important",
            borderRadius: "10px!important",
            fontSize: "14px!important",
            "&.Mui-selected": {
              backgroundColor: "white!important",
            },
          }}
        />
        <BottomNavigationAction
          label="Sign Up"
          sx={{
            fontWeight: "bold",
            color: "black!important",
            borderRadius: "10px!important",
            fontSize: "14px!important",
            "&.Mui-selected": {
              backgroundColor: "white!important",
            },
          }}
        />
      </BottomNavigation>
    </Grid>
  );
};

export default SignInSignUpButtons;
