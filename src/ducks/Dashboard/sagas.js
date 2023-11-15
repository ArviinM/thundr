import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_FAILED,
  GET_CUSTOMER_DETAILS_SUCCESS,
  GET_CUSTOMER_PHOTO,
  GET_CUSTOMER_PHOTO_FAILED,
  GET_CUSTOMER_PHOTO_SUCCESS,
  GET_CUSTOMER_PROFILE,
} from './actionTypes';
import DashboardConfig from '../../api/services/dashboardService';
import {UPDATE_PERSISTED_STATE} from '../PersistedState/actionTypes';

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
  try {
    const response = yield call(DashboardConfig.getCustomerProfile, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CUSTOMER_PHOTO_SUCCESS,
        payload: response.data.data,
      });
      yield put({
        type: UPDATE_PERSISTED_STATE,
        newState: {
          customerName: response.data.data.name,
          customerPhoto: response.data.data.customerPhoto[0].photoUrl,
        },
      });
    }
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_PHOTO_FAILED,
      payload: error,
    });
  }
}

function* dashboardWatcher() {
  yield takeLatest(GET_CUSTOMER_DETAILS, getCustomerDetails);
  yield takeLatest(GET_CUSTOMER_PHOTO, getCustomerPhoto);
  yield takeLatest(GET_CUSTOMER_PROFILE, getCustomerProfile);
}

export default dashboardWatcher;
