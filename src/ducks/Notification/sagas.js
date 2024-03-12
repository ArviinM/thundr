import {call, put, takeLatest, select} from 'redux-saga/effects';
import notificationTokenConfig from '../../api/services/notificationTokenService';
import {
  REGISTER_DEVICE_TOKEN_FAILED,
  REGISTER_DEVICE_TOKEN_SUCCESS,
  START_REGISTER_DEVICE_TOKEN,
  UNREGISTER_DEVICE_TOKEN_SUCCESS,
  UNREGISTER_DEVICE_TOKEN_FAILED,
  START_UNREGISTER_DEVICE_TOKEN,
} from './actionTypes';

export function* startRegisterDeviceToken({payload}) {
  const {fcmToken} = yield select(state => state.persistedState);
  const {subId} = payload;
  try {
    const response = yield call(notificationTokenConfig.registerDeviceToken, {
      subId,
      fcmToken,
    });

    if (response?.status === 200) {
      yield put({
        type: REGISTER_DEVICE_TOKEN_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    console.error(error);
    yield put({
      type: REGISTER_DEVICE_TOKEN_FAILED,
      payload: error,
    });
  }
}

export function* startUnregisterDeviceToken({payload}) {
  const {subId} = payload;

  try {
    const response = yield call(notificationTokenConfig.registerDeviceToken, {
      subId,
    });

    if (response?.status === 200) {
      yield put({
        type: UNREGISTER_DEVICE_TOKEN_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    console.error(error);
    yield put({
      type: UNREGISTER_DEVICE_TOKEN_FAILED,
      payload: error,
    });
  }
}
function* registerNotificationWatcher() {
  yield takeLatest(START_REGISTER_DEVICE_TOKEN, startRegisterDeviceToken);
  yield takeLatest(START_UNREGISTER_DEVICE_TOKEN, startUnregisterDeviceToken);
}

export default registerNotificationWatcher;
