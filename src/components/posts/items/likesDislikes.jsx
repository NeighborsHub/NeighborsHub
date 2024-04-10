import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { likeAction, deleteLikeAction } from "store/actions/postsActions";
import Chip from "@mui/material/Chip";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

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
    <Grid item>
      <Chip
        onClick={handleLike}
        sx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        label={
          <Grid container alignItems={"center"}>
            {lastClicked === "like" ? (
              <ThumbUpAltIcon sx={{ fill: "#db1d1d" }} />
            ) : (
              <ThumbUpOffAltIcon sx={{ fill: "gray" }} />
            )}
            {likesCount > 0 && (
              <Typography
                sx={{
                  ml: 1,
                  fontSize: "12px",
                  color: "#858585",
                  fontWeight: "bold",
                }}
              >
                {likesCount}
              </Typography>
            )}
          </Grid>
        }
      />
      <Chip
        onClick={handleDislike}
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: "1px solid lightGray",
        }}
        label={
          <Grid container alignItems={"center"}>
            {lastClicked === "dislike" ? (
              <ThumbDownAltIcon sx={{ fill: "#db1d1d" }} />
            ) : (
              <ThumbDownOffAltIcon sx={{ fill: "gray" }} />
            )}
            {dislikesCount > 0 && (
              <Typography
                sx={{
                  ml: 1,
                  fontSize: "12px",
                  color: "#858585",
                  fontWeight: "bold",
                }}
              >
                {dislikesCount}
              </Typography>
            )}
          </Grid>
        }
      />
    </Grid>
  );
};

export default LikesDislikes;
