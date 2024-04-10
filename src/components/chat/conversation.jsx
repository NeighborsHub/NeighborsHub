import ChatInput from "components/chat/chatInput";
import MessageContainer from "components/chat/messagesContainer";
import ChatTitle from "components/chat/chatTitle";
import Grid from "@mui/material/Grid";

const Conversation = ({ handleSetChatId }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <ChatTitle handleSetChatId={handleSetChatId} />
      <MessageContainer />
      <ChatInput />
    </Grid>
  );
};

export default Conversation;
