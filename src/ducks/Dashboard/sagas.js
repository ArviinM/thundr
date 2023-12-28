import {
  call,
  put,
  takeLatest,
  select,
  all,
  takeEvery,
} from 'redux-saga/effects';
import {
  CUSTOMER_MATCH,
  CUSTOMER_MATCH_FAILED,
  CUSTOMER_MATCH_SUCCESS,
  GET_CHAT_CUSTOMER_DETAILS,
  GET_CHAT_CUSTOMER_DETAILS_FAILED,
  GET_CHAT_CUSTOMER_DETAILS_SUCCESS,
  GET_CHAT_MATCH_LIST,
  GET_CHAT_MATCH_LIST_FAILED,
  GET_CHAT_MATCH_LIST_SUCCESS,
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_FAILED,
  GET_CUSTOMER_DETAILS_SUCCESS,
  GET_CUSTOMER_PHOTO,
  GET_CUSTOMER_PHOTO_FAILED,
  GET_CUSTOMER_PHOTO_SUCCESS,
  GET_CUSTOMER_PROFILE,
  GET_CUSTOMER_PROFILE_SUCCESS,
  GET_LAST_ACTIVITY,
  GET_LAST_ACTIVITY_FAILED,
  GET_LAST_ACTIVITY_SUCCESS,
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAILED,
  GET_MATCH_LIST_SUCCESS,
  GET_MESSAGE,
  GET_MESSAGE_FAILED,
  GET_MESSAGE_SUCCESS,
  SEND_MESSAGE,
  SEND_MESSAGE_FAILED,
  SEND_MESSAGE_SUCCESS,
  UPDATE_CURRENT_LOCATION,
  UPDATE_CURRENT_LOCATION_FAILED,
  UPDATE_CURRENT_LOCATION_SUCCESS,
  UPDATE_DASHBOARD_STATE,
  UPDATE_LAST_ACTIVITY,
  UPDATE_LAST_ACTIVITY_FAILED,
  UPDATE_LAST_ACTIVITY_SUCCESS,
} from './actionTypes';
import DashboardConfig from '../../api/services/dashboardService';
import {UPDATE_PERSISTED_STATE} from '../PersistedState/actionTypes';
import * as RootNavigation from '../../navigations/tempNavigation';
import moment from 'moment';

export function* getCustomerDetails({payload}) {
  try {
    const response = yield call(DashboardConfig.getCustomerDetails, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CUSTOMER_DETAILS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_DETAILS_FAILED,
      payload: error,
    });
  }
}

export function* getCustomerPhoto({payload}) {
  try {
    const response = yield call(DashboardConfig.getCustomerPhoto, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CUSTOMER_PHOTO_SUCCESS,
        payload: response.data.data[0],
      });
      yield put({
        type: UPDATE_PERSISTED_STATE,
        newState: {customerPhoto: response.data.data[0].photoUrl},
      });
    }
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_PHOTO_FAILED,
      payload: error,
    });
  }
}

export function* getCustomerProfile({payload}) {
  const {fromSwipe} = payload;
  try {
    const response = yield call(DashboardConfig.getCustomerProfile, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CUSTOMER_PHOTO_SUCCESS,
        payload: response.data.data,
      });
      yield put({
        type: GET_CUSTOMER_PROFILE_SUCCESS,
        payload: response.data.data,
      });
      /* getCustomerProfile is also used in match list. 
      We need to add !fromSwipe to prevent overriding 
      of data in persisted state which is used 
      as users profile upon login */
      if (!fromSwipe) {
        yield put({
          type: UPDATE_PERSISTED_STATE,
          newState: {
            customerName: response.data.data.name,
            customerPhoto: response.data.data.customerPhoto[0].photoUrl,
          },
        });
      }
    }
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_PHOTO_FAILED,
      payload: error,
    });
  }
}

export function* getMatchList({payload}) {
  try {
    const response = yield call(DashboardConfig.getMatchList, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_MATCH_LIST_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_MATCH_LIST_FAILED,
      payload: error,
    });
  }
}

export function* customerMatch({payload}) {
  const {target, tag} = payload;
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  const {customerPhoto} = yield select(state => state.dashboard);
  try {
    const response = yield call(DashboardConfig.customerMatch, {
      sub: loginData?.sub || sub,
      target,
      tag,
    });

    if (response?.status === 200) {
      yield put({
        type: CUSTOMER_MATCH_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: UPDATE_DASHBOARD_STATE,
        newState: {matchPhoto: customerPhoto},
      });
      if (response?.data?.data.match === 'true') {
        RootNavigation.navigate('MatchFound', response?.data?.data);
      }
    }
  } catch (error) {
    const isNumberOfSwipeReached =
      error?.response?.data?.message === 'Reach number of swipe allowed';
    if (isNumberOfSwipeReached) {
      yield put({
        type: UPDATE_DASHBOARD_STATE,
        newState: {isSwipeReached: true},
      });
    }
    yield put({
      type: CUSTOMER_MATCH_FAILED,
      payload: error,
    });
  }
}

