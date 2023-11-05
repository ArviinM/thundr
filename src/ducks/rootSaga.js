import {all} from 'redux-saga/effects';
import loginWatcher from './Login/sagas';
import mobileEmailWatcher from './MobileEmail/sagas';

export default function* rootSaga() {
  yield all([loginWatcher(), mobileEmailWatcher()]);
}
