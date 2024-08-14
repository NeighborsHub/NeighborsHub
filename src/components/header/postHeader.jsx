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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PostHeader = () => {
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

  const handlePushToPreviousPage = () => {
    router.back();
  };

  return (
    <Grid
      container
      justifyContent={"flex-start"}
      sx={{ backgroundColor: "white!important", px: 2, height: "65px" }}
      alignItems={"center"}
    >
      <IconButton onClick={handlePushToPreviousPage}>
        <ArrowBackIcon sx={{ color: "black!important" }} />
      </IconButton>
      <Typography
        sx={{ fontFamily: "Saira", color: "black!important", fontSize: "16px" }}
      >
        Post
      </Typography>
    </Grid>
  );
};

export default PostHeader;
