import { createSlice } from "@reduxjs/toolkit";

export const defaultFilters = {
  distance: [0, 500000],
  categories: [],
};

const initialState = {
  posts: {},
  locationPosts: {},
  myPosts: [],
  uniqueLocation: [],
  categories: [],
  userPosts: {},
  post: {},
  postComments: [],
  filters: defaultFilters,
};

const postsSlices = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    setLocationPosts: (state, { payload }) => {
      state.locationPosts = payload;
    },
    removelocationPosts: (state) => {
      state.locationPosts = [];
    },
    addPost: (state, { payload }) => {
      state.myPosts = [...state.myPosts, payload];
    },
    setMyPosts: (state, { payload }) => {
      state.myPosts = payload;
    },
    setUniqueLocation: (state, { payload }) => {
      state.uniqueLocation = [
        // ...state.uniqueLocation,
        ...payload.map((item) => item.location.coordinates),
        // .filter(
        //   (item) =>
        //     !state.uniqueLocation.find(
        //       (item2) => item2[0] === item[0] && item2[1] !== item[0]
        //     )
        // ),
      ];
    },
    addMoreUniqueLocation: (state, { payload }) => {
      state.uniqueLocation = [
        ...state.uniqueLocation,
        ...payload
          .map((item) => item.location.coordinates)
          .filter(
            (item) =>
              !state.uniqueLocation.find(
                (item2) => item2[0] === item[0] && item2[1] !== item[0]
              )
          ),
      ];
    },
    clearPosts: () => initialState,
    removePost: (state, { payload }) => {
      state.myPosts.results = state.myPosts.results.filter(
        (item) => item.id !== payload.id
      );
    },
    moreDetailsPost: (state, { payload }) => {
      if (payload.is_owner) {
        state.myPosts.results = state.myPosts.results.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        );
      } else {
        state.posts = state.posts.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        );
      }
    },
    like: (state, { payload }) => {
      state.posts.results = state.posts.results?.map((item) =>
        item.id === payload.id ? { ...item, user_liked: payload.type } : item
      );
      state.locationPosts.results = state.locationPosts.results?.map((item) =>
        item.id === payload.id ? { ...item, user_liked: payload.type } : item
      );
    },
    deleteLike: (state, { payload }) => {
      state.posts.results = state.posts.results?.map((item) =>
        item.id === payload.id ? { ...item, user_liked: null } : item
      );
      state.locationPosts.results = state.locationPosts.results?.map((item) =>
        item.id === payload.id ? { ...item, user_liked: null } : item
      );
    },
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setUserPosts: (state, { payload }) => {
      state.userPosts = payload;
    },
    setPost: (state, { payload }) => {
      state.post = payload;
    },
    clearPost: (state) => {
      state.post = {};
    },
    addUserPosts: (state, { payload }) => {
      state.userPosts.results = [...state.userPosts.results, ...payload];
    },
    addPosts: (state, { payload }) => {
      state.posts.results = [...state.posts.results, ...payload];
    },
    addMyPosts: (state, { payload }) => {
      state.myPosts.results = [...state.myPosts.results, ...payload];
    },
    addLocationPosts: (state, { payload }) => {
      state.locationPosts.results = [
        ...state.locationPosts.results,
        ...payload,
      ];
    },
    setPostComments: (state, { payload }) => {
      state.postComments = payload;
    },
    addPostComments: (state, { payload }) => {
      state.postComments.results = [...state.postComments.results, ...payload];
    },
    addComment: (state, { payload }) => {
      state.postComments.results = [payload, ...state.postComments.results];
    },
    updateFilters: (state, { payload }) => {
      state.filters = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPosts,
  setMyPosts,
  addPost,
  setUniqueLocation,
  addMoreUniqueLocation,
  clearPosts,
  removePost,
  setLocationPosts,
  removelocationPosts,
  moreDetailsPost,
  like,
  deleteLike,
  dislike,
  deleteDislike,
  setCategories,
  setUserPosts,
  setPost,
  clearPost,
  addUserPosts,
  addPosts,
  addMyPosts,
  addLocationPosts,
  setPostComments,
  addPostComments,
  addComment,
  updateFilters,
} = postsSlices.actions;

export const postsSelector = (state) => state.posts.posts;
export const myPostsSelector = (state) => state.posts.myPosts;
export const uniqueLocationSelector = (state) => state.posts.uniqueLocation;
export const locationPostSelector = (state) => state.posts.locationPosts;
export const categoriesSelector = (state) => state.posts.categories;
export const userPostsSelector = (state) => state.posts.userPosts;
export const postSelector = (state) => state.posts.post;
export const postCommentsSelector = (state) => state.posts.postComments;
export const filtersSelector = (state) => state.posts.filters;

export default postsSlices.reducer;
