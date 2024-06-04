import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import Divider from "@mui/material/Divider";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import IconButton from "@mui/material/IconButton";
import { FeedbackAction } from "store/actions/appActions";
import { useInputHandler } from "hooks/useInputHandler";
import { useDispatch } from "react-redux";
const Footer = () => {
  const name = useInputHandler("");
  const email = useInputHandler("");
  const message = useInputHandler("");
  const dispatch = useDispatch();
  const handleSubmitFeedback = () => {
    dispatch(
      FeedbackAction({
        name: name.value,
        email: email.value,
        message: message.value,
      })
    ).then(() => {
      name.onChange({ target: { value: "" } });
      email.onChange({ target: { value: "" } });
      message.onChange({ target: { value: "" } });
    });
  };

  return (
    <Grid container sx={{ mt: 4, pt: 2, pb: 8 }} direction={"row-reverse"}>
      <Grid item lg={5} md={6} sm={6} xs={12}>
        <Typography sx={{ fontWeight: "bold" }}>Feedback</Typography>
        <Typography sx={{ mt: 1 }}>Stay connected with us </Typography>
        <Grid
          container
          sx={{ mt: 3 }}
          direction={"column"}
          justifyContent={"flex-start"}
        >
          <TextField label="Name" {...name} />
          <TextField sx={{ mt: 1 }} label="Email Address" {...email} />
          <TextField
            sx={{ mt: 1 }}
            label="Your Message"
            multiline
            {...message}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundImage: "linear-gradient(90deg, #0D869C, #3BB4DD)",
              //   borderRadius: "15px",
            }}
            onClick={handleSubmitFeedback}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Hidden smUp>
        <Divider sx={{ width: "100%", my: 4 }} />
      </Hidden>
      <Grid
        item
        lg={3}
        md={6}
        sm={6}
        xs={12}
        direction={"column"}
        justifyContent={"center"}
        sx={{ mt: { sm: 0, xs: 2 } }}
      >
        <Typography
          sx={{ fontWeight: "bold", textAlign: { lg: "left", xs: "center" } }}
        >
          About Us
        </Typography>
        <Typography sx={{ mt: 2, textAlign: { lg: "left", xs: "center" } }}>
          Services
        </Typography>
        <Typography sx={{ mt: 2, textAlign: { lg: "left", xs: "center" } }}>
          FAQ
        </Typography>
        <Typography sx={{ mt: 2, textAlign: { lg: "left", xs: "center" } }}>
          Support
        </Typography>
        <Hidden lgUp>
          <Grid container sx={{ mt: 9, pl: 1 }} justifyContent={"center"}>
            <IconButton sx={{ mr: 1, color: "black" }}>
              <FacebookIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <IconButton sx={{ mr: 1, color: "black" }}>
              <InstagramIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <IconButton sx={{ mr: 1, color: "black" }}>
              <XIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <IconButton sx={{ mr: 1, color: "black" }}>
              <YouTubeIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Grid>
        </Hidden>
      </Grid>
      <Hidden lgDown>
        <Grid item md={6} lg={4} sm={6} xs={12}>
          <Typography
            sx={{
              // fontFamily: "Ephesis-Regular",
              fontWeight: "bolder",
              display: "flex",
              alignItems: "flex-end",
              fontSize: "24px",
              textDecoration: "underline",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <LocationOn
              sx={{
                fontSize: "35px",
              }}
            />
            NeighborsHub
          </Typography>
          <Grid container sx={{ mt: 2, pl: 1 }}>
            <IconButton sx={{ mr: 1, color: "black" }}>
              <FacebookIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <IconButton sx={{ mr: 1, color: "black" }}>
              <InstagramIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <IconButton sx={{ mr: 1, color: "black" }}>
              <XIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <IconButton sx={{ mr: 1, color: "black" }}>
              <YouTubeIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Footer;
