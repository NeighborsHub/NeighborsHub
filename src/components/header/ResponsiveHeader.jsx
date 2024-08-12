"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { logoutAction } from "store/actions/authActions";

const ResponsiveHeader = () => {
  const myInfo = useSelector(myInfoSelector);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePushToProfile = () => {
    router.push("/app/profile");
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutAction())
      .then(() => {
        router.push("/");
      })
      .finally(() => {
        // dispatch(clearStoreAction());
        setAnchorEl(null);
      });
  };

  const handlePushtoMyPosts = () => {
    router.push("/app/my-posts");
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      justifyContent={"space-between"}
      sx={{ backgroundColor: "white!important", px: 2, height: "65px" }}
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
          onClick={handleOpenMenu}
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handlePushToProfile}>Profile</MenuItem>
        <MenuItem onClick={handlePushtoMyPosts}>My Posts</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default ResponsiveHeader;
