import { clearPosts } from "store/slices/postsSlices";
import { clearApp } from "store/slices/appSlices";
import { clearUser } from "store/slices/userSlices";
import { clearAuth } from "store/slices/authSlices";
export const clearStore = () => async (dispatch) => {
  dispatch(clearPosts());
  dispatch(clearApp());
  dispatch(clearUser());
  dispatch(clearAuth());
};
