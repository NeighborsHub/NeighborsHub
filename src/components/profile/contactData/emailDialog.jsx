import Modal from "components/modal/modal";
import { useState, useEffect } from "react";
import { useInputHandler } from "hooks/useInputHandler";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import { sendOtpToEmail, verifyEmailOtp } from "store/actions/userActions";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const STATES = {
  EMAIL: "EMAIL",
  CODE: "CODE",
};

const EmailDialog = ({ open, handleClose }) => {
  const email = useInputHandler("");
  const code = useInputHandler("");
  const [state, setState] = useState(STATES.EMAIL);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!open) {
      setState(STATES.EMAIL);
      email.onChange({ target: { value: "" } });
      code.onChange({ target: { value: "" } });
    }
  }, [open]);

  const handleSubmitEmail = () => {
    dispatch(sendOtpToEmail({ email: email.value }))
      .then(() => {
        setState(STATES.CODE);
        enqueueSnackbar("Code was sent to your email address", {
          variant: "info",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  const handleSubmitCode = () => {
    dispatch(verifyEmailOtp({ email: email.value, otp: code.value }))
      .then(() => {
        handleClose();
        enqueueSnackbar("Email Edited Successfuly", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  const handleBack = () => {
    setState(STATES.EMAIL);
    code.onChange({ target: { value: "" } });
  };

  return (
    <Modal open={open} onClose={handleClose} width="sm">
      {state === STATES.EMAIL ? (
        <Grid container direction="column">
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="Email"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            {...email}
          />
          <Grid container>
            <Button
              sx={{ mt: 1 }}
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleSubmitEmail}
              disabled={!email.value}
            >
              submit
            </Button>
          </Grid>
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

export default EmailDialog;
