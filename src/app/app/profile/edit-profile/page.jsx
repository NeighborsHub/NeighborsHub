"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import AddIcon from "@mui/icons-material/Add";
import TextField from "components/inputs/bootstrapInput";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ResponsiveSubHeader from "components/header/responsiveSubHeader";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopVersionWithNavigationAndHeader from "components/profile/desktopVersionWithNavigationAndHeader";

const EditProfile = () => {
  const myInfo = useSelector(myInfoSelector);
  const [edit, setEdit] = useState(null);
  const theme = useTheme();
  const desktopVersion = useMediaQuery(theme.breakpoints.up("lg"));
  return desktopVersion ? (
    <DesktopVersionWithNavigationAndHeader>
      <Grid container>
        <Grid container justifyContent={"flex-start"} item xs={12}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Grid
                sx={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                  backgroundColor: "rgba(255, 216, 22, 1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddIcon
                  sx={{
                    fontSize: "24px!important",
                  }}
                />
              </Grid>
            }
          >
            <Avatar
              sx={{ width: "100px", height: "100px" }}
              src={myInfo.avatar?.avatar_thumbnail}
            />
          </Badge>
        </Grid>
        <Grid container direction={"column"} item xs>
          <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 3 }}>
            First Name
          </InputLabel>
          <TextField
            label="First Name"
            disabled={edit !== "name"}
            fullWidth
            id="bootstrap-input"
          />
          <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 2 }}>
            Last Name
          </InputLabel>
          <TextField
            label="First Name"
            disabled={edit !== "name"}
            fullWidth
            id="bootstrap-input"
          />
          <Grid container justifyContent={"flex-end"} sx={{ mt: 2 }}>
            <Button
              sx={{
                background:
                  edit === "name"
                    ? "rgba(255, 216, 22, 1)"
                    : "conic-gradient(from 204.91deg at 77.08% 41.67%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)!important",
                color: edit === "name" ? "black!important" : "white!important",
                height: "33px!important",
                minHeight: "33px",
                width: "140px",
                p: 0,
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "rgba(255, 216, 22, 1)",
                },
              }}
              onClick={() => setEdit(edit === "name" ? null : "name")}
            >
              {edit === "name" ? "Done" : "Edit User Name"}
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <Divider orientation="vertical" />
        </Grid>

        <Grid container direction={"column"} item xs>
          <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 3 }}>
            User Name
          </InputLabel>
          <TextField
            label="First Name"
            disabled={edit !== "userName"}
            fullWidth
            id="bootstrap-input"
          />
          <Grid container justifyContent={"flex-end"} sx={{ mt: 2 }}>
            <Button
              sx={{
                background:
                  edit === "userName"
                    ? "rgba(255, 216, 22, 1)"
                    : "conic-gradient(from 204.91deg at 77.08% 41.67%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)!important",
                color:
                  edit === "userName" ? "black!important" : "white!important",
                height: "33px!important",
                minHeight: "33px",
                width: "140px",
                p: 0,
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "rgba(255, 216, 22, 1)",
                },
              }}
              onClick={() => setEdit(edit === "userName" ? null : "userName")}
            >
              {edit === "userName" ? "Done" : "Edit User Name"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DesktopVersionWithNavigationAndHeader>
  ) : (
    <Grid
      container
      direction="column"
      justifyContent={"flex-start"}
      item
      xs
      sx={{ backgroundColor: "white!important", boxSizing: "border-box" }}
    >
      <ResponsiveSubHeader title={"User Information"} backPath={"/app/profile"} />
      <Grid
        container
        direction={"column"}
        justifyContent={"flex-start"}
        item
        xs
        alignItems={"center"}
        sx={{
          flex: 1,
          px: 2,
          backgroundColor: "white!important",
          boxSizing: "border-box",
        }}
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
            boxSizing: "border-box",
          }}
        >
          <Grid container justifyContent={"center"}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Grid
                  sx={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "100%",
                    backgroundColor: "rgba(255, 216, 22, 1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AddIcon
                    sx={{
                      fontSize: "24px!important",
                    }}
                  />
                </Grid>
              }
            >
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                src={myInfo.avatar?.avatar_thumbnail}
              />
            </Badge>
          </Grid>
          <Grid container direction={"column"}>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 3 }}>
              First Name
            </InputLabel>
            <TextField
              label="First Name"
              disabled={edit !== "name"}
              fullWidth
              id="bootstrap-input"
            />
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 2 }}>
              Last Name
            </InputLabel>
            <TextField
              label="First Name"
              disabled={edit !== "name"}
              fullWidth
              id="bootstrap-input"
            />
            <Grid container justifyContent={"flex-end"} sx={{ mt: 1 }}>
              <Button
                sx={{
                  background:
                    edit === "name"
                      ? "rgba(255, 216, 22, 1)"
                      : "conic-gradient(from 204.91deg at 77.08% 41.67%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)!important",
                  color:
                    edit === "name" ? "black!important" : "white!important",
                  height: "33px!important",
                  minHeight: "33px",
                  width: "140px",
                  p: 0,
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 216, 22, 1)",
                  },
                }}
                onClick={() => setEdit(edit === "name" ? null : "name")}
              >
                {edit === "name" ? "Done" : "Edit User Name"}
              </Button>
            </Grid>
            <Divider />
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 1 }}>
              User Name
            </InputLabel>
            <TextField
              label="First Name"
              disabled={edit !== "userName"}
              fullWidth
              id="bootstrap-input"
            />
            <Grid container justifyContent={"flex-end"} sx={{ mt: 1 }}>
              <Button
                sx={{
                  background:
                    edit === "userName"
                      ? "rgba(255, 216, 22, 1)"
                      : "conic-gradient(from 204.91deg at 77.08% 41.67%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)!important",
                  color:
                    edit === "userName" ? "black!important" : "white!important",
                  height: "33px!important",
                  minHeight: "33px",
                  width: "140px",
                  p: 0,
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 216, 22, 1)",
                  },
                }}
                onClick={() => setEdit(edit === "userName" ? null : "userName")}
              >
                {edit === "userName" ? "Done" : "Edit User Name"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
