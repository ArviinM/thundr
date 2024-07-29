import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const Comment = () => {
  return (
    <Svg width={17} height={17} fill="none">
      <Path
        stroke="#575757"
        strokeWidth={2}
        d="m15.502 13.195.171.133.1.192c.144.275.245.6.224.955-.022.37-.174.698-.414.95-.44.46-1.07.575-1.553.575H8.444C4.324 16 1 12.634 1 8.5S4.325 1 8.444 1c4.12 0 7.444 3.366 7.444 7.5 0 1.357-.36 2.643-.99 3.746a1.694 1.694 0 0 1-.224.304l.828.645Z"
      />
    </Svg>
  );
};
