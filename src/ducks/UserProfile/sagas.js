import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FAILED,
  UPDATE_USER_PROFILE_SUCCESS,
} from './actionTypes';
import UserProfileConfig from '../../api/services/userProfileService';

export function* updateUserProfile({payload}) {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);

  try {
    const response = yield call(UserProfileConfig.updateUserProfile, {
      sub: loginData?.sub || sub,
      ...payload,
    });

    if (response?.status === 200) {
      yield put({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_USER_PROFILE_FAILED,
      payload: error,
    });
  }
}

function* userProfileWatcher() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
}

export default userProfileWatcher;
