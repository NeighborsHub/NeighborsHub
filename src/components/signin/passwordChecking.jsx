"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import STATUS from "components/signup/status";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { passwordLoginAction } from "store/actions/authActions";
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
      <TextField
        fullWidth
        variant="outlined"
        label="password"
        type="password"
        name="your password1"
        autocomplete="one-time-code"
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
        {...password}
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
      >
        Submit
      </Button>
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
        color="secondary"
        onClick={handleBack}
      >
        Back
      </Button>
    </form>
  );
};

export default PasswordChecking;
