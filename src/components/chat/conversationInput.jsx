import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { useInputHandler } from "hooks/useInputHandler";
import { useContext } from "react";
import { SocketContext } from "../../../app/bootstrap";
import { useSearchParams } from "next/navigation";
import { createConversation } from "store/actions/chatActions";
import { useSelector, useDispatch } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";

const ChatInput = ({ handleSubmit }) => {
  const message = useInputHandler("");
  const socket = useContext(SocketContext);
  const params = useSearchParams();
  const conversationId = params.get("conversationId");
  const userId = params.get("userId");
  const postId = params.get("postId");
  const myInfo = useSelector(myInfoSelector);
  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    let tempConversationId = conversationId;
    if (!conversationId) {
      const res = await dispatch(
        createConversation({ members: [{ id: userId }], type: "direct" })
      );
      tempConversationId = res.room_id;
    }
    socket.send(
      JSON.stringify({
        action: "message",
        message: message.value,
        user: myInfo.id,
        roomId: tempConversationId,
        postId,
      })
    );
  };

  return (
    <Grid container item sx={{ p: 1 }}>
      <TextField
        autocomplete="off"
        name="search"
        placeholder="Write a message..."
        fullWidth
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          "& .MuiOutlinedInput-notchedOutline": {
            fontSize: "12px",
            display: "none",
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
        {...message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleSubmit}
                edge="end"
              >
                <SendIcon sx={{ fill: "gray" }} onClick={handleSendMessage} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default ChatInput;
