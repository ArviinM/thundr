// React modules
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';

// Components
import Text from '../../../components/Text/Text';
import ChatSelection from '../../../composition/ChatSelection/ChatSelection';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Spinner from '../../../components/Spinner/Spinner';
import ChatActiveIndicator from '../../../components/ChatActiveIndicator/ChatActiveIndicator';

// Ducks
import {
  GET_CHAT_CUSTOMER_DETAILS,
  GET_CHAT_CUSTOMER_DETAILS_MARE,
  GET_CHAT_MATCH_LIST,
  GET_LAST_ACTIVITY,
  GET_UNREAD_MESSAGES,
} from '../../../ducks/Dashboard/actionTypes';

// Utils
import {
  calculateAge,
  isAndroidDevice,
  isIosDevice,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {MESSAGES_ASSET_URI} from '../../../utils/images';

// Styles
import {BorderLinearGradient} from '../PersonalityType/Styled';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

const JowaChatList = props => {
  const {
    jowaChatList,
    matchListLoading,
    handleRefresh,
    jowaFilteredData,
    is1MinAgoActive,
    is5MinsAgoActive,
    is30MinsAgoActive,
    unreadMessages,
  } = props;
  const navigation = useNavigation();

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={matchListLoading}
          onRefresh={handleRefresh}
        />
      }
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      data={jowaChatList?.length && jowaFilteredData}
      renderItem={({item, index}) => {
        const targetData = jowaChatList?.filter(
          obj => obj.target === item?.sub,
        );
        const chatUUID = targetData[0]?.chatUUID;
        const compatibilityScore = targetData[0]?.compatibilityScore;
        const getChatMessage = unreadMessages?.filter(
          obj => obj.chatRoomID === chatUUID,
        );
        const isMessageRead = getChatMessage[0]?.isRead === 1;
        const timeRemaining =
          targetData[0]?.ttl !== 'UNLIMITED'
            ? parseInt(
                (targetData[0]?.ttl - moment().valueOf() / 1000) / (4 * 3600),
              )
            : 'UNLIMITED';

        let thundrImageSource;

        switch (timeRemaining) {
          case 5:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_1;
            break;
          case 4:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_2;
            break;
          case 3:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_3;
            break;
          case 2:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_4;
            break;
          case 1:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_5;
            break;
          case 0:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_6;
            break;
          case 'UNLIMITED':
            thundrImageSource = null;
          default:
            break;
        }

        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatScreen', {
                jowaChatList,
                item,
                tag: 'JOWA',
                is1MinAgoActive,
                is5MinsAgoActive,
                is30MinsAgoActive,
                chatUUID,
                compatibilityScore,
              })
            }
            key={index}
            style={{
              top: verticalScale(15),
              flexDirection: 'row',
              marginBottom: verticalScale(10),
              alignItems: 'center',
              backgroundColor: !isMessageRead ? '#fff' : '',
              height: verticalScale(80),
            }}>
            <Separator space={10} />
            <BorderLinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#E72454', '#FFC227']}
              style={{marginHorizontal: scale(8), height: verticalScale(60)}}>
              <View
                style={{
                  height: verticalScale(57),
                  backgroundColor: '#9B9DA0',
                  borderRadius: 15,
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: item?.customerPhoto?.[0]?.photoUrl,
                  }}
                  height={57}
                  width={isIosDevice() ? 60 : 55}
                  resizeMode="cover"
                  customStyle={{
                    borderRadius: 15,
                  }}
                />
              </View>
            </BorderLinearGradient>
            <ChatActiveIndicator
              is1MinAgoActive={is1MinAgoActive}
              is5MinsAgoActive={is5MinsAgoActive}
              is30MinsAgoActive={is30MinsAgoActive}
              customStyle={{
                left: scale(isAndroidDevice() ? 55 : 60),
                top: verticalScale(isAndroidDevice() ? 55 : 50),
              }}
            />
            <View
              style={{left: scale(5), width: scale(isIosDevice() ? 190 : 200)}}>
              <Text
                size={23}
                color={!isMessageRead ? 'red' : '#E33C59'}
                fontFamily="Montserrat-Bold"
                numberOfLines={1}
                ellipsizeMode="tail"
                weight={700}
                customStyle={{maxWidth: scale(180)}}>
                {item?.name}, {calculateAge(item?.birthday)}
              </Text>
              <Text
                size={14}
                color={!isMessageRead ? 'black' : '#808080'}
                weight={!isMessageRead ? 700 : 400}
                fontFamily="Montserrat-Medium"
                numberOfLines={1}
                ellipsizeMode="tail"
                customStyle={{maxWidth: scale(180)}}>
                {item?.customerDetails?.work}
              </Text>
              <Text
                color={!isMessageRead ? 'black' : '#808080'}
                weight={!isMessageRead ? 700 : 400}
                fontFamily="Montserrat-Medium"
                size={14}>
                {`Compatibility Score: ${compatibilityScore || 0}%`}
              </Text>
            </View>
            <View
              style={{
                top: verticalScale(5),
              }}>
              <Image source={thundrImageSource} height={65} width={65} />
            </View>
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text size={20}>No recent messages</Text>
          </View>
        );
      }}
    />
  );
};

