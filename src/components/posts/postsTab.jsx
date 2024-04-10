import PostList from "components/posts/postsList";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
const PostTab = ({ posts = [], handlePushToChat, ...props }) => {
  return (
    <Grid
      container
      sx={{ px: 1, position: "relative", overflow: "hidden", flex: 1 }}
      direction={"column"}
    >
      <Grid container direction={"column"} item xs sx={{ overflow: "auto" }}>
        <PostList showLocationOnMap {...props} posts={posts} />
      </Grid>
      {handlePushToChat && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => handlePushToChat(true)}
          size="big"
          sx={{ position: "absolute", bottom: "15px", right: "25px" }}
        >
          <ChatIcon />
        </Fab>
      )}
    </Grid>
  );
};

export default PostTab;
