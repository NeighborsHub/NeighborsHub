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
import {
  userNameCheckingAction,
  userNameUpdateAction,
} from "store/actions/authActions";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";

let interval = null;

const SetUserName = ({
  setCurrentState,
  userName,
  setUserName,
  isGoogle,
  otp,
}) => {
  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isFirstTyping, setIsFirstTyping] = useState(true);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleUserNameChecking = async ({ target: { value } }) => {
    setIsFirstTyping(false);
    clearInterval(interval);
    setUserName(value);
    if (value.length > 2) {
      interval = setTimeout(() => {
        setLoading(true);
        const result = dispatch(userNameCheckingAction({ username: value }))
          .then((res) => {
            console.log(res, "gggggggg");
            setIsUserNameExist(res?.is_available);
            isChecked(true);
          })
          .catch(() => {
            setIsChecked(false);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGoogle) {
      dispatch(userNameUpdateAction({ username: userName })).then((res) => {
        setCurrentState(STATUS.PASSWORD_SETTING);
      });
    } else {
      setCurrentState(STATUS.PASSWORD_SETTING);
    }
  };

  const handleBack = () => {
    setUserName("");
    otp.onChange({ target: { value: "" } });
    setCurrentState(STATUS.GET_EMAIL_MOBILE);
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
            Username
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
            name="userName"
            autocomplete="one-time-code"
            onChange={handleUserNameChecking}
            value={userName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {!isFirstTyping &&
                    (loading ? (
                      <HourglassEmptyIcon />
                    ) : isUserNameExist ? (
                      <CheckCircleOutlinedIcon sx={{ fill: "green" }} />
                    ) : (
                      <HighlightOffOutlinedIcon sx={{ fill: "red" }} />
                    ))}
                </InputAdornment>
              ),
            }}
          />
          {isUserNameExist && isChecked && (
            <Typography sx={{ fontSize: "14px", color: "red" }}>
              This username is not available
            </Typography>
          )}
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
            // disabled={isUserNameExist || !isChecked}
          >
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
    </>
  );
};

export default SetUserName;
