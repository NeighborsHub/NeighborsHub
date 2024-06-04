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

const GetEmailPhoneNumber = ({
  emailPhoneNumber,
  setCurrentState,
  setIsGoogle,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();

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
      dispatch(googleAuthAction({ code: tokenResponse.access_token })).then((res) => {
        if (!res.is_register) {
          setCurrentState(STATUS.PASSWORD_SETTING);
          setIsGoogle(true);
        } else {
          router.push("/app");
        }
      });
    },
  });

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <TextField
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
          fullWidth
          variant="outlined"
          label="Email Or Phone Number"
          // autocomplete="off"
          name="your phone"
          {...emailPhoneNumber}
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
          // disabled={loading}
        >
          {/* {loading ? <CircularProgress size={25} sx={{ mx: 1 }} /> : "Submit"} */}
          Submit
        </Button>
      </form>
      <Divider sx={{ my: 3 }} />

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
            Sign Up with google
          </Typography>
        </Button>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid sx={{ mt: 2 }} container justifyContent={"center"}>
        <Typography
          sx={{ mr: 1, fontSize: "14px" }}
        >{`You have already submited? `}</Typography>
        <Link href="/signin">
          <Typography
            color="primary"
            sx={{ fontSize: "14px" }}
          >{`login here`}</Typography>
        </Link>
      </Grid>
    </>
  );
};

export default GetEmailPhoneNumber;
