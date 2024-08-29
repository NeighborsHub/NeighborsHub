import PostList from "components/posts/postsList";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";
import { useRouteQuery } from "utils/route";

const PostTab = ({ posts = [], handlePushToChat, ...props }) => {
  const routeQuery = useRouteQuery();
  return (
    <Grid
      container
      sx={{ px: 1, position: "relative", overflow: "hidden", flex: 1  }}
      direction={"column"}
    >
      <Grid container direction={"column"} item xs sx={{ overflow: "auto"}}>
        <PostList showLocationOnMap {...props} posts={posts} />
      </Grid>
    </Grid>
  );
};

export default PostTab;
