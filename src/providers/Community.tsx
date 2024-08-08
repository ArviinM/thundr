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
import {UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {useGetFacialVerificationState} from '../hooks/faceverification/useGetFacialVerificationState.ts';
import {useReplyPost} from '../hooks/community/useReplyPost.ts';
import {useLikePost} from '../hooks/community/useLikePost.ts';
import {useDeletePost} from '../hooks/community/useDeletePost.ts';
import {queryClient} from '../utils/queryClient.ts';
import {useCreateRepost} from '../hooks/community/useCreateRepost.ts';

type CommunityContextData = {
  createPost: UseMutationResult<any, any, PostRequest, unknown>;
  replyPost: UseMutationResult<any, any, ReplyRequest, unknown>;
  handleDeletePost: (postId: string) => Promise<void>;
  likeThePost: (likeThePost: string, isLiked: boolean) => Promise<void>;
  handleRepost: (
    postId: string,
    community: number,
    isReposted: boolean,
  ) => Promise<void>;
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
  const query = useQueryClient(queryClient);
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
  const deletePost = useDeletePost();
  const repost = useCreateRepost();

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const likeThePost = async (postId: string, isLiked: boolean) => {
    if (auth.authData) {
      await likePost.mutateAsync({
        sub: auth.authData.sub,
        postId: postId,
        isLiked: isLiked,
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (auth.authData) {
      await deletePost.mutateAsync({
        sub: auth.authData.sub,
        postId: postId,
      });
    }

    await query.invalidateQueries({queryKey: ['get-latest-posts']});
  };

  const handleRepost = async (
    postId: string,
    community: number,
    isReposted: boolean,
  ) => {
    if (auth.authData) {
      await repost.mutateAsync({
        sub: auth.authData.sub,
        postId: postId,
        community: community,
        isReposted: isReposted,
      });

      await query.invalidateQueries({queryKey: ['get-latest-posts']});
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (facialVerificationState.isSuccess) {
      if (facialVerificationState.data === 'VERIFIED') {
        setModalVisible(false);
      } else if (facialVerificationState.data === 'UNVERIFIED') {
        setModalVisible(true);
      }
    } else {
      timer = setTimeout(() => {
        setModalVisible(true);
      }, 5000); // Show the modal after 5 seconds if the data hasn't loaded
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [facialVerificationState.data, facialVerificationState.isSuccess]);

  return (
    <CommunityContext.Provider
      value={{
        createPost: createPost,
        replyPost: replyPost,
        handleRepost,
        handleDeletePost,
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
