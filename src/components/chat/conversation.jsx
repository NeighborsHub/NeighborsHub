import ConversationInput from "components/chat/conversationInput";
import ConversationMessages from "components/chat/conversationMessages";
import ConversationTitle from "components/chat/conversationTitle";
import Grid from "@mui/material/Grid";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { postsSelector } from "store/slices/postsSlices";

const Conversation = () => {
  const params = useSearchParams();
  const conversationId = params.get("conversationId");
 
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
