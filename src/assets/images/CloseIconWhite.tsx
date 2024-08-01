import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const CloseIconWhite = () => {
  return (
    <Svg width={12} height={12} viewBox={'0 0 18 18'}>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.5}
        d="M16 2 2 16M2 2l14 14"
      />
    </Svg>
  );
};
