"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
// import { MuiTelInput } from "mui-tel-input";
// import ReactPhoneInput from 'react-phone-input-material-ui';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import Apis from "services/apis";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import STATUS from "components/signup/status";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { startLoading, endLoading } from "store/slices/appSlices";
import GoogleGLogo from "assets/svgs/google__G__logo.svg";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleAuthAction } from "store/actions/authActions";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "assets/svgs/Email.svg";

const GetEmailPhoneNumber = ({
  emailPhoneNumber,
  setCurrentState,
  setIsGoogle,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoading());

    Apis.auth
      .preRegister({
        email_mobile: emailPhoneNumber.value,
      })
      .then(() => {
        setCurrentState(STATUS.OTP_CHECKING);
      })
      .catch((message) => {
        enqueueSnackbar(message, { variant: "error" });
      })
      .finally(() => {
        dispatch(endLoading());
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(googleAuthAction({ code: tokenResponse.access_token })).then(
        (res) => {
          if (!res.is_register) {
            setCurrentState(STATUS.PASSWORD_SETTING);
            setIsGoogle(true);
          } else {
            router.push("/app");
          }
        }
      );
    },
  });

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ flex: 1, width: { lg: "70%", md: "50%", sm: "100%" } }}
      >
        <Grid container direction={"column"} justifyContent={"center"}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Email Or Phone Number
          </InputLabel>

          <TextField
            fullWidth
            variant="outlined"
            // autocomplete="off"
            name="your phone"
            sx={{
              borderRadius: "30px",
              "& .MuiOutlinedInput-notchedOutline": {
                fontSize: "12px",
                borderRadius: "10px!important",
                borderColor: "#E6E6E6",
                borderWidth: "2px",
              },
              "& .MuiInputBase-input": {
                padding: "12px 20px",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "darkenGray",
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={EmailIcon.src} />
                </InputAdornment>
              ),
            }}
            {...emailPhoneNumber}
            // size="small"
          />
          <Button
            sx={{
              mt: 2,
              borderRadius: "10px",
              height: "47px",
              fontSize: "15px",
              backgroundColor: "#FFD816",
              color: "black!important",
              "&:hover": {
                backgroundColor: "#FFD816",
                color: "black!important",
              },
            }}
            fullWidth
            type="submit"
            disabled={loading || !emailPhoneNumber.value}
            name="passwordLogin"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid container alignItems={"center"} sx={{ my: 2 }}>
          <Divider
            sx={{ my: 3, flex: 1, height: "2px", backgroundColor: "#999999" }}
          />
          <Typography
            sx={{
              width: "40px",
              textAlign: "center",
              color: "#999999",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            or
          </Typography>
          <Divider
            sx={{ my: 3, flex: 1, height: "2px", backgroundColor: "#999999" }}
          />
        </Grid>

        <Grid container justifyContent={"center"}>
          {/* <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleLoginFailuer}
          useOneTap
        /> */}
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: "#666666",
              background:
                "linear-gradient(270deg, rgba(32, 35, 40, 0.1) 0%, rgba(90, 101, 121, 0.1) 50%, rgba(32, 35, 40, 0.1) 100%)",
              borderColor: "transparent!important",
              py: 1,
              borderRadius: "10px",
              height: "40px",
            }}
            onClick={() => login()}
          >
            <img src={GoogleGLogo.src} />
            <Typography sx={{ fontSize: "15px", ml: 1 }}>
              Sign up with google
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default GetEmailPhoneNumber;
