import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const ImagesIcon = () => {
  return (
    <Svg width={27} height={24}>
      <Path fill="#F4F4F4" d="M3.293 7h2.195v12h13.17v2H3.294V7Z" />
      <Path
        fill="#F4F4F4"
        fillRule="evenodd"
        d="M7.683 17V3h15.366v14H7.683ZM9.878 5h10.976v5l-2.195-2-3.842 3.5-1.646-1.5-3.293 3V5Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
