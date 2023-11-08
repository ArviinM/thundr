import {combineReducers} from 'redux';
import onboarding from './Onboarding/reducer';
import login from './Login/reducer';
import mobileEmail from './MobileEmail/reducer';
import ssoValidation from './SSOValidation/reducer';
import profileCreation from './ProfileCreation/reducer';
import dashboard from './Dashboard/reducer';
import {START_LOGOUT_SUCCESS} from './Login/actionTypes';

const appReducer = combineReducers({
  onboarding,
  login,
  mobileEmail,
  ssoValidation,
  profileCreation,
  dashboard,
});

const rootReducer = (state, action) => {
  if (action.type === START_LOGOUT_SUCCESS && !state.onboarding) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
