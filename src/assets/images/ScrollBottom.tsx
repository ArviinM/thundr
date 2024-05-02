import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
export const ScrollBottom = () => {
  return (
    <Svg width={36} height={36} fill="none">
      <Circle
        cx={17.544}
        cy={17.544}
        r={17.544}
        fill="#F5F1F0"
        fillOpacity={0.84}
      />
      <Path
        stroke="#504647"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="m17.314 22.567-6.036-8.763M17.314 22.567l6.496-8.716"
      />
    </Svg>
  );
};
