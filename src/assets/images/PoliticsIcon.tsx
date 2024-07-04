import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
export const PoliticsIcon = () => {
  return (
    <Svg width={20} height={20} fill="none">
      <G
        stroke="#9D8E90"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        clipPath="url(#a)">
        <Path d="M2.5 17.5h15M2.5 8.333h15M4 5.5 9.833 3l5.834 2.5M3.334 8.333V17.5M16.666 8.333V17.5M6.666 11.667v2.5M10 11.667v2.5M13.334 11.667v2.5" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
