"use client";
import Header from "components/header";
import PostHeader from "components/header/postHeader";
import Post from "components/posts/post";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPostAction } from "store/actions/postsActions";
import { useDispatch } from "react-redux";
import { postSelector } from "store/slices/postsSlices";
import { useSelector } from "react-redux";
import Map from "components/map/map";
import { clearPost } from "store/slices/postsSlices";
import Comments from "components/comments/comments";
import Hidden from "@mui/material/Hidden";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ResponsiveHeader from "components/header/ResponsiveHeader";
import NavigationBar from "components/navigationBar/navigationBar";

const PostPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const post = useSelector(postSelector) || {};
  const [open, setOpen] = useState(false);
  const locations = post.address?.location.coordinates || [0, 0];
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    dispatch(getPostAction({ id: postId }));
  }, [postId]);

  useEffect(() => {
    return () => {
      dispatch(clearPost());
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModal = (post) => {
    setOpen(true);
  };

  return (
    <Grid
      container
      direction={"column"}
      item
      xs
      sx={{ overflow: "hidden", backgroundColor: "white!important" }}
    >
      <Hidden mdUp>
        <ResponsiveHeader />
      </Hidden>
      <Hidden mdDown>
        <Header />
        <PostHeader
          avatar={post.created_by?.avatar.avatar}
          title={post.created_by?.user_name || post.created_by?.first_name}
        />
      </Hidden>
      <Grid container sx={{ p: 2, overflowY: "auto" }} item xs>
        <Grid
          container
          item
          lg={9}
          md={8}
          xs={12}
          sx={{ height: isSm ? "auto" : "100%", overflowY: "auto" }}
        >
          <Post
            data={post}
            isPostPage
            showLocationOnMap
            handleOpenModal={handleOpenModal}
            handleClosePostsList={handleClose}
          >
            <Hidden lgDown={post.media?.length}>
              <Grid container sx={{ height: "300px" }}>
                <Map
                  // myCordinate={post.address?.locations.coordinates}
                  locations={[locations]}
                  center={post.address?.location.coordinates}
                  zoom={15}
                />
              </Grid>
            </Hidden>
          </Post>
        </Grid>
        <Grid
          container
          item
          lg={3}
          md={4}
          xs={12}
          sx={{
            pl: isSm ? 0 : 2,
            height: isSm ? "auto" : "100%",
            mt: isSm ? 2 : 0,
          }}
          direction="column"
        >
          <Hidden lgUp lgDown={!post.media?.length}>
            <Grid
              container
              sx={{
                border: "1px solid rgba(217, 217, 217, 0.5)",
                borderRadius: "12px",
                p: { xs: 1, md: 2 },
                mb: 2,
              }}
            >
              <Grid
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "200px",
                }}
                container
              >
                <Map
                  // myCordinate={post.address?.locations.coordinates}
                  locations={[locations]}
                  center={post.address?.location.coordinates}
                  zoom={15}
                />
              </Grid>
            </Grid>
          </Hidden>
          <Grid container direction={"column"} sx={{ height: "100%" }}>
            <Comments postId={post.id} />
          </Grid>
        </Grid>
      </Grid>
      <Hidden mdUp>
        <NavigationBar />
      </Hidden>
    </Grid>
  );
};
export default PostPage;