const MareChatList = props => {
  const {
    mareChatList,
    handleRefresh,
    matchListLoading,
    mareFilteredData,
    is1MinAgoActive,
    is5MinsAgoActive,
    is30MinsAgoActive,
    unreadMessages,
  } = props;
  const navigation = useNavigation();

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={matchListLoading}
          onRefresh={handleRefresh}
        />
      }
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      data={mareChatList?.length && mareFilteredData}
      renderItem={({item, index}) => {
        const targetData = mareChatList?.filter(
          obj => obj.target === item?.sub,
        );
        const chatUUID = targetData[0]?.chatUUID;
        const compatibilityScore = targetData[0]?.compatibilityScore;
        const getChatMessage = unreadMessages?.filter(
          obj => obj.chatRoomID === chatUUID,
        );
        const isMessageRead = getChatMessage[0]?.isRead === 1;
        const timeRemaining =
          targetData[0]?.ttl !== 'UNLIMITED'
            ? parseInt(
                (targetData[0]?.ttl - moment().valueOf() / 1000) / (4 * 3600),
              )
            : 'UNLIMITED';

        let thundrImageSource;

        switch (timeRemaining) {
          case 5:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_1;
            break;
          case 4:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_2;
            break;
          case 3:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_3;
            break;
          case 2:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_4;
            break;
          case 1:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_5;
            break;
          case 0:
            thundrImageSource = MESSAGES_ASSET_URI.THUNDR_6;
            break;
          case 'UNLIMITED':
            thundrImageSource = null;
          default:
            break;
        }

        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatScreen', {
                mareChatList,
                item,
                tag: 'MARE',
                is1MinAgoActive,
                is5MinsAgoActive,
                is30MinsAgoActive,
                chatUUID,
                compatibilityScore,
              })
            }
            key={index}
            style={{
              top: verticalScale(15),
              flexDirection: 'row',
              marginBottom: verticalScale(10),
              alignItems: 'center',
              backgroundColor: !isMessageRead ? '#fff' : '',
              height: verticalScale(80),
            }}>
            <Separator space={10} />
            <BorderLinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#E72454', '#FFC227']}
              style={{marginHorizontal: scale(8), height: verticalScale(60)}}>
              <View
                style={{
                  height: verticalScale(57),
                  backgroundColor: '#9B9DA0',
                  borderRadius: 15,
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: item?.customerPhoto?.[0]?.photoUrl,
                  }}
                  height={57}
                  width={60}
                  resizeMode="cover"
                  customStyle={{
                    borderRadius: 15,
                  }}
                />
              </View>
            </BorderLinearGradient>
            <ChatActiveIndicator
              is1MinAgoActive={is1MinAgoActive}
              is5MinsAgoActive={is5MinsAgoActive}
              is30MinsAgoActive={is30MinsAgoActive}
              customStyle={{
                left: scale(isAndroidDevice() ? 55 : 60),
                top: verticalScale(isAndroidDevice() ? 55 : 50),
              }}
            />
            <View
              style={{left: scale(5), width: scale(isIosDevice() ? 190 : 200)}}>
              <Text
                size={23}
                color={!isMessageRead ? 'yellow' : '#FFBC28'}
                fontFamily="Montserrat-Bold"
                weight={700}
                numberOfLines={1}
                ellipsizeMode="tail"
                customStyle={{maxWidth: scale(180)}}>
                {item?.name}, {calculateAge(item?.birthday)}
              </Text>
              <Text
                size={14}
                color={!isMessageRead ? 'black' : '#808080'}
                weight={!isMessageRead ? 700 : 400}
                fontFamily="Montserrat-Medium"
                numberOfLines={1}
                ellipsizeMode="tail"
                customStyle={{maxWidth: scale(180)}}>
                {item?.customerDetails?.work}
              </Text>
              <Text
                color={!isMessageRead ? 'black' : '#808080'}
                weight={!isMessageRead ? 700 : 400}
                fontFamily="Montserrat-Medium"
                size={14}>
                {`Compatibility Score: ${compatibilityScore || 0}%`}
              </Text>
            </View>
            <View
              style={{
                top: verticalScale(5),
              }}>
              <Image source={thundrImageSource} height={65} width={65} />
            </View>
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text size={20}>No recent messages</Text>
          </View>
        );
      }}
    />
  );
};

