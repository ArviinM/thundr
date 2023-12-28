// React modules
import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';

// Third party libraries
import {Overlay} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

// Components
import TextInput from '../../../composition/TextInput/TextInput';
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import ChatScreenHeader from '../../../composition/ChatScreenHeader/ChatScreenheader';

// Utils
import {
  isIosDevice,
  moderateScale,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {GLOBAL_ASSET_URI, MESSAGES_ASSET_URI} from '../../../utils/images';
import {GET_MESSAGE, SEND_MESSAGE} from '../../../ducks/Dashboard/actionTypes';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {getMessageResponse} = useSelector(state => state.dashboard);
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
  } = route?.params;
  const isMare = tag === 'MARE';
  const currentUserSub = loginData?.sub || sub;
  const chatMessages = getMessageResponse.data;

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
          onPress={() => setShowModal(false)}
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
    <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
      <ChatScreenHeader
        chatCustomerDetails={item}
        is1MinAgoActive={is1MinAgoActive}
        is5MinsAgoActive={is5MinsAgoActive}
        is30MinsAgoActive={is30MinsAgoActive}
      />
      {subscribeModal()}
      <ScrollView
        style={{flex: 1, padding: 10}}
        ref={scrollViewRef}
        contentContainerStyle={{paddingBottom: 16}}
        onContentSizeChange={onContentSizeChange}>
        {chatMessages?.map((message, index) => {
          const currentUser = message.senderSub === currentUserSub;
          return (
            <View
              key={message.id}
              style={{
                alignSelf: currentUser ? 'flex-end' : 'flex-start',
                backgroundColor: currentUser ? '#E33C59' : '#660707',
                padding: scale(20),
                borderRadius: 8,
                marginBottom: 10,
                maxWidth: '80%',
              }}>
              <Text color="#fff" fontFamil="Montserrat-Regular">
                {message.message}
              </Text>
            </View>
          );
        })}
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
          inputStyle={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 8,
            paddingLeft: scale(100),
            backgroundColor: isMare ? '#EE9B3D' : '#E33C59',
            color: '#fff',
            fontSize: moderateScale(18),
          }}
          textStyle={{color: '#fff'}}
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
  );
};

export default ChatScreen;
