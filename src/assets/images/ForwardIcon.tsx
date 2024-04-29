import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../constants/commons.ts';
export const ForwardIcon = () => {
  return (
    <Svg width={11} height={19}>
      <Path
        fill={COLORS.black}
        d="M.39.39c-.52.521-.52 1.365 0 1.886l7.058 7.057L.39 16.39a1.333 1.333 0 1 0 1.885 1.886l8-8c.52-.52.52-1.365 0-1.885l-8-8a1.333 1.333 0 0 0-1.885 0Z"
      />
    </Svg>
  );
};
