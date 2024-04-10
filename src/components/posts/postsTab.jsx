import PostList from "components/posts/postsList";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";
import { useRouteQuery } from "utils/route";

const PostTab = ({ posts = [], handlePushToChat, ...props }) => {
  const routeQuery = useRouteQuery();
  const handleGoToChatsList = () =>
    routeQuery({
      status: "chats",
    });
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
          onClick={handleGoToChatsList}
          size="big"
          sx={{ position: "absolute", bottom: "15px", right: "25px" }}
        >
          <Badge
            badgeContent={4}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "red",
                border: "1px solid white",
                top: "2px",
                right: "1px",
              },
            }}
          >
            <ChatIcon />
          </Badge>
        </Fab>
      )}
    </Grid>
  );
};

export default PostTab;
