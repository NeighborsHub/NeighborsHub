import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "store/slices/userSlices";
import app from "store/slices/appSlices";
import posts from "store/slices/postsSlices";
import auth from "store/slices/authSlices";
import chat from "store/slices/chatSlices";

const combinedReducers = combineReducers({
  user,
  app,
  posts,
  auth,
  chat,
});

export default configureStore({
  reducer: combinedReducers,
});
