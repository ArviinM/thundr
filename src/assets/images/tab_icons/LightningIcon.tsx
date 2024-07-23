import * as React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';
export const LightningIcon = (props: {focused: boolean}) => {
  return (
    <Svg width={21} height={30} fill="none">
      {props.focused ? (
        <>
          <Path
            fill="url(#a)"
            fillRule="evenodd"
            d="M8.4 30.251a1.56 1.56 0 0 1-.614-1.864V18.369H2.038a1.56 1.56 0 0 1-1.272-2.617L10.19.998a1.56 1.56 0 0 1 2.634 1.518v10.552h5.726a1.56 1.56 0 0 1 1.232 2.654L10.35 30.04a1.56 1.56 0 0 1-1.952.211Z"
            clipRule="evenodd"
          />
          <Defs>
            <LinearGradient
              id="a"
              x1={10.291}
              x2={10.291}
              y1={30.5}
              y2={0.5}
              gradientUnits="userSpaceOnUse">
              <Stop stopColor="#FEDA30" />
              <Stop offset={1} stopColor="#D90000" />
            </LinearGradient>
          </Defs>
        </>
      ) : (
        <>
          <Path
            fill="#8E8E8F"
            fillRule="evenodd"
            d="M8.414 29.751a1.56 1.56 0 0 1-.613-1.864V17.869H2.053a1.56 1.56 0 0 1-1.271-2.617L10.204.498a1.56 1.56 0 0 1 2.634 1.518v10.552h5.726a1.56 1.56 0 0 1 1.232 2.654l-9.43 14.318a1.56 1.56 0 0 1-1.952.211Z"
            clipRule="evenodd"
          />
        </>
      )}
    </Svg>
  );
};
