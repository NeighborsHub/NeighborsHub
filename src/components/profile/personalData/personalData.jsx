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
import { updateMyInfo, setMyAvatarAction } from "store/actions/userActions";
import AddIcon from "@mui/icons-material/Add";
import Badge from "@mui/material/Badge";

const PersonalData = () => {
  const myInfo = useSelector(myInfoSelector);
  const { enqueueSnackbar } = useSnackbar();
  const firstName = useInputHandler("");
  const lastName = useInputHandler("");
  const phoneNumber = useInputHandler("");
  const email = useInputHandler("");

  const avatarInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    firstName.onChange({ target: { value: myInfo.first_name } });
    lastName.onChange({ target: { value: myInfo.last_name } });
    phoneNumber.onChange({ target: { value: myInfo.mobile } });
    email.onChange({ target: { value: myInfo.email } });
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
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="first name"
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
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="last name"
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
      </Grid>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleRegister}
      >
        submit
      </Button>
    </Grid>
  );
};

export default PersonalData;
