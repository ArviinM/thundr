import Svg, {Defs, Ellipse, LinearGradient, Stop} from 'react-native-svg';
import React from 'react';
import {View} from 'react-native';

const originalHeight = 314;
const originalWidth = 430;

export const LinearBackground = (props: {isMare: boolean; width: number}) => (
  <View style={{width: props.width, height: originalHeight}}>
    <Svg
      width="100%"
      height="100%"
      fill="none"
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}>
      <Ellipse cx={213} cy={111} fill="url(#a)" rx={363} ry={203} />
      {props.isMare ? (
        <Defs>
          <LinearGradient
            id="a"
            x1={-220.067}
            x2={-151.722}
            y1={-137.523}
            y2={435.017}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FF9E00" />
            <Stop offset={0.193} stopColor="#FFE37E" />
            <Stop offset={0.584} stopColor="#FF9E00" />
          </LinearGradient>
        </Defs>
      ) : (
        <Defs>
          <LinearGradient
            id="a"
            x1={-150}
            x2={-86.932}
            y1={-92}
            y2={428.571}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFE381" />
            <Stop offset={0.301} stopColor="#FF9E00" />
            <Stop offset={0.414} stopColor="#FF5847" />
            <Stop offset={0.818} stopColor="#BA0A2C" />
          </LinearGradient>
        </Defs>
      )}
    </Svg>
  </View>
);
