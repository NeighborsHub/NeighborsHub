"use client";
import Post from "components/posts/post";
import Grid from "@mui/material/Grid";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getPost } from "store/actions/postsActions";
import { useDispatch } from "react-redux";
import { postSelector } from "store/slices/postsSlices";
import { useSelector } from "react-redux";
import Modal from "components/modal/modal";
import Map from "components/map/map";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

const PostPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const post = useSelector(postSelector);
  const [open, setOpen] = useState(false);
  const locations = post.address?.location.coordinates || [0, 0];

  useEffect(() => {
    setTimeout(() => {
      dispatch(getPost({ id: postId }));
    }, 500);
  }, [postId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModal = (post) => {
    setOpen(true);
  };

  return (
    <Suspense>
      <Container maxWidth="md">
        <Card sx={{ my: 1 }}>
          <Grid>
            <Post
              data={post}
              isPostPage
              showLocationOnMap
              handleOpenModal={handleOpenModal}
              handleClosePostsList={handleClose}
            />
            <Modal open={open} onClose={handleClose} sx={{ outline: "none" }}>
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
