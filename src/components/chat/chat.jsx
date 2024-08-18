import Grid from "@mui/material/Grid";
import ChatsList from "components/chat/chatsList";
import Conversation from "components/chat/conversation";
import { useSearchParams } from "next/navigation";

const Chat = ({ isFullWidth }) => {
  const params = useSearchParams();

  return (
    <Grid container direction={"column"} item xs>
      {params.get("status") === "conversation" ? (
        <Conversation />
      ) : (
        <ChatsList isFullWidth={isFullWidth} />
      )}
    </Grid>
  );
};

export default Chat;
