import Grid from "@mui/material/Grid";
import ChatsList from "components/chat/chatsList";
import Conversation from "components/chat/conversation";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { myInfoSelector } from "store/slices/userSlices";
import { chatsSelector } from "store/slices/chatSlices";
import { WS_BASE_URL } from "services/constants";
import { getMyChats } from "store/actions/chatActions";
let socket;

const Chat = ({ isFullWidth }) => {
  const params = useSearchParams();
  const dispatch = useDispatch();
  const userInfo = useSelector(myInfoSelector);
  const chats = useSelector(chatsSelector);
  useEffect(() => {
    if (userInfo.id)
      socket = new WebSocket(
        WS_BASE_URL +
          `ws/users/${userInfo.id}/chat/?token=${localStorage
            .getItem("token")
            .replace("Bearer ", "")}`
      );
    // dispatch(setSocketToStoreAction(socket));
  }, [userInfo.id]);

  useEffect(() => {
    dispatch(getMyChats());
  }, []);

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
        <ChatsList isFullWidth={isFullWidth} data={chats} />
      )}
    </Grid>
  );
};

export default Chat;
