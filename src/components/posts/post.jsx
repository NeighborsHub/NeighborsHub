import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "@mui/material/Button";
import SamplePostImage from "assets/images/samplePostImage.png";
import { authSelector } from "store/slices/authSlices";
import Chip from "@mui/material/Chip";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import { useRouter } from "next/navigation";
import moment from "moment";
import LikesDislikes from "components/posts/items/likesDislikes";
import Contact from "components/posts/items/Contact";
import Dots from "components/posts/items/dots";
import User from "components/posts/items/user";

const Post = ({
  handleOpenModal,
  showLocationOnMap,
  data,
  handleClosePostsList,
  isPostPage,
}) => {
  const myInfo = useSelector(myInfoSelector);
  const isAuth = useSelector(authSelector);
  const isMyPost = myInfo.id === data.created_by?.id;
  const router = useRouter();

  const handleRedirectToPostPage = (id) => {
    !isPostPage && router.push(`/app/post?id=${id}`);
  };

  return (
    <Suspense>
      <Grid
        container
        direction={"column"}
        sx={{
          p: { sm: 3, xs: 1 },
          border: "1px solid lightGray",
          "&:hover": !isPostPage
            ? {
                backgroundColor: "#f7f7f7",
                cursor: "pointer",
              }
            : {},
        }}
      >
        {Boolean(data.media?.length) && (
          <Grid
            container
            sx={{ backgroundColor: "#ebf3ff" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {data.media?.length >= 1 ? (
              <Carousel
                showArrows
                showThumbs={false}
                showStatus={false}
                width={"100%"}
              >
                {data.media.map((item, index) => (
                  <div key={index}>
                    {["jpg", "jpeg", "png", "gif"].includes(
                      item.file.split(".").pop()
                    ) ? (
                      <img
                        src={item?.file}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "contain",
                        }}
                        key={index}
                      />
                    ) : (
                      <video
                        src={item?.file}
                        width={"90%"}
                        height={"300px"}
                        style={{ objectFit: "contain" }}
                        controls
                      />
                    )}
                  </div>
                ))}
              </Carousel>
            ) : (
              // <LandscapeIcon sx={{ fontSize: 300, color: "gray" }} />
              <img
                src={SamplePostImage.src}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
            )}
          </Grid>
        )}

        <Grid container direction={"column"}>
          {/* //////////////////////////////////////// Title ///////////////////////////////////// */}
          <Typography
            sx={{
              fontWeight: "bold",
              wordBreak: "break-word",
              mt: 2,
            }}
            variant="h6"
          >
            {data.title}
          </Typography>
          {/* //////////////////////////////////////// Distance And Date ///////////////////////////////////// */}
          <Grid
            container
            item
            xs={12}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ mt: 2 }}
          >
            <Grid
              sx={{ mt: 1 }}
              contianer
              justifyContent={"flex-start"}
              item
              xs
            >
              <Typography
                sx={{
                  color: "gray",
                  fontSize: "14px",
                  fontStyle: "italic",
                }}
              >
                {moment(data.created_at).fromNow()}
              </Typography>
            </Grid>

            {!isMyPost && data.distance && (
              <Grid
                container
                sx={{ mt: 1 }}
                item
                xs
                justifyContent={"flex-end"}
              >
                <SocialDistanceIcon />
                <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
                  {data.distance} meter away
                </Typography>
              </Grid>
            )}
          </Grid>
          {/* //////////////////////////////////////// User Avatar And Name ///////////////////////////////////// */}
          {!isMyPost && <User data={data} />}
          {/* //////////////////////////////////////// Actions ///////////////////////////////////// */}
          <Grid container justifyContent={"flex-end"}>
            {!isMyPost && isAuth && <LikesDislikes data={data} />}
            {!isMyPost && <Contact data={data} />}
            {(showLocationOnMap || isMyPost) && (
              <Dots
                showLocationOnMap={!isMyPost}
                isMyPost={isMyPost}
                handleOpenModal={handleOpenModal}
                data={data}
                handleClosePostsList={handleClosePostsList}
              />
            )}
          </Grid>

          {/* //////////////////////////////////////// Categories ///////////////////////////////////// */}
          <Grid container justifyContent={"flex-start"} sx={{ px: 2, mt: 1 }}>
            {data.category?.map((item) => (
              <Chip
                label={item.title}
                key={item.title}
                sx={{
                  backgroundColor: "#4c34eb",
                  color: "white",
                }}
              />
            ))}
          </Grid>
        </Grid>
        {/* //////////////////////////////////////// Description ///////////////////////////////////// */}
        <Typography
          sx={{ mt: 1, color: "gray", wordBreak: "break-all" }}
          variant="subtitle1"
        >
          {data.body}
        </Typography>
        {/* //////////////////////////////////////// More Details ///////////////////////////////////// */}
        {!isPostPage && (
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => handleRedirectToPostPage(data.id)}
          >
            More Details
          </Button>
        )}
      </Grid>
    </Suspense>
  );
};

export default Post;
