import React, {forwardRef} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import moment from 'moment';
import {formatDateAndTime} from './utils';
import Image from '../../../components/Image/Image';

const ChatScreenMessages = forwardRef((props, ref) => {
  const {messages, currentUser, onContentSizeChange} = props;
  const organizedMessages = {};

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

    if (currentMessage.image.length === 1) {
      return (
        <View style={styles.singleImageWrapper}>
          <Image
            source={{uri: currentMessage.image[0]}}
            customStyle={styles.singleImage}
            width={150}
            height={150}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      const imageCount = currentMessage.image.length;
      const imageSize = imageCount === 4 ? 120 : 80;

      return (
        <View style={styles.imageWrapper}>
          {currentMessage.image.slice(0, 4).map((image, index) => (
            <Image
              key={index}
              source={{uri: image}}
              customStyle={[styles.imageTile, {width: imageSize}]}
              resizeMode="cover"
            />
          ))}
        </View>
      );
    }
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
    justifyContent: 'space-evenly',
  },
  imageTile: {
    width: '40%',
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
    margin: 3,
    resizeMode: 'cover',
  },
});

export default ChatScreenMessages;
