"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import STATUS from "components/signup/status";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { passwordLoginAction } from "store/actions/authActions";
import InputLabel from "@mui/material/InputLabel";
const PasswordChecking = ({ password, setCurrentState, emailPhoneNumber }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      passwordLoginAction({
        user_field: emailPhoneNumber.value,
        password: password.value,
      })
    ).then(() => {
      router.push("/app");
    });
  };

  const handleBack = () => {
    password.onChange({ target: { value: "" } });
    setCurrentState(STATUS.GET_EMAIL_MOBILE);
  };

  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // justifyContent: "center",
      }}
      onSubmit={handleSubmit}
    >
      <InputLabel shrink htmlFor="bootstrap-input">
        Password
      </InputLabel>
      <TextField
        fullWidth
        variant="outlined"
        type="password"
        name="your password1"
        autocomplete="one-time-code"
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
        {...password}
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
        disabled={!password.value}
      >
        Submit
      </Button>
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
        variant="outlined"
        color="secondary"
        onClick={handleBack}
      >
        Back
      </Button>
    </form>
  );
};

export default PasswordChecking;
