import { createSelector, createSlice } from '@reduxjs/toolkit';

import { APIChallengeQuestionResponseData } from '@services/modules/users';
export interface AuthState extends APIChallengeQuestionResponseData {
   isLogin: boolean;
}

type AuthPayload = {
   payload: Partial<AuthState>;
};

export const slice = createSlice({
   name: 'auth',
   initialState: { isLogin: false } as AuthState,
   reducers: {
      authenticate: (_, { payload }: AuthPayload) => {
         return {
            isLogin: true,
            ...payload,
         };
      },
   },
});

export const { authenticate } = slice.actions;
