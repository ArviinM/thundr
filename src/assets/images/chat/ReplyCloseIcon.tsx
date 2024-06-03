import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const ReplyCloseIcon = () => {
  return (
    <Svg width={17} height={17} fill="none">
      <Circle cx={8.5} cy={8.5} r={8.5} fill="#D9D9D9" />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
        d="m5.667 5.667 5.667 5.666M5.667 11.333l5.667-5.666"
      />
    </Svg>
  );
};
