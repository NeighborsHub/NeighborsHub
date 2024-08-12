import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "assets/svgs/Post/Share.svg";
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
      }}
    >
      <img src={ShareIcon.src} />
    </IconButton>
  );
};
export default Share;
