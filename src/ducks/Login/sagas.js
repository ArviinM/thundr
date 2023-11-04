import {call, put, takeLatest} from 'redux-saga/effects';
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  START_LOGIN,
  START_LOGOUT,
  START_LOGOUT_FAILED,
  START_LOGOUT_SUCCESS,
} from './actionTypes';
import {GENERIC_ERROR_MESSAGE} from '../../utils/commons';
import {GET_ACCOUNT_REQUEST} from '../Common/actionTypes';
// import crashlytics from '@react-native-firebase/crashlytics';

export function* startLoginProcess({payload}) {
  try {
    console.log('USER LOGGED IN');
  } catch (error) {
    return error;
  }
}

export function* startLogoutProcess({payload}) {
  try {
    console.log('USER LOGOUT');
  } catch (error) {
    return error;
  }
}

function* loginWatcher() {
  yield takeLatest(START_LOGIN, startLoginProcess);
  yield takeLatest(START_LOGOUT, startLogoutProcess);
}

export default loginWatcher;
