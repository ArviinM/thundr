import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
export const BatteryIcon = () => {
  return (
    <Svg width={76} height={160}>
      <Path
        fill="url(#a)"
        d="M49.137 11.184c-.255 1.628-1.66 2.888-3.358 2.888H29.576c-1.697 0-3.104-1.26-3.359-2.888h-10.52C7.041 11.184 0 18.226 0 26.88v117.422C0 152.958 7.041 160 15.697 160h43.961c8.655 0 15.697-7.042 15.697-15.697V26.881c0-8.655-7.042-15.697-15.697-15.697h-10.52ZM13.484 86.195l23.25-54.374c2.208-5.167 7.47-2.78 7.47 3.387V75.4h13.927c3.229 0 5.17 5.464 3.406 9.589l-23.25 54.373c-2.21 5.167-7.471 2.781-7.471-3.387v-40.19H16.89c-3.23 0-5.17-5.464-3.406-9.588Z"
      />
      <Path
        fill="url(#b)"
        d="M33.413 0c-3.986 0-7.249 3.262-7.249 7.249v3.411c0 .179.027.352.053.524h22.92c.027-.172.053-.345.053-.524V7.25C49.19 3.262 45.93 0 41.941 0h-8.528Z"
      />
      <Path
        fill="url(#c)"
        d="M26.217 11.184c.255 1.628 1.662 2.888 3.359 2.888h16.203c1.697 0 3.103-1.26 3.358-2.888h-22.92Z"
      />
      <Path
        fill="#F8BC22"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth={4.412}
        d="M58.13 75.399H44.206v-40.19c0-6.168-5.262-8.554-7.472-3.387l-23.25 54.373c-1.763 4.126.177 9.59 3.406 9.59h13.926v40.189c0 6.168 5.263 8.554 7.471 3.388l23.25-54.374c1.764-4.126-.176-9.59-3.405-9.59Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={62.779}
          x2={22.06}
          y1={166.025}
          y2={35.547}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFC028" />
          <Stop offset={0.101} stopColor="#FFC028" />
          <Stop offset={0.773} stopColor="#E73C59" />
          <Stop offset={1} stopColor="#E73C59" />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={109.831}
          x2={47.963}
          y1={239.781}
          y2={41.537}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFC028" />
          <Stop offset={0.101} stopColor="#FFC028" />
          <Stop offset={0.773} stopColor="#E73C59" />
          <Stop offset={1} stopColor="#E73C59" />
        </LinearGradient>
        <LinearGradient
          id="c"
          x1={109.073}
          x2={47.205}
          y1={240.017}
          y2={41.773}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFC028" />
          <Stop offset={0.101} stopColor="#FFC028" />
          <Stop offset={0.773} stopColor="#E73C59" />
          <Stop offset={1} stopColor="#E73C59" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
