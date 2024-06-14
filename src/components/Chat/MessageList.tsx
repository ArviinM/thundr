import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import useChatReplyStore from '../../store/chatReplyStore.ts';

const MemoizedMessageBubble = React.memo(MessageBubble);
const MemoizedMessageBubbleImage = React.memo(MessageBubbleImage);
const MemoizedMessageBubbleVideo = React.memo(MessageBubbleVideo);

const MessageList = () => {
  const chat = useChatContext();

  const [scrollToIndex, setScrollToIndex] = useState<number | null>(null);

  const {isScroll} = useChatScrollStore(
    useShallow(state => ({
      isScroll: state.isScroll,
    })),
  );

  const flashListRef = useRef<FlashList<IMessage>>(null);

  const {replyToIndex, setReplyToIndex} = useChatReplyStore(
    useShallow(state => ({
      replyToIndex: state.replyToIndex,
      setReplyToIndex: state.setReplyToIndex,
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
    (message: {item: IMessage; index: any | null | undefined}) => {
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

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const onScroll = useCallback(() => {
    if (!replyToIndex) {
      return;
    }

    // Clear previous timeout if it exists
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set up a new debounced timeout
    debounceTimer.current = setTimeout(() => {
      setReplyToIndex(undefined);
      setScrollToIndex(null);
      debounceTimer.current = null;
    }, 800);
  }, [replyToIndex]);

  useEffect(() => {
    if (replyToIndex && flashListRef.current && chat.messages) {
      const index = chat.messages.findIndex(msg => msg._id === replyToIndex);
      if (index !== -1) {
        setScrollToIndex(index);
      }
    }
  }, [replyToIndex]);

  useEffect(() => {
    if (scrollToIndex !== null && flashListRef.current) {
      flashListRef.current.scrollToIndex({
        animated: true,
        index: scrollToIndex,
        viewPosition: 0.5, // Center the message
      });
    }
  }, [scrollToIndex]);

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
          onScroll={onScroll}
          ref={flashListRef}
          renderItem={renderItem}
          scrollEnabled={isScroll}
        />
      )}
    </>
  );
};

export default MessageList;
