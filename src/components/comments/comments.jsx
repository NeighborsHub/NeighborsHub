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
  getPostCommentsAction,
  addPostCommentsAction,
} from "store/actions/postsActions";
import { postCommentsSelector } from "store/slices/postsSlices";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import InputLabel from "@mui/material/InputLabel";

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
    if (postId) dispatch(getPostCommentsAction({ id: postId }));
  }, [postId]);

  const handleGetMoreComments = (page, limit) => {
    dispatch(
      addPostCommentsAction({ offset: page * limit, limit, id: postId })
    ).then(() => {
      setPage((prevState) => prevState + 1);
    });
  };

  return (
    <form
      onSubmit={handleSubmitComment}
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid rgba(217, 217, 217, 0.5)",
        borderRadius: "12px",
        flex: 1,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        // alignItems={"center"}

        direction={"column"}
      >
        <InputLabel shrink sx={{ mt: 1 }}>
          Replay
        </InputLabel>
        <Grid container sx={{ position: "relative" }}>
          <TextField
            variant="outlined"
            // autocomplete="off"
            sx={{
              flex: 1,
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
              height: "40px",
              fontSize: "13px",
              backgroundColor: "#FFD816!important",
              color: "black!important",
              position: "absolute",
              right: 0,
              mt: "2px",
              mr: "2px",
            }}
            type="submit"
            disabled={!comment.value}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      {postComments.results > 0 ? (
        <Grid container direction={"column"} sx={{ mt: 2 }}>
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
      ) : (
        <Grid container item xs alignItems={"center"} justifyContent={"center"}>
          <Typography sx={{ color: "#999999" , fontSize: '16px' }}>No Comment</Typography>
        </Grid>
      )}
    </form>
  );
};

export default Comments;
