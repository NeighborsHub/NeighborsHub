"use client";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import LocationOn from "@mui/icons-material/LocationOn";
import { logoutAction } from "store/actions/authActions";
import { authSelector } from "store/slices/authSlices";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const path = {
  "/": 0,
  "/app": 1,
  "/about-us": 2,
};

const Header = () => {
  const [navigationValue, setNavigationValue] = useState(0);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const isAuth = useSelector(authSelector);

  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    setNavigationValue(path[pathname]);
  }, []);

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
      sx={{
        flex: 1,
        // backgroundImage: `url(${BackgroundImage.src})`,
        backgroundRepeat: "no-repeat",
        pt: 2,
        pb: 2,
      }}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Hidden mdUp>
        <Grid xs={12} container justifyContent={"space-between"}>
          <Grid>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon sx={{ color: "gray", fontSize: "35px" }} />
            </IconButton>
          </Grid>
          <Grid>
            <Typography
              sx={{
                // fontFamily: "Ephesis-Regular",
                fontWeight: "bolder",
                display: "flex",
                alignItems: "flex-end",
                fontSize: "24px",
                textDecoration: "underline",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <LocationOn
                sx={{
                  fontSize: "35px",
                }}
              />
              NeighborsHub
            </Typography>
          </Grid>
          <Grid>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleOpenMenu}
              edge="start"
              sx={{
                visibility: isAuth ? "" : "hidden",
              }}
            >
              <PersonIcon
                sx={{
                  color: "gray",
                  border: "1px solid gray",
                  p: 0.5,
                  borderRadius: "100%",
                  fontSize: "25px",
                }}
              />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuOpen}
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
        </Grid>
      </Hidden>
      <Hidden mdDown>
        <Grid>
          <Typography
            sx={{
              // fontFamily: "Ephesis-Regular",
              fontWeight: "bolder",
              display: "flex",
              alignItems: "flex-end",
              fontSize: "24px",
              textDecoration: "underline",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <LocationOn
              sx={{
                fontSize: "35px",
              }}
            />
            NeighborsHub
          </Typography>
        </Grid>
        <Grid>
          <BottomNavigation
            showLabels
            value={navigationValue}
            onChange={(event, newValue) => {
              setNavigationValue(newValue);
            }}
            sx={{ backgroundColor: "transparent" }}
          >
            <BottomNavigationAction
              sx={{ width: "100px", color: "black" }}
              label="Home"
              onClick={() => router.push("/")}
            />
            <BottomNavigationAction
              label="App"
              onClick={() => router.push("/app")}
            />
            <BottomNavigationAction
              label="About Us"
              onClick={() => router.push("/about-us")}
            />
          </BottomNavigation>
        </Grid>
        <Grid
          sx={{ width: "200px" }}
          container
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          {isAuth ? (
            <>
              <Badge
                badgeContent={4}
                color="primary"
                sx={{
                  mr: "30px",
                  "& .MuiBadge-badge": {
                    backgroundColor: "red",
                    top: "6px",
                    right: "6px",
                  },
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleOpenMenu}
                  edge="start"
                  sx={{ padding: "4px!important", height: "fit-content" }}
                >
                  <NotificationsNoneIcon
                    sx={{
                      color: "gray",
                      p: 0.5,
                      fontSize: "25px",
                      border: "1px solid gray",
                      borderRadius: "100%",
                    }}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handlePushToProfile}>Profile</MenuItem>
                  <MenuItem onClick={handlePushtoMyPosts}>My Posts</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Badge>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpenMenu}
                edge="start"
                sx={{ padding: "0!important" }}
              >
                <PersonIcon
                  sx={{
                    color: "gray",
                    border: "1px solid gray",
                    borderRadius: "100%",
                    p: 0.5,
                    fontSize: "25px",
                  }}
                />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handlePushToProfile}>Profile</MenuItem>
                <MenuItem onClick={handlePushtoMyPosts}>My Posts</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  sx={{
                    mx: 2,
                    fontWeight: "500",
                    color: "#e85a02",
                    borderRadius: "15px",
                    // "&:hover": {
                    //   backgroundImage:
                    //     "linear-gradient(90deg, #f27527, #ff9959)",
                    //   color: "white",
                    // },
                  }}
                  variant="text"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="contained"
                  sx={{
                    backgroundImage: "linear-gradient(90deg, #0D869C, #3BB4DD)",
                    borderRadius: "15px",
                    boxShadow: "none",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Grid>
      </Hidden>

      <Drawer
        anchor={"left"}
        open={open}
        onClose={() => {
          setOpen((prev) => !prev);
        }}
      >
        <Grid sx={{ width: "300px" }}>
          <Grid container justifyContent={"flex-end"}>
            <IconButton
              sx={{ p: 2 }}
              onClick={() => {
                setOpen(false);
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </Grid>
          <Divider />

          <List onClick={() => setOpen(false)}>
            <Link href="/">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/app">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary={"App"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/about-us">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LightbulbIcon />
                  </ListItemIcon>
                  <ListItemText primary={"About Us"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />

            {isAuth ? (
              <>
                <Link href="/app/profile">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Profile"} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                <ListItem disablePadding onClick={handleLogout}>
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Log Out"} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ) : (
              <>
                <Link href="/signup">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Sign Up"} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link href="/signin">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Sign In"} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            )}
          </List>
        </Grid>
      </Drawer>
    </Grid>
  );
};

export default Header;
