import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  GET_FILTERS,
  GET_FILTERS_FAILED,
  GET_FILTERS_SUCCESS,
  UPDATE_FILTERS,
  UPDATE_FILTERS_FAILED,
  UPDATE_FILTERS_SUCCESS,
} from './actionTypes';
import FilterConfig from '../../api/services/filterService';

export function* getFilterDetails() {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  const currentUserSub = loginData?.sub || sub;

  const payload = {
    sub: currentUserSub,
  };

  try {
    const response = yield call(FilterConfig.getFilters, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_FILTERS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FILTERS_FAILED,
      payload: error,
    });
  }
}

export function* updateFilters({payload}) {
  const {ageMax, ageMin, proximity, gender, starSign, hobbies, personality} =
    payload;
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);

  try {
    const response = yield call(FilterConfig.updateFilters, {
      sub: loginData?.sub || sub,
      ageMax,
      ageMin,
      proximity,
      gender,
      starSign,
      hobbies,
      personality,
    });

    if (response?.status === 200) {
      yield put({
        type: UPDATE_FILTERS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_FILTERS_FAILED,
      payload: error,
    });
  }
}

function* filtersWatcher() {
  yield takeLatest(GET_FILTERS, getFilterDetails);
  yield takeLatest(UPDATE_FILTERS, updateFilters);
}

export default filtersWatcher;
