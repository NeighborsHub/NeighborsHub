import Grid from "@mui/material/Grid";
import MessageItem from "components/chat/messageItem";
import { useEffect, forwardRef, useState } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grow from "@mui/material/Grow";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatMessagesAction,
  getMoreChatMessageAction,
} from "store/actions/chatActions";
import { messagesSelector } from "store/slices/chatSlices";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import ChatBackgroundImage from "assets/images/ChatBackground.png";
const MessageContainer = forwardRef(function Test(
  { isInView, scrollToBottom, conversationId },
  messageListRef
) {
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelector);
  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    console.log(conversationId, "ffffffffffffff");
    if (conversationId)
      dispatch(getChatMessagesAction({ chatId: conversationId }));
  }, [conversationId]);

  // useEffect(() => {
  //   if (messages && flag) {
  //     scrollToBottom();
  //     setFlag(false);
  //   }
  // }, [messages]);

  const handleGetMoreChatMessage = (page, limit) => {
    dispatch(
      getMoreChatMessageAction({
        chatId: conversationId,
        params: {
          // search: search || undefined,
          offset: page * limit,
          limit,
        },
      })
    );
  };

  return (
    <Grid
      container
      direction={"column"}
      item
      xs
      sx={{
        overflowY: "auto",
        backgroundImage: `url(${ChatBackgroundImage.src})`,
      }}
    >
      <Grid
        sx={{
          px: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column-reverse",
          width: "100%",
          alignItems: "stretch",
        }}
        id="p123"
      >
        <InfiniteScroll
          dataLength={messages.results?.length || 0}
          next={() => {
            handleGetMoreChatMessage(page + 1, limit);
            setPage((prevState) => prevState + 1);
          }}
          hasMore={page * limit + limit <= messages.count}
          loader={
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ py: 2, my: 2 }}
            >
              <CircularProgress />
            </Grid>
          }
          inverse={true}
          scrollableTarget={"p123"}
          style={{ display: "flex", flexDirection: "column-reverse" }}
        >
          <div ref={messageListRef} />
          {messages.results?.map((item, index) => (
            <MessageItem data={item} isMine key={index} />
          ))}
        </InfiniteScroll>

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
    </Grid>
  );
});
export default MessageContainer;
