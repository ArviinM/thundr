import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';

interface ButtonProps {
  onPress: () => void;
  loading?: boolean;
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle | TextStyle[];
  disabled?: boolean;
}

const START_DEFAULT = {x: 0, y: 0}; // Updated start position
const END_DEFAULT = {x: 1, y: 1}; // Updated end position
const GRADIENT_COLORS = [
  '#EA0B50',
  '#FF9B54',
  '#ECD643',
  '#75DF37',
  '#39C2D9',
  '#BE07F5',
  '#EA0B50',
];
const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1];
const MOVEMENT = GRADIENT_LOCATIONS[1] / 20;
const INTERVAL = 30;

const GRADIENT_DISABLED_COLORS = Array(7).fill('#CCCCCC');

let timeout: string | number | NodeJS.Timeout | undefined;

const GradientButton: React.FC<ButtonProps> = ({
  onPress,
  loading = false,
  text,
  buttonStyle,
  textStyle,
  disabled = false,
}) => {
  let [gradientOptions, setGradientOptions] = React.useState({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: START_DEFAULT,
    end: END_DEFAULT,
    disabled_colors: GRADIENT_DISABLED_COLORS,
  });
  const gradientOptionsRef = React.useRef(gradientOptions);
  gradientOptionsRef.current = gradientOptions;

  const infiniteRainbow = () => {
    if (gradientOptionsRef.current.locations[1] - MOVEMENT <= 0) {
      // Shift colours and reset locations
      let gradientColors = [...gradientOptionsRef.current.colors];
      gradientColors.shift();
      gradientColors.push(gradientColors[1]);

      setGradientOptions({
        colors: gradientColors,
        locations: GRADIENT_LOCATIONS,
        start: START_DEFAULT,
        end: END_DEFAULT,
        disabled_colors: GRADIENT_DISABLED_COLORS,
      });
    } else {
      let updatedLocations = gradientOptionsRef.current.locations.map(
        (item, index) => {
          if (index === gradientOptionsRef.current.locations.length - 1) {
            return 1;
          }

          return parseFloat(Math.max(0, item - MOVEMENT).toFixed(2));
        },
      );

      setGradientOptions({
        colors: [...gradientOptionsRef.current.colors],
        locations: updatedLocations,
        start: START_DEFAULT,
        end: END_DEFAULT,
        disabled_colors: GRADIENT_DISABLED_COLORS,
      });
    }

    timeout = setTimeout(infiniteRainbow, INTERVAL);
  };

  useEffect(() => {
    infiniteRainbow();
  }, []);
  //
  // useEffect(() => {
  //   if (disabled) {
  //     clearTimeout(timeout);
  //   }
  // }, []);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading}>
      <LinearGradient
        colors={
          disabled ? gradientOptions.disabled_colors : gradientOptions.colors
        }
        start={gradientOptions.start}
        style={[buttonStyle]}
        locations={gradientOptions.locations}
        end={gradientOptions.end}>
        {loading ? (
          <ActivityIndicator
            color={COLORS.white}
            animating={true}
            size={'small'}
          />
        ) : (
          <Text style={[textStyle]}>{text}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
