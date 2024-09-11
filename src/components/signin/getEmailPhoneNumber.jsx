"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
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
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import React, { useCallback } from "react";
import { googleAuthAction } from "store/actions/authActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import GoogleGLogo from "assets/svgs/google__G__logo.svg";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "assets/svgs/Email.svg";

const GetEmailPhoneNumber = ({ emailPhoneNumber, setCurrentState }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    setCurrentState(STATUS.PASSWORD_CHECKING);
  };
  const handleSubmitOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    Apis.auth
      .optSending({
        mobile: emailPhoneNumber.value,
      })
      .then(() => {
        enqueueSnackbar("Code Sent", { variant: "success" });
        setCurrentState(STATUS.OTP_CHECKING);
      })
      .catch((message) => {
        enqueueSnackbar(message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(googleAuthAction({ code: tokenResponse.access_token })).then(
        () => router.push("/app")
      );
    },
  });

  return (
    <Grid
      container
      direction="column"
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ flex: 1, width: { lg: "50%", md: "50%", sm: "100%" } }}
    >
      <Grid container direction={"column"} justifyContent={"center"}>
        <InputLabel shrink htmlFor="bootstrap-input">
          Email, Phone Number or Username
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
          onClick={handleSubmitPassword}
        >
          Login With Password
        </Button>
        <Button
          sx={{
            mt: 2,
            borderRadius: "10px",
            height: "47px",
            fontSize: "15px",
            background:
              "conic-gradient(from 180deg at 50% 50%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)",

            color: "white!important",
            "&:hover": {
              backgroundColor: "#f27527",
              color: "white!important",
            },
          }}
          fullWidth
          type="submit"
          name="otpLogin"
          // disabled={
          //   loading || !emailPhoneNumber.value || isNaN(emailPhoneNumber.value)
          // }
          onClick={handleSubmitOtp}
        >
          {loading ? (
            <CircularProgress size={25} sx={{ mx: 1 }} />
          ) : (
            "Login With OTP"
          )}
        </Button>
        <Button
          sx={{
            color: "#999999",
            fontSize: "14px",
            mt: 1.5,
            textAlign: "center",
            minHeight: "20px",
            p: 1,
            fontWeight: "normal",
          }}
        >
          Forget Password
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
            Sign in with google
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default GetEmailPhoneNumber;
