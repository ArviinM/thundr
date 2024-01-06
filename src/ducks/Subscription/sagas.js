import {call, put, select, takeLatest} from 'redux-saga/effects';
import SubscriptionConfig from '../../api/services/subscriptionService';
import {
  GET_SUBSCRIPTION_DETAILS,
  GET_SUBSCRIPTION_DETAILS_FAILED,
  GET_SUBSCRIPTION_DETAILS_SUCCESS,
} from './actionTypes';

export function* getSubscriptionDetails() {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  const currentUserSub = loginData?.sub || sub;

  const payload = {
    currentUserSub,
  };

  try {
    const response = yield call(
      SubscriptionConfig.getSubscriptionDetails,
      payload,
    );
    if (response?.status === 200) {
      yield put({
        type: GET_SUBSCRIPTION_DETAILS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_SUBSCRIPTION_DETAILS_FAILED,
      payload: error,
    });
  }
}

function* subscriptionWatcher() {
  yield takeLatest(GET_SUBSCRIPTION_DETAILS, getSubscriptionDetails);
}

export default subscriptionWatcher;
