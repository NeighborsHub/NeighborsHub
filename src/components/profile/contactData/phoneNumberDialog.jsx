import Modal from "components/modal/modal";
import { useState, useEffect } from "react";
import { useInputHandler } from "hooks/useInputHandler";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Button from "@mui/material/Button";
import { sendOtpToPhoneAction, verifyPhoneOtpAction } from "store/actions/userActions";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const STATES = {
  PHONE_NUMBER: "PHONE_NUMBER",
  CODE: "CODE",
};

const PhoneNumberDialog = ({ open, handleClose }) => {
  const phoneNumber = useInputHandler("");
  const code = useInputHandler("");
  const [state, setState] = useState(STATES.PHONE_NUMBER);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!open) {
      setState(STATES.PHONE_NUMBER);
      phoneNumber.onChange({ target: { value: "" } });
      code.onChange({ target: { value: "" } });
    }
  }, [open]);

  const handleSubmitPhoneNumber = () => {
    dispatch(sendOtpToPhoneAction({ mobile: phoneNumber.value }))
      .then(() => {
        enqueueSnackbar("A Code Was Sent To Your Phone", {
          variant: "info",
        });
        setState(STATES.CODE);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  const handleSubmitCode = () => {
    dispatch(verifyPhoneOtpAction({ mobile: phoneNumber.value, otp: code.value }))
      .then(() => {
        handleClose();
        enqueueSnackbar("Mobile Edited Successfuly", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  const handleBack = () => {
    setState(STATES.PHONE_NUMBER);
    code.onChange({ target: { value: "" } });
  };

  return (
    <Modal open={open} onClose={handleClose} width="sm">
      {state === STATES.PHONE_NUMBER ? (
        <Grid container direction="column">
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="phoneNumber"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <PhoneIphoneIcon />
                </InputAdornment>
              ),
            }}
            {...phoneNumber}
          />
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleSubmitPhoneNumber}
            disabled={!phoneNumber.value}
          >
            submit
          </Button>
        </Grid>
      ) : state === STATES.CODE ? (
        <Grid container direction="column">
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="code"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <PhoneIphoneIcon />
                </InputAdornment>
              ),
            }}
            {...code}
          />
          <Grid container>
            <Grid item xs={6} sx={{ px: 0.5 }}>
              <Button
                variant="outlined"
                fullWidth
                color="primary"
                onClick={handleBack}
              >
                back
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ px: 0.5 }}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={handleSubmitCode}
                disabled={!code.value}
              >
                submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default PhoneNumberDialog;
