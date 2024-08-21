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
              <Grid sx={{ overflowY: "auto" }} container item lg={8} md={6}>
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
              <Grid
                sx={{
                  height: "100%",
                  overflowY: "auto",
                }}
                container
                item
                lg={4}
                md={6}
                id="appPostLists"
                direction={"column"}
              >
                <Grid sx={{ m: 1 }}>
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
              sx={{ height: "100%", overflowY: "auto" }}
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
              <MapTab
                filters={dialogFilters}
                handleBounds={handleBounds}
                search={search}
                handleChangeTab={handleChangeTab}
                latBounds={latBounds}
                longBounds={longBounds}
              />
            ) : tabValue === 1 ? (
              <PostsTab
                posts={posts}
                handleGetMorePosts={handleGetMorePosts}
                scrollParentId="appPostLists"
                handleChangeTab={handleChangeTab}
              />
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
