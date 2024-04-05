import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {AuthDataResponse, AuthStoreState} from '../types/generated.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create<AuthStoreState>()(
  persist(
    set => ({
      authData: undefined,
      setAuthData: (data: AuthDataResponse) => set({authData: data}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
