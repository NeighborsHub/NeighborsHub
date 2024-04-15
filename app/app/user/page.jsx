"use client";
import { useEffect, Suspense } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { snackActions } from "utils/SnackbarUtils";
import { useState } from "react";
import PostsList from "components/posts/postsList";
import { postsSelector, userPostsSelector } from "store/slices/postsSlices";
import { getUserPosts, addUserPostsAction } from "store/actions/postsActions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Map from "components/map/map";
import Modal from "components/modal/modal";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { getUserDetails } from "store/actions/userActions";
import { userInfoSelector } from "store/slices/userSlices";
import { authSelector } from "store/slices/authSlices";
import Typography from "@mui/material/Typography";
import { myAddressesSelector } from "store/slices/userSlices";

function Page() {
  const posts = useSelector(userPostsSelector);

  const userInfo = useSelector(userInfoSelector);
  const isAuth = useSelector(authSelector);

  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const [contactOpen, setContactOpen] = useState(null);
  const userId = searchParams.get("id");
  const dispatch = useDispatch();
  const myAddressCordinate = useSelector(myAddressesSelector);
  const mainAddress = myAddressCordinate.find((item) => item.is_main_address);
  const initialCordinate = mainAddress?.location.coordinates;

  useEffect(() => {
    dispatch(getUserDetails({ id: userId }));
  }, []);
  useEffect(() => {
    if (initialCordinate)
      dispatch(
        getUserPosts({
          id: userId,
          params: {
            user_longitude: initialCordinate[0],
            user_latitude: initialCordinate[1],
          },
        })
      );
  }, [initialCordinate]);

  const handleCopyToClipboard = (value) => {
    if (isAuth) {
      navigator.clipboard.writeText(value);
      snackActions.info("Copied To Clipboard");
    } else {
      snackActions.warning("You Need To Login To Use This Information");
    }
  };

  const handleCloseContactMenu = () => {
    setContactOpen(false);
  };

  const handleChange = (e, value) => {
    setTabValue(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleOpenContactMenu = (e) => {
  //   setContactOpen(e.currentTarget);
  // };

  const handleGetMorePosts = (page, limit) => {
    dispatch(
      addUserPostsAction({
        id: userId,
        params: {
          user_longitude: initialCordinate[0],
          user_latitude: initialCordinate[1],
          offset: page * limit,
          limit,
        },
      })
    );
  };

  return (
    <Suspense>
      <Container maxWidth="md">
        <Grid container direction={"column"}>
          <Grid>
            <img
              style={{ width: "100%", height: "200px", objectFit: "overlay" }}
            />
          </Grid>
          <Grid
            container
            sx={{ pl: 2 }}
            justifyContent={"space-between"}
            alignContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Avatar
              sx={{ height: "130px", width: "130px", mt: "-65px" }}
              src={userInfo.avatar?.avatar_thumbnail}
            />
            <Grid item container xs={5} justifyContent={"flex-end"}>
              <Button
                sx={{
                  borderRadius: "10px",
                  height: "47px",
                  fontSize: "13px",
                  backgroundColor: "#e85a02",
                  mr: 1,
                  "&:hover": {
                    backgroundColor: "#f27527",
                  },
                }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Location
              </Button>
              {/* <Button
                sx={{
                  borderRadius: "10px",
                  height: "47px",
                  fontSize: "13px",
                  backgroundColor: "#0298e8",
                }}
                variant="contained"
                type="submit"
                onClick={handleOpenContactMenu}
              >
                Contact
              </Button> */}
            </Grid>
            <Menu
              id="basic-menu"
              anchorEl={contactOpen}
              open={contactOpen}
              onClose={handleCloseContactMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{ minWidth: "300px" }}
            >
              {userInfo.email && (
                <MenuItem
                  sx={{ minWidth: "300px" }}
                  onClick={() => handleCopyToClipboard(userInfo.email)}
                >
                  <AlternateEmailIcon sx={{ mr: 1 }} />
                  {userInfo.email}
                </MenuItem>
              )}
              {userInfo.mobile && (
                <MenuItem
                  sx={{ minWidth: "300px" }}
                  onClick={() => handleCopyToClipboard(userInfo.mobile)}
                >
                  <PhoneIphoneIcon sx={{ mr: 1 }} />
                  {userInfo.mobile}
                </MenuItem>
              )}
            </Menu>
          </Grid>
          {userInfo.first_name && userInfo.last_name && (
            <Grid container sx={{ pl: 2, mt: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {userInfo.first_name + " " + userInfo.last_name}{" "}
              </Typography>
            </Grid>
          )}
          {/* <Grid container justifyContent={"center"}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Tab label="Posts" />
            <Tab label="Friends" />
          </Tabs>
        </Grid> */}
          <Grid sx={{ mt: 4 }}>
            <PostsList posts={posts} handleGetMorePosts={handleGetMorePosts} />
          </Grid>
        </Grid>
        <Modal open={open} onClose={handleClose}>
          <Grid
            container
            justifyContent={"center"}
            sx={{ mt: 3, overflowY: "auto", height: "calc( 100vh - 330px )" }}
          >
            <Map
              center={[51.36, 35.74]}
              zoom={15}
              locations={[[51.36, 35.74]]}
            />
          </Grid>
        </Modal>
      </Container>
    </Suspense>
  );
}

export default Page;
