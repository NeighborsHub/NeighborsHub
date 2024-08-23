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
  getLocationPostsAction,
  getMyPostsAction,
  addMyPostsAction,
  addLocationPostsAction,
} from "store/actions/postsActions";
import { useDispatch } from "react-redux";
import { dividedInBoxxComputing } from "utils/map";

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
  const zoom = mainAddress ? 16 : 0;
  const myCordinate = mainAddress?.location?.coordinates;
  const [open, setOpen] = useState(null);
  const [isMyPosts, setIsMyPosts] = useState(false);
  const dispatch = useDispatch();
  const [markerLocation, setMarkerLocation] = useState([]);

  const handleMarkerClicked = async (item) => {
    setMarkerLocation([item[0], item[1]]);

    const [longIntervals, latIntervals] = dividedInBoxxComputing({
      divide: 10,
      longBounds,
      latBounds,
      markerLocation: [item[0], item[1]],
    });

    dispatch(
      getLocationPostsAction({
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
    dispatch(getMyPostsAction()).then(() => {
      setIsMyPosts(true);
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleGetMorePosts = (page, limit) => {
    const [longIntervals, latIntervals] = dividedInBoxxComputing({
      divide: 10,
      longBounds,
      latBounds,
      markerLocation,
    });

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
      <Modal open={open} onClose={handleClose} width="sm">
        <Grid
          container
          sx={{ maxHeight: "calc( 100vh - 100px )", overflowY: "auto" }}
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
