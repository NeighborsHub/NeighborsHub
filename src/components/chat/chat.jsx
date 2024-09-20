import { useState } from "react";
import Grid from "@mui/material/Grid";
import ChatsList from "components/chat/chatsList";
import Conversation from "components/chat/conversation";

const Chat = ({ isFullWidth }) => {
  const [conversationId, setConversationId] = useState(null);

  const handleSetConversationId = (conversationId) => {
    setConversationId(conversationId);
  };

  return (
    <Grid container direction={"column"} item xs>
      {conversationId ? (
        <Conversation
          conversationId={conversationId}
          handleSetConversationId={handleSetConversationId}
        />
      ) : (
        <ChatsList
          isFullWidth={isFullWidth}
          handleSetConversationId={handleSetConversationId}
        />
      )}
    </Grid>
  );
};

export default Chat;
