// React modules
import React from 'react';
import {View} from 'react-native';

// Utils
import {scale, verticalScale} from '../../utils/commons';

const ChatActiveIndicator = props => {
  const {customStyle, is1MinAgoActive, is5MinsAgoActive, is30MinsAgoActive} =
    props;

  const getIndicatorColor = () => {
    let color = '';

    if (is1MinAgoActive) {
      color = '#1DB100';
    } else if (is5MinsAgoActive) {
      color = '#FFD500';
    } else if (is30MinsAgoActive) {
      color = '';
    }

    return color;
  };

  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: getIndicatorColor(),
        height: verticalScale(15),
        width: scale(16),
        borderRadius: 50,
        left: scale(60),
        top: verticalScale(50),
        ...customStyle,
      }}
    />
  );
};

export default ChatActiveIndicator;
