import {all} from 'redux-saga/effects';
import loginWatcher from './Login/sagas';

export default function* rootSaga() {
  yield all([loginWatcher()]);
}
