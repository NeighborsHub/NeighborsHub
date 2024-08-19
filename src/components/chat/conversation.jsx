import ConversationInput from "components/chat/conversationInput";
import ConversationMessages from "components/chat/conversationMessages";
import ConversationTitle from "components/chat/conversationTitle";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { SocketContext } from "app/bootstrap";
import { createConversationAction } from "store/actions/chatActions";
import { useSelector, useDispatch } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInputHandler } from "hooks/useInputHandler";

const Conversation = () => {
  const socket = useContext(SocketContext);
  const params = useSearchParams();
  const conversationId = params.get("conversationId");
  const userId = params.get("userId");
  const postId = params.get("postId");
  const myInfo = useSelector(myInfoSelector);
  const dispatch = useDispatch();
  const [isInView, setIsInView] = useState(true);
  const messageListRef = useRef();
  const message = useInputHandler("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let tempConversationId = conversationId;
    if (!conversationId) {
      const res = await dispatch(
        createConversationAction({ members: [{ id: userId }], type: "direct" })
      );
      tempConversationId = res.room_id;
    }
    socket.send(
      JSON.stringify({
        action: "message",
        message: message.value,
        user: myInfo.id,
        room_id: tempConversationId,
        post_id: postId,
      })
    );
    message.onChange({ target: { value: "" } });
    scrollToBottom();
  };

  const scrollToBottom = (options) => {
    messageListRef.current?.scrollIntoView(options);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIsInView(entry.isIntersecting)
    );

    observer.observe(messageListRef.current);
    return () => {
      observer.disconnect();
    };
  }, [messageListRef.current]);

  useEffect(() => {
    scrollToBottom();
  }, [messageListRef.current]);

  return (
    <Grid container direction="column" sx={{ position: "relative" }} item xs>
      <ConversationMessages
        ref={messageListRef}
        isInView={isInView}
        scrollToBottom={scrollToBottom}
      />
      <ConversationInput
        handleSendMessage={handleSendMessage}
        message={message}
      />
    </Grid>
  );
};

export default Conversation;
