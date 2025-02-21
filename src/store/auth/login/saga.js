import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import login from "common/realBackend/authentication/login";
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postSocialLogin } from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  console.log("loginUser saga started");
  try {
    console.log("User credentials:", user);

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      console.log("Using Firebase authentication");
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      );
      console.log("Firebase login response:", response);
      yield put(loginSuccess(response));
    } else {
      console.log("Using JWT or Fake authentication");
      const response = yield call(login, user.email, user.password);
      console.log("Login response from API:", response);
      if (response.status === "success") {
        localStorage.setItem("authUser", JSON.stringify(response));
        yield put(loginSuccess(response));
        history('/dashboard');
      } else {
        console.error("Login failed:", response.message);
        yield put(apiError(new Error(response.message)));
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    console.log("Logging out");
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      console.log("Firebase logout response:", response);
      yield put(logoutUserSuccess(response));
    }
    history('/login');
  } catch (error) {
    console.error("Logout error:", error);
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    console.log("Social login started");
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      );
      console.log("Firebase social login response:", response);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      console.log("Social login response from API:", response);
      if (response.status === "success") {
        localStorage.setItem("authUser", JSON.stringify(response));
        yield put(loginSuccess(response));
        history("/dashboard");
      } else {
        console.error("Social login failed:", response.message);
        yield put(apiError(new Error(response.message)));
      }
    }
  } catch (error) {
    console.error("Social login error:", error);
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
