import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/commons.ts';

type LetterGradientButtonProps = {
  letter: string;
  onChange: (item: string) => void;
  selectedLetter: string;
};

const LetterGradientButton = ({
  letter,
  selectedLetter,
  onChange,
}: LetterGradientButtonProps) => {
  const isSelected = selectedLetter === letter;

  const handlePress = () => {
    onChange(letter);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <LinearGradient
        colors={!isSelected ? ['#CCCCCC', '#CCCCCC'] : ['#EF9D47', '#E33051']}
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0.2}}
        style={{
          width: 72,
          height: 72,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          marginVertical: 2,
        }}>
        <Text
          style={{
            fontFamily: 'ClimateCrisis-Regular',
            fontSize: 48,
            lineHeight: 0,
            color: COLORS.white,
          }}>
          {letter}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LetterGradientButton;
