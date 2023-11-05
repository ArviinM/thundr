import {UPDATE_ONBOARDING_STATE} from './actionTypes';

export const INITIAL_STATE = {
  onboarded: false,
};

const onboarding = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ONBOARDING_STATE:
      return {
        ...state,
        ...action.newState,
      };
    default:
      return state;
  }
};

export default onboarding;
