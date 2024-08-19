"use client";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonIcon from "@mui/icons-material/Person";

import { useDispatch } from "react-redux";
import LocationOn from "@mui/icons-material/LocationOn";
import { logoutAction } from "store/actions/authActions";
import { authSelector } from "store/slices/authSlices";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { myInfoSelector } from "store/slices/userSlices";
import Avatar from "@mui/material/Avatar";
import Logo from "components/logo/logo";
import HeaderRouterButtons from "components/navigationBar/headerRoutesButtons";
import AvatarNameAndUserNameWithMenu from "components/avatar/avatarNameAndUserNameWithMenu";
import Container from "@mui/material/Container";

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const isAuth = useSelector(authSelector);
  const myInfo = useSelector(myInfoSelector);

  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
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
        setOpen(false);
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
      alignItems={"center"}
      sx={{ py: 1, backgroundColor: "rgba(247, 247, 247, 1)" }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid sx={{ display: "flex" }}>
            {isAuth && <AvatarNameAndUserNameWithMenu />}

            <HeaderRouterButtons />
          </Grid>
          <Logo />
        </Grid>
      </Container>
    </Grid>
  );
};

export default Header;
