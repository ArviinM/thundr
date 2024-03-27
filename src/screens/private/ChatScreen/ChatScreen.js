// React modules
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

// Third party libraries
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

// Components
// import TextInput from '../../../composition/TextInput/TextInput';
import Image from '../../../components/Image/Image';
import ChatScreenHeader from '../../../composition/ChatScreenHeader/ChatScreenheader';

// Ducks
import {
  GET_MESSAGE,
  GET_UNREAD_MESSAGES,
  READ_CHAT_MESSAGE,
  SEND_MESSAGE,
  UPDATE_DASHBOARD_STATE,
  UPLOAD_PHOTO_MESSAGE,
} from '../../../ducks/Dashboard/actionTypes';

// Utils
import {MESSAGES_ASSET_URI} from '../../../utils/images';
import ReportUserModal from '../../../composition/ReportUserModal/ReportUserModal';

import {UPDATE_PERSISTED_STATE} from '../../../ducks/PersistedState/actionTypes';
import {MAX_IMAGE_SIZE_BYTES} from './utils';
import ChatScreenMessages from './ChatScreenMessages';
import Toast from 'react-native-toast-message';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {getMessageResponse, allChatList} = useSelector(
    state => state.dashboard,
  );
  const {sub} = useSelector(state => state.persistedState);

  const scrollViewRef = useRef();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const height = useHeaderHeight();
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

  const scrollToLatestMessage = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  useEffect(() => {
    if (chatUUID !== getMessageResponse[0]?.chatRoomID) {
      dispatch({
        type: UPDATE_DASHBOARD_STATE,
        newState: {getMessageResponse: []},
      });
    }
    dispatch({type: GET_MESSAGE, payload: {chatUUID}});
    const intervalId = setInterval(() => {
      dispatch({type: GET_MESSAGE, payload: {chatUUID}});
    }, 3500);

    return () => {
      clearInterval(intervalId);
    };
  }, [chatUUID, dispatch]);

  const chatMessages = getMessageResponse?.length
    ? getMessageResponse
    : messages;

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
      return () => {
        dispatch({type: UPDATE_PERSISTED_STATE, newState: {chatRoomID: ''}});
      };
    }, [chatUUID, dispatch]),
  );

  // READ MESSAGES
  useEffect(() => {
    if (getMessageResponse?.length) {
      const filteredMessages = getMessageResponse.filter(
        message => message.user._id !== sub,
      );

      // Extracting only the _id field from each object in filteredMessages
      const transformedMessages = filteredMessages.map(message => ({
        id: message._id,
      }));

      dispatch({type: READ_CHAT_MESSAGE, payload: transformedMessages});
    }
  }, [sub, dispatch, getMessageResponse]);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      setMessages([
        ...messages,
        {
          _id: messages.length,
          text: inputText,
          createdAt: new Date(),
          user: {_id: sub},
          image: [],
          chatRoomID: chatUUID ? chatUUID : '',
        },
      ]);
      setInputText('');
      dispatch({
        type: SEND_MESSAGE,
        payload: {targetSub: item?.sub, message: inputText, read: '0'},
      });
      dispatch({type: GET_MESSAGE, payload: {chatUUID}});
    }
    scrollToLatestMessage();
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const onContentSizeChange = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const openImageLibrary = async useCamera => {
    try {
      let images;
      if (useCamera) {
        images = [
          await ImagePicker.openCamera({
            mediaType: 'photo',
            includeBase64: true, // Include Base64 data
          }),
        ];
      } else {
        images = await ImagePicker.openPicker({
          mediaType: 'photo',
          multiple: true,
          includeBase64: true,
          forceJpg: true,
          maxFiles: 4,
        });
      }

      if (!images || images.length === 0) {
        return null;
      }

      const imageData = [];
      for (const image of images) {
        if (image.size >= MAX_IMAGE_SIZE_BYTES) {
          Toast.show({
            type: 'warning',
            text1: 'Hala, ang laki!',
            text2: 'Limit upload up to 8mb per photo',
            position: 'bottom',
            bottomOffset: height + 55,
          });
          throw new Error(
            'Image exceeds maximum size limit. Please select a smaller image.',
          );
        }

        imageData.push({
          fileExtension: 'jpg',
          mime: image.mime,
          data: image.data,
        });
      }

      if (Platform.OS === 'android' && imageData.length >= 5) {
        Toast.show({
          type: 'warning',
          text1: 'Hala, ang dami!',
          text2: 'Limit of 4 photos per sending',
          position: 'bottom',
          bottomOffset: height + 55,
        });
        throw new Error('Image selection exceeds the limit of 5 images.');
      }

      dispatch({
        type: UPLOAD_PHOTO_MESSAGE,
        payload: {imagesData: imageData, targetSub: item?.sub, chatUUID},
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? height : 0}
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
        <ReportUserModal category="CHAT" targetSub={item?.sub} />
        <ChatScreenMessages
          messages={chatMessages}
          currentUser={sub}
          ref={scrollViewRef}
          onContentSizeChange={onContentSizeChange}
        />

        {/*  Input Bar for Chat */}
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputTextContainer,
              {backgroundColor: isMare ? '#EE9B3D' : '#E33C59'},
            ]}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              onChangeText={text => setInputText(text)}
              value={inputText}
              placeholder="Type a message.."
              textAlignVertical="center"
              placeholderTextColor={'#ffffff'}
              maxLength={255}
            />
            <TouchableOpacity
              onPress={() => openImageLibrary(false)}
              style={{paddingRight: 6}}>
              <Image
                source={MESSAGES_ASSET_URI.GALLERY_ICON}
                height={25}
                width={25}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSend}>
            <Image
              source={
                isMare
                  ? MESSAGES_ASSET_URI.MARE_SEND_ICON
                  : MESSAGES_ASSET_URI.SEND_ICON
              }
              height={45}
              width={45}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 25,
    width: '85%',
  },
  buttonContainer: {
    padding: 5,
  },
  textInput: {
    flex: 1,
    padding: 10,
    paddingTop: 12,
    paddingHorizontal: 12,
    minHeight: 40,
    textAlignVertical: 'bottom',
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
});

export default ChatScreen;
