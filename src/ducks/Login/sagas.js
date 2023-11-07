import {call, put, takeLatest, select} from 'redux-saga/effects';
import LoginConfig from '../../api/services/loginService';
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  START_LOGIN,
  START_LOGIN_VIA_REFRESH_TOKEN,
  START_LOGIN_VIA_REFRESH_TOKEN_FAILED,
  START_LOGIN_VIA_REFRESH_TOKEN_SUCCESS,
  START_LOGOUT,
  START_LOGOUT_FAILED,
  START_LOGOUT_SUCCESS,
} from './actionTypes';
import {GENERIC_ERROR} from '../../utils/commons';

export function* startLoginProcess({payload}) {
  const {emailOrMobile, password} = payload;
  const phoneNumber = emailOrMobile;

  try {
    const response = yield call(LoginConfig.login, {
      phoneNumber: phoneNumber,
      email: emailOrMobile,
      password: password,
    });

    if (response?.status === 200) {
      yield put({type: LOGIN_SUCCESS, payload: response.data.data});
    }
  } catch (error) {
    const errorMessage =
      error.response.data.message === 'Incorrect username or password.'
        ? 'Incorrect Username or Password.'
        : GENERIC_ERROR;
    yield put({
      type: LOGIN_FAILED,
      payload: errorMessage,
    });
  }
}

export function* startLoginViaRefreshToken({payload}) {
  const {refreshToken} = payload;
  const {loginData} = yield select(state => state.login);

  try {
    const response = yield call(LoginConfig.loginViaRefreshToken, {
      refreshToken: refreshToken,
    });

    if (response?.status === 200) {
      yield put({
        type: START_LOGIN_VIA_REFRESH_TOKEN_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    const errorMessage =
      error.response.data.message === 'Incorrect username or password.'
        ? 'Incorrect Username or Password.'
        : GENERIC_ERROR;
    yield put({
      type: START_LOGIN_VIA_REFRESH_TOKEN_FAILED,
      payload: errorMessage,
    });
  }
}

export function* startLogoutProcess({payload}) {
  try {
    const response = yield call(LoginConfig.logout);
    yield put({type: START_LOGOUT_SUCCESS, payload: response.data.data});
  } catch (error) {
    yield put({
      type: START_LOGOUT_FAILED,
    });
  }
}

function* loginWatcher() {
  yield takeLatest(START_LOGIN, startLoginProcess);
  yield takeLatest(START_LOGOUT, startLogoutProcess);
  yield takeLatest(START_LOGIN_VIA_REFRESH_TOKEN, startLoginViaRefreshToken);
}

export default loginWatcher;
