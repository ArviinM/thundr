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
  isCheck?: boolean;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
  loading = false,
  isCheck = false,
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
        <Image
          source={
            isCheck ? IMAGES.checkIconDisabled : IMAGES.nextCircleDisabled
          }
        />
      ) : (
        <Image source={isCheck ? IMAGES.checkIcon : IMAGES.nextCircle} />
      )}
    </TouchableOpacity>
  );
};

export default CircleButton;
