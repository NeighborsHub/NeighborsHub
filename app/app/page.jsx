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
import { getMyAddresses } from "store/actions/userActions";
import {
  getPosts,
  getCategories,
  addPostsAction,
} from "store/actions/postsActions";
import { postsSelector } from "store/slices/postsSlices";

import { getUniqueLocation } from "store/actions/postsActions";
import AppHeader from "components/header/appHeader";
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(getMyAddresses()).finally(() => setLoading(false));
      dispatch(getCategories());
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
  ]);

  function getPostsFun() {
    dispatch(
      getPosts({
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
      getUniqueLocation(
        {
          in_bbox: `${longBounds[1]},${latBounds[1]},${longBounds[0]},${latBounds[0]}`,
          offset: 0,
          limit: Math.abs(longBounds[0] - longBounds[1]) < 0.02 ? 100000 : 15,
          category: dialogFilters.filters?.categories
            ? dialogFilters.selectedCategories.toString()
            : undefined,
          search: search || undefined,
        },
        controller.signal
      )
    );
  }

  const handleChange = (e, value) => {
    setTabValue(value);
  };

  const handleSubmitFilters = (state) => {
    setDialogFilters(state);
  };

  function handleBounds(long1, long2, lat1, lat2) {
    setLongBounds([long1, long2]);
    setLatBounds([lat1, lat2]);
    controller?.abort();
  }

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        px: "0!important",
      }}
    >
      <Hidden mdUp>
        <Grid container justifyContent={"center"}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Tab label="Map" />
            <Tab label="Posts" />
            <Tab label="Chat" />
          </Tabs>
        </Grid>
      </Hidden>
      <AppHeader
        handleSearch={handleSearch}
        dialogFilters={dialogFilters}
        handleSubmitFilters={handleSubmitFilters}
      />
      <Hidden mdDown>
        <Grid
          container
          justifyContent={"center"}
          sx={{ height: "calc( 100vh - 160px )" }}
        >
          {mainAddress ? (
            <>
              <Grid
                sx={{ height: "100%", overflowY: "auto" }}
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
                  />
                )}
              </Grid>
              <Grid
                sx={{ height: "100%", overflowY: "auto" }}
                container
                item
                lg={4}
                md={6}
                id="appPostLists"
              >
                <Chat/>
                {/* <PostsTab
                  filters={dialogFilters}
                  posts={posts}
                  handleGetMorePosts={handleGetMorePosts}
                  scrollParentId="appPostLists"
                /> */}
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
                />
              )}
            </Grid>
          )}
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid
          container
          justifyContent={"center"}
          sx={{ mt: 1, height: "calc( 100vh - 210px )", overflowY: "auto" }}
          id="appPostLists"
        >
          {tabValue === 0 ? (
            <MapTab
              filters={dialogFilters}
              handleBounds={handleBounds}
              search={search}
            />
          ) : tabValue === 1 ? (
            <PostsTab
              posts={posts}
              handleGetMorePosts={handleGetMorePosts}
              scrollParentId="appPostLists"
            />
          ) : (
            <Chat />
          )}
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default App;
