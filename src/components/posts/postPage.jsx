"use client";
import Header from "components/header";
import PostHeader from "components/header/postHeader";
import Post from "components/posts/post";
import Grid from "@mui/material/Grid";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getPostAction } from "store/actions/postsActions";
import { useDispatch } from "react-redux";
import { postSelector } from "store/slices/postsSlices";
import { useSelector } from "react-redux";
import Modal from "components/modal/modal";
import Map from "components/map/map";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { clearPost } from "store/slices/postsSlices";
import Comments from "components/comments/comments";
import SubHeader from "components/header/subHeader";

const PostPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const post = useSelector(postSelector) || {};
  const [open, setOpen] = useState(false);
  const locations = post.address?.location.coordinates || [0, 0];
  const [postLoading, setPostLoading] = useState(true);

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
      <Grid container direction={"column"}>
        <Header />
        <PostHeader
          avatar={post.created_by?.avatar.avatar}
          title={post.created_by?.user_name || post.created_by?.first_name}
        />
      </Grid>
      <Grid container sx={{ p: 2 }} item xs>
        <Grid container item xs={9}>
          <Post
            data={post}
            isPostPage
            showLocationOnMap
            handleOpenModal={handleOpenModal}
            handleClosePostsList={handleClose}
          >
            <Grid container sx={{ height: "300px" }}>
              <Map
                // myCordinate={post.address?.locations.coordinates}
                locations={[locations]}
                center={post.address?.location.coordinates}
                zoom={15}
              />
            </Grid>
          </Post>
        </Grid>
        <Grid container item xs={3} sx={{ pl: 2 }}>
          <Comments postId={post.id} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PostPage;
