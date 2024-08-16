"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { myInfoSelector } from "store/slices/userSlices";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LeftResponsiveDrawer from "components/drawer/leftResponsiveDrawer";
import { useSelector } from "react-redux";

const ResponsiveHeader = () => {
  const myInfo = useSelector(myInfoSelector);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  return (
    <Grid
      container
      justifyContent={"space-between"}
      sx={{
        backgroundColor: "white!important",
        px: 2,
        height: "65px",
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
        zIndex: 100
      }}
      alignItems={"center"}
    >
      <Grid
        sx={{
          p: "2px",
          border: "1px solid #F2F2F2",
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          visibility: !myInfo.avatar && "hidden",
        }}
      >
        <Avatar
          src={myInfo.avatar?.avatar_thumbnail}
          onClick={handleOpenDrawer}
        />
      </Grid>
      <Grid sx={{ display: "flex" }}>
        <Typography
          sx={{ fontFamily: "Saira", color: "#000000", fontWeight: "700" }}
        >
          NEIGHBORS
        </Typography>
        <Typography
          sx={{
            fontFamily: "Saira",
            color: "#FFD816",
            fontWeight: "bold",
            ml: "3px",
          }}
        >
          HUB
        </Typography>
      </Grid>
      <IconButton
        sx={{ borderRadius: "15px", boxShadow: "0 0 12px #0000001A" }}
      >
        <SearchIcon sx={{ color: "#999999" }} />
      </IconButton>
      <LeftResponsiveDrawer open={drawerOpen} setOpen={setDrawerOpen} />
    </Grid>
  );
};

export default ResponsiveHeader;
