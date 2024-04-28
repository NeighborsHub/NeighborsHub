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

const PasswordSetting = ({
  password,
  emailPhoneNumber,
  isGoogle,
  otp,
  userName,
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

  const handleBack = () => {
    password.onChange({ target: { value: "" } });
    if (isGoogle) {
      setCurrentState(STATUS.SET_USER_NAME);
    }
  };

  const handleSkip = () => {
    router.push("/app");
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <TextField
          sx={{
            mt: 1,
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
          label="password"
          type="password"
          name="your password1"
          autocomplete="one-time-code"
          {...password}
        />
        <TextField
          sx={{
            mt: 2,
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
          label="repeat your password"
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
        {!isGoogle && (
          <Button
            sx={{
              mt: 2,
              borderRadius: "10px",
              height: "47px",
              fontSize: "13px",
              backgroundColor: "transparent",
              border: "1px solid #e85a02",
              color: "#e85a02",
              "&:hover": {
                backgroundColor: "#f27527",
                border: "1px solid #e85a02",
                color: "white",
              },
            }}
            fullWidth
            variant="outlined"
            // disabled={loading}
            color="secondary"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
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
