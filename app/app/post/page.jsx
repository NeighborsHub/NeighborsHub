"use client";
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

const PostPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const post = useSelector(postSelector);
  const [open, setOpen] = useState(false);
  const locations = post.address?.location.coordinates || [0, 0];
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPostLoading(true);
      dispatch(getPostAction({ id: postId })).finally(() => setPostLoading(false));
    }, 500);
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
    <Suspense>
      <Container
        maxWidth="md"
        sx={{
          maxHeight: "calc( 100vh - 90px )",
          overflowY: "auto",
          px: "0!important",
        }}
        id="postContainer"
      >
        <Card sx={{ my: 1 }}>
          <Grid>
            {!postLoading && (
              <>
                <Post
                  data={post}
                  isPostPage
                  showLocationOnMap
                  handleOpenModal={handleOpenModal}
                  handleClosePostsList={handleClose}
                />
                <Grid
                  container
                  sx={{
                    border: "1px solid lightGray",
                    borderTop: "none",
                    py: 2,
                  }}
                >
                  <Comments postId={post.id} />
                </Grid>
              </>
            )}

            <Modal open={open} onClose={handleClose}>
              <Grid
                container
                justifyContent={"center"}
                sx={{
                  mt: 3,
                  overflowY: "auto",
                  height: "calc( 100vh - 330px )",
                }}
              >
                <Map
                  // myCordinate={post.address?.locations.coordinates}
                  locations={[locations]}
                  center={post.address?.location.coordinates}
                  zoom={15}
                />
              </Grid>
            </Modal>
          </Grid>
        </Card>
      </Container>
    </Suspense>
  );
};
export default PostPage;
