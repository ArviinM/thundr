import * as React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  ReduceMotion,
  withRepeat,
} from 'react-native-reanimated';
import {COLORS} from '../../../constants/commons.ts';

export const SendIcon = (props: {isMare: boolean; disabled: boolean}) => {
  const scale = useSharedValue(props.disabled ? 1 : 0);
  const rotation = useSharedValue(-10); // Shared value for rotation

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}, {rotate: `${rotation.value}deg`}],
    };
  });

  const configSpring = {
    mass: 1,
    damping: 3,
    stiffness: 200,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
    reduceMotion: ReduceMotion.System,
  };

  React.useEffect(() => {
    if (!props.disabled) {
      // Spring-based animation when enabled
      scale.value = withSequence(
        withSpring(0.8, configSpring), // Shrink down with higher stiffness
        withSpring(1, configSpring),
      );
      // Wiggle rotation animation
      rotation.value = withRepeat(
        withSpring(5, {stiffness: 150}), // Rotate 10 degrees to the right
        -2, // Repeat in reverse 2 times
        true, // Prevent overshooting beyond the start/end points
      );
      // rotation.value = withSpring(10, {stiffness: 150});
    } else {
      scale.value = withSequence(
        withSpring(0.8, configSpring), // Shrink down with higher stiffness
        withSpring(1, configSpring),
      );
      rotation.value = withSpring(-10, {stiffness: 150});
    }
  }, [props.disabled, scale]);

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={38} height={37}>
        <Ellipse
          cx={19}
          cy={18.5}
          rx={19}
          ry={18.5}
          fill={
            props.disabled
              ? COLORS.gray
              : props.isMare
              ? COLORS.secondary2
              : COLORS.primary1
          }
        />
        <Path
          fill={COLORS.white}
          fillRule="evenodd"
          d="m16.248 19.89-4.348-1.5c-2.277-.785-3.416-1.177-3.416-1.89 0-.713 1.139-1.106 3.416-1.89l12.484-4.306c1.65-.569 2.476-.853 2.917-.42.442.432.174 1.263-.361 2.925l-4.12 12.783c-.783 2.432-1.175 3.647-1.903 3.647-.729 0-1.12-1.215-1.904-3.647L17.64 21.33l5.205-5.384a1 1 0 1 0-1.438-1.39l-5.157 5.335Z"
          clipRule="evenodd"
        />
      </Svg>
    </Animated.View>
  );
};
