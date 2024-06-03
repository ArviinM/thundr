import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

export const ReturnArrowIcon = () => {
  return (
    <Svg width={14} height={14} fill="none">
      <G clipPath="url(#a)">
        <Path
          fill="#504647"
          fillRule="evenodd"
          d="M6.545.998a1 1 0 0 0 0 2h2.728a2.638 2.638 0 0 1 0 5.275H4.817V6.545a1 1 0 0 0-1.707-.707L.384 8.564a1.004 1.004 0 0 0-.22 1.09c.049.119.121.23.218.327l2.728 2.728a1 1 0 0 0 1.707-.707v-1.729h4.456a4.638 4.638 0 1 0 0-9.275H6.545Z"
          clipRule="evenodd"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h14v14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
