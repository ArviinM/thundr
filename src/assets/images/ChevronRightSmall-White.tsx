import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const ChevronRightSmallWhite = () => {
  return (
    <Svg width={6} height={11} fill="none">
      <Path
        stroke="#FFF"
        strokeLinecap="round"
        d="M5.416 5.594 1 1M5.416 5.834 1 10.428"
      />
    </Svg>
  );
};
