import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SaveIcon from "assets/svgs/Post/Save.svg";

const Share = () => {
  return (
    <IconButton
      sx={{
        borderRadius: "10px",
        backgroundColor: "#E5E8FF",
        height: "35px",
        width: "35px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 0,
        mx: 1,
        "&:hover": {
          backgroundColor: "#d6dbff",
        },
      }}
    >
      <img src={SaveIcon.src} />
    </IconButton>
  );
};
export default Share;
