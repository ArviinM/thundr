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
  IMessage,
  PasswordCreationRequest,
  Reaction,
} from '../types/generated.ts';
import {useAuthStore} from '../store/authStore.ts';
import {queryClient} from '../utils/queryClient.ts';
import {usePasswordCreation} from '../hooks/registration/usePasswordCreation.ts';
import {useRefreshToken} from '../hooks/useRefreshToken.ts';
import {useRegisterToken} from '../hooks/notification/useRegisterToken.ts';
import useCustomerProfileStore from '../store/profileStore.ts';
import useCustomerDetailsStore from '../store/detailsStore.ts';
import Toast from 'react-native-toast-message';

import {connectSocket, disconnectSocket, socket} from '../utils/socket.ts';
import {WSStatus} from '../../thundr-shared/types/enum/WSStatus.ts';

import {navigationRef} from '../constants/navigator.ts';
import {useQueryClient} from '@tanstack/react-query';
import {transformChatMessageForGiftedChat} from '../hooks/chat/transformMessage.ts';
import {useGetStatus} from '../hooks/status/useGetStatus.ts';
import useSubscribeCheck from '../store/subscribeStore.ts';
import DeviceInfo from 'react-native-device-info';

type AuthContextData = {
  authData?: AuthDataResponse;
  loading: boolean;
  signIn(data: AuthDataRequest): Promise<void>;
  signOut(): void;
  signUp(data: PasswordCreationRequest): Promise<void>;
  signInSSO(data: AuthDataResponse): Promise<void>;
  loadStorageData(): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}
