"use client";
import PostList from "components/posts/postsList";
import { myPostsSelector } from "store/slices/postsSlices";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { getMyPostsAction } from "store/actions/postsActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ResponsiveSubHeader from "components/header/responsiveSubHeader";
const MyPosts = () => {
  const posts = useSelector(myPostsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPostsAction());
  }, []);

  return (
    <Grid container direction={"column"} item xs>
      <ResponsiveSubHeader title={"Milad Seyf"} backPath={"/app/"} />

      <Grid
        container
        direction={"column"}
        justifyContent={"flex-start"}
        item
        xs
        alignItems={"center"}
        sx={{
          flex: 1,
          px: 2,
          backgroundColor: "white!important",
          boxSizing: "border-box",
          mb: 2,
        }}
      >
        <Grid container direction="column" item xs sx={{ overflowY: "auto" }}>
          <PostList posts={posts} showLocationOnMap />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyPosts;
