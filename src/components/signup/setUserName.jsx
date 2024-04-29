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
            setIsUserNameExist(res);
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
          label="username"
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
            fontSize: "13px",
            backgroundColor: "#0298e8",
          }}
          fullWidth
          variant="contained"
          type="submit"
          disabled={isUserNameExist || !isChecked}
        >
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
    </>
  );
};

export default SetUserName;
