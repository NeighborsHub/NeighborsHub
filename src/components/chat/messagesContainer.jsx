import Grid from "@mui/material/Grid";
import MessageItem from "components/chat/messageItem";

const MessageContainer = () => {
  return (
    <Grid
      sx={{ px: 1, flex: 1, overflowY: "auto"  }}
    >
      <Grid>
        <MessageItem isMine />
        <MessageItem isMine />
        <MessageItem />
        <MessageItem isMine />
        <MessageItem isMine />
        <MessageItem isMine />
        <MessageItem isMine />
        <MessageItem isMine />
        <MessageItem />
        <MessageItem isMine />
        <MessageItem isMine />
        <MessageItem isMine />
        <MessageItem isMine />
        <MessageItem isMine />
      </Grid>
    </Grid>
  );
};
export default MessageContainer;
