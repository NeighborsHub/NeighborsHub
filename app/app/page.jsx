"use client";
import { useState, useMemo, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MapTab from "components/map/mapTab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PostsTab from "components/posts/postsTab";
import Button from "@mui/material/Button";
import CreatePostModal from "components/posts/createPostModal";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Hidden from "@mui/material/Hidden";
import { myAddressesSelector } from "store/slices/userSlices";
import { useSelector } from "react-redux";
import { getMyAddresses, myInfoAction } from "store/actions/userActions";
import Badge from "@mui/material/Badge";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FiltersDialog from "components/filters/filtersDialog";
import AddIcon from "@mui/icons-material/Add";
import { getPosts, getCategories } from "store/actions/postsActions";
import { postsSelector } from "store/slices/postsSlices";

import { getMyPosts } from "store/actions/postsActions";
import TextField from "@mui/material/TextField";
import { useInputHandler } from "hooks/useInputHandler";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getUniqueLocation } from "store/actions/postsActions";

let controller;

const App = () => {
  const [tabValue, setTabValue] = useState(0);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const dispatch = useDispatch();
  const myAddressCordinate = useSelector(myAddressesSelector);
  const mainAddress = myAddressCordinate.find((item) => item.is_main_address);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [dialogFilters, setDialogFilters] = useState({});
  const theme = useTheme();
  const initialCordinate = mainAddress?.location.coordinates || [0, 0];
  const posts = useSelector(postsSelector);
  const search = useInputHandler("");
  const matcheMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [latBounds, setLatBounds] = useState([0, 0]);
  const [longBounds, setLongBounds] = useState([0, 0]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(getMyAddresses()).finally(() => setLoading(false));
      dispatch(getMyPosts());
      dispatch(getCategories());
    }, 500);
  }, []);

  useEffect(() => {
    if (mainAddress) getPostsFun();
  }, [mainAddress, dialogFilters]);

  useEffect(() => {
    if (latBounds[0]) {
      getUniqueLocationFun();
    }
  }, [latBounds[0], latBounds[1], longBounds[0], longBounds[1], dialogFilters]);

  function getPostsFun() {
    dispatch(
      getPosts({
        user_latitude: initialCordinate[1] || undefined,
        user_longitude: initialCordinate[0] || undefined,
        offset: 0,
        limit: 30,
        from_distance: dialogFilters?.filters?.distance
          ? dialogFilters?.distance?.[0]
          : undefined,
        to_distance: dialogFilters?.filters?.distance
          ? dialogFilters?.distance?.[1]
          : undefined,
        category: dialogFilters.filters?.categories
          ? dialogFilters.selectedCategories.toString()
          : undefined,
        search: search.value || undefined,
      })
    );
  }

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
          search: search.value || undefined,
        },
        controller.signal
      )
    );
  }

  const handleChange = (e, value) => {
    setTabValue(value);
  };
  const Content = useMemo(
    () => ({
      0: !loading && (
        <MapTab filters={dialogFilters} handleBounds={handleBounds} />
      ),
      1: <PostsTab posts={posts} />,
      2: <></>,
    }),
    [loading, dialogFilters, posts]
  );

  const handleCreatePostModalOpen = () => {
    setCreatePostModalOpen(true);
  };
  const handleCreatePostModalClose = () => {
    setCreatePostModalOpen(false);
  };

  const handleFilterDialogClose = () => {
    setOpenFilterDialog(false);
  };

  const handleOpenFilterDialog = () => {
    setOpenFilterDialog(true);
  };

  const handleSubmitFilters = (state) => {
    setDialogFilters(state);
    handleFilterDialogClose();
  };

  // useEffect(() => {
  //   setLoading(true);
  //   controller = new AbortController();
  //   dispatch(
  //     getUniqueLocation(
  //       {
  //         in_bbox: `${longBounds[1]},${latBounds[1]},${longBounds[0]},${latBounds[0]}`,
  //         offset: 0,
  //         limit: 30,
  //         category: dialogFilters.filters?.categories
  //           ? dialogFilters.selectedCategories.toString()
  //           : undefined,
  //       },
  //       controller.signal
  //     )
  //   );
  // }, []);

  function handleBounds(long1, long2, lat1, lat2) {
    setLongBounds([long1, long2]);
    setLatBounds([lat1, lat2]);
    controller?.abort();
  }

  const handleSearch = () => {
    getPostsFun();
  };

  return (
    <Grid
      // maxWidth="md"
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
          </Tabs>
        </Grid>
      </Hidden>
      <Grid
        container
        justifyContent={"space-between"}
        sx={{
          py: 1,
          px: { sm: 4, xs: 1 },
          bgcolor: "#e8e8e8",
          borderTop: "1px solid #d4d4d4",
          borderBottom: "1px solid #d4d4d4",
        }}
      >
        <Grid container item xs={6}>
          <TextField
            autocomplete="off"
            name="search"
            placeholder="Search"
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              "& .MuiOutlinedInput-notchedOutline": {
                fontSize: "12px",
                display: "none",
              },
              "& .MuiInputBase-input": {
                padding: "12px 20px",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "darkenGray",
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            {...search}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSearch}
                    edge="end"
                  >
                    <SearchIcon sx={{ fill: "gray" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid container xs={6} justifyContent={"flex-end"}>
          <Button
            sx={{
              mr: { xs: 1, md: 2 },
              px: { md: 4, sm: 1, xs: 0 },
              borderRadius: "10px",
              fontSize: "13px",
              backgroundColor: "#e85a02",
              "&:hover": {
                backgroundColor: "#f27527",
              },
              minWidth: { xs: "40px", sm: "64px" },
            }}
            variant="contained"
            onClick={handleOpenFilterDialog}
          >
            {!matcheMdDown && "Filters"}
            <Badge
              badgeContent={
                dialogFilters.filters
                  ? Object.values(dialogFilters.filters).filter(Boolean).length
                  : 0
              }
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "red",
                  border: "1px solid white",
                  top: "6px",
                  right: "-1px",
                },
              }}
            >
              <FilterAltIcon
                color="action"
                sx={{ color: "white", ml: { sm: 0, md: 1 } }}
              />
            </Badge>
          </Button>
          <Button
            variant="contained"
            onClick={handleCreatePostModalOpen}
            sx={{
              borderRadius: "10px",
              // height: "47px",
              fontSize: "13px",
              backgroundColor: "#0298e8",
              px: { md: 4, sm: 1, xs: 0 },
              minWidth: { xs: "40px", sm: "64px" },
            }}
          >
            {!matcheMdDown && "Add New Post"}

            <AddIcon
              color="action"
              sx={{ color: "white", ml: { sm: 0, md: 1 } }}
            />
          </Button>
        </Grid>
      </Grid>
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
                  <MapTab filters={dialogFilters} handleBounds={handleBounds} />
                )}
              </Grid>
              <Grid
                sx={{ height: "100%", overflowY: "auto" }}
                container
                item
                lg={4}
                md={6}
              >
                <PostsTab filters={dialogFilters} posts={posts} />
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
                <MapTab filters={dialogFilters} handleBounds={handleBounds} />
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
        >
          {Content[tabValue]}
        </Grid>
      </Hidden>
      <CreatePostModal
        open={createPostModalOpen}
        handleClose={handleCreatePostModalClose}
      />
      <FiltersDialog
        open={openFilterDialog}
        handleClose={handleFilterDialogClose}
        handleSubmitFilters={handleSubmitFilters}
      />
    </Grid>
  );
};

export default App;
