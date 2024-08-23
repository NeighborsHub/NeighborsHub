import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Divider from "@mui/material/Divider";
import { useRouter, usePathname } from "next/navigation";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
const path = {
  "/": 1,
  "/app/": 3,
  "/about-us/": 5,
};

const HeaderRouterButtons = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [navigationValue, setNavigationValue] = useState(path[pathname]);

  return (
    <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
      <BottomNavigation
        showLabels
        value={navigationValue}
        onChange={(a, newValue) => {
          setNavigationValue(newValue);
        }}
        sx={{ backgroundColor: "transparent!important" }}
      >
        <Divider orientation="vertical" sx={{ m: 0 }} />
        <BottomNavigationAction
          sx={{
            width: "100px",
            color: "black!important",
            "&.MuiButtonBase-root": {
              alignItems: "flex-start",
              pl: 1,
              transition: "100ms",
            },
            "&:hover": {
              fontWeight: "bold",
            },
            "& .Mui-selected": {
              fontSize: "12px",
              fontWeight: "bold",
            },
          }}
          label="Home"
          onClick={() => router.push("/")}
        />
        <Divider orientation="vertical" sx={{ m: 0 }} />
        <BottomNavigationAction
          label="Discover"
          onClick={() => router.push("/app")}
          sx={{
            width: "100px",
            color: "black!important",
            "&.MuiButtonBase-root": {
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 1,
              transition: "100ms",
            },
            "&:hover": {
              color: "#EC1313!important",
              fontWeight: "bold",
            },
            "& .Mui-selected": {
              fontSize: "12px",
              fontWeight: "bold",
            },
          }}
          icon={
            <FmdGoodIcon
              sx={{ fontSize: "20px!important", mr: "2px", color: "#EC1313" }}
            />
          }
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
              pl: 1,
              transition: "100ms",
            },
            "&:hover": {
              fontWeight: "bold",
            },
            "& .Mui-selected": {
              fontSize: "12px",
              fontWeight: "bold",
            },
          }}
        />
      </BottomNavigation>
    </Grid>
  );
};

export default HeaderRouterButtons;
