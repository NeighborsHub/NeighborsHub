import { clearPosts } from "store/slices/postsSlices";
import { clearApp } from "store/slices/appSlices";
import { clearUser } from "store/slices/userSlices";
import { clearAuth } from "store/slices/authSlices";
import Apis from "services/apis";
export const clearStoreAction = () => async (dispatch) => {
  dispatch(clearPosts());
  dispatch(clearApp());
  dispatch(clearUser());
  dispatch(clearAuth());
};

export const FeedbackAction = (data) => (dispatch) => {
  return Apis.app.feedback(data);
};
