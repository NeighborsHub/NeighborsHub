import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export default styled(InputBase)(({ theme }) => ({
  "label": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: "10px",
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "white" : "#1A2027",
    border: "1px solid",
    borderColor:
      theme.palette.mode === "light" ? "rgba(230, 230, 230, 1)" : "#2D3843",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Saira"],
    "&:focus": {
      //   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "rgba(26, 153, 255, 1)",
      borderWidth: "1px",
    },
    "&:disabled": {
      backgroundColor:
        theme.palette.mode === "light" ? "rgba(247, 247, 247, 1)" : "#1A2027",
    },
  },
}));
