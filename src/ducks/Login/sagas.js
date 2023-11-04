import {takeLatest} from 'redux-saga/effects';
import {START_LOGIN, START_LOGOUT} from './actionTypes';

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
