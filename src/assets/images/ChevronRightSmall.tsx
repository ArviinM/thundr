import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const ChevronRightSmall = () => {
  return (
    <Svg width={6} height={11} fill="none">
      <Path
        stroke="#504647"
        strokeLinecap="round"
        d="M5.416 5.594 1 1M5.416 5.834 1 10.428"
      />
    </Svg>
  );
};
