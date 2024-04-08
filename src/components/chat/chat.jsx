import Grid from "@mui/material/Grid";
import ChatInput from "components/chat/chatInput";
import MessageContainer from "components/chat/messagesContainer";
import ChatTitle from "components/chat/chatTitle";
import ChatsList from "components/chat/chatsList";

const Chat = () => {
  return (
    <Grid
      container
      item
      xs={12}
      direction={"column"}
      sx={{
        m: 1,
        border: "1px solid lightGray",
        height: "calc( 100% - 16px )",
        overflow: "hidden",
      }}
    >
      <ChatsList />
      {/* <>
        <ChatTitle />
        <MessageContainer />
        <ChatInput />
      </> */}
    </Grid>
  );
};

export default Chat;
