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
  textStyle?: TextStyle | TextStyle[];
  disabled?: boolean;
  isSSO?: boolean;
  logo?: any;
  isMatchFound?: boolean;
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
  isMatchFound = false,
}) => {
  return (
    <TouchableOpacity
      style={[buttonStyle]}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading && !isSSO ? (
        <ActivityIndicator
          color={isMatchFound ? COLORS.black : COLORS.white}
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
