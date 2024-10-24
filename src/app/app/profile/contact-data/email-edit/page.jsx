"use client";
import Grid from "@mui/material/Grid";
import ResponsiveSubHeader from "components/header/responsiveSubHeader";
import TextField from "components/inputs/bootstrapInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "assets/svgs/Edit.svg";

const EmailEdit = () => {
  return (
    <Grid container direction={"column"} item xs>
      <ResponsiveSubHeader title={"Verify Your Email"} backPath={"/app/profile/contact-data"} />
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
          <Grid sx={{ mt: 2}}>
            <Typography
              sx={{ fontSize: "15px", color: "black", textAlign: "center" }}
            >
              Tap On The Link Bellow To Send A Code To Your Email Account
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ mt: 2 }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                color: "rgba(26, 153, 255, 1)",
                textAlign: "center",

                mr: 1,
              }}
            >
              hosseini.soheil@gmail.com
            </Typography>
            <img src={EditIcon.src} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmailEdit;
