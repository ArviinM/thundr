import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from './InterestButton.tsx';

interface ButtonContainerProps {
  options: string[];
  onSelectionChange: (selectedOptions: string[]) => void;
}

const InterestButtonContainer: React.FC<ButtonContainerProps> = ({
  options,
  onSelectionChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      // Filter out the deselected option
      const newSelectedOptions = selectedOptions.filter(
        item => item !== option,
      );
      setSelectedOptions(newSelectedOptions);
      onSelectionChange(newSelectedOptions); // Notify parent of change
    } else if (selectedOptions.length >= 4) {
      return; // Prevent selection if limit is reached
    } else {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      onSelectionChange(newSelectedOptions); // Notify parent of change
    }
  };

  return (
    <View style={styles.container}>
      {options.map(option => (
        <Button
          key={option}
          title={option}
          isSelected={selectedOptions.includes(option)}
          onSelect={() => handleSelect(option)}
        />
      ))}
    </View>
  );
};

export default InterestButtonContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});
