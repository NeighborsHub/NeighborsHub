import Grid from "@mui/material/Grid";
import ChatsList from "components/chat/chatsList";
import Conversation from "components/chat/conversation";
import { useSearchParams } from "next/navigation";

const Chat = ({ isFullWidth }) => {
  const params = useSearchParams();

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
      {params.get("status") === "conversation" ? (
        <Conversation />
      ) : (
        <ChatsList isFullWidth={isFullWidth} />
      )}
    </Grid>
  );
};

export default Chat;
