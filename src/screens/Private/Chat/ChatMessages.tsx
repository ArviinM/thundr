// React Libraries
import React, {useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useFocusEffect} from '@react-navigation/native';

// Other Custom Libraries
import {
  KeyboardAvoidingView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

// Components
import {Loading} from '../../../components/shared/Loading.tsx';
import ChatHeader from '../../../components/Chat/ChatHeader.tsx';
import ChatInput from '../../../components/Chat/ChatInput.tsx';
import {GiftedChat, MessageProps} from 'react-native-gifted-chat';
import {Day} from '../../../components/Chat/Day.tsx';
import Bubbles from '../../../components/Chat/Bubbles.tsx';

// Utils
import {Platform, View} from 'react-native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {COLORS} from '../../../constants/commons.ts';
import {MAX_IMAGE_SIZE_BYTES, scale} from '../../../utils/utils.ts';
import {useGetChatMessage} from '../../../hooks/chat/useGetChatMessage.ts';
import {useSendChatMessage} from '../../../hooks/chat/useSendChatMessage.ts';
import {queryClient} from '../../../utils/queryClient.ts';
import {useQueryClient} from '@tanstack/react-query';
import {Base64Attachments, IMessage} from '../../../types/generated.ts';
import {useReadMessage} from '../../../hooks/chat/useReadMessage.ts';
import {ScrollBottom} from '../../../assets/images/ScrollBottom.tsx';
import useChatRoomIDStore from '../../../store/chatRoomIdStore.ts';

import useChatReplyStore from '../../../store/chatReplyStore.ts';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useShallow} from 'zustand/react/shallow';
import {useReactMessage} from '../../../hooks/chat/useReactMessage.ts';
import {useUnsendMessage} from '../../../hooks/chat/useUnsendMessage.ts';
import {useUnsendSelfMessage} from '../../../hooks/chat/useUnsendSelfMessage.ts';
import Clipboard from '@react-native-clipboard/clipboard';

type ChatMessagesScreenRouteProp = RouteProp<
  RootNavigationParams,
  'ChatMessages'
>;

type ChatMessagesProps = {
  route?: ChatMessagesScreenRouteProp;
};

