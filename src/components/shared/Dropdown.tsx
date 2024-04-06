import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../../constants/commons.ts';
import {IMAGES} from '../../constants/images.ts';

type CustomDropDownData = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  data: CustomDropDownData[];
  placeholder: string;
  onChange?: (item: CustomDropDownData) => void;
  value?: string;
};

export const CustomDropdown = ({
  data,
  placeholder,
  onChange,
  value,
}: CustomDropdownProps) => {
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeHolderStyle}
      data={data}
      labelField="label"
      valueField="value"
      onChange={(item: any) => {
        onChange && onChange(item);
      }}
      itemTextStyle={styles.textStyle}
      selectedTextStyle={styles.textStyle}
      placeholder={placeholder}
      value={value}
      renderRightIcon={() => (
        <Image source={IMAGES.dropdown} height={16} width={16} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    shadowColor: COLORS.secondary1,
    shadowOffset: {
      width: 2.6,
      height: 2.6,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: COLORS.black,
  },
  placeHolderStyle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: COLORS.gray,
  },
});

export default CustomDropdown;
