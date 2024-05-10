import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 0,
  socket: null,
  chats: [],
  chat: {},
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
    setChat: (state, { payload }) => {
      state.chat = payload;
    },
    setChatMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addChatMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
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
  setChat,
  setChatMessages,
  addChatMessage,
} = chatSlices.actions;

export const loadingSelector = (state) => state.chat.loading;
export const socketSelector = (state) => state.chat.socket;
export const chatsSelector = (state) => state.chat.chats;
export const chatSelector = (state) => state.chat.chat;
export const messagesSelector = (state) => state.chat.messages;

export default chatSlices.reducer;
