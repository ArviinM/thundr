import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../constants/commons.ts';
import {Chat} from '../../../types/generated.ts';
import {scale} from '../../../utils/utils.ts';
import {calculateAge} from '../../../components/Home/utils.ts';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {useGetChatList} from '../../../hooks/chat/useGetChatList.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {ThundrJuice} from '../../../assets/images/chat/ThundrJuice.tsx';
import {Image} from 'expo-image';
import {truncateChatPreview} from './chatUtils.ts';
import {differenceInMinutes, fromUnixTime, subHours} from 'date-fns';

const ChatList = ({
  isMare,
  chatRoom,
  notifIsMare,
}: {
  isMare: boolean;
  chatRoom?: string;
  notifIsMare?: boolean;
}) => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const [refreshing, setRefreshing] = useState(false);
  const auth = useAuth();

  const getChatList = useGetChatList({sub: auth.authData?.sub || ''});

  const currentDate = moment();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getChatList.refetch().then(() => setRefreshing(false)); // Refetch data
  }, [getChatList]);

  useEffect(() => {
    if (chatRoom && getChatList.isSuccess) {
      const targetChat = getChatList.data.customerChatAndMatches.find(
        chat => chat.chatRoomUuid === chatRoom,
      );
      if (targetChat) {
        navigation.navigate('ChatMessages', {
          user: targetChat,
          isMare: notifIsMare || false,
        });
      }
    }
  }, [chatRoom, notifIsMare]);

  const renderItem: ListRenderItem<Chat> = ({item, index}) => {
    let thundrJuice;
    const timeRemainingInSeconds = item.ttl / 1000 - Date.now() / 1000;
    const segmentsRemaining = Math.max(
      0,
      Math.floor(timeRemainingInSeconds / 17280),
    );
    switch (segmentsRemaining) {
      case 4:
        thundrJuice = <ThundrJuice count={5} />;
        break;
      case 3:
        thundrJuice = <ThundrJuice count={4} />;
        break;
      case 2:
        thundrJuice = <ThundrJuice count={3} />;
        break;
      case 1:
        thundrJuice = <ThundrJuice count={2} />;
        break;
      case 0:
        thundrJuice = <ThundrJuice count={1} />;
        break;
      default:
        thundrJuice = <ThundrJuice count={0} />;
    }

    const lastActivityDate = subHours(item.profile.lastActivity, 8);
    const now = new Date();
    const minutesSinceLastActivity = differenceInMinutes(now, lastActivityDate);
    let activityIndicatorColor;

    if (minutesSinceLastActivity <= 3) {
      activityIndicatorColor = '#44D600';
    } else if (minutesSinceLastActivity <= 8) {
      activityIndicatorColor = COLORS.secondary2;
    } else {
      activityIndicatorColor = null;
    }

    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate('ChatMessages', {user: item, isMare: isMare})
        }>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            backgroundColor:
              item.latestChat?.senderSub === item.sub
                ? ''
                : item.latestChat?.isRead !== 0
                ? COLORS.white
                : '#faeeec',
          }}>
          <View>
            <Image
              source={{uri: item.profile.customerPhoto[0].photoUrl}}
              style={{width: scale(70), height: scale(70), borderRadius: 8}}
              placeholder={item.profile.customerPhoto[0].blurHash}
              transition={100}
            />
            {/*Activity Indicator*/}
            {activityIndicatorColor && (
              <View
                style={[
                  styles.indicator,
                  {backgroundColor: activityIndicatorColor},
                ]}
              />
            )}
          </View>
          <View style={{justifyContent: 'center', paddingHorizontal: 10}}>
            <Text
              style={{
                fontFamily: 'Montserrat-ExtraBold',
                fontSize: scale(18),
                color: isMare ? COLORS.secondary2 : COLORS.primary1,
                letterSpacing: -0.4,
              }}>
              {item.profile.name.split(' ')[0] || '👻'},{' '}
              {calculateAge(item.profile.birthday)}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: scale(14),
                color: COLORS.black,
                letterSpacing: -0.4,
              }}>
              {item.latestChat
                ? item.latestChat.message
                  ? truncateChatPreview(item.latestChat.message)
                  : '[Media] 🌠🎥'
                : `Say hello to ${item.profile.name.split(' ')[0] || '👻'} 👋`}
            </Text>
          </View>
          <View style={{flex: 1}} />
          {!item.latestChat && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              {thundrJuice}
            </View>
          )}
          {item.latestChat && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: scale(16),
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: scale(14),
                  color: COLORS.black,
                }}>
                •{' '}
                {currentDate.diff(item.lastActivity, 'days') === 0
                  ? moment(item.lastActivity).format('h:mm A')
                  : currentDate.diff(item.lastActivity, 'days') <= 7
                  ? moment(item.lastActivity).format('ddd')
                  : moment(item.lastActivity).format('MM/DD')}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    return (
      <View style={{flex: 1}}>
        {getChatList.data && (
          <FlatList
            data={getChatList.data.customerChatAndMatches.filter(chat =>
              isMare ? chat.tag === 'MARE' : chat.tag === 'JOWA',
            )}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView edges={['left', 'right']} style={{flex: 1}}>
      {/*Main View Container*/}
      <View style={{flex: 1, padding: 6, backgroundColor: COLORS.white}}>
        {/*Render Content*/}
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: scale(14),
    height: scale(14),
    borderRadius: scale(200),
    position: 'absolute',
    bottom: scale(-2),
    right: scale(-4), // Adjust positioning as needed
  },
});

export default ChatList;
