import {all} from 'redux-saga/effects';
import loginWatcher from './Login/sagas';
import mobileEmailWatcher from './MobileEmail/sagas';
import ssoValidationWatcher from './SSOValidation/sagas';
import profileCreationWatcher from './ProfileCreation/sagas';
import dashboardWatcher from './Dashboard/sagas';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    mobileEmailWatcher(),
    ssoValidationWatcher(),
    profileCreationWatcher(),
    dashboardWatcher(),
  ]);
}
