import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSignInUser} from '../hooks/useSignInUser.ts';
import {
  AuthDataRequest,
  AuthDataResponse,
  PasswordCreationRequest,
} from '../types/generated.ts';
import {useAuthStore} from '../store/authStore.ts';
import {queryClient} from '../utils/queryClient.ts';
import {usePasswordCreation} from '../hooks/registration/usePasswordCreation.ts';
import {useRefreshToken} from '../hooks/useRefreshToken.ts';

type AuthContextData = {
  authData?: AuthDataResponse;
  loading: boolean;
  signIn(data: AuthDataRequest): Promise<void>;
  signOut(): void;
  signUp(data: PasswordCreationRequest): Promise<void>;
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
  const passwordCreation = usePasswordCreation();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData: AuthDataResponse = JSON.parse(authDataSerialized);
        const result = await refreshToken.mutateAsync({
          refreshToken: _authData.refreshToken,
        });

        const updatedAuthData = {
          ..._authData,
          accessToken: result.accessToken,
          idToken: result.idToken,
        };

        setAuthData(updatedAuthData);

        await AsyncStorage.setItem(
          '@AuthData',
          JSON.stringify(updatedAuthData),
        );
        await queryClient.refetchQueries({
          queryKey: ['get-match-list'],
        });
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (data: AuthDataRequest) => {
    try {
      const result: AuthDataResponse = await signInUser.mutateAsync(data);

      setAuthData(result);

      await AsyncStorage.setItem('@AuthData', JSON.stringify(result));
      await queryClient.refetchQueries({
        queryKey: ['get-match-list', result.sub],
      });
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      // @ts-ignore
      setAuthData(undefined);
      // reset all cache
      await queryClient.resetQueries({
        queryKey: ['get-match-list', 'customer-compatibility-questions'],
        type: 'all',
      });
      queryClient.clear();
      await AsyncStorage.removeItem('@AuthData');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const signUp = async (data: PasswordCreationRequest) => {
    try {
      const result = await passwordCreation.mutateAsync(data);
      setAuthData(result);
      await AsyncStorage.setItem('@AuthData', JSON.stringify(result));
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <AuthContext.Provider value={{authData, loading, signIn, signOut, signUp}}>
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
