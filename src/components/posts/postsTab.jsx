import PostList from "components/posts/postsList";
import Grid from "@mui/material/Grid";

const PostTab = ({ posts = [], ...props }) => {
  return (
    <Grid container sx={{ px: 1 }}>
      <PostList showLocationOnMap {...props} posts={posts} />
    </Grid>
  );
};

export default PostTab;
