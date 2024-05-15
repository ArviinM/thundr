import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const CameraIcon = () => {
  return (
    <Svg width={27} height={27} fill="none" viewBox={'0 0 14 14'}>
      <Path
        stroke="#F4F4F4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 5a1 1 0 0 0-1-1h-2L9 2H5L3.5 4h-2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V5Z"
      />
      <Path
        stroke="#F4F4F4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 9.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
      />
    </Svg>
  );
};
