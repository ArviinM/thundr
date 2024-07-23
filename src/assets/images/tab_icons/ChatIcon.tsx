import * as React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';
export const ChatIcon = (props: {focused: boolean}) => {
  return (
    <>
      {props.focused ? (
        <Svg width={32} height={29} fill="none">
          <Path
            fill="url(#a)"
            fillRule="evenodd"
            d="M16.371.5c-8.362 0-15.14 6.268-15.14 14a13.2 13.2 0 0 0 2.015 7c.261.419 1.883 1.75 1.662 2.188l-3.677 2.625C.437 27.7 1.529 28.5 3.246 28.5h13.125c8.362 0 15.141-6.268 15.141-14S24.733.5 16.372.5Z"
            clipRule="evenodd"
          />
          <Defs>
            <LinearGradient
              id="a"
              x1={16.239}
              x2={16.239}
              y1={0.5}
              y2={28.5}
              gradientUnits="userSpaceOnUse">
              <Stop stopColor="#FEDA30" />
              <Stop offset={1} stopColor="#D90000" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg width={32} height={29} fill="none">
          <Path
            fill="#8E8E8F"
            fillRule="evenodd"
            d="M16.371.5c-8.362 0-15.14 6.268-15.14 14a13.2 13.2 0 0 0 2.015 7c.261.419 1.883 1.75 1.662 2.188l-3.677 2.625C.437 27.7 1.529 28.5 3.246 28.5h13.125c8.363 0 15.141-6.268 15.141-14S24.733.5 16.372.5Z"
            clipRule="evenodd"
          />
        </Svg>
      )}
    </>
  );
};
