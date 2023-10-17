import { createSlice } from '@reduxjs/toolkit';

type SpinnerState = {
   isVisible: boolean;
};

const slice = createSlice({
   name: 'spinner',
   initialState: { isVisible: false } as SpinnerState,
   reducers: {
      show: () => {
         return {
            isVisible: true,
         };
      },
      hide: () => {
         return {
            isVisible: false,
         };
      },
   },
});

export default slice.reducer;

export const { show, hide } = slice.actions;
