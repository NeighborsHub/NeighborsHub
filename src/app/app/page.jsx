"use client";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MapTab from "components/map/mapTab";
import PostsTab from "components/posts/postsTab";
import ChatList from "components/chat/chatsList";
import { useDispatch } from "react-redux";
import { myAddressesSelector } from "store/slices/userSlices";
import { useSelector } from "react-redux";
import { getMyAddressesAction, myInfoAction } from "store/actions/userActions";
import { isMobileAction } from "store/actions/appActions";
import {
  getPostsAction,
  getCategoriesAction,
  addPostsAction,
} from "store/actions/postsActions";
import { postsSelector } from "store/slices/postsSlices";
import { authSelector } from "store/slices/authSlices";
import { getUniqueLocationAction } from "store/actions/postsActions";
import AppHeader from "components/header/appHeader";
import { useSearchParams } from "next/navigation";
import NavigationBar from "components/navigationBar/navigationBar";
import ResponsiveHeader from "components/header/ResponsiveHeader";
import Header from "components/header";
import DesktopListNavigations from "components/navigationBar/desktopListNavigations";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AddNewPost from "components/addNewPost/addNewPost";
import Notifications from "components/notifications/notifications";
import Converstion from "components/chat/conversation";
let controller;

const App = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const myAddressCordinate = useSelector(myAddressesSelector);
  const isAuthenticated = useSelector(authSelector);
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
  const searchParams = useSearchParams();
  const currentState = new URLSearchParams(searchParams.toString()).get(
    "state"
  );
  const [selectedNavigationItemIndex, setSelectedNavigationItemIndex] =
    useState(0);
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  useEffect(() => {
    dispatch(isMobileAction(isMobile));
  }, []);

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
      {/* /////////////////////////////////////// Desktop ////////////////////////////////// */}
      {isMobile ? (
        <ResponsiveHeader />
      ) : (
        <>
          <Header />
          <AppHeader
            handleSearch={handleSearch}
            dialogFilters={dialogFilters}
            handleSubmitFilters={handleSubmitFilters}
          />
        </>
      )}
      <Grid container justifyContent={"center"} item xs>
        {!isMobile && (
          <Grid
            sx={{ overflowY: "auto", position: "relative" }}
            container
            item
            xs
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
          </Grid>
        )}
        {isAuthenticated && (
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
            {!isMobile && (
              <Grid sx={{ m: 1, mr: "13px" }}>
                <DesktopListNavigations
                  selectedNavigationItemIndex={selectedNavigationItemIndex}
                  setSelectedNavigationItemIndex={
                    setSelectedNavigationItemIndex
                  }
                />
              </Grid>
            )}
            {currentState === "map" || (isMobile && !currentState) ? (
              <Grid
                container
                direction={"column"}
                item
                xs
                sx={{ height: "100%" }}
              >
                <MapTab
                  filters={dialogFilters}
                  handleBounds={handleBounds}
                  search={search}
                  handleChangeTab={handleChangeTab}
                  latBounds={latBounds}
                  longBounds={longBounds}
                />
              </Grid>
            ) : currentState === "posts" || (!isMobile && !currentState) ? (
              <PostsTab
                filters={dialogFilters}
                posts={posts}
                handleGetMorePosts={handleGetMorePosts}
                scrollParentId="appPostLists"
                handlePushToChat={handlePushToChat}
                handleChangeTab={handleChangeTab}
              />
            ) : currentState === "chats" ? (
              <ChatList isFullWidth />
            ) : currentState === "notifications" ? (
              <Notifications />
            ) : currentState === "add-new-posts" ? (
              <AddNewPost />
            ) : currentState === "chat" ? (
              <Converstion />
            ) : null}
          </Grid>
        )}
      </Grid>
      {isMobile && (
        <NavigationBar onChange={handleChangeTab} currentValue={tabValue} />
      )}
    </Grid>
  );
};

export default App;
