import {all} from 'redux-saga/effects';
import loginWatcher from './Login/sagas';
import mobileEmailWatcher from './MobileEmail/sagas';
import ssoValidationWatcher from './SSOValidation/sagas';
import profileCreationWatcher from './ProfileCreation/sagas';
import dashboardWatcher from './Dashboard/sagas';
import subscriptionWatcher from './Subscription/sagas';
import filtersWatcher from './Filters/sagas';
import settingsWatcher from './Settings/sagas';
import userProfileWatcher from './UserProfile/sagas';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    mobileEmailWatcher(),
    ssoValidationWatcher(),
    profileCreationWatcher(),
    dashboardWatcher(),
    subscriptionWatcher(),
    filtersWatcher(),
    settingsWatcher(),
    userProfileWatcher(),
  ]);
}