export function* updateCurrentLocation({payload}) {
  const {longitude, latitude} = payload;
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  try {
    const response = yield call(DashboardConfig.updateCurrentLocation, {
      sub: loginData?.sub || sub,
      longitude,
      latitude,
    });

    if (response?.status === 200) {
      yield put({
        type: UPDATE_CURRENT_LOCATION_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_CURRENT_LOCATION_FAILED,
      payload: error,
    });
  }
}

export function* getChatMatchList({payload}) {
  const {tag} = payload;
  try {
    const response = yield call(DashboardConfig.getChatMatchList, payload);
    if (response?.status === 200) {
      if (tag === 'MARE') {
        yield put({
          type: GET_CHAT_MATCH_LIST_SUCCESS,
          marePayload: response.data.data,
        });
      } else {
        yield put({
          type: GET_CHAT_MATCH_LIST_SUCCESS,
          jowaPayload: response.data.data,
        });
      }
    }
  } catch (error) {
    yield put({
      type: GET_CHAT_MATCH_LIST_FAILED,
      payload: error,
    });
  }
}

export function* getCustomerChatProfile({payload}) {
  try {
    const response = yield call(DashboardConfig.getCustomerProfile, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CHAT_CUSTOMER_DETAILS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CHAT_CUSTOMER_DETAILS_FAILED,
      payload: error,
    });
  }
}

export function* getMessage({payload}) {
  const {chatUUID} = payload;
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);

  const todayFormattedDate = moment().format('YYYY-MM-DD');
  const twoDaysAgoFormattedDate = moment()
    .subtract(2, 'days')
    .format('YYYY-MM-DD');

  const apiPayload = {
    sub: loginData?.sub || sub,
    chatRoomID: chatUUID,
    sort: 'ASC',
    startDate: twoDaysAgoFormattedDate,
    endDate: todayFormattedDate,
  };
  try {
    const response = yield call(DashboardConfig.getMessage, apiPayload);
    if (response?.status === 200) {
      yield put({
        type: GET_MESSAGE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_MESSAGE_FAILED,
      payload: error,
    });
  }
}

export function* sendMessage({payload}) {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  try {
    const response = yield call(DashboardConfig.sendMessage, {
      senderSub: loginData?.sub || sub,
      ...payload,
    });

    if (response?.status === 200) {
      yield put({
        type: SEND_MESSAGE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: SEND_MESSAGE_FAILED,
      payload: error,
    });
  }
}

export function* getLastActivity({payload}) {
  try {
    const response = yield call(DashboardConfig.getLastActivity, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_LAST_ACTIVITY_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_LAST_ACTIVITY_FAILED,
      payload: error,
    });
  }
}

export function* updateLastActivity({}) {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  try {
    const response = yield call(DashboardConfig.updateLastActivity, {
      sub: loginData?.sub || sub,
    });

    if (response?.status === 200) {
      yield put({
        type: UPDATE_LAST_ACTIVITY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_LAST_ACTIVITY_FAILED,
      payload: error,
    });
  }
}

function* dashboardWatcher() {
  yield takeLatest(GET_CUSTOMER_DETAILS, getCustomerDetails);
  yield takeLatest(GET_CUSTOMER_PHOTO, getCustomerPhoto);
  yield takeLatest(GET_CUSTOMER_PROFILE, getCustomerProfile);
  yield takeLatest(GET_MATCH_LIST, getMatchList);
  yield takeLatest(CUSTOMER_MATCH, customerMatch);
  yield takeLatest(UPDATE_CURRENT_LOCATION, updateCurrentLocation);
  yield takeLatest(GET_CHAT_MATCH_LIST, getChatMatchList);
  yield takeEvery(GET_CHAT_CUSTOMER_DETAILS, getCustomerChatProfile);
  yield takeLatest(SEND_MESSAGE, sendMessage);
  yield takeLatest(GET_LAST_ACTIVITY, getLastActivity);
  yield takeLatest(UPDATE_LAST_ACTIVITY, updateLastActivity);
  yield takeLatest(GET_MESSAGE, getMessage);
}

export default dashboardWatcher;
