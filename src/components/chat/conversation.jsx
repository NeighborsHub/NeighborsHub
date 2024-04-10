import ConversationInput from "components/chat/conversationInput";
import ConversationMessages from "components/chat/conversationMessages";
import ConversationTitle from "components/chat/conversationTitle";
import Grid from "@mui/material/Grid";

const Conversation = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <ConversationTitle />
      <ConversationMessages />
      <ConversationInput />
    </Grid>
  );
};

export default Conversation;
