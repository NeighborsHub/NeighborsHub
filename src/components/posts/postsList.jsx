import Post from "./post";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Map from "components/map/map";
import Modal from "components/modal/modal";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { myAddressesSelector } from "store/slices/userSlices";
import LandscapeIcon from "@mui/icons-material/Landscape";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";

const PostsList = ({
  posts = {},
  showLocationOnMap = false,
  handleGetMorePosts,
  scrollParentId = Math.random(),
  handleClosePostListOnModal,
  handleChangeTab,
}) => {

  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const myAddressCordinate = useSelector(myAddressesSelector);
  const mainAddress = myAddressCordinate.find((item) => item.is_main_address);
  const initialCordinate = mainAddress?.location.coordinates || [0, 0];
  const [postsLenght, setPostsLenght] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 10;
  const handleClose = () => {
    setOpen(false);
  };


  const handleOpenModal = (post) => {
    setLocations([post.address.location.coordinates]);
    setOpen(true);
  };

  useEffect(() => {
    if (postsLenght > posts.results?.length) {
      setPage(0);
      setPostsLenght(0);
    } else {
      setPostsLenght(posts.results?.length);
    }
  }, [posts]);

  return (
    <Grid container direction={"column"} item xs>
      {posts.results?.length > 0 ? (
        <Grid container direction="column">
          <InfiniteScroll
            dataLength={posts.results.length}
            next={() => {
              handleGetMorePosts(page + 1, limit);
              setPage((prevState) => prevState + 1);
            }}
            hasMore={page * limit + limit <= posts.count}
            loader={
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ py: 2, my: 2 }}
              >
                <Typography>Wait For More Posts ...</Typography>
              </Grid>
            }
            scrollableTarget={scrollParentId}
          >
            {posts.results.map((item) => (
              <Card key={item.id} sx={{ my: 2 }}>
                <Post
                  showLocationOnMap={showLocationOnMap}
                  handleOpenModal={() => handleOpenModal(item)}
                  data={item}
                  handleClosePostsList={handleClose}
                  handleClosePostListOnModal={handleClosePostListOnModal}
                  handleChangeTab={handleChangeTab}
                />
              </Card>
            ))}
          </InfiniteScroll>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            pb: 8,
          }}
        >
          <LandscapeIcon sx={{ fontSize: "120px", fill: "lightGray" }} />
          <Typography sx={{ color: "gray" }}>No Post</Typography>
        </Grid>
      )}
      <Modal open={open} onClose={handleClose}>
        <Grid
          container
          justifyContent={"center"}
          sx={{ mt: 3, overflowY: "auto", height: "calc( 100vh - 330px )" }}
        >
          <Map
            myCordinate={initialCordinate}
            locations={locations}
            center={locations[0]}
            zoom={15}
          />
        </Grid>
      </Modal>
    </Grid>
  );
};

export default PostsList;
