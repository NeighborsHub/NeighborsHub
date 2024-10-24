"use client";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { myInfoSelector } from "store/slices/userSlices";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import ResponsiveSubHeader from "components/header/responsiveSubHeader";
import ProfileNavigation from "components/profile/profileNavigation";

const ResponsiveProfile = () => {
  const myInfo = useSelector(myInfoSelector);
  const router = useRouter();

  return (
    <Grid
      container
      direction={"column"}
      item
      xs
      sx={{ overflow: "hidden", backgroundColor: "white!important" }}
    >
      <ResponsiveSubHeader title={"Profile"} backPath={"/app"} />
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
          <Grid container justifyContent={"center"} sx={{ my: 2 }}>
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
          <ProfileNavigation />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResponsiveProfile;
