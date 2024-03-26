import React, {forwardRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image as RNImage,
} from 'react-native';
import moment from 'moment';
import {formatDateAndTime} from './utils';
import Image from '../../../components/Image/Image';
import {GLOBAL_ASSET_URI} from '../../../utils/images';

const ChatScreenMessages = forwardRef((props, ref) => {
  const {messages, currentUser, onContentSizeChange} = props;
  const organizedMessages = {};

  // State to handle modal visibility and selected image URI
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  if (messages) {
    messages.forEach(message => {
      const day = moment(message.createdAt).format('YYYY-MM-DD');
      if (!organizedMessages[day]) {
        organizedMessages[day] = [];
      }
      organizedMessages[day].push(message);
    });
  }

  const renderImage = props => {
    const {currentMessage} = props;

    if (currentMessage.image && currentMessage.image.length > 0) {
      if (currentMessage.image.length === 1) {
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(currentMessage.image[0]);
              setModalVisible(true);
            }}>
            <View style={styles.singleImageWrapper}>
              <Image
                source={{uri: currentMessage.image[0]}}
                customStyle={styles.singleImage}
                width={150}
                height={150}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        );
      } else {
        const imageCount = currentMessage.image.length;
        const imageSize = imageCount === 4 ? 120 : 80;

        return (
          <View style={styles.imageWrapper}>
            {currentMessage.image.slice(0, 4).map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedImage(image);
                  setModalVisible(true);
                }}>
                <RNImage
                  source={{uri: image}}
                  style={[styles.imageTile, {width: imageSize}]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        );
      }
    }

    return null; // Return null if there are no images
  };

  return (
    <ScrollView
      ref={ref} // Assign the ref to the ScrollView
      onContentSizeChange={onContentSizeChange}
      style={styles.container}
      contentContainerStyle={styles.chatContainer}>
      {Object.keys(organizedMessages).map(day => (
        <View key={day}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayHeaderText}>
              {moment(day).calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: 'dddd',
                sameElse: 'MMMM DD, dddd',
              })}
            </Text>
          </View>
          {organizedMessages[day].map(message => {
            const currentUserMessage = message.user._id === currentUser;
            const formattedTime = formatDateAndTime(message.createdAt);
            if (message.image.length > 0) {
              return (
                <View
                  key={message._id}
                  style={[
                    styles.imageMessage,
                    {
                      alignSelf: currentUserMessage ? 'flex-end' : 'flex-start',
                      borderBottomStartRadius: currentUserMessage ? 10 : 0,
                      borderBottomEndRadius: currentUserMessage ? 0 : 10,
                    },
                  ]}>
                  {message.text && (
                    <Text style={styles.messageText}>{message.text}</Text>
                  )}
                  {message.image && renderImage({currentMessage: message})}
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formattedTime}</Text>
                  </View>
                </View>
              );
            }
            return (
              <View
                key={message._id}
                style={[
                  styles.message,
                  {
                    alignSelf: currentUserMessage ? 'flex-end' : 'flex-start',
                    backgroundColor: currentUserMessage ? '#EE9B3D' : '#660707',
                    borderBottomStartRadius: currentUserMessage ? 10 : 0,
                    borderBottomEndRadius: currentUserMessage ? 0 : 10,
                  },
                ]}>
                {message.text && (
                  <Text style={styles.messageText}>{message.text}</Text>
                )}
                {message.image && renderImage({currentMessage: message})}
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{formattedTime}</Text>
                </View>
              </View>
            );
          })}
        </View>
      ))}
      {/* Modal to display the selected image */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Image
              source={GLOBAL_ASSET_URI.CLOSE_ICON}
              height={25}
              width={25}
            />
          </TouchableOpacity>
          {/*<TouchableOpacity*/}
          {/*  style={styles.closeButton}*/}
          {/*  onPress={() => setModalVisible(false)}>*/}
          {/*  <Text style={styles.closeButtonText}>Close</Text>*/}
          {/*  <Text style={styles.closeButtonText}>Close</Text>*/}
          {/*  */}
          {/*</TouchableOpacity>*/}
          <View style={styles.modalImageContainer}>
            <RNImage
              source={{uri: selectedImage}}
              style={styles.modalImage}
              resizeMethod="auto"
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    paddingBottom: 16,
  },
  dayHeader: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  dayHeaderText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  message: {
    marginBottom: 4,
    padding: 15,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    maxWidth: '80%',
    justifyContent: 'center',
  },
  imageMessage: {
    marginBottom: 4,
    maxWidth: '71%',
    justifyContent: 'center',
  },
  messageText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  timeContainer: {
    alignSelf: 'flex-end',
  },
  timeText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 9,
  },
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly', // Or 'space-around' if desired
    width: 'auto',
  },
  imageTile: {
    width: '30%', // Adjust width to fit 3 images in a row
    aspectRatio: 1,
    borderRadius: 13,
    margin: 3,
  },
  singleImageWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  singleImage: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 13,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalImageContainer: {
    width: '100%', // Full width container
    flex: 1,
  },
  modalImage: {
    flex: 1, // Let the image expand within the container
  },
});

export default ChatScreenMessages;
