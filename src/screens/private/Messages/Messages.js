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

// Utils
import {
  calculateAge,
  isIosDevice,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {MESSAGES_ASSET_URI} from '../../../utils/images';

// Styles
import {BorderLinearGradient} from '../PersonalityType/Styled';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_CHAT_CUSTOMER_DETAILS,
  GET_CHAT_MATCH_LIST,
} from '../../../ducks/Dashboard/actionTypes';
import Spinner from '../../../components/Spinner/Spinner';

const dummyData = [
  {
    name: 'Cholo',
    age: '39',
    work: 'CEO at Business Inc.',
    compatibilityScore: '89%',
  },
  {
    name: 'John Mark',
    age: '42',
    work: 'Creative Director',
    compatibilityScore: '65%',
  },
  {
    name: 'Jethro',
    age: '46',
    work: 'Account Specialist',
    compatibilityScore: '55%',
  },
];

const JowaChatList = props => {
  const {jowaChatList, chatCustomerDetails, matchListLoading, handleRefresh} =
    props;
  const navigation = useNavigation();

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={matchListLoading}
          onRefresh={handleRefresh}
        />
      }
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}
      data={jowaChatList}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatScreen', {
                jowaChatList,
                chatCustomerDetails,
                tag: 'JOWA',
              })
            }
            key={index}
            style={{
              top: verticalScale(15),
              flexDirection: 'row',
              marginBottom: verticalScale(10),
              alignItems: 'center',
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
                    uri: chatCustomerDetails?.customerPhoto?.[0]?.photoUrl,
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
            <View style={{left: scale(5)}}>
              <Text
                size={25}
                color="#E33C59"
                fontFamily="Montserrat-Bold"
                numberOfLines={1}
                ellipsizeMode="tail"
                weight="700"
                customStyle={{maxWidth: scale(180)}}>
                {chatCustomerDetails?.name},{' '}
                {calculateAge(chatCustomerDetails.birthday)}
              </Text>
              <Text
                size={15}
                color="#808080"
                fontFamily="Montserrat-Medium"
                numberOfLines={1}
                ellipsizeMode="tail"
                customStyle={{maxWidth: scale(180)}}>
                {chatCustomerDetails?.customerDetails?.work}
              </Text>
              {/**TEMPORARY HARDCODE NEED TO CONFIRM SA BE KUNG SAN MAKUKUHA PERCENTAGE */}
              <Text color="#808080" fontFamily="Montserrat-Medium" size={15}>
                {`Compatibility Score: 90%`}
              </Text>
            </View>
            <View
              style={{
                top: verticalScale(5),
                left: scale(isIosDevice() ? 20 : 10),
              }}>
              <Image
                source={MESSAGES_ASSET_URI.THUNDR_1}
                height={65}
                width={65}
              />
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
  const {mareChatList, chatCustomerDetails, handleRefresh, matchListLoading} =
    props;
  const navigation = useNavigation();
  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={matchListLoading}
          onRefresh={handleRefresh}
        />
      }
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}
      data={mareChatList}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatScreen', {
                mareChatList,
                chatCustomerDetails,
                tag: 'MARE',
              })
            }
            key={index}
            style={{
              top: verticalScale(15),
              flexDirection: 'row',
              marginBottom: verticalScale(10),
              alignItems: 'center',
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
                    uri: chatCustomerDetails?.customerPhoto?.[0]?.photoUrl,
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
            <View style={{left: scale(5)}}>
              <Text
                size={25}
                color="#FFBC28"
                fontFamily="Montserrat-Bold"
                weight="700"
                numberOfLines={1}
                ellipsizeMode="tail"
                customStyle={{maxWidth: scale(180)}}>
                {chatCustomerDetails?.name},{' '}
                {calculateAge(chatCustomerDetails.birthday)}
              </Text>
              <Text
                size={15}
                color="#808080"
                fontFamily="Montserrat-Medium"
                numberOfLines={1}
                ellipsizeMode="tail"
                customStyle={{maxWidth: scale(180)}}>
                {chatCustomerDetails?.customerDetails?.work}
              </Text>
              {/**TEMPORARY HARDCODE NEED TO CONFIRM SA BE KUNG SAN MAKUKUHA PERCENTAGE */}
              <Text color="#808080" fontFamily="Montserrat-Medium" size={15}>
                {`Compatibility Score: 90%`}
              </Text>
            </View>
            <View
              style={{
                top: verticalScale(5),
                left: scale(isIosDevice() ? 20 : 10),
              }}>
              <Image
                source={MESSAGES_ASSET_URI.THUNDR_1}
                height={65}
                width={65}
              />
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
  const {loginData} = useSelector(state => state.login);
  const [isMareChatListActive, setMareChatListActive] = useState(false);
  const {matchListLoading, jowaChatList, mareChatList, chatCustomerDetails} =
    useSelector(state => state.dashboard);
  const {sub} = useSelector(state => state.persistedState);

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
    if (
      !isMareChatListActive &&
      (mareChatList?.length || jowaChatList?.length)
    ) {
      jowaChatList?.forEach(item => {
        dispatch({
          type: GET_CHAT_CUSTOMER_DETAILS,
          payload: {sub: item.target},
        });
      });
    } else {
      mareChatList?.forEach(item => {
        dispatch({
          type: GET_CHAT_CUSTOMER_DETAILS,
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
      />
      <View style={{justifyContent: 'center', flex: 1}}>
        {!isMareChatListActive ? (
          <JowaChatList
            jowaChatList={jowaChatList}
            chatCustomerDetails={chatCustomerDetails}
            matchListLoading={matchListLoading}
            handleRefresh={handleRefresh}
          />
        ) : (
          <MareChatList
            mareChatList={mareChatList}
            chatCustomerDetails={chatCustomerDetails}
            matchListLoading={matchListLoading}
            handleRefresh={handleRefresh}
          />
        )}
      </View>
    </View>
  );
};

export default Messages;
