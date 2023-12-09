// React modules
import React from 'react';
import {View} from 'react-native';

// Utils
import {scale, verticalScale} from '../../utils/commons';

const ChatActiveIndicator = props => {
  const {customStyle} = props;
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#1DB100',
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
