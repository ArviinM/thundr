import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  CUSTOMER_MATCH,
  CUSTOMER_MATCH_FAILED,
  CUSTOMER_MATCH_SUCCESS,
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_FAILED,
  GET_CUSTOMER_DETAILS_SUCCESS,
  GET_CUSTOMER_PHOTO,
  GET_CUSTOMER_PHOTO_FAILED,
  GET_CUSTOMER_PHOTO_SUCCESS,
  GET_CUSTOMER_PROFILE,
  GET_CUSTOMER_PROFILE_SUCCESS,
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAILED,
  GET_MATCH_LIST_SUCCESS,
  UPDATE_CURRENT_LOCATION,
  UPDATE_CURRENT_LOCATION_FAILED,
  UPDATE_CURRENT_LOCATION_SUCCESS,
} from './actionTypes';
import DashboardConfig from '../../api/services/dashboardService';
import {UPDATE_PERSISTED_STATE} from '../PersistedState/actionTypes';

// Reach number of swipe allowed

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
  try {
    const response = yield call(DashboardConfig.customerMatch, {
      sub,
      target,
      tag,
    });

    if (response?.status === 200) {
      yield put({
        type: CUSTOMER_MATCH_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: CUSTOMER_MATCH_FAILED,
      payload: error,
    });
  }
}

export function* updateCurrentLocation({payload}) {
  const {longitude, latitude} = payload;
  const longitudeAbsValue = Math.abs(longitude);
  const {sub} = yield select(state => state.persistedState);
  try {
    const response = yield call(DashboardConfig.updateCurrentLocation, {
      sub,
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

function* dashboardWatcher() {
  yield takeLatest(GET_CUSTOMER_DETAILS, getCustomerDetails);
  yield takeLatest(GET_CUSTOMER_PHOTO, getCustomerPhoto);
  yield takeLatest(GET_CUSTOMER_PROFILE, getCustomerProfile);
  yield takeLatest(GET_MATCH_LIST, getMatchList);
  yield takeLatest(CUSTOMER_MATCH, customerMatch);
  yield takeLatest(UPDATE_CURRENT_LOCATION, updateCurrentLocation);
}

export default dashboardWatcher;
