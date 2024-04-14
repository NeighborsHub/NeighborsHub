import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 0,
  socket: null,
  chats: [],
  messages: [],
};

const chatSlices = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading += 1;
    },
    endLoading: (state) => {
      if (state.loading) state.loading -= 1;
    },
    clearChat: () => initialState,
    setSocket: (state, { payload }) => {
      state.socket = payload;
    },
    setMyChats: (state, { payload }) => {
      state.chats = payload;
    },
    setChatMessages: (state, { payload }) => {
      state.messages = { ...state.messages, [payload.id]: payload.messages };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoading,
  endLoading,
  clearChat,
  setSocket,
  setMyChats,
  setChatMessages,
} = chatSlices.actions;

export const loadingSelector = (state) => state.chat.loading;
export const socketSelector = (state) => state.chat.socket;
export const chatsSelector = (state) => state.chat.chats;
export const messagesSelector = (state) => state.chat.messages;

export default chatSlices.reducer;
