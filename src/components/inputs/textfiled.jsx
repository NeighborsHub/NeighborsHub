import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export default styled(TextField)(({ theme }) => ({
  label: {
    marginTop: theme.spacing(3),
  },
  fieldset: {
    border: "1px solid rgba(229, 229, 229, 1)!important",
    borderRadius: "10px",
  },
  "& .MuiFormControl-root": {
    borderRadius: "10px",
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "white" : "#1A2027",
    border: "1px solid",
    borderColor: "red",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: ["Saira"],
    "&:focus": {
      borderColor: "rgba(26, 153, 255, 1)",
      borderWidth: "1px",
    },
  },
}));
