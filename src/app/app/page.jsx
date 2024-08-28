"use client";
import { useState, useMemo, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MapTab from "components/map/mapTab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PostsTab from "components/posts/postsTab";
import Chat from "components/chat/chat";
import { useDispatch } from "react-redux";
import Hidden from "@mui/material/Hidden";
import { myAddressesSelector } from "store/slices/userSlices";
import { useSelector } from "react-redux";
import { getMyAddressesAction, myInfoAction } from "store/actions/userActions";
import {
  getPostsAction,
  getCategoriesAction,
  addPostsAction,
} from "store/actions/postsActions";
import { postsSelector } from "store/slices/postsSlices";

import { getUniqueLocationAction } from "store/actions/postsActions";
import AppHeader from "components/header/appHeader";
import { useSearchParams } from "next/navigation";
import NavigationBar from "components/navigationBar/navigationBar";
import ResponsiveHeader from "components/header/ResponsiveHeader";
import Header from "components/header";
import DesktopListNavigations from "components/navigationBar/desktopListNavigations";
import Button from "@mui/material/Button";
import AddNewPostPlusIcon from "assets/svgs/AddNewPostPlus.svg";
import { useRouter } from "next/navigation";

let controller;

const App = () => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const myAddressCordinate = useSelector(myAddressesSelector);
  const mainAddress = myAddressCordinate.find((item) => item.is_main_address);
  const [dialogFilters, setDialogFilters] = useState({});
  const initialCordinate = mainAddress?.location.coordinates || [0, 0];
  const posts = useSelector(postsSelector);
  const [latBounds, setLatBounds] = useState([0, 0]);
  const [longBounds, setLongBounds] = useState([0, 0]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pushToChat, setPushToChat] = useState(false);
  const [isPan, setIsPan] = useState(false);
  const params = useSearchParams();
  const [selectedNavigationItemIndex, setSelectedNavigationItemIndex] =
    useState(0);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(getMyAddressesAction()).finally(() => setLoading(false));
      dispatch(getCategoriesAction());
      dispatch(myInfoAction());
    }, 500);
  }, []);

  useEffect(() => {
    if (mainAddress) getPostsFun();
  }, [mainAddress, dialogFilters, search]);

  useEffect(() => {
    if (latBounds[0]) {
      getUniqueLocationFun();
    }
  }, [
    latBounds[0],
    latBounds[1],
    longBounds[0],
    longBounds[1],
    dialogFilters,
    search,
    isPan,
  ]);

  function getPostsFun() {
    dispatch(
      getPostsAction({
        user_latitude: initialCordinate[1] || undefined,
        user_longitude: initialCordinate[0] || undefined,
        from_distance: dialogFilters?.filters?.distance
          ? dialogFilters?.distance?.[0]
          : undefined,
        to_distance: dialogFilters?.filters?.distance
          ? dialogFilters?.distance?.[1]
          : undefined,
        category: dialogFilters.filters?.categories
          ? dialogFilters.selectedCategories.toString()
          : undefined,
        search: search || undefined,
        is_seen:
          dialogFilters.is_seen === true
            ? "True"
            : dialogFilters.is_seen === false
            ? "False"
            : undefined,
      })
    );
  }

  const handleGetMorePosts = (page, limit) => {
    dispatch(
      addPostsAction({
        user_latitude: initialCordinate[1] || undefined,
        user_longitude: initialCordinate[0] || undefined,
        offset: page * limit,
        limit,
        from_distance: dialogFilters?.filters?.distance
          ? dialogFilters?.distance?.[0]
          : undefined,
        to_distance: dialogFilters?.filters?.distance
          ? dialogFilters?.distance?.[1]
          : undefined,
        category: dialogFilters.filters?.categories
          ? dialogFilters.selectedCategories.toString()
          : undefined,
        search: search || undefined,
      })
    );
  };

  function getUniqueLocationFun() {
    controller = new AbortController();
    dispatch(
      getUniqueLocationAction(
        {
          in_bbox_array: [...longBounds, ...latBounds],
          in_bbox: `${longBounds[1]},${latBounds[1]},${longBounds[0]},${latBounds[0]}`,
          offset: 0,
          limit: Math.abs(longBounds[0] - longBounds[1]) < 0.02 ? 100000 : 15,
          category: dialogFilters.filters?.categories
            ? dialogFilters.selectedCategories.toString()
            : undefined,
          search: search || undefined,
          isPan,
        },
        controller.signal
      )
    );
  }

  const handleChangeTab = (e, value) => {
    setTabValue(value);
  };

  const handleSubmitFilters = (state) => {
    setDialogFilters(state);
  };

  function handleBounds(long1, long2, lat1, lat2, isPan) {
    setLongBounds([long1, long2]);
    setLatBounds([lat1, lat2]);
    setIsPan(isPan);
    controller?.abort();
  }

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handlePushToChat = (bool) => {
    setPushToChat(bool);
  };

  const handlePushToAddPost = () => {
    router.push("/app/add-new-post");
  };

  return (
    <Grid
      container
      item
      xs
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        px: "0!important",
        position: "relative",
      }}
      direction={"column"}
    >
      <Hidden mdDown>
        <Header />
        <AppHeader
          handleSearch={handleSearch}
          dialogFilters={dialogFilters}
          handleSubmitFilters={handleSubmitFilters}
        />
        <Grid container justifyContent={"center"} item xs>
          {mainAddress ? (
            <>
              <Grid
                sx={{ overflowY: "auto", position: "relative" }}
                container
                item
                lg={8}
                md={6}
              >
                {!loading && (
                  <MapTab
                    filters={dialogFilters}
                    handleBounds={handleBounds}
                    search={search}
                    handleChangeTab={handleChangeTab}
                    latBounds={latBounds}
                    longBounds={longBounds}
                  />
                )}
                <Button
                  sx={{
                    position: "absolute",
                    bottom: "25px",
                    right: "10px",
                    backgroundColor: "#FFD816",
                    zIndex: 1400,
                    color: "black!important",
                    borderRadius: "12px",
                    "&:hover ": { backgroundColor: "#FFD816" },
                    "&:active": { backgroundColor: "#FFD816" },
                  }}
                  onClick={handlePushToAddPost}
                >
                  <img
                    src={AddNewPostPlusIcon.src}
                    style={{ marginRight: "10px" }}
                  />
                  Add New Post
                </Button>
              </Grid>
              <Grid
                sx={{
                  height: "100%",
                  overflowY: "auto",
                  boxShadow: "-4px 6px 12px 0px rgba(0, 0, 0, 0.25)",
                  zIndex: "100",
                }}
                container
                item
                lg={4}
                md={6}
                id="appPostLists"
                direction={"column"}
              >
                <Grid sx={{ m: 1, mr: "13px" }}>
                  <DesktopListNavigations
                    selectedNavigationItemIndex={selectedNavigationItemIndex}
                    setSelectedNavigationItemIndex={
                      setSelectedNavigationItemIndex
                    }
                  />
                </Grid>
                {selectedNavigationItemIndex == 1 ? (
                  <Chat isFullWidth />
                ) : selectedNavigationItemIndex == 0 ? (
                  <PostsTab
                    filters={dialogFilters}
                    posts={posts}
                    handleGetMorePosts={handleGetMorePosts}
                    scrollParentId="appPostLists"
                    handlePushToChat={handlePushToChat}
                    handleChangeTab={handleChangeTab}
                  />
                ) : null}
              </Grid>
            </>
          ) : (
            <Grid
              sx={{ height: "100%", overflowY: "auto" , position: 'relative' }}
              container
              item
              xs={12}
            >
              {!loading && (
                <MapTab
                  filters={dialogFilters}
                  handleBounds={handleBounds}
                  search={search}
                  handleChangeTab={handleChangeTab}
                  latBounds={latBounds}
                  longBounds={longBounds}
                />
              )}
              <Button
                sx={{
                  position: "absolute",
                  bottom: "25px",
                  right: "10px",
                  backgroundColor: "#FFD816",
                  zIndex: 1400,
                  color: "black!important",
                  borderRadius: "12px",
                  "&:hover ": { backgroundColor: "#FFD816" },
                  "&:active": { backgroundColor: "#FFD816" },
                }}
                onClick={handlePushToAddPost}
              >
                <img
                  src={AddNewPostPlusIcon.src}
                  style={{ marginRight: "10px" }}
                />
                Add New Post
              </Button>
            </Grid>
          )}
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container direction={"column"} item xs>
          <ResponsiveHeader />
          <Grid
            container
            justifyContent={"center"}
            sx={{ flex: 1, overflowY: "auto" }}
            id="appPostLists"
            item
            xs
          >
            {tabValue === 0 ? (
              <Grid container sx={{ position: "relative" }} item xs>
                <MapTab
                  filters={dialogFilters}
                  handleBounds={handleBounds}
                  search={search}
                  handleChangeTab={handleChangeTab}
                  latBounds={latBounds}
                  longBounds={longBounds}
                />
                <Button
                  sx={{
                    position: "absolute",
                    bottom: "50px",
                    right: "15px",
                    backgroundColor: "#FFD816",
                    zIndex: 1400,
                    color: "black!important",
                    borderRadius: "12px",
                    minHeight: "40px",
                    maxHeight: "40px",
                    minWidth: "40px",
                    maxWidth: "40px",
                    p: 1.5,
                    "&:hover ": { backgroundColor: "#FFD816" },
                    "&:active": { backgroundColor: "#FFD816" },
                  }}
                  onClick={handlePushToAddPost}
                >
                  <img
                    src={AddNewPostPlusIcon.src}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Button>
              </Grid>
            ) : tabValue === 1 ? (
              <Grid container sx={{ position: "relative" }} item xs>
                <PostsTab
                  posts={posts}
                  handleGetMorePosts={handleGetMorePosts}
                  scrollParentId="appPostLists"
                  handleChangeTab={handleChangeTab}
                />
                <Button
                  sx={{
                    position: "absolute",
                    bottom: "50px",
                    right: "15px",
                    backgroundColor: "#FFD816",
                    zIndex: 1400,
                    color: "black!important",
                    borderRadius: "12px",
                    minHeight: "40px",
                    maxHeight: "40px",
                    minWidth: "40px",
                    maxWidth: "40px",
                    p: 1.5,
                    "&:hover ": { backgroundColor: "#FFD816" },
                    "&:active": { backgroundColor: "#FFD816" },
                  }}
                  onClick={handlePushToAddPost}
                >
                  <img
                    src={AddNewPostPlusIcon.src}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Button>
              </Grid>
            ) : tabValue === 2 ? (
              <Chat />
            ) : null}
          </Grid>
          <NavigationBar onChange={handleChangeTab} />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default App;
