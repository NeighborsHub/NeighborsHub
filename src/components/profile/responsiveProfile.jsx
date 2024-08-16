"use client";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { myInfoSelector } from "store/slices/userSlices";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListItemIcon from "@mui/material/ListItemIcon";
import CallIcon from "assets/svgs/Profile/Call.svg";
import AddressIcon from "assets/svgs/Profile/Address.svg";
import NotificationIcon from "assets/svgs/Profile/Notification.svg";
import BlackLogoutIcon from "assets/svgs/Profile/BlackLogout.svg";
import BlackNotificationIcon from "assets/svgs/Profile/BlackNotification.svg";
import Switch from "@mui/material/Switch";
import IosSwitch from "components/switch/iosSwitch";
import { alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import SubHeader from "components/header/subHeader";

const ResponsiveProfile = () => {
  const myInfo = useSelector(myInfoSelector);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutAction())
      .then(() => {
        router.push("/");
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <Grid container direction={"column"} item xs sx={{overflow: 'hidden' , backgroundColor: 'white!important'}}>
      <SubHeader title={"Profile"} backPath={"/app"} />
      <Grid
        container
        direction="column"
        justifyContent={"flex-start"}
        sx={{ flex: 1, px: 2, boxSizing: "border-box", overflow: "auto" }}
      >
        <Grid
          container
          direction="column"
          justifyContent={"flex-start"}
          sx={{
            backgroundColor: "white!important",
            borderRadius: "12px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(229, 229, 229, 1)",
            py: 4,
            px: 2,
          }}
        >
          <Grid
            container
            direction="column"
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Avatar
              alt="Remy Sharp"
              src={myInfo.avatar?.avatar_thumbnail}
              sx={{ width: "100px", height: "100px" }}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Saira",
                mt: 2,
              }}
            >
              {myInfo.first_name + " " + myInfo.last_name}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Saira",
                color: "#999999",
                mt: 1,
              }}
            >
              @{myInfo.username}
            </Typography>
          </Grid>
          <Grid container justifyContent={"center"} sx={{ mt: 2 }}>
            <Button
              sx={{
                background:
                  "conic-gradient(from 204.91deg at 77.08% 41.67%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)!important",
                color: "white!important",
                height: "41px",
                width: "126px",
                p: 0,
              }}
              onClick={() => router.push("/app/profile/edit-profile")}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid container sx={{ mt: 4 }}>
            <Typography
              sx={{
                fontFamily: "Saira",
                color: "rgba(153, 153, 153, 1)!important",
                fontSize: "14px",
                ml: 1,
              }}
            >
              Information
            </Typography>
            <Grid
              container
              direction={"column"}
              sx={{
                backgroundColor: "#F7F7F7",
                borderRadius: "10px",
                border: "1px solid rgba(229, 229, 229, 1)",
                mt: 1,
              }}
            >
              <ListItemButton
                onClick={() => handlePushToRoute("/app/profile")}
                sx={{
                  "&.MuiButtonBase-root": {
                    p: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <Grid
                    sx={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "white!important",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <img src={CallIcon.src} />
                  </Grid>
                </ListItemIcon>
                <ListItemText
                  primary="Contact Data"
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
              <Divider sx={{ m: 0 }} />
              <ListItemButton
                onClick={() => handlePushToRoute("/app/profile")}
                sx={{
                  "&.MuiButtonBase-root": {
                    p: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <Grid
                    sx={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "white!important",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <img src={AddressIcon.src} />
                  </Grid>
                </ListItemIcon>
                <ListItemText
                  primary="Your Address"
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
              <Divider sx={{ m: 0 }} />
              <ListItemButton
                onClick={() => handlePushToRoute("/app/profile")}
                sx={{
                  "&.MuiButtonBase-root": {
                    p: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <Grid
                    sx={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "white!important",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <img src={NotificationIcon.src} />
                  </Grid>
                </ListItemIcon>
                <ListItemText
                  primary="Notification"
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
          </Grid>
          <Grid container sx={{ mt: 4 }}>
            <Typography
              sx={{
                fontFamily: "Saira",
                color: "rgba(153, 153, 153, 1)!important",
                fontSize: "14px",
                ml: 1,
              }}
            >
              Other
            </Typography>
            <Grid
              container
              direction={"column"}
              sx={{
                backgroundColor: "#F7F7F7",
                borderRadius: "10px",
                border: "1px solid rgba(229, 229, 229, 1)",
                mt: 1,
              }}
            >
              <ListItemButton
                sx={{
                  "&.MuiButtonBase-root": {
                    p: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <Grid
                    sx={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(255, 251, 229, 1)!important",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 216, 22, 1)",
                    }}
                  >
                    <img src={BlackNotificationIcon.src} />
                  </Grid>
                </ListItemIcon>
                <ListItemText
                  primary="Push Notification"
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Saira!important",
                      fontSize: "16px",
                      color: "black!important",
                    },
                  }}
                />
                <IosSwitch />
              </ListItemButton>
              <Divider sx={{ m: 0 }} />
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  "&.MuiButtonBase-root": {
                    p: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <Grid
                    sx={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(253, 231, 231, 1)!important",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      border: "1px solid rgba(236, 19, 19, 1)",
                    }}
                  >
                    <img src={BlackLogoutIcon.src} />
                  </Grid>
                </ListItemIcon>
                <ListItemText
                  primary="Your Address"
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResponsiveProfile;
