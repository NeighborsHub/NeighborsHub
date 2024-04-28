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

const SetUserName = ({ setCurrentState }) => {
  const [userName, setUserName] = useState("");
  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleUserNameChecking = async ({ target: { value } }) => {
    setUserName(value);
    if (value.length > 2) {
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userNameUpdateAction({ username: userName })).then((res) => {
      setCurrentState(STATUS.PASSWORD_SETTING);
    });
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
                {loading ? (
                  <HourglassEmptyIcon />
                ) : isUserNameExist ? (
                  <CheckCircleOutlinedIcon />
                ) : (
                  <HighlightOffOutlinedIcon />
                )}
              </InputAdornment>
            ),
          }}
        />
        {isUserNameExist && isChecked && (
          <Typography>This username is not available</Typography>
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
      </form>
    </>
  );
};

export default SetUserName;
