import { useState } from "react";
import Grid from "@mui/material/Grid";
import ChatsList from "components/chat/chatsList";
import Conversation from "components/chat/conversation";

const Chat = ({ isFullWidth }) => {
  const [data, setData] = useState({});
  const handleSetData = (data) => {
    setData(data);
  };

  return (
    <Grid container direction={"column"} item xs>
      {data ? (
        <Conversation
          data={data}
          handleSetData={handleSetData}
        />
      ) : (
        <ChatsList
          isFullWidth={isFullWidth}
          handleSetData={handleSetData}
        />
      )}
    </Grid>
  );
};

export default Chat;
