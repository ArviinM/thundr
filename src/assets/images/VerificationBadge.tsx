import * as React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';
export const VerificationBadge = () => {
  return (
    <Svg width={16} height={17} fill="none">
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M8.481.095a3.18 3.18 0 0 0-1.545 0l-4.688 1.18C1.041 1.579.208 2.551.208 3.657v4.438c0 2.4 1.316 4.653 3.534 6.048l2.332 1.467a3.127 3.127 0 0 0 3.27 0l2.331-1.467c2.217-1.395 3.534-3.648 3.534-6.048V3.657c0-1.106-.833-2.078-2.04-2.382L8.48.095Z"
        clipRule="evenodd"
      />
      <Path
        fill="#FEFAF8"
        fillRule="evenodd"
        d="M7.097 12.768a.59.59 0 0 1-.199-.666V8.524H5.04a.498.498 0 0 1-.495-.311.602.602 0 0 1 .084-.623l3.046-5.27a.47.47 0 0 1 .621-.103c.204.13.3.398.23.646V6.63h1.852a.5.5 0 0 1 .498.321.6.6 0 0 1-.1.627l-3.049 5.114a.47.47 0 0 1-.63.075Z"
        clipRule="evenodd"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={7.708}
          x2={7.708}
          y1={0}
          y2={16.071}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDAB2D" />
          <Stop offset={1} stopColor="#EA3E4D" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
