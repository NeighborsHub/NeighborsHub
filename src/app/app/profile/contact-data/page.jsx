"use client";
import Grid from "@mui/material/Grid";
import ResponsiveSubHeader from "components/header/responsiveSubHeader";
import TextField from "components/inputs/bootstrapInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopVersionWithNavigationAndHeader from "components/profile/desktopVersionWithNavigationAndHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const ContactData = () => {
  const router = useRouter();
  const theme = useTheme();
  const desktopVersion = useMediaQuery(theme.breakpoints.up("lg"));

  return desktopVersion ? (
    <DesktopVersionWithNavigationAndHeader>
      <Grid>
        <Typography sx={{ color: "gray", fontSize: "16px" }}>
          You can edit your contacts data here
        </Typography>
      </Grid>
      <Grid container item xs sx={{ mt: 4 }}>
        <Grid container sx={{ position: "relative" }} item xs>
          <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 1 }}>
            Phone Number
          </InputLabel>
          <TextField label="First Name" fullWidth id="bootstrap-input" />
          <Button
            onClick={() =>
              router.push("/app/profile/contact-data/edit-phone-number")
            }
            sx={{
              backgroundColor: "rgba(82, 224, 89, 1)",
              position: "absolute",
              top: "39px",
              right: "8px",
              minHeight: "30px",
              height: "30px",
              color: "black!important",
              fontWeight: "normal!important",
              width: "100px",
              "&:hover": {
                backgroundColor: "rgba(82, 224, 89, 1)",
              },
            }}
          >
            Verified
          </Button>
        </Grid>
        <Grid>
          <Divider orientation="vertical" />
        </Grid>
        <Grid container sx={{ position: "relative" }} item xs>
          <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 1 }}>
            Email
          </InputLabel>
          <TextField label="First Name" fullWidth id="bootstrap-input" />
          <Button
            onClick={() => router.push("/app/profile/contact-data/email-edit")}
            sx={{
              backgroundColor: "rgba(255, 216, 22, 1)",
              position: "absolute",
              top: "39px",
              right: "8px",
              minHeight: "30px",
              height: "30px",
              color: "black!important",
              fontWeight: "normal!important",
              width: "100px",
              "&:hover": {
                backgroundColor: "rgba(255, 216, 22, 1)",
              },
            }}
          >
            Verify
          </Button>
        </Grid>
      </Grid>
    </DesktopVersionWithNavigationAndHeader>
  ) : (
    <Grid container direction={"column"} item xs>
      <ResponsiveSubHeader title={"Contact Data"} backPath={"/app/profile"} />
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
          mb: 2,
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
          item
          xs
        >
          <Grid container sx={{ position: "relative" }}>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 1 }}>
              Phone Number
            </InputLabel>
            <TextField label="First Name" fullWidth id="bootstrap-input" />
            <Button
              onClick={() =>
                router.push("/app/profile/contact-data/edit-phone-number")
              }
              sx={{
                backgroundColor: "rgba(82, 224, 89, 1)",
                position: "absolute",
                top: "39px",
                right: "8px",
                minHeight: "30px",
                height: "30px",
                color: "black!important",
                fontWeight: "normal!important",
                width: "100px",
                "&:hover": {
                  backgroundColor: "rgba(82, 224, 89, 1)",
                },
              }}
            >
              Verified
            </Button>
          </Grid>
          <Grid container sx={{ mt: 1, position: "relative" }}>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 1 }}>
              Email
            </InputLabel>
            <TextField label="First Name" fullWidth id="bootstrap-input" />
            <Button
              onClick={() =>
                router.push("/app/profile/contact-data/email-edit")
              }
              sx={{
                backgroundColor: "rgba(255, 216, 22, 1)",
                position: "absolute",
                top: "39px",
                right: "8px",
                minHeight: "30px",
                height: "30px",
                color: "black!important",
                fontWeight: "normal!important",
                width: "100px",
                "&:hover": {
                  backgroundColor: "rgba(255, 216, 22, 1)",
                },
              }}
            >
              Verify
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ContactData;
