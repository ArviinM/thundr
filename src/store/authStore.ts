import {create} from 'zustand';
import {AuthDataResponse} from '../types/generated.ts';

// Define the type for your store state
type AuthStoreState = {
  authData: AuthDataResponse | undefined;
  setAuthData: (data: AuthDataResponse) => void;
};

// Define the initial state and actions for the store
export const useAuthStore = create<AuthStoreState>(set => ({
  authData: undefined,
  setAuthData: (data: AuthDataResponse) => set({authData: data}),
}));
