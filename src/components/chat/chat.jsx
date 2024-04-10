import Grid from "@mui/material/Grid";
import ChatsList from "components/chat/chatsList";
import Conversation from "components/chat/conversation";
import { useState } from "react";

const Chat = ({ handlePushToChat }) => {
  const [chatId, setChatId] = useState(null);

  const handleSetChatId = (id) => {
    setChatId(id);
  };

  return (
    <Grid
      container
      direction={"column"}
      sx={{
        border: "1px solid lightGray",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {chatId ? (
        <Conversation handleSetChatId={handleSetChatId} />
      ) : (
        <ChatsList
          handlePushToChat={handlePushToChat}
          handleSetChatId={handleSetChatId}
        />
      )}
    </Grid>
  );
};

export default Chat;
