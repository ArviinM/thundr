import {combineReducers} from 'redux';
import persistedState from './PersistedState/reducer';
import login from './Login/reducer';
import mobileEmail from './MobileEmail/reducer';
import ssoValidation from './SSOValidation/reducer';
import profileCreation from './ProfileCreation/reducer';
import dashboard from './Dashboard/reducer';
import subscription from './Subscription/reducer';
import filters from './Filters/reducer';
import settings from './Settings/reducer';
import userProfile from './UserProfile/reducer';
import {START_LOGOUT, START_LOGOUT_FAILED} from './Login/actionTypes';

const appReducer = combineReducers({
  persistedState,
  login,
  mobileEmail,
  ssoValidation,
  profileCreation,
  dashboard,
  subscription,
  filters,
  settings,
  userProfile,
});

const rootReducer = (state, action) => {
  if (action.type === START_LOGOUT) {
    return {
      persistedState: state?.persistedState,
    };
  }

  return appReducer(state, action);
};

export default rootReducer;
