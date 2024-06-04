import Apis from "services/apis";
import {
  startLoading,
  endLoading,
  setSocket,
  setMyChats,
  setChatMessages,
  addChatMessage,
  addMoreChatMessages,
} from "store/slices/chatSlices";

export const setSocketToStoreAction = (payload) => async (dispatch) => {
  dispatch(setSocket(payload));
};

export const createConversationAction = (data) => (dispatch) => {
  return Apis.chat.createConversation(data).then((res) => {
    // dispatch(setMyChats(res));
    return res;
  });
};

export const getMyChatsAction = () => (dispatch) => {
  dispatch(startLoading());
  return Apis.chat
    .getMyChats()
    .then((res) => {
      dispatch(setMyChats(res));
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const getChatAction = (data) => (dispatch) => {
  dispatch(startLoading());
  return Apis.chat
    .getChatMessages(data)
    .then((res) => {
      // dispatch(getChat(res.chat));
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const getChatMessagesAction = (data) => (dispatch) => {
  return Apis.chat.getChatMessages(data).then((res) => {
    dispatch(setChatMessages(res.chat_messages));
    return res;
  });
};

export const getMoreChatMessageAction = (data) => (dispatch) => {
  return Apis.chat.getChatMessages(data).then((res) => {
    dispatch(addMoreChatMessages(res.chat_messages.results));
    return res;
  });
};

export const OnNewChatMessageAction = () => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const chatId = CommonUtil.getActiveChatId(match);
    const userId = CommonUtil.getUserId();
    if (chatId === data.roomId) {
      if (data.action === SocketActions.MESSAGE) {
        data["userImage"] = ServerUrl.BASE_URL.slice(0, -1) + data.userImage;
        setMessages((prevState) => {
          let messagesState = JSON.parse(JSON.stringify(prevState));
          messagesState.results.unshift(data);
          return messagesState;
        });
        setTyping(false);
      } else if (data.action === SocketActions.TYPING && data.user !== userId) {
        setTyping(data.typing);
      }
    }
    if (data.action === SocketActions.ONLINE_USER) {
      setOnlineUserList(data.userList);
    }
  };
};

export const messageSubmitHandlerAction = (event) => {
  event.preventDefault();
  if (inputMessage) {
    socket.send(
      JSON.stringify({
        action: SocketActions.MESSAGE,
        message: inputMessage,
        user: CommonUtil.getUserId(),
        roomId: CommonUtil.getActiveChatId(match),
      })
    );
  }
  setInputMessage("");
};

export const addChatMessageAction = (payload) => (dispatch) =>
  dispatch(addChatMessage(payload));
