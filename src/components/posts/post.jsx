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
import Share from "components/posts/items/share";
import Dots from "components/posts/items/dots";
import User from "components/posts/items/user";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { myAddressesSelector } from "store/slices/userSlices";

const Post = ({
  handleOpenModal,
  showLocationOnMap,
  data,
  handleClosePostsList,
  handleClosePostListOnModal,
  isPostPage,
  handleChangeTab,
}) => {
  const myInfo = useSelector(myInfoSelector);
  const isAuth = useSelector(authSelector);
  const isMyPost = myInfo.id === data.created_by?.id;
  const router = useRouter();
  const [addressTooltipOpen, setAddressTooltipOpen] = useState(false);
  const myAddressCordinate = useSelector(myAddressesSelector);
  const mainAddress = myAddressCordinate.find((item) => item.is_main_address);

  const handleOpenDrawer = () => {
    drawerState[1](true);
  };

  const handleRedirectToPostPage = (id) => {
    !isPostPage && router.push(`/app/post?id=${id}`);
  };

  return (
    <Suspense>
      <Grid
        container
        direction={"column"}
        sx={{
          border: "1px solid #D9D9D9",
          borderRadius: "10px",
        }}
      >
        {/* //////////////////////////////////////// User Avatar And Name ///////////////////////////////////// */}
        <Grid
          sx={{
            borderBottom: "1px solid #EBEBEC",
            px: 2,
            py: 1,
            height: "52px",
          }}
          container
          alignItems={"center"}
        >
          {!isMyPost && <User data={data} />}
        </Grid>

        <Grid contianer direction={"column"} sx={{ p: 2 }}>
          {Boolean(data.media?.length) && (
            <Grid
              container
              sx={{
                backgroundColor: "#ebf3ff",
                border: "8px",
                overflow: "hidden",
              }}
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
                mt: 1,
                fontFamily: "Saira",
              }}
              variant="h6"
            >
              {data.title}
            </Typography>
            {/* //////////////////////////////////////// Description ///////////////////////////////////// */}
            <Typography
              sx={{
                mt: 1,
                color: "#4D4D4D",
                wordBreak: "break-all",
                fontFamily: "Saira",
                fontSize: "14px",
              }}
              variant="subtitle1"
            >
              {data.body}
            </Typography>
            {/* //////////////////////////////////////// Date ///////////////////////////////////// */}
            <Grid
              container
              item
              xs={12}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ mt: 1 }}
            >
              <Grid sx={{ mt: 1 }} contianer justifyContent={"flex-start"} item>
                <Typography
                  sx={{
                    color: "#999999",
                    fontSize: "12px",
                    fontFamily: "Saira",
                  }}
                >
                  {moment(data.created_at).fromNow()}
                </Typography>
              </Grid>
            </Grid>
            {/* //////////////////////////////////////// Distance ///////////////////////////////////// */}

            {/* <Grid
              container
              item
              xs={12}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ mt: 1 }}
            >
              {!isMyPost && data.distance && (
                <Grid
                  container
                  sx={{ mt: 1 }}
                  item
                  xs
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <SocialDistanceIcon />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", ml: 1 }}
                  >
                    {data.distance} meter away from your{" "}
                  </Typography>
                  <Tooltip
                    title={mainAddress?.street}
                    open={addressTooltipOpen}
                    onClose={() => setAddressTooltipOpen(false)}
                    leaveTouchDelay={5000}
                  >
                    <Button
                      sx={{
                        fontSize: "14px",
                        textTransform: "lowercase",
                        padding: 0,
                        width: "auto",
                        minWidth: "auto",
                        pl: "5px",
                      }}
                      onClick={() => setAddressTooltipOpen(true)}
                    >
                      Address
                    </Button>
                  </Tooltip>
                </Grid>
              )}
            </Grid> */}

            {/* //////////////////////////////////////// Actions ///////////////////////////////////// */}
            <Grid container justifyContent={"flex-end"} sx={{ mt: 2 }}>
              <Grid container item xs>
                {!isMyPost && isAuth && <LikesDislikes data={data} />}
              </Grid>
              <Grid container item xs justifyContent={'flex-end'}>
                <Share />

                {/* {!isMyPost && (
                  <Contact
                    data={data}
                    handleClosePostListOnModal={handleClosePostListOnModal}
                    handleChangeTab={handleChangeTab}
                  />
                )} */}
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
      </Grid>
    </Suspense>
  );
};

export default Post;
