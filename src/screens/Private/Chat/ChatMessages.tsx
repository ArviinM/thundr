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
import {GiftedChat, BubbleProps} from 'react-native-gifted-chat';
import {Day} from '../../../components/Chat/Day.tsx';
import Bubbles from '../../../components/Chat/Bubbles.tsx';

// Utils
import {Platform, Text, View} from 'react-native';
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

  const chatMessage = useGetChatMessage({
    sub: user?.sub || '',
    chatRoomID: user?.chatRoomUuid || '',
    limit: 50,
  });

  const sendMessage = useSendChatMessage();
  const readMessage = useReadMessage();

  const setChatRoom = useChatRoomIDStore(state => state.setChatRoom);

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

      await sendMessage.mutateAsync({
        id: messageIds ? messageIds[0] + 10 : 0,
        senderSub: user.sub,
        targetSub: user.profile.sub,
        message: message,
        read: '',
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
            await sendMessage.mutateAsync({
              senderSub: user.sub,
              targetSub: user.profile.sub,
              message: '',
              read: '',
              base64Files: imageData,
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

  useFocusEffect(
    useCallback(() => {
      if (user) {
        setChatRoom(user.chatRoomUuid);
      }
      return () => setChatRoom('');
    }, [user, setChatRoom]),
  );

  return (
    <SafeAreaView
      edges={['left', 'right', 'top', 'bottom']}
      style={{flex: 1, backgroundColor: COLORS.white}}>
      {chatMessage.isLoading ? (
        <Loading />
      ) : chatMessage.isSuccess && user ? (
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
              renderBubble={(props: Readonly<BubbleProps<IMessage>>) => (
                <Bubbles props={props} user={user} isMare={isMare} />
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
      ) : (
        <Text>If you saw me, please do report.</Text>
      )}
    </SafeAreaView>
  );
};

export default ChatMessages;
