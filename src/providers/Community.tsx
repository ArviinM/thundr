import React, {createContext, useContext, ReactNode} from 'react';
import {navigationRef} from '../constants/navigator.ts';
import {useAuth} from './Auth.tsx';
import {useGetCustomerProfile} from '../hooks/profile/useGetCustomerProfile.ts';
import {CustomerData} from '../types/generated.ts';
import {Loading} from '../components/shared/Loading.tsx';

type CommunityContextData = {
  // authData?: AuthDataResponse;
  // loading: boolean;
  // signIn(data: AuthDataRequest): Promise<void>;
  // signOut(): void;
  // signUp(data: PasswordCreationRequest): Promise<void>;
  // signInSSO(data: AuthDataResponse): Promise<void>;
  // loadStorageData(): Promise<void>;
  profileData?: CustomerData;
  loading: boolean;
};

const CommunityContext = createContext<CommunityContextData>(
  {} as CommunityContextData,
);

interface CommunityProviderProps {
  children: ReactNode;
}
const CommunityProvider = ({children}: CommunityProviderProps) => {
  const auth = useAuth();

  const customerProfile = useGetCustomerProfile({
    sub: auth.authData?.sub || '',
  });

  return (
    <CommunityContext.Provider
      value={{
        profileData: customerProfile.data,
        loading: customerProfile.isLoading,
      }}>
      {children}
    </CommunityContext.Provider>
  );
};

function useCommunity(): CommunityContextData {
  const context = useContext(CommunityContext);

  if (!context) {
    throw new Error('useCommunity must be used within an Community Provider');
  }

  return context;
}

export {CommunityContext, CommunityProvider, useCommunity};
