import React from 'react';
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
  loading?: boolean;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
  loading = false,
}) => {
  const handlePress = () => {
    if (!loading) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color={COLORS.primary1} />
      ) : disabled ? (
        <Image source={IMAGES.nextCircleDisabled} />
      ) : (
        <Image source={IMAGES.nextCircle} />
      )}
    </TouchableOpacity>
  );
};

export default CircleButton;
