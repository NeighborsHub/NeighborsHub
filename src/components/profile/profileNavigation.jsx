"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListItemIcon from "@mui/material/ListItemIcon";
import CallIcon from "assets/svgs/Profile/Call.svg";
import AddressIcon from "assets/svgs/Profile/Address.svg";
import NotificationIcon from "assets/svgs/Profile/Notification.svg";
import BlackLogoutIcon from "assets/svgs/Profile/BlackLogout.svg";
import BlackNotificationIcon from "assets/svgs/Profile/BlackNotification.svg";
import IosSwitch from "components/switch/iosSwitch";
import Profile from "assets/svgs/Profile/Profile.svg";
import { useRouter } from "next/navigation";

const ProfileNavigation = ({ desktopVersion = true }) => {
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

  const handlePushToRoute = (path) => router.push(path);

  return (
    <Grid container direction="column">
      <Grid container sx={{ mt: !desktopVersion ? 4 : 0 }}>
        {!desktopVersion && (
          <Typography
            sx={{
              fontFamily: "Saira",
              color: "rgba(153, 153, 153, 1)!important",
              fontSize: "14px",
              ml: 1,
              mb: 1,
            }}
          >
            Information
          </Typography>
        )}
        <Grid
          container
          direction={"column"}
          sx={{
            backgroundColor: "#F7F7F7",
            borderRadius: "10px",
            border: "1px solid rgba(229, 229, 229, 1)",
          }}
        >
          <ListItemButton
            onClick={() => handlePushToRoute("/app/profile/edit-profile")}
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
                <img src={Profile.src} />
              </Grid>
            </ListItemIcon>
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
            {!desktopVersion && (
              <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
            )}
          </ListItemButton>
          <Divider sx={{ m: 0 }} />
          <ListItemButton
            onClick={() => handlePushToRoute("/app/profile/contact-data")}
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
            {!desktopVersion && (
              <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
            )}
          </ListItemButton>
          <Divider sx={{ m: 0 }} />
          <ListItemButton
            onClick={() => handlePushToRoute("/app/profile/addresses")}
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
            {!desktopVersion && (
              <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
            )}
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
            {!desktopVersion && (
              <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
            )}
          </ListItemButton>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        {!desktopVersion && (
          <Typography
            sx={{
              fontFamily: "Saira",
              color: "rgba(153, 153, 153, 1)!important",
              fontSize: "14px",
              ml: 1,
              mb: 1,
            }}
          >
            Other
          </Typography>
        )}
        <Grid
          container
          direction={"column"}
          sx={{
            backgroundColor: "#F7F7F7",
            borderRadius: "10px",
            border: "1px solid rgba(229, 229, 229, 1)",
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
              primary="Logout"
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "Saira!important",
                  fontSize: "16px",
                  color: "black!important",
                },
              }}
            />
            {!desktopVersion && (
              <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
            )}
          </ListItemButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileNavigation;
