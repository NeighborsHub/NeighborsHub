import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { likeAction, deleteLikeAction } from "store/actions/postsActions";
import IconButton from "@mui/material/IconButton";
import Like from "assets/svgs/Post/Like.svg";
import Dislike from "assets/svgs/Post/Dislike.svg";
const LikesDislikes = ({ data }) => {
  const dispatch = useDispatch();

  const [likesCount, setLikesCount] = useState(
    data.likes?.find((item) => item.type === "like")?.count || 0
  );
  const [dislikesCount, setDislikesCount] = useState(
    data.likes?.find((item) => item.type === "dislike")?.count || 0
  );
  const [lastClicked, setLastClicked] = useState(data.user_liked);

  const handleLike = () => {
    if (lastClicked === "like") {
      dispatch(deleteLikeAction({ id: data.id })).then(() => {
        setLikesCount((prevState) => (prevState ? prevState - 1 : 0));
        setLastClicked("");
      });
    } else if (lastClicked === "dislike") {
      dispatch(likeAction({ id: data.id, type: "like" })).then(() => {
        setLikesCount((prevState) => prevState + 1);
        setDislikesCount((prevState) => prevState - 1);
        setLastClicked("like");
      });
    } else {
      dispatch(likeAction({ id: data.id, type: "like" })).then(() => {
        setLikesCount((prevState) => prevState + 1);
        setLastClicked("like");
      });
    }
  };
  const handleDislike = () => {
    if (lastClicked === "dislike") {
      dispatch(likeAction({ id: data.id, type: "dislike" })).then(() => {
        setDislikesCount((prevState) => (prevState ? prevState - 1 : 0));
        setLastClicked("");
      });
    } else if (lastClicked === "like") {
      dispatch(likeAction({ id: data.id, type: "dislike" })).then(() => {
        setDislikesCount((prevState) => prevState + 1);
        setLikesCount((prevState) => prevState - 1);
        setLastClicked("dislike");
      });
    } else {
      dispatch(likeAction({ id: data.id, type: "dislike" })).then(() => {
        setDislikesCount((prevState) => prevState + 1);
        setLastClicked("dislike");
      });
    }
  };

  return (
    <Grid item container>
      <IconButton
        onClick={handleLike}
        sx={{
          borderRadius: "10px",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: "#FDE7E7",
          height: "35px",
          width: "50px",
          '&:hover':{
            backgroundColor: "#fcbbbb",
          }
        }}
      >
        <Grid sx={{display: 'flex'}} alignItems={"center"} justifyContent={"center"}>
          {lastClicked === "like" ? (
            <img src={Like.src} />
          ) : (
            <img src={Like.src} />
          )}
          {likesCount > 0 && (
            <Typography
              sx={{
                ml: 1,
                fontSize: "12px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {likesCount}
            </Typography>
          )}
        </Grid>
      </IconButton>
      <IconButton
        onClick={handleDislike}
        sx={{
          borderRadius: "10px",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: "1px solid lightGray",
          backgroundColor: "#FDE7E7",
          height: "35px",
          width: "50px",
          '&:hover':{
            backgroundColor: "#fcbbbb",
          }
        }}
      >
        <Grid sx={{display: 'flex'}} alignItems={"center"} justifyContent={"space-around"}>
          {lastClicked === "dislike" ? (
            <img src={Dislike.src} />
          ) : (
            <img src={Dislike.src} />
          )}
          {dislikesCount > 0 && (
            <Typography
              sx={{
                ml: 1,
                fontSize: "12px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {dislikesCount}
            </Typography>
          )}
        </Grid>
      </IconButton>
    </Grid>
  );
};

export default LikesDislikes;
