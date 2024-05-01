import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const TrashIcon = () => {
  return (
    <Svg width={32} height={30} fill="none">
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M19.161 13.267v8.666M12.839 13.267v8.666M5.613 8.067V26a2 2 0 0 0 2 2h16.774a2 2 0 0 0 2-2V8.067M2 8.067h28M7.419 8.067 10.85 2h10.297l3.432 6.067"
      />
    </Svg>
  );
};
