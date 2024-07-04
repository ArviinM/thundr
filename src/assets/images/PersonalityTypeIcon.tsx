import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
export const PersonalityTypeIcon = () => {
  return (
    <Svg width={21} height={20} fill="none">
      <G clipPath="url(#a)">
        <Path fill="#fff" fillOpacity={0.01} d="M21 0H0v20h21V0Z" />
        <Path
          stroke="#9D8E90"
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M14.212 10.202c.95-.905 1.538-2.155 1.538-3.535 0-2.762-2.35-5-5.25-5s-5.25 2.238-5.25 5c0 1.38.588 2.63 1.538 3.535"
        />
        <Path
          stroke="#9D8E90"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m2.625 18.333.438-2.083 4.812-3.333 2.625 2.5 2.625-2.5 4.813 3.333.437 2.083"
        />
        <Path
          stroke="#9D8E90"
          strokeWidth={1.5}
          d="M5.686 8.753C5.69 7.04 5.984 5.789 6.563 5c.87-1.184 1.482-1.097 1.928-.912.445.184.707 1.389 1.452 1.736.744.347 2.648.39 3.3.808.653.418 2.145 1.195 1.773 2.521"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h21v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
