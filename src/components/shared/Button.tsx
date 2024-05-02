import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';

interface ButtonProps {
  onPress: () => void;
  loading?: boolean;
  text: string;
  buttonStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
  isSSO?: boolean;
  logo?: any;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  loading = false,
  text,
  buttonStyle,
  textStyle,
  disabled,
  isSSO = false,
  logo,
}) => {
  return (
    <TouchableOpacity
      style={[buttonStyle]}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading && !isSSO ? (
        <ActivityIndicator
          color={COLORS.white}
          animating={true}
          size={'small'}
        />
      ) : isSSO ? (
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {logo}
          <Text style={[textStyle]}>{text}</Text>
        </View>
      ) : (
        <Text style={[textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
