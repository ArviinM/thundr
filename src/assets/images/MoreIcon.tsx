import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
import {COLORS} from '../../constants/commons.ts';

export const MoreIcon = ({isMare = false}) => {
  return (
    <Svg width={18} height={18} fill="none">
      <Circle
        cx={3}
        cy={9}
        r={2}
        fill={isMare ? COLORS.secondary2 : COLORS.primary1}
      />
      <Circle
        cx={9}
        cy={9}
        r={2}
        fill={isMare ? COLORS.secondary2 : COLORS.primary1}
      />
      <Circle
        cx={15}
        cy={9}
        r={2}
        fill={isMare ? COLORS.secondary2 : COLORS.primary1}
      />
    </Svg>
  );
};
