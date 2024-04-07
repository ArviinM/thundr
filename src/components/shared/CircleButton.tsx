import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Image,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {IMAGES} from '../../constants/images.ts';

interface CircleButtonProps {
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      {disabled ? (
        <Image source={IMAGES.nextCircleDisabled} />
      ) : (
        <Image source={IMAGES.nextCircle} />
      )}
    </TouchableOpacity>
  );
};

export default CircleButton;
