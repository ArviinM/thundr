import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';

export interface ButtonData {
  title: string;
  body: string;
  defaultImage: ImageSourcePropType;
  selectedImage: ImageSourcePropType;
}

interface SelectableButtonProps {
  buttonData: ButtonData[];
  onPress: (selectedButtons: string[]) => void;
  maxSelections?: number; // New prop to control selection limit
  initialSelections?: string[]; // Prop for pre-selected values
}

const SelectableButton = ({
  buttonData,
  onPress,
  maxSelections = 1, // Default to single selection
  initialSelections = [],
}: SelectableButtonProps) => {
  const [selectedButtons, setSelectedButtons] =
    useState<string[]>(initialSelections);

  useEffect(() => {
    setSelectedButtons(initialSelections);
  }, [initialSelections]);

  const handleSelect = (buttonTitle: string) => {
    const isSelected = selectedButtons.includes(buttonTitle);

    if (isSelected) {
      // Deselect the button
      const newSelectedOptions = selectedButtons.filter(
        item => item !== buttonTitle,
      );
      setSelectedButtons(newSelectedOptions);
      onPress(newSelectedOptions);
    } else if (selectedButtons.length >= maxSelections) {
      return; // Prevent selection if limit is reached
    } else {
      // Select the button
      const newSelectedOptions = [...selectedButtons, buttonTitle];
      setSelectedButtons(newSelectedOptions);
      onPress(newSelectedOptions);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      {buttonData.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedButtons.includes(button.title) && styles.selectedButton,
          ]}
          onPress={() => handleSelect(button.title)}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={
                selectedButtons.includes(button.title)
                  ? button.selectedImage
                  : button.defaultImage
              }
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>{button.title}</Text>
            <Text style={styles.textBody}>{button.body}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    gap: 6,
    // margin: 20,
  },
  button: {
    backgroundColor: COLORS.secondary1,
    padding: 12,
    borderRadius: 25,
    flexDirection: 'row',
    height: 'auto',
  },
  selectedButton: {
    backgroundColor: COLORS.secondary2,
  },
  disabledButton: {
    backgroundColor: '#DDD',
    opacity: 0.5,
  },
  imageContainer: {
    backgroundColor: COLORS.white2,
    borderRadius: 25,

    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {},
  textContainer: {
    flexDirection: 'column',
    gap: 2,
    marginHorizontal: 7,
    paddingHorizontal: 3,
  },
  textTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: COLORS.white,
  },
  textBody: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: COLORS.white,
  },
});

export default SelectableButton;
