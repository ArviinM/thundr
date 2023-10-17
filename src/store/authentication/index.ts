import { createSelector, createSlice } from '@reduxjs/toolkit';

import { APIChallengeQuestionResponseData } from '@services/modules/users';
export interface AuthState extends APIChallengeQuestionResponseData {
   isLogin: boolean;
}

type AuthPayload = {
   payload: Partial<AuthState>;
};

export const slice = createSlice({
   name: 'authentication',
   initialState: { isLogin: false } as AuthState,
   reducers: {
      authenticate: (_, { payload }: AuthPayload) => {
         return {
            isLogin: true,
            ...payload,
         };
      },
      logout: _ => {
         return {
            isLogin: false,
         };
      },
   },
});

export default slice.reducer;

export const { authenticate } = slice.actions;
