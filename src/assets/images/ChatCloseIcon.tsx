import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../constants/commons.ts';

export const ChatCloseIcon = ({isMare = false}) => {
  return (
    <Svg width={18} height={18}>
      <Path
        stroke={isMare ? COLORS.secondary2 : COLORS.primary1} // Conditional stroke color
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.5}
        d="M16 2 2 16M2 2l14 14"
      />
    </Svg>
  );
};
