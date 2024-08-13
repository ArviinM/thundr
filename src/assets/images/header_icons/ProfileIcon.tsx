import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
export const ProfileIcon = () => {
  return (
    <Svg width={25} height={24} fill="none">
      <G clipPath="url(#a)">
        <Rect
          width={24}
          height={24}
          x={0.857}
          y={0.007}
          fill="#E33051"
          fillOpacity={0.2}
          rx={12}
        />
        <Path
          stroke="#E33051"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12.857 13.72a4.286 4.286 0 1 0 0-8.57 4.286 4.286 0 0 0 0 8.57ZM5.537 20.406a8.57 8.57 0 0 1 14.64 0"
        />
        <Path
          stroke="#E33051"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12.857 23.15C19.01 23.15 24 18.16 24 12.006 24 5.853 19.01.864 12.857.864 6.703.864 1.714 5.853 1.714 12.007c0 6.154 4.989 11.143 11.143 11.143Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Rect
            width={24}
            height={24}
            x={0.857}
            y={0.007}
            fill="#fff"
            rx={12}
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
