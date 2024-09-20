import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { logoutAction } from "store/actions/authActions";
import { authSelector } from "store/slices/authSlices";

const LeftResponsiveDrawer = ({ children, open, setOpen }) => {
  const myInfo = useSelector(myInfoSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelector);
  var h = typeof window !== "undefined" && window.innerHeight;
  const handleLogout = () => {
    dispatch(logoutAction())
      .then(() => {
        router.push("/");
      })
      .finally(() => {
        setOpen(false);
      });
  };

  const handlePushToRoute = (path) => {
    router.push(path);
  };

  return (
    <Drawer
      anchor={"left"}
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiPaper-root": {
          margin: 0,
          borderRadius: "24px",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: "300px",
          pt: 8,
          px: 3,
          height: h + "px",
          boxSizing: "border-box",
          overflowX: "hidden",
          overflow: "hidden",
        },
      }}
    >
      {isAuth && (
        <>
          <Grid container direction="column">
            <Grid sx={{ display: "flex" }} justifyContent={"flex-start"}>
              <Grid
                sx={{
                  p: "2px",
                  border: "1px solid #F2F2F2",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  visibility: !myInfo.avatar && "hidden",
                }}
              >
                <Avatar src={myInfo.avatar?.avatar_thumbnail} />
              </Grid>
              <Grid container direction="column" sx={{ ml: 1 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Saira",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  {myInfo.first_name + " " + myInfo.last_name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Saira",
                    fontSize: "14px",
                  }}
                >
                  @{myInfo.username}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction={"column"}
            sx={{ backgroundColor: "#F7F7F7", borderRadius: "10px", mt: 6 }}
          >
            <ListItemButton onClick={() => handlePushToRoute("/app/profile")}>
              <ListItemText
                primary="Profile"
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "Saira!important",
                    fontSize: "16px",
                    color: "black!important",
                  },
                }}
              />
              <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
            </ListItemButton>
            <ListItemButton onClick={() => handlePushToRoute("/app/my-posts")}>
              <ListItemText
                primary="My Post & Notifications"
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "Saira!important",
                    fontSize: "16px",
                    color: "black!important",
                  },
                }}
              />
              <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
            </ListItemButton>
          </Grid>
        </>
      )}
      {!isAuth && (
        <Grid
          container
          direction={"column"}
          sx={{ backgroundColor: "#F7F7F7", borderRadius: "10px", mt: 6 }}
        >
          <ListItemButton onClick={() => handlePushToRoute("/signin")}>
            <ListItemText
              primary="Sign in / Sign up"
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "Saira!important",
                  fontSize: "16px",
                  color: "black!important",
                },
              }}
            />
            <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
          </ListItemButton>
        </Grid>
      )}

      <Grid container direction={"column"} sx={{ mt: 6, flex: 1 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handlePushToRoute("/")}>
              <ListItemText
                primary="Home"
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "Saira!important",
                    fontSize: "16px",
                    color: "black!important",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ m: 0 }} />
          <ListItem disablePadding>
            <ListItemButton onClick={() => handlePushToRoute("/about-us")}>
              <ListItemText
                primary="About Us"
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "Saira!important",
                    fontSize: "16px",
                    color: "black!important",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ m: 0 }} />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handlePushToRoute("/app/contact-us")}
            >
              <ListItemText
                primary="Contact Us"
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "Saira!important",
                    fontSize: "16px",
                    color: "black!important",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ m: 0 }} />
        </List>
      </Grid>
      {isAuth && (
        <Grid container direction={"column"} sx={{ mt: 6, flex: 1 }}>
          <Divider sx={{ m: 0 }} />
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText
                primary="Logout"
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "Saira!important",
                    fontSize: "16px",
                    color: "red!important",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ m: 0 }} />
        </Grid>
      )}
    </Drawer>
  );
};

export default LeftResponsiveDrawer;
