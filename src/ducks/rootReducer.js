import {combineReducers} from 'redux';
import login from './Login/reducer';
import mobileEmail from './MobileEmail/reducer';
import ssoValidation from './SSOValidation/reducer';
import {START_LOGOUT_SUCCESS} from './Login/actionTypes';

const appReducer = combineReducers({
  login,
  mobileEmail,
  ssoValidation,
});

const rootReducer = (state, action) => {
  if (action.type === START_LOGOUT_SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
