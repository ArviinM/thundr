import React, {useState} from 'react';
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
  onPress?: (index: number, text: string) => void;
  disabledIndex?: number;
  customerPersonality?: string;
}

const SelectableButton = ({
  buttonData,
  onPress,
  disabledIndex,
  customerPersonality,
}: SelectableButtonProps) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(
    customerPersonality
      ? buttonData.findIndex(button => button.title === customerPersonality)
      : buttonData.length === 1
      ? 0
      : null,
  );

  const handleButtonPress = (index: number, text: string) => {
    if (disabledIndex !== index) {
      setSelectedButton(index);
      if (onPress) {
        onPress(index, text);
      }
    }
  };

  return (
    <View style={styles.buttonContainer}>
      {buttonData.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedButton === index && styles.selectedButton,
            disabledIndex === index && styles.disabledButton,
          ]}
          onPress={() => handleButtonPress(index, button.title)}
          disabled={disabledIndex === index}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              // resizeMode="contain"
              source={
                selectedButton === index
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
