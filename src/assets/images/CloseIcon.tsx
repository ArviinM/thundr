import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const CloseIcon = () => {
  return (
    <Svg width={18} height={18}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.5}
        d="M16 2 2 16M2 2l14 14"
      />
    </Svg>
  );
};
