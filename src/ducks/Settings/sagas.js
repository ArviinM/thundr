import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  GET_CUSTOMER_SETTINGS,
  GET_CUSTOMER_SETTINGS_FAILED,
  GET_CUSTOMER_SETTINGS_SUCCESS,
  GET_CUSTOMER_SURVEY,
  GET_CUSTOMER_SURVEY_FAILED,
  GET_CUSTOMER_SURVEY_SUCCESS,
  UPDATE_CUSTOMER_SETTINGS,
  UPDATE_CUSTOMER_SETTINGS_FAILED,
  UPDATE_CUSTOMER_SETTINGS_SUCCESS,
  UPDATE_CUSTOMER_SURVEY,
  UPDATE_CUSTOMER_SURVEY_FAILED,
  UPDATE_CUSTOMER_SURVEY_SUCCESS,
} from './actionTypes';
import SettingsConfig from '../../api/services/settingsService';
import {START_LOGOUT} from '../Login/actionTypes';
import {UPDATE_PERSISTED_STATE} from '../PersistedState/actionTypes';
import {
  START_REGISTER_DEVICE_TOKEN,
  START_UNREGISTER_DEVICE_TOKEN,
} from '../Notification/actionTypes';

export function* getCustomerSettings() {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  const currentUserSub = loginData?.sub || sub;

  const payload = {
    sub: currentUserSub,
  };

  try {
    const response = yield call(SettingsConfig.getCustomerSettings, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CUSTOMER_SETTINGS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_SETTINGS_FAILED,
      payload: error,
    });
  }
}

export function* updateCustomerSettings({payload}) {
  const {inAppNotificationOn, emailNotificationOn} = payload;
  const {sub, fcmToken} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);

  try {
    if (inAppNotificationOn) {
      yield put({
        type: START_REGISTER_DEVICE_TOKEN,
        payload: {subId: sub, fcmToken},
      });
    } else {
      yield put({type: START_UNREGISTER_DEVICE_TOKEN, payload: {subId: sub}});
    }

    const response = yield call(SettingsConfig.updateCustomerSettings, {
      sub: loginData?.sub || sub,
      inAppNotificationOn,
      emailNotificationOn,
    });

    if (response?.status === 200) {
      yield put({
        type: UPDATE_CUSTOMER_SETTINGS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_CUSTOMER_SETTINGS_FAILED,
      payload: error,
    });
  }
}

export function* getCustomerSurvey() {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  const currentUserSub = loginData?.sub || sub;

  const payload = {
    sub: currentUserSub,
  };

  try {
    const response = yield call(SettingsConfig.getCustomerSurvey, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CUSTOMER_SURVEY_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_SURVEY_FAILED,
      payload: error,
    });
  }
}

export function* updateCustomerSurvey({payload}) {
  try {
    const response = yield call(SettingsConfig.updateCustomerSurvey, payload);
    if (response?.status === 200) {
      yield put({
        type: UPDATE_CUSTOMER_SURVEY_SUCCESS,
        payload: response.data,
      });
      yield put({type: GET_CUSTOMER_SURVEY});
      //Added this to properly deactivate and logout the user once updated the customer's survey
      yield put({type: START_LOGOUT});
      yield put({
        type: UPDATE_PERSISTED_STATE,
        newState: {
          refreshToken: null,
          customerName: null,
          sub: null,
          customerPhoto: null,
          showPossiblesPrompt: false,
        },
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_CUSTOMER_SURVEY_FAILED,
      payload: error,
    });
  }
}

function* settingsWatcher() {
  yield takeLatest(GET_CUSTOMER_SETTINGS, getCustomerSettings);
  yield takeLatest(UPDATE_CUSTOMER_SETTINGS, updateCustomerSettings);
  yield takeLatest(GET_CUSTOMER_SURVEY, getCustomerSurvey);
  yield takeLatest(UPDATE_CUSTOMER_SURVEY, updateCustomerSurvey);
}

export default settingsWatcher;
