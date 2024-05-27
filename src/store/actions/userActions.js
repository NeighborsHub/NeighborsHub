import Apis from "services/apis";
import {
  setMyAddresses,
  addNewAddress,
  setMyInfo,
} from "store/slices/userSlices";
import { startLoading, endLoading } from "store/slices/appSlices";
import {
  emailUpdate,
  phoneNumberUpdate,
  setUserInfo,
  setMyAvatar,
} from "store/slices/userSlices";
import { authenticated } from "store/slices/authSlices";

export const getMyAddresses = () => async (dispatch) => {
  return Apis.address.getListOfAddress().then((res) => {
    dispatch(setMyAddresses(res.addresses?.results || []));
    return res;
  });
};

export const addNewAddressAction = (payload) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.address
    .createAddress({ ...payload })
    .then((res) => dispatch(addNewAddress(res.address)))
    .finally(() => dispatch(endLoading()));
};

export const updateMyInfo = (data) => async (dispatch) => {
  return Apis.user.updateMyInfo(data).then((res) => {
    dispatch(setMyInfo(res.user));
  });
};

export const myInfoAction = () => async (dispatch) => {
  return Apis.user
    .myInfo()
    .then((res) => {
      dispatch(setMyInfo(res.user));
      dispatch(authenticated(true));
    })
    .catch(() => dispatch(authenticated(false)));
};

export const sendOtpToEmail = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.user
    .sendOtpToEmail(data)
    .then((res) => {
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const verifyEmailOtp = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.user
    .verifyEmailOtp(data)
    .then((res) => {
      dispatch(emailUpdate(data));
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const sendOtpToPhone = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.user
    .sendOtpToPhone(data)
    .then((res) => {
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const verifyPhoneOtp = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.user
    .verifyPhoneOtp(data)
    .then((res) => {
      console.log(data);
      dispatch(phoneNumberUpdate(data));
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const getUserDetails = (data) => async (dispatch) =>
  Apis.user.getUserDetails(data).then((res) => {
    console.log(res);
    dispatch(setUserInfo(res.user));
    return res;
  });

export const setMyAvatarAction = (data) => async (dispatch) =>
  Apis.user.setMyAvatar(data).then((res) => {
    dispatch(setMyAvatar(res.avatar));
    return res;
  });

export const updateUsernameAction = (data) => async (dispatch) =>
  Apis.user.userNameUpdate(data).then((res) => {});
