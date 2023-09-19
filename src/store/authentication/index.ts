import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
   accessToken: string;
   idToken: string;
   refreshToken: string;
   challengeName: string;
}

const slice = createSlice({
   name: 'auth',
   initialState: {} as AuthState,
   reducers: {},
});

export default slice.reducer;
