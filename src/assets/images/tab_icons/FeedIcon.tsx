import * as React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';
export const FeedIcon = (props: {focused: boolean}) => {
  return (
    <>
      {props.focused ? (
        <Svg width={32} height={31} fill="none">
          <Path
            fill="url(#a)"
            fillRule="evenodd"
            d="M.991 13.255a2.219 2.219 0 0 0-.706 1.624v12.7a3.328 3.328 0 0 0 3.328 3.328h10.945c1.05.21.034 0 1.26 0H28.02a3.328 3.328 0 0 0 3.328-3.329v-12.7c0-.615-.255-1.203-.706-1.623L16.867.472c-.63-.63-1.68-.63-2.31 0L.992 13.255Z"
            clipRule="evenodd"
          />
          <Path
            fill="#fff"
            fillRule="evenodd"
            d="M14.698 26.983a.914.914 0 0 1-.363-1.096v-5.888h-3.397a.923.923 0 0 1-.906-.513.913.913 0 0 1 .154-1.025l5.57-8.67a.926.926 0 0 1 1.135-.17.914.914 0 0 1 .422 1.062v6.2h3.384c.385-.03.748.18.91.529.163.348.09.76-.182 1.032l-5.574 8.414a.926.926 0 0 1-1.153.125Z"
            clipRule="evenodd"
          />
          <Defs>
            <LinearGradient
              id="a"
              x1={15.817}
              x2={15.817}
              y1={-0.158}
              y2={30.906}
              gradientUnits="userSpaceOnUse">
              <Stop stopColor="#FEDA30" />
              <Stop offset={1} stopColor="#D90000" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg width={32} height={31} fill="none">
          <Path
            fill="#8E8E8F"
            fillRule="evenodd"
            d="M.991 13.255a2.219 2.219 0 0 0-.706 1.624v12.7a3.328 3.328 0 0 0 3.328 3.328h10.945c1.05.21.034 0 1.26 0H28.02a3.328 3.328 0 0 0 3.328-3.329v-12.7c0-.615-.255-1.203-.706-1.623L16.867.472c-.63-.63-1.68-.63-2.31 0L.992 13.255Z"
            clipRule="evenodd"
          />
          <Path
            fill="#fff"
            fillRule="evenodd"
            d="M14.698 26.983a.914.914 0 0 1-.363-1.096v-5.888h-3.397a.923.923 0 0 1-.906-.513.913.913 0 0 1 .154-1.025l5.57-8.67a.926.926 0 0 1 1.135-.17.914.914 0 0 1 .422 1.062v6.2h3.384c.385-.03.748.18.91.529.163.348.09.76-.182 1.032l-5.574 8.414a.926.926 0 0 1-1.153.125Z"
            clipRule="evenodd"
          />
        </Svg>
      )}
    </>
  );
};
