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
      dispatch(googleAuthAction({ code: tokenResponse.access_token })).then(() =>
        router.push("/app")
      );
    },
  });

  return (
    <Grid
      container
      item
      xs={8}
      direction="column"
      justifyContent={"space-between"}
      sx={{ flex: 1 }}
    >
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
            color: "black",
            border: "1px solid gray",
            // width: "70%",
            fontSize: "14px",
            py: 1,
            borderRadius: "10px",
            height: "47px",
          }}
          onClick={() => login()}
        >
          <img src={GoogleGLogo.src} />
          <Typography sx={{ fontSize: "13px", ml: 1 }}>
            Sign in with google
          </Typography>
        </Button>
      </Grid>
      <Divider sx={{ my: 3 }} />

      <Grid container direction={"column"} justifyContent={"center"}>
        <TextField
          fullWidth
          variant="outlined"
          label="Email, Phone Number or Username"
          // autocomplete="off"
          name="your phone"
          sx={{
            borderRadius: "30px",
            "& .MuiOutlinedInput-notchedOutline": {
              fontSize: "12px",
              borderRadius: "10px!important",
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
          {...emailPhoneNumber}
          // size="small"
        />
        <Button
          sx={{
            mt: 2,
            borderRadius: "10px",
            height: "47px",
            fontSize: "13px",
            backgroundColor: "#0298e8",
          }}
          fullWidth
          variant="contained"
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
            fontSize: "13px",
            backgroundColor: "#e85a02",
            "&:hover": {
              backgroundColor: "#f27527",
            },
          }}
          fullWidth
          variant="contained"
          type="submit"
          color="secondary"
          name="otpLogin"
          disabled={
            loading || !emailPhoneNumber.value || isNaN(emailPhoneNumber.value)
          }
          onClick={handleSubmitOtp}
        >
          {loading ? (
            <CircularProgress size={25} sx={{ mx: 1 }} />
          ) : (
            "Login With OTP"
          )}
        </Button>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container justifyContent={"center"}>
        <Typography
          sx={{ mr: 1, fontSize: "14px" }}
        >{`You don't have account? `}</Typography>
        <Link href="/signup">
          <Typography
            color="primary"
            sx={{ fontSize: "14px" }}
          >{`Submit here`}</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default GetEmailPhoneNumber;
