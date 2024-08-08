import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import {useAuth} from './Auth.tsx';
import {useGetCustomerProfile} from '../hooks/profile/useGetCustomerProfile.ts';
import {CustomerData, PostRequest, ReplyRequest} from '../types/generated.ts';
import {useCreatePost} from '../hooks/community/useCreatePost.ts';
import {UseMutationResult} from '@tanstack/react-query';
import {useGetFacialVerificationState} from '../hooks/faceverification/useGetFacialVerificationState.ts';
import {useReplyPost} from '../hooks/community/useReplyPost.ts';
import {useLikePost} from '../hooks/community/useLikePost.ts';

type CommunityContextData = {
  createPost: UseMutationResult<any, any, PostRequest, unknown>;
  replyPost: UseMutationResult<any, any, ReplyRequest, unknown>;
  likeThePost: (likeThePost: string, isLiked: boolean) => Promise<void>;
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
  const replyPost = useReplyPost();
  const likePost = useLikePost();

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const likeThePost = async (postId: string, isLiked: boolean) => {
    if (auth.authData) {
      console.log({postId: postId, isLiked: isLiked});
      await likePost.mutateAsync({
        sub: auth.authData.sub,
        postId: postId,
        isLiked: isLiked,
      });
    }
  };

  // useEffect(() => {
  //   if (facialVerificationState.isLoading) {
  //     console.log('test', facialVerificationState.data);
  //     showModal();
  //   }
  // }, [facialVerificationState.data, facialVerificationState.isLoading]);

  return (
    <CommunityContext.Provider
      value={{
        createPost: createPost,
        replyPost: replyPost,
        likeThePost,
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
