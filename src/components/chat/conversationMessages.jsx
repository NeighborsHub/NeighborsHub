import Grid from "@mui/material/Grid";
import MessageItem from "components/chat/messageItem";
import { useRef, useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grow from "@mui/material/Grow";

const MessageContainer = () => {
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef();
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
