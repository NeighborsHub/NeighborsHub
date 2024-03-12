import Apis from "services/apis";
// import { , addNewAddress } from "store/slices/userSlices";
import {
  addPost,
  setPosts,
  setMyPosts,
  moreDetailsPost,
  removePost,
  setUniqueLocation,
  setLocationPosts,
  like,
  deleteLike,
  setCategories,
  setUserPosts,
  setPost,
  addUserPosts,
  addPosts,
  addMyPosts,
  addLocationPosts,
} from "store/slices/postsSlices";
import { startLoading, endLoading } from "store/slices/appSlices";
import { snackActions } from "utils/SnackbarUtils";

export const getPosts = (data) => async (dispatch) => {
  // dispatch(startLoading());
  return Apis.posts.getPosts(data).then((res) => {
    console.log(res, "test");
    dispatch(setPosts(res.posts || {}));
  });
  // .finally(() => dispatch(endLoading()));
};

export const getDetailsPost = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .getDetailsPost(data)
    .then((res) => {
      console.log(res, "test");
      dispatch(moreDetailsPost(res.post || []));
    })
    .finally(() => dispatch(endLoading()));
};

export const getLocationPosts = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .getLocationPosts(data)
    .then((res) => {
      dispatch(setLocationPosts(res?.posts || {}));
      console.log(res, "test");
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const getUniqueLocation = (data, signal) => async (dispatch) => {
  // dispatch(startLoading());
  return Apis.posts.getUniqueLocation(data, signal).then((res) => {
    console.log(res, "test");
    dispatch(setUniqueLocation(res?.posts?.results || []));
  });
  // .finally(() => dispatch(endLoading()));
};

export const getMyPosts = () => async (dispatch) => {
  // dispatch(startLoading());
  return Apis.posts.getMyPosts().then((res) => {
    console.log(res, "test");
    dispatch(setMyPosts(res.posts || {}));
    return res;
  });
  // .finally(() => dispatch(endLoading()));
};

export const createPost = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .createPost(data)
    .then((res) => {
      console.log(res, "test");
      dispatch(addPost(res.post || []));
    })
    .finally(() => dispatch(endLoading()));
};

export const deletePost = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .deletePost(data)
    .then((res) => {
      console.log(res, "test");
      dispatch(removePost(data));
    })
    .finally(() => dispatch(endLoading()));
};

export const likeAction = (data) => async (dispatch) => {
  return Apis.posts.like(data).then((res) => {
    console.log(res, "test");
    snackActions.success("Liked!");
    dispatch(like(data));
  });
};

export const deleteLikeAction = (data) => async (dispatch) => {
  return Apis.posts.deleteLike(data).then((res) => {
    console.log(res, "test");
    snackActions.info("Like Removed!");

    dispatch(deleteLike(data));
  });
};

export const getCategories = () => async (dispatch) => {
  return Apis.posts.getCategories().then((res) => {
    dispatch(setCategories(res.categories.results));
  });
};

export const getPost = (data) => async (dispatch) =>
  Apis.posts.getDetailsPost(data).then((res) => {
    dispatch(setPost(res.post));
    return res;
  });

export const getUserPosts = (data) => async (dispatch) =>
  Apis.posts.getUserPosts(data).then((res) => {
    dispatch(setUserPosts(res.posts || {}));
    return res;
  });

export const addUserPostsAction = (data) => async (dispatch) =>
  Apis.posts.getUserPosts(data).then((res) => {
    dispatch(addUserPosts(res.posts.results || []));
    return res;
  });

export const addMyPostsAction = (data) => async (dispatch) =>
  Apis.posts.getMyPosts(data).then((res) => {
    dispatch(addMyPosts(res.posts.results || []));
    return res;
  });

export const addLocationPostsAction = (data) => async (dispatch) =>
  Apis.posts.getLocationPosts(data).then((res) => {
    dispatch(addLocationPosts(res.posts.results || []));
    return res;
  });
export const addPostsAction = (data) => async (dispatch) =>
  Apis.posts.getPosts(data).then((res) => {
    dispatch(addPosts(res.posts.results || []));
    return res;
  });
