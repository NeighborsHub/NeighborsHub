import IconButton from "@mui/material/IconButton";
import ChatIcon from "assets/svgs/Post/Chat.svg";

const Chat = ({ onClick }) => {
  return (
    <IconButton
      sx={{
        borderRadius: "10px",
        backgroundColor: "#FFF2B2",
        height: "35px",
        width: "35px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 0,
        border: "1px solid #f2e41d",
        mx: 1,
        "&:hover": {
          backgroundColor: "#FFD816",
        },
      }}
      onClick={onClick}
    >
      <img src={ChatIcon.src} />
    </IconButton>
  );
};
export default Chat;
