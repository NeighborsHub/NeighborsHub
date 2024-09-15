"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { useInputHandler } from "hooks/useInputHandler";
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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { startLoading, endLoading } from "store/slices/appSlices";
import { setGooglePassword } from "store/actions/authActions";
import InputLabel from "@mui/material/InputLabel";

const PasswordSetting = ({
  password,
  emailPhoneNumber,
  isGoogle,
  otp,
  userName,
  setCurrentState,
}) => {
  const repeatPassword = useInputHandler();
  ("");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.value === repeatPassword.value) {
      dispatch(startLoading());
      if (isGoogle) {
        dispatch(
          setGooglePassword({
            password: password.value,
          })
        )
          .then((res) => {
            enqueueSnackbar("Successful", { variant: "success" });
            router.push("/app");
            typeof window !== "undefined" &&
              localStorage.setItem("token", res.access_token);
          })
          .catch((message) => {
            enqueueSnackbar(message, { variant: "error" });
          })
          .finally(() => {
            dispatch(endLoading());
          });
      } else {
        Apis.auth
          .register({
            email_mobile: emailPhoneNumber.value,
            password: password.value,
            otp: otp.value,
            username: userName,
          })
          .then((res) => {
            enqueueSnackbar("Successful", { variant: "success" });
            router.push("/app");
            typeof window !== "undefined" &&
              localStorage.setItem("token", res.access_token);
          })
          .catch((message) => {
            enqueueSnackbar(message, { variant: "error" });
          })
          .finally(() => {
            dispatch(endLoading());
          });
      }
    } else {
      enqueueSnackbar("password and repeat password are not the same", {
        variant: "error",
      });
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    password.onChange({ target: { value: "" } });
    repeatPassword.onChange({ target: { value: "" } });
    setCurrentState(STATUS.SET_USER_NAME);
  };

  const handleSkip = (e) => {
    e.preventDefault();
    Apis.auth
      .register({
        email_mobile: emailPhoneNumber.value,
        otp: otp.value,
        username: userName,
      })
      .then((res) => {
        enqueueSnackbar("Successful", { variant: "success" });
        router.push("/app");
        typeof window !== "undefined" &&
          localStorage.setItem("token", res.access_token);
      })
      .catch((message) => {
        enqueueSnackbar(message, { variant: "error" });
      })
      .finally(() => {
        dispatch(endLoading());
      });
  };

  return (
    <>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          // justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <Grid
          container
          direction={"column"}
          sx={{ flex: 1, width: { lg: "70%", md: "50%", sm: "100%" } }}
        >
          <InputLabel shrink htmlFor="bootstrap-input">
            Password
          </InputLabel>
          <TextField
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
            fullWidth
            variant="outlined"
            type="password"
            name="your password1"
            autocomplete="one-time-code"
            {...password}
          />
          <InputLabel shrink htmlFor="bootstrap-input" sx={{ mt: 2 }}>
            Repeat Password
          </InputLabel>
          <TextField
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
            fullWidth
            variant="outlined"
            type="password"
            name="your repeat password"
            autocomplete="one-time-code"
            {...repeatPassword}
          />
          <Button
            sx={{
              mt: 3,
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
            // disabled={loading}
          >
            {/* {loading ? <CircularProgress size={25} sx={{ mx: 1 }} /> : "Submit"} */}
            Submit
          </Button>
          {!isGoogle && (
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
                  background:
                    "conic-gradient(from 180deg at 50% 50%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)",
                  color: "white!important",
                },
              }}
              fullWidth
              // disabled={loading}
              color="secondary"
              onClick={handleBack}
            >
              Back
            </Button>
          )}
        </Grid>
      </form>
      {isGoogle && (
        <Grid container sx={{ mt: 3 }} justifyContent={"flex-end"}>
          <Button type="text" onClick={handleSkip}>
            Skip For Now
          </Button>
        </Grid>
      )}
    </>
  );
};

export default PasswordSetting;
