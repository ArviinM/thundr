import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';

interface ButtonProps {
  onPress: () => void;
  loading?: boolean;
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  loading = false,
  text,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[buttonStyle]}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator
          color={COLORS.white}
          animating={true}
          size={'small'}
        />
      ) : (
        <Text style={[textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
