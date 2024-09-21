'use client';
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ChatsList from "components/chat/chatsList";
import Conversation from "components/chat/conversation";
import { usePathname, useRouter } from "next/navigation";

const Chat = ({ isFullWidth }) => {
  const [data, setData] = useState({});
  const router = useRouter();
  const pathname = usePathname();

  const handleSetData = (data) => {
    setData(data);
  };

  return (
    <Grid container direction={"column"} item xs>
      {data ? (
        <Conversation data={data} handleSetData={handleSetData} />
      ) : (
        <ChatsList isFullWidth={isFullWidth} handleSetData={handleSetData} />
      )}
    </Grid>
  );
};

export default Chat;
