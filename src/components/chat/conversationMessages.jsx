import Grid from "@mui/material/Grid";
import MessageItem from "components/chat/messageItem";
import { useRef, useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grow from "@mui/material/Grow";
import { useDispatch, useSelector } from "react-redux";
import { getChatMessages } from "store/actions/chatActions";
import { messagesSelector } from "store/slices/chatSlices";
import { useSearchParams } from "next/navigation";

const MessageContainer = () => {
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef();
  const dispatch = useDispatch();
  const messagesList = useSelector(messagesSelector);
  const params = useSearchParams();
  const conversationId = params.get("conversationId");

  useEffect(() => {
    dispatch(getChatMessages({ chatId: conversationId }));
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = (options) => {
    containerRef.current.scrollIntoView(options);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIsInView(entry.isIntersecting)
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return (
    <Grid
      sx={{
        px: 1,
        flex: 1,
        overflowY: "auto",
        alignItems: "flex-end",
      }}
    >
      <Grid>
        {messagesList.map((item, index) => (
          <MessageItem data={item} isMine key={index} />
        ))}

        <div ref={containerRef} />
      </Grid>

      <Grow
        direction="up"
        in={!isInView}
        mountOnEnter
        unmountOnExit
        sx={{ position: "absolute", bottom: "70px", right: "20px" }}
      >
        <Fab
          aria-label="add"
          onClick={() => scrollToBottom({ behavior: "smooth" })}
          size="small"
        >
          <KeyboardArrowDownIcon />
        </Fab>
      </Grow>
    </Grid>
  );
};
export default MessageContainer;
