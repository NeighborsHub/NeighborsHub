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
import IconButton from "@mui/material/IconButton";
import Save from "components/posts/items/Save";
import Chat from "components/posts/items/chat";
import Hidden from "@mui/material/Hidden";
import LocalDistanceIcon from "assets/svgs/LocalDistance.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRouteQuery } from "utils/route";

const Post = ({
  handleOpenModal,
  showLocationOnMap,
  data,
  handleClosePostsList,
  handleClosePostListOnModal,
  isPostPage,
  handleChangeTab,
  children,
}) => {
  const myInfo = useSelector(myInfoSelector);
  const isAuth = useSelector(authSelector);
  const isMyPost = myInfo.id === data.created_by?.id;
  const router = useRouter();
  const [addressTooltipOpen, setAddressTooltipOpen] = useState(false);
  const myAddressCordinate = useSelector(myAddressesSelector);
  const mainAddress = myAddressCordinate.find((item) => item.is_main_address);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const routeQuery = useRouteQuery();

  const handleOpenDrawer = () => {
    drawerState[1](true);
  };

  const handleRedirectToPostPage = (id) => {
    !isPostPage && router.push(`/app/post?id=${id}`);
  };

  const handlePushToChat = (data) => {
    routeQuery(
      {
        state: "conversation",
        conversationId: data.common_chat,
        userId: data.created_by.id,
        postId: data.id,
      },
      "/app/"
    );
  };

  return (
    <Suspense>
      <Grid
        container
        direction={"column"}
        sx={{
          border: "1px solid rgba(217, 217, 217, 0.5)",
          borderRadius: "12px",
          overflow: "auto",
        }}
      >
        {/* //////////////////////////////////////// User Avatar And Name ///////////////////////////////////// */}
        {!isPostPage && (
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
        )}

        <Grid container direction={"column"} sx={{ p: { xs: 1, md: 2 } }}>
          <Grid container item sx={{ maxHeight: "300px" }}>
            {Boolean(data.media?.length) && (
              <Grid
                container
                sx={{
                  backgroundColor: "#ebf3ff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "100%",
                }}
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={!isPostPage ? 12 : isMd ? 12 : 8}
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
            {isPostPage && (
              <Grid
                container
                item
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "100%",
                  ml: Boolean(data.media?.length) ? 2 : 0,
                }}
                xs
              >
                {children}
              </Grid>
            )}
          </Grid>

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
              {data.title?.slice(0, 30)}
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
              <Grid sx={{ mt: 1 }} container justifyContent={"flex-start"} item>
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

            <Grid
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
                  <img src={LocalDistanceIcon.src} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#999999", fontSize: "12px", ml: 1 }}
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
                        fontSize: "12px",
                        textTransform: "lowercase",
                        padding: 0,
                        m: 0,
                        width: "auto",
                        minWidth: "auto",
                        marginTop: "2px",
                        pl: "3px",
                        color: "black!important",
                        fontWeight: "normal!important",
                        minHeight: 0,
                      }}
                      onClick={() => setAddressTooltipOpen(true)}
                    >
                      Address
                    </Button>
                  </Tooltip>
                </Grid>
              )}
            </Grid>

            {/* //////////////////////////////////////// Actions ///////////////////////////////////// */}
            <Grid container justifyContent={"flex-start"} sx={{ mt: 2 }}>
              {isPostPage ? (
                <Grid container>
                  {!isMyPost && isAuth && <LikesDislikes data={data} />}
                  <Grid sx={{ display: "flex" }}>
                    <Save />
                    <Share />
                    <Chat />
                    <Dots
                      showLocationOnMap={!isMyPost}
                      isMyPost={isMyPost}
                      handleOpenModal={handleOpenModal}
                      data={data}
                      handleClosePostsList={handleClosePostsList}
                    />
                  </Grid>
                </Grid>
              ) : (
                <>
                  <Grid container item xs>
                    {!isMyPost && isAuth && <LikesDislikes data={data} />}
                  </Grid>
                  <Grid container item xs justifyContent={"flex-end"}>
                    <Save />
                    <Share />
                    {(showLocationOnMap || isMyPost) && (
                      <Dots
                        showLocationOnMap={!isMyPost}
                        isMyPost={isMyPost}
                        handleOpenModal={handleOpenModal}
                        data={data}
                        handleClosePostsList={handleClosePostsList}
                      />
                    )}
                    {/* {!isMyPost && (
                  <Contact
                    data={data}
                    handleClosePostListOnModal={handleClosePostListOnModal}
                    handleChangeTab={handleChangeTab}
                  />
                )} */}
                  </Grid>
                </>
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

          {/* //////////////////////////////////////// More Details ///////////////////////////////////// */}
          {!isPostPage && (
            <Grid container justifyContent={"space-evenly"}>
              <IconButton
                variant="contained"
                onClick={() => handleRedirectToPostPage(data.id)}
                sx={{
                  backgroundColor: "#EBEBEB",
                  mt: 1,
                  borderRadius: "10px",
                  fontFamily: "Saira",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "14px",
                  flex: 1,
                  mr: 0.5,
                  "&:hover": {
                    backgroundColor: "#dedede",
                  },
                }}
              >
                More Details
              </IconButton>
              <IconButton
                variant="contained"
                onClick={() => handlePushToChat(data)}
                sx={{
                  backgroundColor: "#FFD816",
                  mt: 1,
                  borderRadius: "10px",
                  fontFamily: "Saira",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "14px",
                  flex: 1,
                  ml: 0.5,
                  "&:hover": {
                    backgroundColor: "#fce46a",
                  },
                }}
              >
                Chat
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Suspense>
  );
};

export default Post;
