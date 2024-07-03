import * as React from 'react';
import Svg, {Circle, G, Path} from 'react-native-svg';

export const MinusIcon = () => {
  return (
    <Svg width={44} height={44} viewBox="0 0 34 34" fill="none">
      <G filter="url(#a)">
        <Circle cx={17} cy={13} r={13} fill="#fff" />
      </G>
      <Path fill="#E63051" d="M10 11h14v4H10z" />
    </Svg>
  );
};
