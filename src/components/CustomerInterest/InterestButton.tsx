import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/commons.ts';

interface ButtonProps {
  title: string;
  isSelected: boolean;
  onSelect: (title: string | any) => void;
}

const InterestButton = ({title, isSelected, onSelect}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onSelect}>
      <Text style={isSelected ? styles.selectedText : styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default InterestButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 30,
    backgroundColor: COLORS.white, // Default background color
    borderWidth: 1,
    borderColor: COLORS.gray3,
  },
  selectedButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 30,
    backgroundColor: COLORS.secondary1,
    borderWidth: 1,
    borderColor: COLORS.gray3,
  },
  text: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: -0.4,
  },
  selectedText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: -0.4,
  },
});
