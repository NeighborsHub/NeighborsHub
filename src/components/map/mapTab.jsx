import Map from "components/map/map";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { myAddressesSelector } from "store/slices/userSlices";
import Modal from "components/modal/modal";
import PostsList from "components/posts/postsList";
import {
  myPostsSelector,
  uniqueLocationSelector,
  locationPostSelector,
} from "store/slices/postsSlices";
import {
  getLocationPosts,
  getMyPosts,
  addMyPostsAction,
  addLocationPostsAction,
} from "store/actions/postsActions";
import { useDispatch } from "react-redux";

const MapTab = ({
  filters,
  handleBounds,
  search,
  resetPage,
  handleChangeTab,
  latBounds,
  longBounds,
}) => {
  const myPosts = useSelector(myPostsSelector);
  const locationPosts = useSelector(locationPostSelector);
  const myAddressCordinate = useSelector(myAddressesSelector);
  const locations = useSelector(uniqueLocationSelector);
  const mainAddress = myAddressCordinate.find((item) => item.is_main_address);
  const initialCordinate = mainAddress?.location.coordinates || [0, 0];
  const zoom = mainAddress ? 14 : 0;
  const myCordinate = mainAddress?.location?.coordinates;
  const [open, setOpen] = useState(null);
  const [isMyPosts, setIsMyPosts] = useState(false);
  const dispatch = useDispatch();
  const [markerLocation, setMarkerLocation] = useState([]);

  const handleMarkerClicked = async (item) => {
    setMarkerLocation([item[0], item[1]]);

    const divide = 10;
    const maxLong = longBounds[0];
    const minLong = longBounds[1];
    const maxLat = latBounds[0];
    const minLat = latBounds[1];

    const longStep = (maxLong - minLong) / divide;
    const latStep = (maxLat - minLat) / divide;

    const longIntervals = [];
    const latIntervals = [];

    console.log(longStep, latStep, "gggggggggggggggg");

    for (var i = 0; i < divide; i++) {
      if (
        minLong + i * longStep > item[0] &&
        minLong + (i - 1) * longStep < item[0]
      ) {
        longIntervals.push(minLong + (i - 1) * longStep);
        longIntervals.push(minLong + i * longStep);
      }
      if (
        minLat + i * latStep > item[1] &&
        minLat + (i - 1) * latStep < item[1]
      ) {
        latIntervals.push(minLat + (i - 1) * latStep);
        latIntervals.push(minLat + i * latStep);
      }
    }

    dispatch(
      getLocationPosts({
        // post_longitude: item[0],
        // post_latitude: item[1],
        user_longitude: initialCordinate[0] || undefined,
        user_latitude: initialCordinate[1] || undefined,
        category: filters.filters?.categories
          ? filters.selectedCategories.toString()
          : undefined,
        search: search || undefined,
        in_bbox: `${longIntervals[0]},${latIntervals[0]},${longIntervals[1]},${latIntervals[1]}`,
      })
    ).then(() => {
      setIsMyPosts(false);
      setOpen(true);
    });
  };

  const handleMyMarkerClicked = async () => {
    dispatch(getMyPosts()).then(() => {
      setIsMyPosts(true);
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleGetMorePosts = (page, limit) => {
    const divide = 10;
    const maxLong = longBounds[0];
    const minLong = longBounds[1];
    const maxLat = latBounds[0];
    const minLat = latBounds[1];

    const longStep = (maxLong - minLong) / divide;
    const latStep = (maxLat - minLat) / divide;

    const longIntervals = [];
    const latIntervals = [];

    console.log(longStep, latStep, "gggggggggggggggg");

    for (var i = 0; i < divide; i++) {
      if (
        minLong + i * longStep > markerLocation[0] &&
        minLong + (i - 1) * longStep < markerLocation[0]
      ) {
        longIntervals.push(minLong + (i - 1) * longStep);
        longIntervals.push(minLong + i * longStep);
      }
      if (
        minLat + i * latStep > markerLocation[1] &&
        minLat + (i - 1) * latStep < markerLocation[1]
      ) {
        latIntervals.push(minLat + (i - 1) * latStep);
        latIntervals.push(minLat + i * latStep);
      }
    }

    isMyPosts
      ? dispatch(addMyPostsAction({ offset: page * limit, limit }))
      : dispatch(
          addLocationPostsAction({
            // post_longitude: markerLocation[0],
            // post_latitude: markerLocation[1],
            user_longitude: initialCordinate[0] || undefined,
            user_latitude: initialCordinate[1] || undefined,
            category: filters.filters?.categories
              ? filters.selectedCategories.toString()
              : undefined,
            search: search || undefined,
            offset: page * limit,
            limit,
            in_bbox: `${longIntervals[0]},${latIntervals[0]},${longIntervals[1]},${latIntervals[1]}`,
          })
        );
  };

  return (
    <Grid container alignContent={"flex-start"}>
      <Map
        locations={locations}
        center={initialCordinate}
        zoom={zoom}
        myCordinate={myCordinate}
        handleMarkerClicked={handleMarkerClicked}
        handleMyMarkerClicked={handleMyMarkerClicked}
        handleBounds={handleBounds}
      />
      <Modal open={open} onClose={handleClose}>
        <Grid
          container
          sx={{ height: "calc( 100vh - 300px )", overflowY: "auto" }}
          id="mapTabPostList"
        >
          <PostsList
            posts={isMyPosts ? myPosts : locationPosts}
            handleGetMorePosts={handleGetMorePosts}
            scrollParentId="mapTabPostList"
            resetPage={resetPage}
            handleClosePostListOnModal={handleClose}
            handleChangeTab={handleChangeTab}
          />
        </Grid>
      </Modal>
    </Grid>
  );
};

export default MapTab;
