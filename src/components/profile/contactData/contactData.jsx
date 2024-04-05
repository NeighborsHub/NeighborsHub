import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PhoneNumberDialog from "components/profile/contactData/phoneNumberDialog";
import EmailDialog from "components/profile/contactData/emailDialog";
import { useSelector, useDispatch } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import { useInputHandler } from "hooks/useInputHandler";
import Typography from "@mui/material/Typography";

const ContactData = () => {
  const myInfo = useSelector(myInfoSelector);
  const phoneNumber = useInputHandler("");
  const email = useInputHandler("");

  useEffect(() => {
    phoneNumber.onChange({ target: { value: myInfo.mobile } });
    email.onChange({ target: { value: myInfo.email } });
  }, [myInfo]);

  const [openPhoneNumberDialog, setOpenPhoneNumberDialog] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);

  const handleOpenPhoneNumberDialog = () => {
    setOpenPhoneNumberDialog(true);
  };

  const handleOpenEmailDialog = () => {
    setOpenEmailDialog(true);
  };

  const handleClosePhoneNumberDialog = () => {
    setOpenPhoneNumberDialog(false);
  };

  const handleClostEmailDialog = () => {
    setOpenEmailDialog(false);
  };
  return (
    <Grid
      xs
      item
      container
      alignContent={"flex-start"}
      spacing={3}
      sx={{ mx: 2, flex: 1, width: "100%" }}
    >
      <Grid item xs={12}>
        <Typography sx={{ color: "gray", mb: 2 }}>
          You can edit your contacts data here
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          label="phoneNumber"
          onClick={handleOpenPhoneNumberDialog}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <PhoneIphoneIcon />
              </InputAdornment>
            ),
          }}
          {...phoneNumber}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          label="email"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          onClick={handleOpenEmailDialog}
          {...email}
        />
      </Grid>
      <PhoneNumberDialog
        open={openPhoneNumberDialog}
        handleClose={handleClosePhoneNumberDialog}
      />
      <EmailDialog
        open={openEmailDialog}
        handleClose={handleClostEmailDialog}
      />
    </Grid>
  );
};

export default ContactData;
