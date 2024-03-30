import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSignInUser} from '../hooks/useSignInUser.ts';
import {AuthDataRequest, AuthDataResponse} from '../types/generated.ts';
import {useAuthStore} from '../store/authStore.ts';

type AuthContextData = {
  authData?: AuthDataResponse;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}
const AuthProvider = ({children}: AuthProviderProps) => {
  // const [authData, setAuthData] = useState<AuthDataResponse>();
  // Applying Zustand Auth Store
  const setAuthData = useAuthStore(state => state.setAuthData);
  const authData = useAuthStore(state => state.authData);

  const [loading, setLoading] = useState(true);

  const signInUser = useSignInUser();

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData: AuthDataResponse = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async () => {
    try {
      const data: AuthDataResponse = await signInUser.mutateAsync({
        phoneNumber: '+639000000001',
        password: 'George123!',
      } as AuthDataRequest);

      setAuthData(data);

      await AsyncStorage.setItem('@AuthData', JSON.stringify(data));
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      // @ts-ignore
      setAuthData(undefined);
      await AsyncStorage.removeItem('@AuthData');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};
