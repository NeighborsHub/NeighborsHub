import { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import { useSnackbar } from "notistack";
import { myInfoSelector } from "store/slices/userSlices";
import { useInputHandler } from "hooks/useInputHandler";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMyInfo,
  setMyAvatarAction,
  updateUsernameAction,
} from "store/actions/userActions";

import { userNameCheckingAction } from "store/actions/authActions";

import AddIcon from "@mui/icons-material/Add";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

let interval;

const PersonalData = () => {
  const myInfo = useSelector(myInfoSelector);
  const { enqueueSnackbar } = useSnackbar();
  const firstName = useInputHandler("");
  const lastName = useInputHandler("");
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [isFirstTyping, setIsFirstTyping] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const avatarInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    firstName.onChange({ target: { value: myInfo.first_name } });
    lastName.onChange({ target: { value: myInfo.last_name } });
  }, [myInfo]);

  const handleRegister = async () => {
    dispatch(
      updateMyInfo({ first_name: firstName.value, last_name: lastName.value })
    )
      .then((res) => {
        enqueueSnackbar("Profile Updated Successfuly", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err, { variant: "error" });
      });
    // const result = await Apis.auth.register({
    //   email_mobile:
    // })
  };

  const handleChooseAvatarFile = () => {
    avatarInputRef.current.click();
  };

  const handleSetAvatarImage = (e) => {
    let formData = new FormData();
    formData.append(`avatar`, e.target.files[0]);
    dispatch(setMyAvatarAction(formData));
  };

  const handleUpdateUserName = () => {
    dispatch(updateUsernameAction({ username: username.value }));
  };

  const handleUserNameChecking = async ({ target: { value } }) => {
    setIsFirstTyping(false);
    clearInterval(interval);
    setUsername(value);
    if (value.length > 2) {
      interval = setTimeout(() => {
        setLoading(true);
        dispatch(userNameCheckingAction({ username: value }))
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

  return (
    <Grid container direction="column" alignItems={"center"} sx={{ px: 3 }}>
      <Grid container direction="column" alignItems={"center"} sx={{ my: 3 }}>
        <Badge
          badgeContent={<AddIcon />}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              top: "10px",
              right: "10px",
              width: "30px",
              height: "30px",
              borderRadius: "100%",
            },
            cursor: "pointer",
          }}
          onClick={handleChooseAvatarFile}
        >
          <Avatar
            alt="Remy Sharp"
            src={myInfo.avatar?.avatar_thumbnail}
            sx={{ width: "100px", height: "100px" }}
          />
        </Badge>
        <input
          type="file"
          ref={avatarInputRef}
          style={{ width: 0, height: 0, opacity: "hidden" }}
          onChange={handleSetAvatarImage}
        />
      </Grid>
      <Grid container spacing={3} alignItems={"center"}>
        <Grid item md={6} xs={12} lg={5}>
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="First Name"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            {...firstName}
          />
        </Grid>
        <Grid item md={6} xs={12} lg={5}>
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="Last Name"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            {...lastName}
          />
        </Grid>
        <Grid container item lg={2}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleRegister}
            sx={{ height: "50px" }}
          >
            submit
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Divider sx={{ m: 4, flex: 1 }} />
      </Grid>
      <Grid container spacing={3} alignItems={"center"}>
        <Grid container item xs={12} lg={10}>
          <TextField
            fullWidth
            label="User Name"
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
            onChange={handleUserNameChecking}
            value={username}
          />
        </Grid>
        <Grid container item xs={12} lg={2} sx={{ padding: "0" }}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleUpdateUserName}
            sx={{ height: "50px" }}
            disabled={isUserNameExist || !isChecked}
          >
            submit
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        <Typography sx={{ fontSize: "12px", color: "lightGray" }}>
          This name will be displayed to other users.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PersonalData;
