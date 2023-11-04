import {combineReducers} from 'redux';
import login from './Login/reducer';
import {START_LOGOUT_SUCCESS} from './Login/actionTypes';

const appReducer = combineReducers({
  login,
});

const rootReducer = (state, action) => {
  if (action.type === START_LOGOUT_SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
