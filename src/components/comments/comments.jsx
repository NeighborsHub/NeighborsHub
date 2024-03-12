import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useInputHandler } from "hooks/useInputHandler";
import Button from "@mui/material/Button";
import { myInfoSelector } from "store/slices/userSlices";
import { useSelector, useDispatch } from "react-redux";
import CommentItem from "components/comments/commentItem";
import {
  createCommentAction,
  getPostComments,
  addPostCommentsAction,
} from "store/actions/postsActions";
import { postCommentsSelector } from "store/slices/postsSlices";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";

const Comments = ({ postId }) => {
  const comment = useInputHandler("");
  const myInfo = useSelector(myInfoSelector);
  const dispatch = useDispatch();
  const postComments = useSelector(postCommentsSelector);
  const [page, setPage] = useState(0);
  const limit = 10;
  const handleSubmitComment = (e) => {
    e.preventDefault();
    dispatch(createCommentAction({ id: postId, body: comment.value })).then(
      () => {
        comment.onChange({ target: { value: "" } });
      }
    );
  };

  useEffect(() => {
    if (postId) dispatch(getPostComments({ id: postId }));
  }, [postId]);

  const handleGetMoreComments = (page, limit) => {
    dispatch(
      addPostCommentsAction({ offset: page * limit, limit, id: postId })
    ).then(() => {
      setPage((prevState) => prevState + 1);
    });
  };

  return (
    <form onSubmit={handleSubmitComment} style={{ width: "100%" }}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ my: 2, px: { sm: 5, xs: 1 } }}
      >
        <Avatar src={myInfo.avatar?.avatar_thumbnail} />
        <TextField
          variant="outlined"
          label="Your Comment"
          // autocomplete="off"
          sx={{
            flex: 1,
            mx: 1,
            borderRadius: "30px",
            "& .MuiOutlinedInput-notchedOutline": {
              fontSize: "12px",
              borderRadius: "10px!important",
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
          {...comment}
          // size="small"
        />
        <Button
          sx={{
            borderRadius: "10px",
            height: "47px",
            fontSize: "13px",
            backgroundColor: "#0298e8",
          }}
          variant="contained"
          type="submit"
          disabled={!comment.value}
        >
          Send
        </Button>
      </Grid>
      {postComments.results && (
        <Grid container direction={"column"}>
          <InfiniteScroll
            dataLength={postComments.results?.length}
            next={() => handleGetMoreComments(page + 1, limit)}
            hasMore={page * limit + limit <= postComments.count}
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
            scrollableTarget={"postContainer"}
          >
            {postComments.results?.map((item) => (
              <CommentItem data={item} key={item.id} myInfo={myInfo} />
            ))}
          </InfiniteScroll>
        </Grid>
      )}
    </form>
  );
};

export default Comments;
