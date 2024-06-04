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
  setPostComments,
  addPostComments,
  addComment,
  addMoreUniqueLocation,
} from "store/slices/postsSlices";
import { startLoading, endLoading } from "store/slices/appSlices";
import { snackActions } from "utils/SnackbarUtils";

export const getPostsAction = (data) => async (dispatch) => {
  // dispatch(startLoading());
  return Apis.posts.getPosts(data).then((res) => {
    console.log(res, "test");
    dispatch(setPosts(res.posts || {}));
  });
  // .finally(() => dispatch(endLoading()));
};

export const getDetailsPostAction = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .getDetailsPost(data)
    .then((res) => {
      console.log(res, "test");
      dispatch(moreDetailsPost(res.post || []));
    })
    .finally(() => dispatch(endLoading()));
};

export const getLocationPostsAction = (data) => async (dispatch) => {
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

export const getUniqueLocationAction =
  ({ isPan, ...data }, signal) =>
  async (dispatch) => {
    // dispatch(startLoading());
    return Apis.posts.getUniqueLocation(data, signal).then((res) => {
      console.log(res, "uniqueLocation");

      const divide = 10;

      // const maxLong = 180;
      // const minLong = -180;
      // const maxLat = 90;
      // const minLat = -90;

      const maxLong = data.in_bbox_array[0];
      const minLong = data.in_bbox_array[1];
      const maxLat = data.in_bbox_array[2];
      const minLat = data.in_bbox_array[3];

      const longStep = (maxLong - minLong) / divide;
      const latStep = (maxLat - minLat) / divide;

      const longIntervals = [];
      const latIntervals = [];

      for (var i = 0; i < divide; i++) {
        longIntervals.push(minLong + i * longStep);
        latIntervals.push(minLat + i * latStep);
      }

      const finalArray = [];

      for (var i = 0; i < divide - 1; i++) {
        for (var j = 0; j < divide - 1; j++) {
          if (
            res?.posts?.results.find(
              (item) =>
                longIntervals[i] < item.location.coordinates[0] &&
                item.location.coordinates[0] < longIntervals[i + 1] &&
                latIntervals[j] < item.location.coordinates[1] &&
                item.location.coordinates[1] < latIntervals[j + 1]
            )
          ) {
            const allInRange = res?.posts?.results.filter(
              (item) =>
                longIntervals[i] < item.location.coordinates[0] &&
                item.location.coordinates[0] < longIntervals[i + 1] &&
                latIntervals[j] < item.location.coordinates[1] &&
                item.location.coordinates[1] < latIntervals[j + 1]
            );
            let average = allInRange.reduce(
              (summation, currentValue) => [
                currentValue.location.coordinates[0] + summation[0],
                currentValue.location.coordinates[1] + summation[1],
              ],
              [0, 0]
            );
            average = [
              average[0] / allInRange.length,
              average[1] / allInRange.length,
            ];
            finalArray.push({
              location: {
                coordinates: average,
              },
            });
          }
        }
      }
      isPan
        ? dispatch(addMoreUniqueLocation(finalArray || []))
        : dispatch(setUniqueLocation(finalArray || []));
      // dispatch(setUniqueLocation(res?.posts?.results || []));
    });
    // .finally(() => dispatch(endLoading()));
  };

export const getMyPostsAction = () => async (dispatch) => {
  // dispatch(startLoading());
  return Apis.posts.getMyPosts().then((res) => {
    console.log(res, "test");
    dispatch(setMyPosts(res.posts || {}));
    return res;
  });
  // .finally(() => dispatch(endLoading()));
};

export const createPostAction = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.posts
    .createPost(data)
    .then((res) => {
      console.log(res, "test");
      dispatch(addPost(res.post || []));
    })
    .finally(() => dispatch(endLoading()));
};

export const deletePostAction = (data) => async (dispatch) => {
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
    snackActions.success(
      data.type === "like"
        ? "Liked!"
        : data.type === "dislike"
        ? "Disliked!"
        : ""
    );
    dispatch(like(data));
  });
};

export const deleteLikeAction = (data) => async (dispatch) => {
  return Apis.posts.deleteLike(data).then((res) => {
    console.log(res, "test");
    snackActions.info("Removed!");

    dispatch(deleteLike(data));
  });
};

export const getCategoriesAction = () => async (dispatch) => {
  return Apis.posts.getCategories().then((res) => {
    dispatch(setCategories(res.categories.results));
  });
};

export const getPostAction = (data) => async (dispatch) =>
  Apis.posts.getDetailsPost(data).then((res) => {
    dispatch(setPost(res.post));
    return res;
  });

export const getUserPostsAction = (data) => async (dispatch) =>
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

export const getPostCommentsAction = (data) => async (dispatch) =>
  Apis.posts.getPostComments(data).then((res) => {
    dispatch(setPostComments(res.comments || []));
    return res;
  });

export const addPostCommentsAction = (data) => async (dispatch) =>
  Apis.posts.getPostComments(data).then((res) => {
    dispatch(addPostComments(res.comments.results || []));
    return res;
  });

export const createCommentAction = (data) => async (dispatch) =>
  Apis.posts.createComment(data).then((res) => {
    dispatch(addComment(res.comment));
    return res;
  });
