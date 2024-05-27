import Apis from "services/apis";
import { startLoading, endLoading } from "store/slices/appSlices";
import { snackActions } from "utils/SnackbarUtils";
import { getMyAddresses } from "store/actions/userActions";
import { authenticated } from "store/slices/authSlices";
import { clearStore } from "store/actions/appActions";
export const googleAuth = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.auth
    .googleAuth(data)
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.access_token);
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const setGooglePassword = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.auth
    .setGooglePassword(data)
    .then((res) => {
      localStorage.setItem("token", res.access_token);
      dispatch(authenticated(true));

      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const logoutAction = () => (dispatch) => {
  return Apis.auth.logout().then(() => {
    localStorage.removeItem("token");
    snackActions.info("Log Out Successful");
    dispatch(clearStore());
  });
};

export const optLoginCheckingAction = (data) => (dispatch) => {
  return Apis.auth.optLoginChecking(data).then((res) => {
    loginActions(res, dispatch);
  });
};

export const passwordLoginAction = (data) => (dispatch) => {
  return Apis.auth.passwordLogin(data).then((res) => {
    loginActions(res, dispatch);
  });
};

function loginActions(res, dispatch) {
  localStorage.setItem("token", res.access_token);
  dispatch(authenticated(true));
  dispatch(getMyAddresses({ token: res.access_token }));
  snackActions.success("Successful");
}

export const userNameCheckingAction = (data) => (dispatch) => {
  return Apis.auth.userNameChecking(data).then((res) => {});
};

export const userNameUpdateAction = (data) => (dispatch) => {
  return Apis.auth.userNameUpdate(data).then((res) => {});
};
