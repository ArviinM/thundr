import React from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {useChatContext} from '../../screens/Private/Chat/ChatMessages.tsx';
import MessageBubble from './MessageBubble.tsx';
import {COLORS} from '../../constants/commons.ts';
import {format, isSameDay} from 'date-fns';
import {FlashList} from '@shopify/flash-list';
import {Day} from './Day.tsx';
import Color from 'react-native-gifted-chat/lib/Color';
import MessageBubbleImage from './MessageBubbleImage.tsx';

const MemoizedMessageBubble = React.memo(MessageBubble);
const MemoizedMessageBubbleImage = React.memo(MessageBubbleImage);

const MessageList = () => {
  const chat = useChatContext();

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

  return (
    <>
      {chat.loading ? (
        <ActivityIndicator size="large" color={COLORS.secondary2} />
      ) : (
        <FlashList
          data={chat.messages}
          estimatedItemSize={87}
          keyboardShouldPersistTaps="handled"
          keyExtractor={item => item._id.toString()}
          inverted
          ItemSeparatorComponent={renderItemSeparator}
          ListFooterComponent={() => {
            return (
              <>
                {chat.isRefetching && (
                  <View>
                    <ActivityIndicator size="small" color="gray" />
                  </View>
                )}
                {chat.messages && (
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
                        chat.messages[chat.messages?.length - 1].createdAt,
                        'MMMM dd, cccc',
                      )}
                    </Text>
                  </View>
                )}
              </>
            );
          }}
          maintainVisibleContentPosition={{
            autoscrollToTopThreshold: 10,
            minIndexForVisible: 1,
          }}
          onEndReached={chat.loadMoreMessages}
          onEndReachedThreshold={0.1}
          renderItem={message => {
            switch (message.item.type) {
              case 'message':
                return (
                  <MemoizedMessageBubble
                    key={message.index}
                    message={message.item}
                    user={chat.user}
                    isMare={chat.isMare}
                  />
                );
              case 'image':
                return (
                  <MemoizedMessageBubbleImage
                    key={message.index}
                    message={message.item}
                    user={chat.user}
                    isMare={chat.isMare}
                  />
                );
              case 'video':
                return (
                  <View>
                    <Text>Video</Text>
                  </View>
                );
              default:
                return null;
            }
          }}
        />
      )}
    </>
  );
};

export default MessageList;
