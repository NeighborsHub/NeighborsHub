"use client";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { logoutAction } from "store/actions/authActions";
import { authSelector } from "store/slices/authSlices";
import { useSelector } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import Logo from "components/logo/logo";
import HeaderRouterButtons from "components/navigationBar/headerRoutesButtons";
import AvatarNameAndUserNameWithMenu from "components/avatar/avatarNameAndUserNameWithMenu";
import Container from "@mui/material/Container";
import SignInSignUp from "components/navigationBar/signInSignOut";

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
          {!isAuth && <SignInSignUp />}
        </Grid>
      </Container>
    </Grid>
  );
};

export default Header;