const Messages = () => {
  const dispatch = useDispatch();
  const {sub} = useSelector(state => state.persistedState);
  const {loginData} = useSelector(state => state.login);
  const {
    matchListLoading,
    jowaChatList,
    mareChatList,
    chatCustomerDetails,
    mareCustomerDetails,
    lastActivity,
    allChatList,
    unreadMessages,
  } = useSelector(state => state.dashboard);

  const [isMareChatListActive, setMareChatListActive] = useState(false);
  const [mareFilteredData, setMareFilteredData] = useState(mareCustomerDetails);
  const [jowaFilteredData, setJowaFilteredData] = useState(chatCustomerDetails);
  const [searchText, setSearchText] = useState('');
  const [is1MinAgoActive, setIs1MinAgoActive] = useState(false);
  const [is5MinsAgoActive, setIs5MinsAgoActive] = useState(false);
  const [is30MinsAgoActive, setIs30MinsAgoActive] = useState(false);

  useEffect(() => {
    allChatList.forEach(item => {
      dispatch({
        type: GET_UNREAD_MESSAGES,
        payload: {chatRoomID: item.chatUUID, sub: item.sub, tag: 'ALL'},
      });
    });
  }, [dispatch, allChatList]);

  useEffect(() => {
    const checkUserActivity = () => {
      const backendTime = new Date(lastActivity?.dateTime);
      const currentTime = new Date();

      const threshold1Minute = new Date(currentTime - 1 * 60 * 1000);
      const threshold5Minutes = new Date(currentTime - 5 * 60 * 1000);
      const threshold30Minutes = new Date(currentTime - 30 * 60 * 1000);

      const userIs1MinAgoActive = backendTime >= threshold1Minute;
      const userIs5MinsAgoActive = backendTime >= threshold5Minutes;
      const userIs30MinsAgoActive = backendTime >= threshold30Minutes;

      setIs1MinAgoActive(userIs1MinAgoActive);
      setIs5MinsAgoActive(userIs5MinsAgoActive);
      setIs30MinsAgoActive(userIs30MinsAgoActive);
    };

    checkUserActivity();
  }, [lastActivity]);

  useEffect(() => {
    const dataToBeUsed = isMareChatListActive
      ? mareCustomerDetails
      : chatCustomerDetails;
    const lowerCaseSearchTerm = searchText.toLowerCase();
    const filteredData = dataToBeUsed?.filter(customer =>
      customer?.name?.toLowerCase().includes(lowerCaseSearchTerm),
    );
    setMareFilteredData(filteredData);
    setJowaFilteredData(filteredData);
  }, [
    searchText,
    chatCustomerDetails,
    isMareChatListActive,
    mareCustomerDetails,
  ]);

  useEffect(() => {
    if (!isMareChatListActive) {
      dispatch({
        type: GET_CHAT_MATCH_LIST,
        payload: {sub: loginData.sub || sub, tag: 'JOWA'},
      });
    } else {
      dispatch({
        type: GET_CHAT_MATCH_LIST,
        payload: {sub: loginData.sub || sub, tag: 'MARE'},
      });
    }
  }, [isMareChatListActive, dispatch]);

  useEffect(() => {
    if (!chatCustomerDetails?.length) {
      jowaChatList?.forEach(item => {
        dispatch({
          type: GET_CHAT_CUSTOMER_DETAILS,
          payload: {sub: item.target},
        });
      });
    }
  }, [dispatch, jowaChatList?.length, chatCustomerDetails?.length]);

  useEffect(() => {
    if (!mareCustomerDetails?.length) {
      mareChatList?.forEach(item => {
        dispatch({
          type: GET_CHAT_CUSTOMER_DETAILS_MARE,
          payload: {sub: item.target},
        });
      });
    }
  }, [dispatch, mareChatList?.length, mareCustomerDetails?.length]);

  useEffect(() => {
    if (
      !isMareChatListActive &&
      (mareChatList?.length || jowaChatList?.length)
    ) {
      jowaChatList?.forEach(item => {
        dispatch({
          type: GET_LAST_ACTIVITY,
          payload: {sub: item.target},
        });
      });
    } else {
      mareChatList?.forEach(item => {
        dispatch({
          type: GET_LAST_ACTIVITY,
          payload: {sub: item.target},
        });
      });
    }
  }, [
    dispatch,
    isMareChatListActive,
    mareChatList?.length,
    jowaChatList?.length,
  ]);

  const handleRefresh = () => {
    if (isMareChatListActive) {
      dispatch({
        type: GET_CHAT_MATCH_LIST,
        payload: {sub: loginData.sub || sub, tag: 'MARE'},
      });
    } else {
      dispatch({
        type: GET_CHAT_MATCH_LIST,
        payload: {sub: loginData.sub || sub, tag: 'JOWA'},
      });
    }
  };

  if (matchListLoading) {
    return <Spinner />;
  }

  return (
    <View
      style={{
        backgroundColor: '#ECE7E4',
        flex: 1,
      }}>
      <ChatSelection
        setMareChatListActive={setMareChatListActive}
        isMareChatListActive={isMareChatListActive}
        searchText={searchText}
        setSearchText={setSearchText}
        mareChatList={mareChatList}
      />
      <View style={{justifyContent: 'center', flex: 1}}>
        {!isMareChatListActive ? (
          <JowaChatList
            jowaChatList={jowaChatList}
            jowaFilteredData={chatCustomerDetails && jowaFilteredData}
            matchListLoading={matchListLoading}
            handleRefresh={handleRefresh}
            is1MinAgoActive={is1MinAgoActive}
            is5MinsAgoActive={is5MinsAgoActive}
            is30MinsAgoActive={is30MinsAgoActive}
            unreadMessages={unreadMessages}
          />
        ) : (
          <MareChatList
            mareChatList={mareChatList}
            mareFilteredData={mareCustomerDetails && mareFilteredData}
            matchListLoading={matchListLoading}
            handleRefresh={handleRefresh}
            is1MinAgoActive={is1MinAgoActive}
            is5MinsAgoActive={is5MinsAgoActive}
            is30MinsAgoActive={is30MinsAgoActive}
            unreadMessages={unreadMessages}
          />
        )}
      </View>
    </View>
  );
};

export default Messages;
