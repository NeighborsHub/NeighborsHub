import ConversationInput from "components/chat/conversationInput";
import ConversationMessages from "components/chat/conversationMessages";
import ConversationTitle from "components/chat/conversationTitle";
import Grid from "@mui/material/Grid";

const Conversation = ({ handleSetChatId }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <ConversationTitle handleSetChatId={handleSetChatId} />
      <ConversationMessages />
      <ConversationInput />
    </Grid>
  );
};

export default Conversation;
