import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Divider from "@mui/material/Divider";
import { useRouter, usePathname } from "next/navigation";

const path = {
  "/": 0,
  "/app/": 1,
  "/about-us/": 2,
};

const HeaderRouterButtons = () => {
  const router = useRouter();
  const [navigationValue, setNavigationValue] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setNavigationValue(path[pathname]);
  }, []);

  return (
    <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
      <BottomNavigation
        showLabels
        value={navigationValue + 1}
        onChange={(event, newValue) => {
          setNavigationValue(newValue);
        }}
        sx={{ backgroundColor: "transparent" }}
      >
        <Divider orientation="vertical" sx={{ m: 0 }} />
        <BottomNavigationAction
          sx={{
            width: "100px",
            color: "black!important",
            "&.MuiButtonBase-root": {
              alignItems: "flex-start",
            },
          }}
          label="Home"
          onClick={() => router.push("/")}
        />
        <Divider orientation="vertical" sx={{ m: 0 }} />
        <BottomNavigationAction
          label="App"
          onClick={() => router.push("/app")}
          sx={{
            width: "100px",
            color: "black!important",
            "&.MuiButtonBase-root": {
              alignItems: "flex-start",
            },
          }}
        />
        <Divider orientation="vertical" sx={{ m: 0 }} />
        <BottomNavigationAction
          label="About Us"
          onClick={() => router.push("/about-us")}
          sx={{
            width: "100px",
            color: "black!important",
            "&.MuiButtonBase-root": {
              alignItems: "flex-start",
            },
          }}
        />
      </BottomNavigation>
    </Grid>
  );
};

export default HeaderRouterButtons;
