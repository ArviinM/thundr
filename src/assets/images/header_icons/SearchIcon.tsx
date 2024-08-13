import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const SearchIcon = () => {
  return (
    <Svg width={22} height={22} fill="none">
      <Path
        fill="#E33051"
        fillOpacity={0.29}
        stroke="#E33051"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.16 17.683a8.16 8.16 0 1 0 0-16.32 8.16 8.16 0 0 0 0 16.32Z"
      />
      <Path fill="#E33051" fillOpacity={0.29} d="m20.286 20.65-5.193-5.193Z" />
      <Path
        stroke="#E33051"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m20.286 20.65-5.193-5.193"
      />
    </Svg>
  );
};
