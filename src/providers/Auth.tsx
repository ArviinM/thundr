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
import {useRegisterToken} from '../hooks/notification/useRegisterToken.ts';
import useCustomerProfileStore from '../store/profileStore.ts';
import useCustomerDetailsStore from '../store/detailsStore.ts';
import Toast from 'react-native-toast-message';

type AuthContextData = {
  authData?: AuthDataResponse;
  loading: boolean;
  signIn(data: AuthDataRequest): Promise<void>;
  signOut(): void;
  signUp(data: PasswordCreationRequest): Promise<void>;
  signInSSO(data: AuthDataResponse): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}
const AuthProvider = ({children}: AuthProviderProps) => {
  const setAuthData = useAuthStore(state => state.setAuthData);
  const authData = useAuthStore(state => state.authData);

  const [loading, setLoading] = useState(true);

  const signInUser = useSignInUser();
  const passwordCreation = usePasswordCreation();
  const refreshToken = useRefreshToken();
  const registerToken = useRegisterToken();

  const setCustomerProfile = useCustomerProfileStore(
    state => state.setCustomerProfile,
  );
  const setCustomerDetails = useCustomerDetailsStore(
    state => state.setCustomerDetails,
  );

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
          sub: _authData.sub,
          username: _authData.username,
        });

        const updatedAuthData = {
          ..._authData,
          accessToken: result.accessToken,
          idToken: result.idToken,
          forProfileCreation: result.forProfileCreation,
        };

        setAuthData(updatedAuthData);

        await AsyncStorage.setItem(
          '@AuthData',
          JSON.stringify(updatedAuthData),
        );

        //TODO: Investigate
        // await queryClient.invalidateQueries({
        //   queryKey: ['get-match-list', updatedAuthData],
        // });
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
      setLoading(false);
      await signOut();
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (data: AuthDataRequest) => {
    try {
      const result: AuthDataResponse = await signInUser.mutateAsync(data);

      if (result.loginDeactivated) {
        Toast.show({
          type: 'THNRError',
          props: {
            title: 'Juskolord!',
            subtitle:
              'Mukhang na-deactivate ang account mo, mars. Kausapin mo support kung di mo bet.',
          },
          position: 'top',
          topOffset: 30,
        });
        return;
      }

      setAuthData(result);

      await AsyncStorage.setItem('@AuthData', JSON.stringify(result));
      // await queryClient.refetchQueries({
      //   queryKey: ['get-match-list', result.sub],
      // });
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      if (authData?.sub) {
        await registerToken.mutateAsync({subId: authData.sub, token: ''});
      }

      setCustomerProfile(null);
      setCustomerDetails(null);

      // @ts-ignore
      setAuthData(undefined);
      // reset all cache
      await queryClient.resetQueries({
        queryKey: [
          'get-match-list',
          'customer-compatibility-questions',
          'get-chat-list',
          'get-chat-message',
        ],
        type: 'all',
      });

      queryClient.clear();
      await AsyncStorage.removeItem('@AuthData');
    } catch (error) {
      console.error('Error signing out:', error);
      // @ts-ignore
      setAuthData(undefined);
      queryClient.clear();
      await AsyncStorage.removeItem('@AuthData');
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

  const signInSSO = async (data: AuthDataResponse) => {
    try {
      setAuthData(data);
      await AsyncStorage.setItem('@AuthData', JSON.stringify(data));
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{authData, loading, signIn, signOut, signUp, signInSSO}}>
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
