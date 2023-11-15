import {UPDATE_PERSISTED_STATE} from './actionTypes';

export const INITIAL_STATE = {
  onboarded: false,
  customerName: '',
  customerPhoto: '',
  refreshToken: '',
  sub: '',
};

const persistedState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PERSISTED_STATE:
      return {
        ...state,
        ...action.newState,
      };
    default:
      return state;
  }
};

export default persistedState;
