import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import {useAuth} from './Auth.tsx';
import {useGetCustomerProfile} from '../hooks/profile/useGetCustomerProfile.ts';
import {
  CustomerData,
  FacialVerificationState,
  PostRequest,
} from '../types/generated.ts';
import {useCreatePost} from '../hooks/community/useCreatePost.ts';
import {UseMutationResult} from '@tanstack/react-query';
import {useGetFacialVerificationState} from '../hooks/faceverification/useGetFacialVerificationState.ts';

type CommunityContextData = {
  createPost: UseMutationResult<any, any, PostRequest, unknown>;
  profileData?: CustomerData;
  showModal: () => void;
  hideModal: () => void;
  loading: boolean;
  isModalVisible: boolean;
  isUserVerified: boolean;
};

const CommunityContext = createContext<CommunityContextData>(
  {} as CommunityContextData,
);

interface CommunityProviderProps {
  children: ReactNode;
}
const CommunityProvider = ({children}: CommunityProviderProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const auth = useAuth();

  const customerProfile = useGetCustomerProfile({
    sub: auth.authData?.sub || '',
  });
  const facialVerificationState = useGetFacialVerificationState({
    sub: auth.authData?.sub || '',
  });

  const createPost = useCreatePost();

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (facialVerificationState.data !== 'VERIFIED') {
      showModal();
    }
  }, [facialVerificationState.data]);

  return (
    <CommunityContext.Provider
      value={{
        createPost: createPost,
        showModal,
        hideModal,
        loading: customerProfile.isLoading,
        profileData: customerProfile.data,
        isModalVisible: modalVisible,
        isUserVerified: facialVerificationState.data === 'VERIFIED',
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
