import React from 'react';
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
  textStyle?: TextStyle;
}

const GradientButton: React.FC<ButtonProps> = ({
  onPress,
  loading = false,
  text,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <LinearGradient
        colors={['#EF9D47', '#E33051']}
        start={{x: 0, y: 1}}
        style={[buttonStyle]}
        end={{x: 1, y: 0}}>
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
