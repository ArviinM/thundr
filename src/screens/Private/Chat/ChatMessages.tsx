import React, {useCallback, useEffect} from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {useGetChatMessage} from '../../../hooks/chat/useGetChatMessage.ts';
import {createContext, useContext} from 'react';
import {Chat, FileAttachment, IMessage} from '../../../types/generated.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/commons.ts';
import MessageList from '../../../components/Chat/MessageList.tsx';
import {Loading} from '../../../components/shared/Loading.tsx';
import MessageHeader from '../../../components/Chat/MessageHeader.tsx';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';
import {useSendChatMessage} from '../../../hooks/chat/useSendChatMessage.ts';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {
  MAX_IMAGE_COUNT,
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_COUNT,
  MAX_VIDEO_SIZE_BYTES,
  scale,
} from '../../../utils/utils.ts';
import {useUnsendSelfMessage} from '../../../hooks/chat/useUnsendSelfMessage.ts';
import {useReadMessage} from '../../../hooks/chat/useReadMessage.ts';
import {useUnsendMessage} from '../../../hooks/chat/useUnsendMessage.ts';
import useSubscribeCheck from '../../../store/subscribeStore.ts';
import useChatRoomIDStore from '../../../store/chatRoomIdStore.ts';

import MessageInput from '../../../components/Chat/MessageInput.tsx';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {Platform, View} from 'react-native';
import {useShallow} from 'zustand/react/shallow';
import useChatReplyStore from '../../../store/chatReplyStore.ts';
import {useReactMessage} from '../../../hooks/chat/useReactMessage.ts';
import {useActionSheet} from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';

type ChatMessagesScreenRouteProp = RouteProp<
  RootNavigationParams,
  'ChatMessages'
>;

type ChatMessagesProps = {
  route?: ChatMessagesScreenRouteProp;
};

type ChatContext = {
  handleSendMessage(message: string): void;
  handleImageUpload(isCamera?: boolean): Promise<void | null>;
  handleReactMessage(messageId: number): void;
  loading: boolean;
  loadMoreMessages(): Promise<void>;
  messages?: IMessage[];
  onLongPressActions(message: IMessage): void;
  isMare: boolean;
  isRefetching: boolean;
  user: Chat;
};

const ChatContext = createContext<ChatContext>({} as ChatContext);