const AuthProvider = ({children}: AuthProviderProps) => {
  const setAuthData = useAuthStore(state => state.setAuthData);
  const authData = useAuthStore(state => state.authData);

  const query = useQueryClient(queryClient);

  const [loading, setLoading] = useState(true);

  const signInUser = useSignInUser();
  const passwordCreation = usePasswordCreation();
  const refreshTokenCustomer = useRefreshToken();
  const registerToken = useRegisterToken();
  const status = useGetStatus();

  const setCustomerProfile = useCustomerProfileStore(
    state => state.setCustomerProfile,
  );
  const setCustomerDetails = useCustomerDetailsStore(
    state => state.setCustomerDetails,
  );
  const setUserSubscription = useSubscribeCheck(
    state => state.setIsCustomerSubscribed,
  );

  useEffect(() => {
    if (status.data) {
      if (status.data.statusCode === 503) {
        signOut();
        navigationRef.navigate('Maintenance');
      }
      if (status.data.current !== DeviceInfo.getVersion()) {
        signOut();
        navigationRef.navigate('VersionUpdate');
      }
    }
  }, [status.data]);

  useEffect(() => {
    loadStorageData();
  }, []);

  useEffect(() => {
    if (authData) {
      connectSocket(authData);
    }

    return () => disconnectSocket();
  }, [authData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (authData && socket) {
        socket?.emit(
          'KEEPALIVE',
          {
            msgType: 'KEEPALIVE',
            data: {
              sub: authData.sub,
              bearer: `Bearer ${authData.accessToken}`,
              timestamp: Date.now(),
            },
            wsStatus: WSStatus.GENERIC_SUCCESS,
          },
          data => {
            console.log(JSON.stringify(data, null, 2));
          },
        );
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [authData, socket]);

  useEffect(() => {
    if (socket) {
      console.log('now listening to chat');

      socket.on('CHAT', event => {
        let newMessage = transformChatMessageForGiftedChat({
          id: event.data.id,
          message: event.data.message,
          attachments: event.data.attachments || [],
          created: event.data.created,
          senderSub: event.data.senderSub,
          targetSub: event.data.targetSub,
          chatRoomID: event.data.chatRoomID,
          isRead: event.data.isRead,
          isUnsent: event.data.isUnsent,
          replyingId: event.data.replyingId,
          reactions: event.data.reactions,
          replying: event.data.replying,
        });
        query.refetchQueries({queryKey: ['get-chat-list']});

        query.setQueriesData(
          {queryKey: ['get-chat-message']},
          (oldData: any) => {
            if (
              oldData.pages &&
              oldData.pages[0][0].chatRoomID === event.data.chatRoomID
            ) {
              return {
                ...oldData,
                pages: [
                  [newMessage, ...oldData.pages[0]],
                  ...oldData.pages.slice(1),
                ],
              };
            } else {
              query.refetchQueries({queryKey: ['get-chat-message']});
              return oldData;
            }
          },
        );

        query.refetchQueries({queryKey: ['get-chat-list']});
      });
    }

    return () => {
      socket?.off('CHAT');
    };
  }, [authData, socket]);

  useEffect(() => {
    if (socket) {
      console.log('now listening to push notif');
      socket.on('PUSH_NOTIFICATION', event => {
        if (event.data.matchPhoto && event.data.chatRoomUuid) {
          navigationRef.navigate('MatchFound', {
            matchPhoto: event.data.matchPhoto,
            sub: event.data.subId,
            isMare: event.data.matchType?.toLowerCase() === 'mare',
            chatRoomId: event.data.chatRoomUuid,
          });
        }
      });
    }

    return () => {
      socket?.off('PUSH_NOTIFICATION');
    };
  }, [authData, socket]);

  useEffect(() => {
    if (socket) {
      console.log('now listening to reactions create');

      socket.on('REACTION_CREATE', event => {
        const reaction: Reaction = {
          reactionId: event.data.reactionId,
          reactionEmoji: event.data.reactionEmoji || '',
          reactionSub: event.data.reactionSub || '',
        };

        queryClient.setQueriesData(
          {queryKey: ['get-chat-message']},
          (oldData: any) => {
            if (
              oldData.pages &&
              oldData.pages.some((page: any[]) =>
                page.some(
                  message =>
                    message.chatRoomID === event.data.chatRoomId &&
                    message._id === event.data.messageId,
                ),
              )
            ) {
              return {
                ...oldData,
                pages: oldData.pages.map((page: any[]) =>
                  page.map(message =>
                    message.chatRoomID === event.data.chatRoomId &&
                    message._id === event.data.messageId
                      ? {
                          ...message,
                          reactions: [...message.reactions, reaction],
                        } // Add the new react
                      : message,
                  ),
                ),
              };
            } else {
              return oldData; // If the message is not found, return the old data as is.
            }
          },
        );
      });
    }

    return () => {
      socket?.off('REACTION_CREATE');
    };
  }, [authData, socket]);

  useEffect(() => {
    if (socket) {
      console.log('now listening to reactions delete');

      socket.on('REACTION_DELETE', event => {
        console.log(JSON.stringify(event, null, 2));

        queryClient.setQueriesData(
          {queryKey: ['get-chat-message']},
          (oldData: any) => {
            if (oldData?.pages) {
              oldData.pages = oldData.pages.map((page: IMessage[]) => {
                const messageIndex = page.findIndex(
                  (msg: IMessage) => msg._id === event.data.messageId,
                );

                if (messageIndex !== -1) {
                  // Filter out the reaction to remove
                  const updatedReactions = (
                    page[messageIndex].reactions || []
                  ).filter(
                    (reaction: Reaction) =>
                      reaction.reactionId !== event.data.reactionId,
                  );

                  // Update the message in newData using map to create a new array
                  return page.map((msg: IMessage, index: number) =>
                    index === messageIndex
                      ? {...msg, reactions: updatedReactions}
                      : msg,
                  );
                }

                return page; // Return the page unchanged if no matching message is found
              });
              return oldData;
            } else {
              return oldData;
            }
          },
        );
      });
    }

    return () => {
      socket?.off('REACTION_DELETE');
    };
  }, [authData, socket]);

  useEffect(() => {
    if (socket) {
      console.log('now listening to chat delete');

      socket.on('CHAT_DELETE', event => {
        queryClient.setQueriesData(
          {queryKey: ['get-chat-message']},
          (oldData: any) => {
            if (oldData?.pages) {
              for (const page of oldData.pages) {
                const messageIndex = page.findIndex(
                  (msg: IMessage) => msg._id === event.data.messageId,
                );

                if (messageIndex !== -1) {
                  // Update unsent on the original message if it's found
                  page[messageIndex] = {
                    ...page[messageIndex],
                    unsent: true,
                    sent: false,
                    pending: false,
                    received: false,
                  };
                  break; // Stop searching once found
                }
              }
              return oldData; // Return the updated oldData
            } else {
              return oldData;
            }
          },
        );

        query.refetchQueries({queryKey: ['get-chat-list']});
      });
    }

    return () => {
      socket?.off('CHAT_DELETE');
    };
  }, [authData, socket]);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData: AuthDataResponse = JSON.parse(authDataSerialized);
        const result = await refreshTokenCustomer.mutateAsync({
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
      setUserSubscription(false);
      disconnectSocket();

      // @ts-ignore
      setAuthData(undefined);

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
      value={{
        authData,
        loading,
        signIn,
        signOut,
        signUp,
        signInSSO,
        loadStorageData,
      }}>
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
