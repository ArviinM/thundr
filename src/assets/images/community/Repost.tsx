import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const Repost = () => {
  return (
    <Svg width={13} height={16} fill="none">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.66}
        strokeWidth={2}
        d="M9.556 1 12 3.545m0 0L9.556 6.091M12 3.545H3.444c-.648 0-1.27.269-1.728.746A2.6 2.6 0 0 0 1 6.091v1.273M3.444 15 1 12.454m0 0L3.444 9.91M1 12.454h8.556c.648 0 1.27-.268 1.728-.745a2.6 2.6 0 0 0 .716-1.8V8.636"
      />
    </Svg>
  );
};