const ChatMessages = ({route}: ChatMessagesProps) => {
  const {user, isMare = false} = route?.params || {};
  const query = useQueryClient(queryClient);

  const chatMessage = useGetChatMessage({
    sub: user?.sub || '',
    chatRoomID: user?.chatRoomUuid || '',
    limit: 25,
  });

  const setChatRoom = useChatRoomIDStore(state => state.setChatRoom);
  const isSubscribe = useSubscribeCheck(state => state.isCustomerSubscribed);

  const sendMessage = useSendChatMessage();
  const readMessage = useReadMessage();
  const unsendMessageAll = useUnsendMessage();
  const unsendMessageSelf = useUnsendSelfMessage();
  const reactMessage = useReactMessage();

  const {replyMessage, clearReplyMessage} = useChatReplyStore(
    useShallow(state => ({
      replyMessage: state.replyMessage,
      clearReplyMessage: state.clearReplyMessage,
    })),
  );

  const {showActionSheetWithOptions} = useActionSheet();

  useEffect(() => {
    if (user && chatMessage.isSuccess) {
      const messageIdsToRead = chatMessage.data?.pages
        .flatMap(page => page)
        .filter(
          message => message.user._id !== user.sub && message.isRead === 0,
        )
        .map(message => ({id: message._id}));

      if (messageIdsToRead?.length !== 0) {
        readMessage.mutateAsync(messageIdsToRead).then(() => {
          query.invalidateQueries({queryKey: ['get-chat-list']});
          query.invalidateQueries({queryKey: ['get-chat-message']});
        });
      }
    }
  }, [chatMessage.data?.pages[0]]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        setChatRoom(user.chatRoomUuid);
      }
      return () => {
        setChatRoom('');
        clearReplyMessage();
      };
    }, [user, setChatRoom]),
  );

  if (!user) {
    return <Loading />;
  }

  const handleImageUpload = async (isCamera?: boolean) => {
    try {
      if (isCamera) {
        let cameraMedia = await ImagePicker.openCamera({
          mediaType: 'any',
          forceJpg: true,
          cropping: false,
        });

        if (!cameraMedia) {
          return null;
        }

        const video = cameraMedia.mime.startsWith('video');
        const image = cameraMedia.mime.startsWith('image');

        if (video && !isSubscribe) {
          Toast.show({
            type: 'THNRWarning',
            props: {
              title: 'Mars!!',
              subtitle: 'You need to subscribe to send a video ✨',
            },
            position: 'bottom',
            bottomOffset: 60,
          });
          throw new Error('Needs subscription');
        }

        if (video && cameraMedia.size >= MAX_VIDEO_SIZE_BYTES) {
          Toast.show({
            type: 'THNRWarning',
            props: {
              title: 'Hala, ang laki!',
              subtitle: 'Limit upload up to 25mb per video',
            },
            position: 'bottom',
            bottomOffset: 60,
          });
          throw new Error('Video exceeds maximum size limit');
        }

        if (image && cameraMedia.size >= MAX_IMAGE_SIZE_BYTES) {
          Toast.show({
            type: 'THNRWarning',
            props: {
              title: 'Hala, ang laki!',
              subtitle: 'Limit upload up to 8mb per photo',
            },
            position: 'bottom',
            bottomOffset: 60,
          });
          throw new Error('Image exceeds maximum size limit');
        }

        const formattedMediaData: FileAttachment = {
          fileName: cameraMedia.filename,
          filePath: cameraMedia.path,
          fileType: cameraMedia.mime,
        };

        if (user && formattedMediaData) {
          const messageIds = chatMessage.data?.pages[0].flatMap(
            page => page._id,
          ) as number[] | undefined;

          await sendMessage.mutateAsync({
            id: messageIds ? messageIds[0] + Date.now() : Date.now() * 100,
            senderSub: user.sub,
            targetSub: user.profile.sub,
            message: '',
            read: '',
            attachments: [formattedMediaData],
            replyingToId: replyMessage
              ? (replyMessage._id as number)
              : undefined,
            type: image ? 'image' : 'video',
          });

          await query.invalidateQueries({queryKey: ['get-chat-list']});
        }
      } else {
        const media = await ImagePicker.openPicker({
          mediaType: 'any',
          multiple: true,
          maxFiles: 4,
          forceJpg: true,
        });

        if (!media || media.length === 0) {
          return null;
        }

        console.log(JSON.stringify(media, null, 2));

        const videos = media.filter(item => item.mime.startsWith('video'));
        const images = media.filter(item => item.mime.startsWith('image'));

        if (videos.length > 0 && !isSubscribe) {
          Toast.show({
            type: 'THNRWarning',
            props: {
              title: 'Mars!!',
              subtitle: 'You need to subscribe to send a video ✨',
            },
            position: 'bottom',
            bottomOffset: 60,
          });
          throw new Error('Needs subscription');
        }

        if (videos.length === MAX_VIDEO_COUNT && images.length > 0) {
          Toast.show({
            type: 'THNRWarning',
            props: {
              title: 'Hala sis!',
              subtitle: 'You can only send a single video.',
            },
            position: 'bottom',
            bottomOffset: 60,
          });
          throw new Error('Video selection limit exceeded');
        }

        if (videos.length > MAX_VIDEO_COUNT) {
          Toast.show({
            type: 'THNRWarning',
            props: {
              title: 'Hala, ang dami!',
              subtitle: 'Please select a single video.',
            },
            position: 'bottom',
            bottomOffset: 60,
          });
          throw new Error('Video selection limit exceeded');
        }

        if (images.length > MAX_IMAGE_COUNT) {
          Toast.show({
            type: 'THNRWarning',
            props: {
              title: 'Hala, ang dami!',
              subtitle: 'Please select up to 4 images.',
            },
            position: 'bottom',
            bottomOffset: 60,
          });
          throw new Error('Image selection limit exceeded');
        }

        for (const video of videos) {
          if (video.size >= MAX_VIDEO_SIZE_BYTES) {
            Toast.show({
              type: 'THNRWarning',
              props: {
                title: 'Hala, ang laki!',
                subtitle: 'Limit upload up to 25mb per video',
              },
              position: 'bottom',
              bottomOffset: 60,
            });
            throw new Error('Video exceeds maximum size limit');
          }
        }

        for (const image of images) {
          if (image.size >= MAX_IMAGE_SIZE_BYTES) {
            Toast.show({
              type: 'THNRWarning',
              props: {
                title: 'Hala, ang laki!',
                subtitle: 'Limit upload up to 8mb per photo',
              },
              position: 'bottom',
              bottomOffset: 60,
            });
            throw new Error('Image exceeds maximum size limit');
          }
        }

        const formattedMediaData: FileAttachment[] = [...images, ...videos].map(
          item => ({
            fileName: item.filename,
            filePath: item.path,
            fileType: item.mime,
          }),
        );

        if (user && formattedMediaData) {
          const messageIds = chatMessage.data?.pages[0].flatMap(
            page => page._id,
          ) as number[] | undefined;

          await sendMessage.mutateAsync({
            id: messageIds ? messageIds[0] + Date.now() : Date.now() * 100,
            senderSub: user.sub,
            targetSub: user.profile.sub,
            message: '',
            read: '',
            attachments: formattedMediaData,
            replyingToId: replyMessage
              ? (replyMessage._id as number)
              : undefined,
          });

          await query.invalidateQueries({queryKey: ['get-chat-list']});
        }
      }
    } catch (error) {
      console.error('An error occurred in handling image', error);
    }
  };

  const onLongPressActions = (message: IMessage) => {
    if (!user) {
      return;
    }

    const isOwnMessage = user.sub === message.user._id;
    const hasAttachments =
      message.attachments && message.attachments.length > 0;

    const options = isOwnMessage
      ? hasAttachments
        ? ['Unsend for everyone', 'Unsend for you', 'Cancel']
        : ['Copy', 'Unsend for everyone', 'Unsend for you', 'Cancel']
      : hasAttachments
      ? ['Unsend for you', 'Cancel']
      : ['Copy', 'Unsend for you', 'Cancel'];

    const cancelButtonIndex = options.length - 1; // Always the last item

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        cancelButtonTintColor: COLORS.primary1,
      },
      async selectedIndex => {
        switch (selectedIndex) {
          case isOwnMessage ? (hasAttachments ? 0 : 1) : -1: // Unsend for everyone (only if own message and no attachments)
            if (user) {
              await unsendMessageAll.mutateAsync({
                sub: user.sub,
                messageId: message._id as number,
              });
            }
            break;
          case isOwnMessage ? (hasAttachments ? 1 : 2) : hasAttachments ? 0 : 1: // Unsend for you (index depends on message ownership and attachment presence)
            if (user) {
              await unsendMessageSelf.mutateAsync({
                sub: user.sub,
                messageId: message._id as number,
              });
            }
            break;
          case 0: // Copy (only if the message has no attachments)
            if (!hasAttachments) {
              Clipboard.setString(message.text);
            }
            break;
          case cancelButtonIndex: // Cancel
          // No action needed
        }
      },
    );
  };

  const handleSendMessage = async (message: string) => {
    if (user) {
      const messageIds = chatMessage.data?.pages[0].flatMap(
        page => page._id,
      ) as number[] | undefined;

      clearReplyMessage();

      await sendMessage.mutateAsync({
        id: messageIds ? messageIds[0] + Date.now() : Date.now() * 100,
        senderSub: user.sub,
        targetSub: user.profile.sub,
        message: message.trim(),
        read: '',
        replyingToId: replyMessage && (replyMessage._id as number),
        replying: replyMessage,
      });

      await query.invalidateQueries({queryKey: ['get-chat-list']});

      // await query.invalidateQueries({queryKey: ['get-chat-message']});
    }
  };

  const handleReactMessage = async (messageId: number) => {
    if (user) {
      await reactMessage.mutateAsync({
        sub: user.sub,
        messageId: messageId,
        reaction: '❤️',
      });

      await query.invalidateQueries({queryKey: ['get-chat-list']});
    }
  };

  const loadMoreMessages = async () => {
    if (chatMessage.isLoading || chatMessage.isFetchingNextPage) {
      return;
    }
    await chatMessage.fetchNextPage();
  };

  // const memoizedMessages = useMemo(
  //   () =>
  //     (chatMessage.isSuccess &&
  //       chatMessage.data?.pages.flatMap(page => page)) ||
  //     [],
  //   [chatMessage.isSuccess, chatMessage.data?.pages], // Dependency array for memoization
  // );

  return (
    <ChatContext.Provider
      value={{
        handleSendMessage,
        handleImageUpload,
        handleReactMessage,
        loading: chatMessage.isLoading,
        loadMoreMessages,
        messages:
          (chatMessage.isSuccess &&
            chatMessage.data?.pages.flatMap(page => page)) ||
          [],
        onLongPressActions,
        isMare,
        isRefetching: chatMessage.isFetchingNextPage,
        user: user,
      }}>
      <SafeAreaView
        edges={['left', 'right', 'top', 'bottom']}
        style={{flex: 1, backgroundColor: COLORS.white}}>
        <View>
          <MessageHeader />
        </View>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={'padding'}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? scale(10) : scale(20)
          }>
          <MessageList />
          <MessageInput />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ChatContext.Provider>
  );
};

function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

export {ChatMessages, ChatContext, useChatContext};