const ChatMessages = ({route}: ChatMessagesProps) => {
  const {user, isMare = false} = route?.params || {};
  const query = useQueryClient(queryClient);

  const {showActionSheetWithOptions} = useActionSheet();

  const chatMessage = useGetChatMessage({
    sub: user?.sub || '',
    chatRoomID: user?.chatRoomUuid || '',
    limit: 25,
  });

  const sendMessage = useSendChatMessage();
  const readMessage = useReadMessage();
  const unsendMessageAll = useUnsendMessage();
  const unsendMessageSelf = useUnsendSelfMessage();

  const setChatRoom = useChatRoomIDStore(state => state.setChatRoom);

  const {replyMessage, setReplyMessage, clearReplyMessage} = useChatReplyStore(
    useShallow(state => ({
      replyMessage: state.replyMessage,
      setReplyMessage: state.setReplyMessage,
      clearReplyMessage: state.clearReplyMessage,
    })),
  );

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
        message: message,
        read: '',
        replyingToId: replyMessage && (replyMessage._id as number),
        replying: replyMessage,
      });

      await query.invalidateQueries({queryKey: ['get-chat-list']});
      // await query.invalidateQueries({queryKey: ['get-chat-message']});
    }
  };

  const handleImageUpload = async (isCamera?: boolean) => {
    try {
      let images: Image[];

      if (isCamera) {
        let cameraImage = await ImagePicker.openCamera({
          mediaType: 'photo',
          multiple: false,
          includeBase64: true,
          forceJpg: true,
          maxFiles: 4,
        });
        const imageData: Base64Attachments = {
          fileName: cameraImage.filename,
          fileContentBase64: cameraImage.data,
        };

        if (user && cameraImage) {
          await sendMessage.mutateAsync({
            senderSub: user.sub,
            targetSub: user.profile.sub,
            message: '',
            read: '',
            base64Files: [imageData],
          });
          await query.invalidateQueries({queryKey: ['get-chat-list']});
          return;
        }
      } else {
        images = await ImagePicker.openPicker({
          mediaType: 'photo',
          multiple: true,
          includeBase64: true,
          forceJpg: true,
          maxFiles: 4,
        });

        if (!images || images.length === 0) {
          return null;
        }

        if (images) {
          const imageData: Base64Attachments[] = [];

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

              throw new Error(
                'Image exceeds maximum size limit. Please select a smaller image.',
              );
            }

            imageData.push({
              fileName: image.filename,
              fileContentBase64: image.data,
            });
          }

          if (Platform.OS === 'android' && imageData.length >= 5) {
            Toast.show({
              type: 'THNRWarning',
              props: {
                title: 'Hala, ang dami!',
                subtitle: 'Limit of 4 photos per sending.',
              },
              position: 'bottom',
              bottomOffset: 60,
            });
            throw new Error('Image selection exceeds the limit of 5 images.');
          }

          if (user && imageData) {
            const messageIds = chatMessage.data?.pages[0].flatMap(
              page => page._id,
            ) as number[] | undefined;

            await sendMessage.mutateAsync({
              id: messageIds ? messageIds[0] + Date.now() : Date.now() * 100,
              senderSub: user.sub,
              targetSub: user.profile.sub,
              message: '',
              read: '',
              base64Files: imageData,
              replyingToId: replyMessage
                ? (replyMessage._id as number)
                : undefined,
            });
            // await query.invalidateQueries({queryKey: ['get-chat-message']});
            await query.invalidateQueries({queryKey: ['get-chat-list']});
          }
        }
      }
    } catch (error) {
      console.error('An error occurred in handling image', error);
    }
  };

  const onLongPressActions = (message: IMessage) => {
    const isOwnMessage = user?.sub === message.user._id;

    const options = isOwnMessage
      ? ['Copy', 'Unsend for everyone', 'Unsend for you', 'Cancel']
      : ['Copy', 'Unsend for you', 'Cancel'];

    const cancelButtonIndex = options.length - 1; // Always the last item

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        cancelButtonTintColor: COLORS.primary1,
        tintColor: COLORS.black,
      },
      async selectedIndex => {
        switch (selectedIndex) {
          case 0:
            Clipboard.setString(message.text);
            break;
          // case 1: // Reply
          //   // ... (logic to set reply)
          //   break;
          case isOwnMessage ? 1 : -1: // Unsend for everyone (only if own message)
            if (user) {
              await unsendMessageAll.mutateAsync({
                sub: user.sub,
                messageId: message._id as number,
              });
            }
            break;
          case isOwnMessage ? 2 : 1: // Unsend for you (index adjusted if needed)
            if (user) {
              await unsendMessageSelf.mutateAsync({
                sub: user.sub,
                messageId: message._id as number,
              });
            }

            break;
          case cancelButtonIndex: // Cancel
          // No action needed
        }
      },
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        setChatRoom(user.chatRoomUuid);
      }
      return () => {
        setChatRoom('');
        clearReplyMessage();
      };
    }, [user, setChatRoom, clearReplyMessage]),
  );

  return (
    <SafeAreaView
      edges={['left', 'right', 'top', 'bottom']}
      style={{flex: 1, backgroundColor: COLORS.white}}>
      {chatMessage.isLoading ? (
        <Loading />
      ) : (
        chatMessage.isSuccess &&
        user && (
          <View style={{flex: 1, backgroundColor: COLORS.white}}>
            {/*Chat Message Header*/}
            <ChatHeader user={user} isMare={isMare} />
            {/*Chat Message Bubbles*/}
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={'padding'}
              keyboardVerticalOffset={
                Platform.OS === 'ios' ? scale(120) : scale(100)
              }>
              <GiftedChat
                messages={chatMessage.data?.pages.flatMap(page => page) || []}
                renderAvatar={null}
                user={{_id: user.sub}}
                minComposerHeight={0}
                maxComposerHeight={0}
                minInputToolbarHeight={0}
                infiniteScroll
                loadEarlier
                onLoadEarlier={async () => {
                  if (chatMessage.isLoading || chatMessage.isFetchingNextPage) {
                    return;
                  }
                  await chatMessage.fetchNextPage();
                }}
                scrollToBottom
                bottomOffset={0}
                isKeyboardInternallyHandled={false}
                isLoadingEarlier={chatMessage.isFetchingNextPage}
                renderInputToolbar={() => null}
                renderDay={props => <Day {...props} />}
                renderBubble={(props: Readonly<MessageProps<IMessage>>) => (
                  <Bubbles
                    key={props.key}
                    props={props}
                    user={user}
                    isMare={isMare}
                    onLongPress={onLongPressActions}
                  />
                )}
                scrollToBottomStyle={{
                  backgroundColor: 'rgba(0,0,0,0)',
                }}
                scrollToBottomComponent={() => <ScrollBottom />}
              />
            </KeyboardAvoidingView>
            {/*Chat Text Input*/}
            <KeyboardStickyView
              offset={{closed: 0, opened: Platform.OS === 'ios' ? 20 : -16}}>
              <ChatInput
                isMare={isMare}
                onPressSend={handleSendMessage}
                onPressImage={() => handleImageUpload(false)}
                onPressCamera={() => handleImageUpload(true)}
              />
            </KeyboardStickyView>
          </View>
        )
      )}
    </SafeAreaView>
  );
};

export default ChatMessages;
