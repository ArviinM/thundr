import React, {createContext, useContext, ReactNode} from 'react';
import {useAuth} from './Auth.tsx';
import {useGetCustomerProfile} from '../hooks/profile/useGetCustomerProfile.ts';
import {CustomerData, PostRequest} from '../types/generated.ts';
import {useCreatePost} from '../hooks/community/useCreatePost.ts';
import {UseMutationResult} from '@tanstack/react-query';

type CommunityContextData = {
  profileData?: CustomerData;
  loading: boolean;
  createPost: UseMutationResult<any, any, PostRequest, unknown>;
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

  const createPost = useCreatePost();

  return (
    <CommunityContext.Provider
      value={{
        profileData: customerProfile.data,
        loading: customerProfile.isLoading,
        createPost: createPost,
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
