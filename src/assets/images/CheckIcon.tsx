import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {View} from 'react-native';

interface CheckIconProps {
  isRead?: boolean;
}

const CheckIcon: React.FC<CheckIconProps> = ({isRead = false}) => {
  return (
    <View>
      <Svg width="17" height="17" viewBox="0 0 77 75" fill="none">
        <Path
          d="M56.9687 25.1171L33.1009 48.3649L22.252 37.7977"
          stroke={isRead ? 'rgba(40,39,39,0.32)' : '#F8F8F8'}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default CheckIcon;
