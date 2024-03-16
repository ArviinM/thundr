// React modules
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

// Third party libraries
import {Overlay} from 'react-native-elements';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

// Components
import TextInput from '../../../composition/TextInput/TextInput';
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import ChatScreenHeader from '../../../composition/ChatScreenHeader/ChatScreenheader';

// Ducks
import {
  GET_CHAT_MATCH_LIST,
  GET_MESSAGE,
  GET_UNREAD_MESSAGES,
  READ_CHAT_MESSAGE,
  SEND_MESSAGE,
} from '../../../ducks/Dashboard/actionTypes';

// Utils
import {
  isIosDevice,
  moderateScale,
  organizeChatMessages,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {GLOBAL_ASSET_URI, MESSAGES_ASSET_URI} from '../../../utils/images';
import ReportUserModal from '../../../composition/ReportUserModal/ReportUserModal';
import moment from 'moment';
import {UPDATE_PERSISTED_STATE} from '../../../ducks/PersistedState/actionTypes';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {getMessageResponse, allChatList} = useSelector(
    state => state.dashboard,
  );
  const {sub} = useSelector(state => state.persistedState);
  const {loginData} = useSelector(state => state.login);

  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {
    item,
    tag,
    is1MinAgoActive,
    is5MinsAgoActive,
    is30MinsAgoActive,
    chatUUID,
    compatibilityScore,
  } = route?.params;
  const isMare = tag === 'MARE';
  const currentUserSub = loginData?.sub || sub;
  const chatMessages = getMessageResponse?.data?.length
    ? getMessageResponse?.data
    : messages;

  const organizedMessages = organizeChatMessages(chatMessages);

  useEffect(() => {
    allChatList.forEach(item => {
      dispatch({
        type: GET_UNREAD_MESSAGES,
        payload: {chatRoomID: item.chatUUID, sub: item.sub, tag: 'ALL'},
      });
    });
  }, [dispatch, allChatList]);

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: UPDATE_PERSISTED_STATE,
        newState: {chatRoomID: chatUUID},
      });
      return () =>
        dispatch({type: UPDATE_PERSISTED_STATE, newState: {chatRoomID: ''}});
    }, [chatUUID, dispatch]),
  );

  // // READ MESSAGES
  useEffect(() => {
    if (getMessageResponse?.data?.length) {
      const filteredMessages = getMessageResponse.data.filter(
        message => message.senderSub !== currentUserSub,
      );
      dispatch({type: READ_CHAT_MESSAGE, payload: filteredMessages});
    }
  }, [dispatch, getMessageResponse]);

  // GET ALL MESSAGES
  useEffect(() => {
    dispatch({type: GET_MESSAGE, payload: {chatUUID}});
    const intervalId = setInterval(() => {
      dispatch({type: GET_MESSAGE, payload: {chatUUID}});
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, {id: messages.length, text: inputText}]);
      setInputText('');
      dispatch({
        type: SEND_MESSAGE,
        payload: {targetSub: item?.sub, message: inputText, read: '0'},
      });
      dispatch({type: GET_MESSAGE, payload: {chatUUID}});
    }
  };

  const onContentSizeChange = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const subscribeModal = () => {
    return (
      <Overlay
        onBackdropPress={() => setShowModal(false)}
        overlayStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#DBDCDD',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [
            {translateX: -scale(125)},
            {translateY: -verticalScale(40)},
          ],
          height: verticalScale(isIosDevice() ? 150 : 180),
          width: scale(250),
          borderRadius: 20,
          borderWidth: 3,
          borderColor: '#808080',
        }}
        isVisible={showModal}>
        <View
          style={{
            position: 'absolute',
            bottom: verticalScale(isIosDevice() ? 130 : 160),
            right: scale(isIosDevice() ? -5 : 0),
          }}>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Image
              source={GLOBAL_ASSET_URI.GRAY_CLOSE_BUTTON}
              height={25}
              width={25}
            />
          </TouchableOpacity>
        </View>
        <Text
          size={18}
          color="#565656"
          fontFamily="Montserrat-Bold"
          weight={700}
          customStyle={{textAlign: 'center'}}>
          Di keri mag-upload ng photo/video for free subscribers. Subscribe now
          to Thundr Bolt, besh!
        </Text>
        <Separator space={15} />
        <Button
          onPress={() => {
            navigation.navigate('ThunderBolt');
            setShowModal(false);
          }}
          title="Subscribe Now"
          style={{
            width: scale(180),
            backgroundColor: '#FDBB2A',
            borderColor: '#E33C59',
            borderWidth: 3,
          }}
        />
      </Overlay>
    );
  };

  return (
    <KeyboardAvoidingView
      bounce
      behavior={isIosDevice() ? 'padding' : 'null'}
      keyboardVerticalOffset={verticalScale(isIosDevice() ? 50 : 0)}
      style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        <ChatScreenHeader
          chatCustomerDetails={item}
          is1MinAgoActive={is1MinAgoActive}
          is5MinsAgoActive={is5MinsAgoActive}
          is30MinsAgoActive={is30MinsAgoActive}
          compatibilityScore={compatibilityScore}
          isMare={isMare}
        />
        {subscribeModal()}
        <ReportUserModal category="CHAT" targetSub={item?.sub} />
        <ScrollView
          style={{flex: 1, padding: 10}}
          ref={scrollViewRef}
          contentContainerStyle={{paddingBottom: 16}}
          onContentSizeChange={onContentSizeChange}>
          {Object.keys(organizedMessages).map(day => (
            <View key={day}>
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: scale(10),
                  paddingBottom: scale(10),
                }}>
                <Text
                  fontFamily="Montserrat-Regular"
                  size={12}
                  style={{textAlign: 'center'}}>
                  {day}
                </Text>
              </View>
              {organizedMessages[day].map(message => {
                const currentUser = getMessageResponse?.data?.length
                  ? message.senderSub === currentUserSub
                  : true;
                let dateObject;
                if (message?.created) {
                  dateObject = new Date(message.created);
                } else {
                  // If message.created is undefined, get the current time in Philippines timezone
                  const currentTimeInManila = moment()
                    .utcOffset('+0800')
                    .toDate();
                  dateObject = new Date(currentTimeInManila);
                }
                const hours = dateObject.getHours();
                const minutes = dateObject.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                // Convert hours to 12-hour format
                const formattedHours = hours % 12 || 12;
                // Format the time as hh:mm AM/PM
                const formattedTime = message?.created
                  ? `${formattedHours?.toString()?.padStart(2, '0')}:${minutes
                      ?.toString()
                      ?.padStart(2, '0')} ${ampm}`
                  : moment(dateObject).format('hh:mm A');

                return (
                  <View
                    key={message.id}
                    style={{
                      // Styling for message display
                      alignSelf: currentUser ? 'flex-end' : 'flex-start',
                      backgroundColor: currentUser
                        ? isMare
                          ? '#EE9B3D'
                          : '#E33C59'
                        : '#660707',
                      paddingLeft: scale(15),
                      paddingRight: scale(15),
                      paddingTop: scale(8),
                      paddingBottom: scale(8),
                      borderRadius: 8,
                      marginBottom: 10,
                      maxWidth: '80%',
                      justifyContent: 'center',
                    }}>
                    <Text color="#fff" fontFamily="Montserrat-Regular">
                      {message.message}
                    </Text>
                    <View style={{alignSelf: 'flex-end'}}>
                      <Text
                        color="#fff"
                        fontFamily="Montserrat-Regular"
                        size={9}>
                        {formattedTime}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: scale(8),
            bottom: verticalScale(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 1,
              left: scale(50),
              gap: scale(12),
              top: verticalScale(isIosDevice() ? 30 : 40),
            }}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image
                source={MESSAGES_ASSET_URI.CAMERA_ICON}
                height={25}
                width={25}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image
                source={MESSAGES_ASSET_URI.GALLERY_ICON}
                height={25}
                width={25}
              />
            </TouchableOpacity>
            <Image
              source={MESSAGES_ASSET_URI.DIVIDER}
              height={25}
              width={25}
              customStyle={{left: scale(-15)}}
            />
          </View>
          <TextInput
            multiline
            inputStyle={{
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: scale(100),
              backgroundColor: isMare ? '#EE9B3D' : '#E33C59',
              color: '#fff',
              fontSize: moderateScale(20),
              height: verticalScale(40),
              paddingRight: scale(50),
              lineHeight: verticalScale(25),
            }}
            textStyle={{color: '#fff', justifyContent: 'center'}}
            placeholder="Chat"
            value={inputText}
            onChangeText={text => setInputText(text)}
            onSubmitEditing={handleSend}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: scale(280),
              bottom: verticalScale(16),
              padding: scale(5),
              backgroundColor: isMare ? '#EE9B3D' : '#E33C59',
              borderRadius: 20,
            }}
            onPress={handleSend}>
            <Image
              source={
                isMare
                  ? MESSAGES_ASSET_URI.MARE_SEND_ICON
                  : MESSAGES_ASSET_URI.SEND_ICON
              }
              height={20}
              width={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
