import Apis from "services/apis";
import {
  startLoading,
  endLoading,
  setSocket,
  setMyChats,
  setChatMessages,
} from "store/slices/chatSlices";

export const setSocketToStoreAction = (payload) => async (dispatch) => {
  dispatch(setSocket(payload));
};

export const createConversation = () => (dispatch) => {
  return Apis.chat.createConversation().then((res) => {
    // dispatch(setMyChats(res));
    return res;
  });
};

export const getMyChats = () => (dispatch) => {
  dispatch(startLoading());
  return Apis.chat
    .getMyChats()
    .then((res) => {
      dispatch(setMyChats(res));
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const getChat = (data) => (dispatch) => {
  dispatch(startLoading());
  return Apis.chat
    .getChatMessages(data)
    .then((res) => {
      dispatch(getChat(res.chat));
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const getChatMessages = (data) => (dispatch) => {
  dispatch(startLoading());
  return Apis.chat
    .getChatMessages(data)
    .then((res) => {
      dispatch(setChatMessages(res.messages));
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const OnNewChatMessage = () => {
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

export const messageSubmitHandler = (event) => {
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
