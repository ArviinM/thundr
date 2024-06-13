import React, {useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useChatContext} from '../../screens/Private/Chat/ChatMessages.tsx';
import MessageBubble from './MessageBubble.tsx';
import {COLORS} from '../../constants/commons.ts';
import {format, isSameDay} from 'date-fns';
import {FlashList} from '@shopify/flash-list';
import {Day} from './Day.tsx';
import Color from 'react-native-gifted-chat/lib/Color';
import MessageBubbleImage from './MessageBubbleImage.tsx';
import MessageBubbleVideo from './MessageBubbleVideo.tsx';
import {IMessage} from '../../types/generated.ts';
import useChatScrollStore from '../../store/chatScrollStore.ts';
import {useShallow} from 'zustand/react/shallow';

const MemoizedMessageBubble = React.memo(MessageBubble);
const MemoizedMessageBubbleImage = React.memo(MessageBubbleImage);
const MemoizedMessageBubbleVideo = React.memo(MessageBubbleVideo);

const MessageList = () => {
  const chat = useChatContext();

  const {isScroll} = useChatScrollStore(
    useShallow(state => ({
      isScroll: state.isScroll,
    })),
  );

  const renderItemSeparator = ({leadingItem, trailingItem}: any) => {
    if (
      leadingItem &&
      trailingItem &&
      !isSameDay(
        new Date(leadingItem.createdAt),
        new Date(trailingItem.createdAt),
      )
    ) {
      return (
        <Day currentMessage={leadingItem} previousMessage={trailingItem} />
      );
    }

    return null;
  };

  const renderItem = useCallback(
    (message: {item: IMessage; index: React.Key | null | undefined}) => {
      switch (message.item.type) {
        case 'message':
          return (
            <MemoizedMessageBubble
              key={message.index}
              message={message.item}
              user={chat.user}
              isMare={chat.isMare}
              onLongPress={() => chat.onLongPressActions(message.item)}
            />
          );
        case 'image':
          return (
            <MemoizedMessageBubbleImage
              key={message.index}
              message={message.item}
              user={chat.user}
              isMare={chat.isMare}
              onLongPress={() => chat.onLongPressActions(message.item)}
            />
          );
        case 'video':
          return (
            <MemoizedMessageBubbleVideo
              key={message.index}
              message={message.item}
              user={chat.user}
              isMare={chat.isMare}
              onLongPress={() => chat.onLongPressActions(message.item)}
            />
          );
        default:
          return null;
      }
    },
    [],
  );

  const keyExtractor = (item: IMessage) => `${item._id}-${item.createdAt}`;
  const ListFooterComponent = () => {
    return (
      <>
        {chat.isRefetching && (
          <View>
            <ActivityIndicator size="small" color="gray" />
          </View>
        )}
        {chat.messages && chat.messages.length > 0 && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                backgroundColor: Color.backgroundTransparent,
                color: COLORS.gray,
                fontSize: 12,
                fontFamily: 'Montserrat-Bold',
                // fontWeight: '600',
              }}>
              {format(
                chat.messages[chat.messages.length - 1].createdAt,
                'MMMM dd, cccc',
              )}
            </Text>
          </View>
        )}
      </>
    );
  };

  return (
    <>
      {chat.loading ? (
        <ActivityIndicator size="large" color={COLORS.secondary2} />
      ) : (
        <FlashList
          data={chat.messages}
          estimatedItemSize={87}
          keyboardShouldPersistTaps="handled"
          keyExtractor={keyExtractor}
          inverted
          ItemSeparatorComponent={renderItemSeparator}
          ListFooterComponent={ListFooterComponent}
          maintainVisibleContentPosition={{
            autoscrollToTopThreshold: 10,
            minIndexForVisible: 1,
          }}
          onEndReached={chat.loadMoreMessages}
          onEndReachedThreshold={0.1}
          renderItem={renderItem}
          scrollEnabled={isScroll}
        />
      )}
    </>
  );
};

export default MessageList;
