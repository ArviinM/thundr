import { createSlice } from '@reduxjs/toolkit';

export interface APIResponseOject {
   username?: string;
   accessToken?: string;
   idToken?: string;
   refreshToken?: string;
   forProfileCreation?: boolean;
   session?: string;
   challengeName?: string;
}

export interface APIResponseData {
   data: APIResponseOject;
}

interface AuthState extends APIResponseOject {
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
