import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {moderateScale, scale} from '../../utils/utils.ts';

type LetterGradientButtonProps = {
  letter: string;
  onChange: (item: string, b: boolean) => void;
  selectedLetters: string[];
  allowSingleSelection?: boolean;
};

const LetterGradientButton = ({
  letter,
  selectedLetters,
  onChange,
  allowSingleSelection,
}: LetterGradientButtonProps) => {
  const [isSelected, setIsSelected] = useState(
    selectedLetters.includes(letter),
  );

  const handlePress = () => {
    if (allowSingleSelection) {
      const newIsSelected = !isSelected;
      setIsSelected(newIsSelected);
      onChange(letter, newIsSelected);
    } else {
      const newIsSelected = !isSelected;
      setIsSelected(newIsSelected);
      onChange(letter, newIsSelected);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={selectedLetters.length >= 5 && !isSelected}>
      <LinearGradient
        colors={!isSelected ? ['#CCCCCC', '#CCCCCC'] : ['#EF9D47', '#E33051']}
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0.2}}
        style={{
          width: scale(78),
          height: moderateScale(78),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          marginVertical: 2,
        }}>
        <Text
          style={{
            fontFamily: 'ClimateCrisis-Regular',
            fontSize: moderateScale(48),
            color: COLORS.white,
          }}>
          {letter}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LetterGradientButton;
