import apiConfig from "services/apiConfig";
import axios from "axios";
import { MAP_API_KEY, GEOCODE_API_KEY } from "constants";
const Apis = {
  auth: {
    preRegister: (data) =>
      apiConfig({ url: "/auth/pre-register", method: "post", data }),
    otpSignupChecking: (data) =>
      apiConfig({ url: "/auth/verify-pre-register", method: "post", data }),
    register: (data) =>
      apiConfig({ url: "/auth/register", method: "post", data }),
    passwordLogin: (data) =>
      apiConfig({ url: "/auth/login", method: "post", data }),
    optSending: (data) =>
      apiConfig({ url: "/auth/send-otp-login", method: "post", data }),
    optLoginChecking: (data) =>
      apiConfig({ url: "/auth/verify-otp-login", method: "post", data }),
    logout: () => apiConfig({ url: "/auth/logout", method: "get" }),
    googleAuth: (data) =>
      apiConfig({ url: `/auth/login/google?code=${data.code}`, method: "get" }),
    setGooglePassword: (data) =>
      apiConfig({ url: `auth/set-password/google`, method: "post", data }),
  },
  user: {
    myInfo: () => apiConfig({ url: "/me", method: "get" }),
    updateMyInfo: (data) => apiConfig({ url: "/me", method: "put", data }),
    sendOtpToEmail: (data) =>
      apiConfig({ url: "/auth/send-verify-email", method: "post", data }),
    verifyEmailOtp: (data) =>
      apiConfig({ url: "/auth/verify-email", method: "post", data }),
    sendOtpToPhone: (data) =>
      apiConfig({ url: "/auth/send-verify-mobile", method: "post", data }),
    verifyPhoneOtp: (data) =>
      apiConfig({ url: "/auth/verify-mobile", method: "post", data }),
    getUserDetails: (data) =>
      apiConfig({ url: `/user/${data.id}`, method: "get" }),
    setMyAvatar: (data) =>
      apiConfig({ url: `/avatar/me`, method: "post", data, isFormData: true }),
  },
  address: {
    getIpLocation: () =>
      axios.get(
        `https://api.maptiler.com/geolocation/ip.json?key=${MAP_API_KEY}`
      ),
    turnCordinateToAddress: (cordinate) =>
      axios.get(
        `https://geocode.maps.co/reverse?lat=${cordinate[0]}&lon=${cordinate[1]}&api_key=${GEOCODE_API_KEY}`
      ),
    turnAddressToCordinate: (address) =>
      axios.get(
        `https://geocode.maps.co/search?q=${address}&api_key=${GEOCODE_API_KEY}`
      ),
    createAddress: (data) =>
      apiConfig({ url: "/me/address", method: "post", data }),
    updateAddress: ({ id, ...data }) =>
      apiConfig({ url: `/me/address/${id}`, method: "put", data }),
    deleteAddress: ({ id }) =>
      apiConfig({ url: `/me/address/${id}`, method: "delete" }),
    getListOfAddress: (data) =>
      apiConfig({ url: "/me/address", method: "get" }),
  },
  posts: {
    createPost: (data) =>
      apiConfig({
        url: "/me/post/create",
        method: "post",
        data,
        isFormData: true,
      }),
    getPosts: (data) =>
      apiConfig({
        url: `/post/`,
        method: "get",
        params: data,
      }),
    getLocationPosts: (data) =>
      apiConfig({
        url: `/post/`,
        method: "get",
        params: data,
      }),
    getDetailsPost: (data) =>
      apiConfig({
        url: `/post/${data.id}`,
        method: "get",
      }),
    getMyPosts: (data) =>
      apiConfig({ url: "/me/post/", method: "get", params: data }),
    getUniqueLocation: (data, signal) =>
      apiConfig({
        url: `/post/location-count`,
        method: "get",
        params: {
          user_latitude: data.lat,
          user_longitude: data.long,
          // user_distance: Math.round(data.distance),
          in_bbox: data.in_bbox,
          offset: data.offset,
          limit: data.limit,
          category: data.category,
          search: data.search,
        },
        withoutLoading: true,
        signal,
      }),
    deletePost: (data) =>
      apiConfig({ url: `/me/post/${data.id}`, method: "delete" }),
    like: (data) =>
      apiConfig({ url: `/post/${data.id}/like`, method: "post", data }),
    deleteLike: (data) =>
      apiConfig({ url: `/post/${data.id}/like`, method: "delete" }),
    getCategories: () => apiConfig({ url: `/post/category/`, method: "get" }),
    getUserPosts: ({ id, params }) =>
      apiConfig({ url: `/user/${id}/post/`, method: "get", params }),
    createComment: (data) =>
      apiConfig({ url: `/post/${data.id}/comment`, method: "post", data }),
    getPostComments: (data) =>
      apiConfig({
        url: `/post/${data.id}/comments`,
        method: "get",
        params: data,
      }),
  },
};

export default Apis;
